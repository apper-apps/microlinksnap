import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { urlService } from "@/services/api/urlService";
import { cn } from "@/utils/cn";

const LinkPreview = ({ url, className }) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        setLoading(true);
        setError(false);
        const previewData = await urlService.getLinkPreview(url);
        setPreview(previewData);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchPreview();
    }
  }, [url]);

  if (loading) {
    return (
      <div className={cn("bg-gray-50 rounded-lg p-4 space-y-3", className)}>
        <div className="flex items-center space-x-3">
          <div className="w-16 h-16 bg-gray-200 rounded animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !preview) {
    return (
      <div className={cn("bg-gray-50 rounded-lg p-4", className)}>
        <div className="flex items-center space-x-3 text-gray-500">
          <ApperIcon name="AlertCircle" className="w-5 h-5" />
          <span className="text-sm">Unable to load preview</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4", className)}
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img
            src={preview.image}
            alt={preview.title}
            className="w-16 h-16 rounded-lg object-cover border border-gray-200"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/64x64/0066FF/FFFFFF?text=${preview.domain.charAt(0).toUpperCase()}`;
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 truncate">{preview.title}</h4>
          <p className="text-sm text-gray-600 line-clamp-2">{preview.description}</p>
          <div className="flex items-center space-x-2 mt-2">
            <ApperIcon name="Globe" className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-500">{preview.domain}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LinkPreview;