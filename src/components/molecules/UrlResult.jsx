import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { useClipboard } from "@/hooks/useClipboard";
import { cn } from "@/utils/cn";

const UrlResult = ({ shortenedLink, onClose }) => {
  const { copied, copyToClipboard } = useClipboard();
  const [showQR, setShowQR] = useState(false);
  const shortUrl = `${window.location.origin}/${shortenedLink.shortCode}`;

  useEffect(() => {
    // Generate QR code display after component mounts
    const timer = setTimeout(() => setShowQR(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = () => {
    copyToClipboard(shortUrl);
  };

  const handleOriginalCopy = () => {
    copyToClipboard(shortenedLink.originalUrl);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="glass-effect rounded-lg p-8 border shadow-lg space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <ApperIcon name="CheckCircle" className="w-5 h-5 text-green-500" />
          <span>URL Shortened Successfully!</span>
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <ApperIcon name="X" className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Your shortened URL
          </label>
          <div className="flex items-center space-x-3">
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-3 font-mono text-primary-600 break-all">
              {shortUrl}
            </div>
            <Button
              variant="accent"
              size="md"
              onClick={handleCopy}
              className={cn(
                "copy-button flex items-center space-x-2 min-w-[100px]",
                copied && "copied success-checkmark"
              )}
            >
              <ApperIcon 
                name={copied ? "Check" : "Copy"} 
                className={cn("w-4 h-4", copied && "text-white")} 
              />
              <span>{copied ? "Copied!" : "Copy"}</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <ApperIcon name="MousePointer" className="w-4 h-4" />
              <span>Clicks: </span>
              <Badge variant="primary" size="sm">{shortenedLink.clickCount}</Badge>
            </div>
            <div className="flex items-center space-x-1">
              <ApperIcon name="Calendar" className="w-4 h-4" />
              <span>Created: {new Date(shortenedLink.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900">Original URL</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleOriginalCopy}
            className="text-gray-500 hover:text-gray-700"
          >
            <ApperIcon name="Copy" className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-gray-600 break-all font-mono bg-white p-2 rounded border">
          {shortenedLink.originalUrl}
        </p>
      </div>

      {showQR && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center space-x-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4"
        >
          <div className="qr-container">
            <img
              src={shortenedLink.qrCode}
              alt="QR Code"
              className="w-20 h-20"
            />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 mb-1">QR Code</h4>
            <p className="text-sm text-gray-600">
              Scan this QR code to quickly access your shortened URL on mobile devices.
            </p>
          </div>
        </motion.div>
      )}

      <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-200">
        <Button
          variant="outline"
          onClick={onClose}
          className="flex items-center space-x-2"
        >
          <ApperIcon name="Plus" className="w-4 h-4" />
          <span>Shorten Another</span>
        </Button>
        <Button
          variant="ghost"
          onClick={() => window.open(shortUrl, "_blank")}
          className="flex items-center space-x-2"
        >
          <ApperIcon name="ExternalLink" className="w-4 h-4" />
          <span>Test Link</span>
        </Button>
      </div>
    </motion.div>
  );
};

export default UrlResult;