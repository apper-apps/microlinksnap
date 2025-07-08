import React from "react";
import { motion } from "framer-motion";
import RecentLinkItem from "@/components/molecules/RecentLinkItem";
import { EmptyRecentLinks } from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";

const RecentLinks = ({ links, onDeleteLink, onScrollToTop }) => {
  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all recent links?")) {
      links.forEach(link => onDeleteLink(link.Id));
    }
  };

  if (!links || links.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-effect rounded-lg p-8 border shadow-lg"
      >
        <EmptyRecentLinks onCreateFirst={onScrollToTop} />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-effect rounded-lg p-6 border shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
          <ApperIcon name="Clock" className="w-5 h-5 text-primary-500" />
          <span>Recent Links</span>
          <span className="text-sm text-gray-500 font-normal">({links.length})</span>
        </h2>
        
        <button
          onClick={handleClearAll}
          className="text-sm text-gray-500 hover:text-red-500 transition-colors duration-200 flex items-center space-x-1"
        >
          <ApperIcon name="Trash2" className="w-4 h-4" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {links.map((link, index) => (
          <RecentLinkItem
            key={link.Id}
            link={link}
            onDelete={onDeleteLink}
            index={index}
          />
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Recent links are stored locally in your browser. Clear browser data to remove them.
        </p>
      </div>
    </motion.div>
  );
};

export default RecentLinks;