import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { useClipboard } from "@/hooks/useClipboard";
import { cn } from "@/utils/cn";

const BulkResults = ({ results, onClose }) => {
  const { copyToClipboard } = useClipboard();
  const [showFailed, setShowFailed] = useState(false);

  const handleCopyAll = () => {
    const allLinks = results.successful.map(link => 
      `${window.location.origin}/${link.shortCode}`
    ).join('\n');
    copyToClipboard(allLinks);
    toast.success("All links copied to clipboard!");
  };

  const handleCopyLink = (shortCode) => {
    const shortUrl = `${window.location.origin}/${shortCode}`;
    copyToClipboard(shortUrl);
    toast.success("Link copied!");
  };

  const handleExportCSV = () => {
    const csvContent = [
      "Original URL,Short URL,Short Code,Created At,Clicks",
      ...results.successful.map(link => 
        `"${link.originalUrl}","${window.location.origin}/${link.shortCode}","${link.shortCode}","${link.createdAt}","${link.clickCount}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bulk-shortened-links.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported!");
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
          <ApperIcon name="Layers" className="w-5 h-5 text-primary-500" />
          <span>Bulk Processing Results</span>
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

      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Badge variant="success">{results.successful.length}</Badge>
            <span className="text-sm text-gray-600">Successful</span>
          </div>
          {results.failed.length > 0 && (
            <div className="flex items-center space-x-2">
              <Badge variant="error">{results.failed.length}</Badge>
              <span className="text-sm text-gray-600">Failed</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyAll}
            className="flex items-center space-x-2"
          >
            <ApperIcon name="Copy" className="w-4 h-4" />
            <span>Copy All</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            className="flex items-center space-x-2"
          >
            <ApperIcon name="Download" className="w-4 h-4" />
            <span>Export CSV</span>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900">Successful Links</h4>
          <span className="text-sm text-gray-500">{results.successful.length} items</span>
        </div>
        
        <div className="max-h-64 overflow-y-auto space-y-2">
          {results.successful.map((link, index) => (
            <Card key={link.Id || index} className="p-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary-600 truncate">
                    {window.location.origin}/{link.shortCode}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{link.originalUrl}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Badge variant="primary" size="sm">{link.clickCount}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopyLink(link.shortCode)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <ApperIcon name="Copy" className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {results.failed.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900 flex items-center space-x-2">
              <span>Failed URLs</span>
              <Badge variant="error" size="sm">{results.failed.length}</Badge>
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFailed(!showFailed)}
              className="flex items-center space-x-2"
            >
              <ApperIcon name={showFailed ? "ChevronUp" : "ChevronDown"} className="w-4 h-4" />
              <span>{showFailed ? "Hide" : "Show"}</span>
            </Button>
          </div>
          
          {showFailed && (
            <div className="max-h-48 overflow-y-auto space-y-2">
              {results.failed.map((failure, index) => (
                <Card key={index} className="p-3 bg-red-50 border-red-200">
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="AlertCircle" className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-red-800 truncate">{failure.url}</p>
                      <p className="text-xs text-red-600">{failure.error}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-200">
        <Button
          variant="outline"
          onClick={onClose}
          className="flex items-center space-x-2"
        >
          <ApperIcon name="Plus" className="w-4 h-4" />
          <span>Process More URLs</span>
        </Button>
      </div>
    </motion.div>
  );
};

export default BulkResults;