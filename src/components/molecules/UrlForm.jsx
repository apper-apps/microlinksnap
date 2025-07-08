import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const UrlForm = ({ onSubmit, loading }) => {
  const [url, setUrl] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) {
      toast.error("Please enter a URL to shorten");
      return;
    }
    onSubmit(url.trim());
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      toast.success("URL pasted from clipboard");
    } catch (error) {
      toast.error("Failed to paste from clipboard");
    }
  };

  const isValidUrl = (url) => {
    const urlPattern = /^https?:\/\/[^\s]+$/;
    return urlPattern.test(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-effect rounded-lg p-8 border shadow-lg hover-lift"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="url-input" className="block text-sm font-medium text-gray-700">
            Enter URL to shorten
          </label>
          <div className="relative">
            <Input
              id="url-input"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="https://example.com/very-long-url-to-shorten"
              className={cn(
                "pr-12 text-lg py-4 url-input",
                focused && "ring-2 ring-primary-200",
                url && !isValidUrl(url) && "border-red-300 focus:border-red-500 focus:ring-red-200"
              )}
              disabled={loading}
            />
            <button
              type="button"
              onClick={handlePaste}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-500 transition-colors duration-200"
              disabled={loading}
            >
              <ApperIcon name="Clipboard" className="w-5 h-5" />
            </button>
          </div>
          {url && !isValidUrl(url) && (
            <p className="text-sm text-red-600 flex items-center space-x-1">
              <ApperIcon name="AlertCircle" className="w-4 h-4" />
              <span>Please enter a valid URL starting with http:// or https://</span>
            </p>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full button-electric font-semibold py-4"
          disabled={loading || !url.trim() || !isValidUrl(url)}
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="loader-spinner" />
              <span>Shortening...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <ApperIcon name="Zap" className="w-5 h-5" />
              <span>Shorten URL</span>
            </div>
          )}
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <ApperIcon name="Shield" className="w-4 h-4 text-green-500" />
            <span>Secure & Private</span>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="Clock" className="w-4 h-4 text-blue-500" />
            <span>Never Expires</span>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="UserX" className="w-4 h-4 text-purple-500" />
            <span>No Registration</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UrlForm;