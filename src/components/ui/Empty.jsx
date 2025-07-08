import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No data found", 
  message = "There's nothing to show here yet.", 
  action,
  className 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name="Inbox" className="w-8 h-8 text-gray-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      
      {action && action}
    </div>
  );
};

export const EmptyRecentLinks = ({ onCreateFirst }) => (
  <div className="text-center py-12">
    <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <ApperIcon name="Link" className="w-10 h-10 text-primary-600" />
    </div>
    
    <h3 className="text-lg font-semibold text-gray-900 mb-2">No recent links</h3>
    <p className="text-gray-600 mb-6 max-w-sm mx-auto">
      Start shortening URLs to see your recent links appear here. They'll be saved locally for quick access.
    </p>
    
    {onCreateFirst && (
      <Button 
        variant="outline" 
        onClick={onCreateFirst}
        className="flex items-center space-x-2 mx-auto"
      >
        <ApperIcon name="Plus" className="w-4 h-4" />
        <span>Create Your First Link</span>
      </Button>
    )}
  </div>
);

export const EmptyUrlInput = () => (
  <div className="text-center py-16">
    <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-8">
      <ApperIcon name="Zap" className="w-12 h-12 text-primary-600" />
    </div>
    
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to shorten your first URL?</h2>
    <p className="text-gray-600 max-w-md mx-auto mb-8">
      Paste any long URL above and get a clean, short link that's perfect for sharing. 
      No registration required - just instant results.
    </p>
    
    <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
      <div className="flex items-center space-x-2">
        <ApperIcon name="Zap" className="w-4 h-4 text-primary-500" />
        <span>Instant shortening</span>
      </div>
      <div className="flex items-center space-x-2">
        <ApperIcon name="QrCode" className="w-4 h-4 text-secondary-500" />
        <span>QR codes included</span>
      </div>
      <div className="flex items-center space-x-2">
        <ApperIcon name="Clock" className="w-4 h-4 text-accent-500" />
        <span>Never expires</span>
      </div>
    </div>
  </div>
);

export default Empty;