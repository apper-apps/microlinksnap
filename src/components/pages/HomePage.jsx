import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import UrlForm from "@/components/molecules/UrlForm";
import UrlResult from "@/components/molecules/UrlResult";
import RecentLinks from "@/components/organisms/RecentLinks";
import { UrlShorteningSkeleton } from "@/components/ui/Loading";
import { UrlShorteningError } from "@/components/ui/Error";
import { EmptyUrlInput } from "@/components/ui/Empty";
import { urlService } from "@/services/api/urlService";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const HomePage = () => {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  const [shortenedLink, setShortenedLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentLinks, setRecentLinks] = useLocalStorage("linksnap_recent", []);
  const topRef = useRef(null);

  // Handle redirect for short codes
  useEffect(() => {
    if (shortCode) {
      handleRedirect(shortCode);
    }
  }, [shortCode]);

  const handleRedirect = async (code) => {
    try {
      setLoading(true);
      const link = await urlService.getByShortCode(code);
      
      if (link) {
        await urlService.incrementClick(code);
        window.location.href = link.originalUrl;
      } else {
        toast.error("Short link not found");
        navigate("/");
      }
    } catch (error) {
      console.error("Redirect error:", error);
      toast.error("Error redirecting to URL");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleShortenUrl = async (url) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await urlService.create(url);
      setShortenedLink(result);
      
      // Add to recent links
      const newRecentLink = {
        Id: result.Id,
        shortCode: result.shortCode,
        originalUrl: result.originalUrl,
        createdAt: result.createdAt,
        clickCount: result.clickCount
      };
      
      setRecentLinks(prev => {
        const filtered = prev.filter(link => link.shortCode !== result.shortCode);
        return [newRecentLink, ...filtered].slice(0, 10);
      });
      
      toast.success("URL shortened successfully!");
    } catch (error) {
      console.error("Shortening error:", error);
      setError(error.message || "Failed to shorten URL");
      toast.error(error.message || "Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecentLink = (linkId) => {
    setRecentLinks(prev => prev.filter(link => link.Id !== linkId));
  };

  const handleNewUrl = () => {
    setShortenedLink(null);
    setError(null);
  };

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading && shortCode) {
    return (
      <div className="min-h-screen bg-gray-50 pattern-background flex items-center justify-center">
        <UrlShorteningSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pattern-background">
      <div ref={topRef} className="container mx-auto px-4 py-8 max-w-6xl">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {error ? (
              <UrlShorteningError 
                error={error} 
                onRetry={() => setError(null)} 
              />
            ) : shortenedLink ? (
              <UrlResult 
                shortenedLink={shortenedLink} 
                onClose={handleNewUrl}
              />
            ) : (
              <>
                <UrlForm 
                  onSubmit={handleShortenUrl} 
                  loading={loading}
                />
                <EmptyUrlInput />
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <RecentLinks 
              links={recentLinks}
              onDeleteLink={handleDeleteRecentLink}
              onScrollToTop={scrollToTop}
            />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default HomePage;