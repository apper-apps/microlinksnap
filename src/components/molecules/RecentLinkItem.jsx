import React from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { useClipboard } from "@/hooks/useClipboard";
import { cn } from "@/utils/cn";

const RecentLinkItem = ({ link, onDelete, index }) => {
  const { copied, copyToClipboard } = useClipboard();
  const shortUrl = `${window.location.origin}/${link.shortCode}`;

  const handleCopy = () => {
    copyToClipboard(shortUrl);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(link.Id);
      toast.success("Link removed from recent history");
    }
  };

  const handleVisit = () => {
    window.open(shortUrl, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="recent-link-item bg-white border border-gray-200 rounded-lg p-4 group"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate font-mono">
                {shortUrl}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {link.originalUrl}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <ApperIcon name="Calendar" className="w-3 h-3" />
              <span>{new Date(link.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ApperIcon name="Clock" className="w-3 h-3" />
              <span>{new Date(link.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          <Badge variant="secondary" size="sm" className="click-counter">
            {link.clickCount} clicks
          </Badge>
          
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleVisit}
              className="text-gray-400 hover:text-primary-500"
              title="Visit link"
            >
              <ApperIcon name="ExternalLink" className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className={cn(
                "text-gray-400 hover:text-accent-500 transition-colors duration-200",
                copied && "text-green-500"
              )}
              title="Copy link"
            >
              <ApperIcon name={copied ? "Check" : "Copy"} className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="text-gray-400 hover:text-red-500"
              title="Remove from history"
            >
              <ApperIcon name="Trash2" className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecentLinkItem;