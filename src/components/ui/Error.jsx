import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  title = "Something went wrong", 
  message = "An unexpected error occurred. Please try again.", 
  onRetry,
  className 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name="AlertTriangle" className="w-8 h-8 text-red-600" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      
      {onRetry && (
        <Button 
          variant="primary" 
          onClick={onRetry}
          className="flex items-center space-x-2"
        >
          <ApperIcon name="RotateCcw" className="w-4 h-4" />
          <span>Try Again</span>
        </Button>
      )}
    </div>
  );
};

export const UrlShorteningError = ({ error, onRetry }) => (
  <div className="w-full max-w-4xl mx-auto">
    <div className="bg-red-50 border border-red-200 rounded-lg p-8">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
          <ApperIcon name="AlertCircle" className="w-6 h-6 text-red-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-900 mb-1">URL Shortening Failed</h3>
          <p className="text-red-700">{error || "Unable to shorten the URL. Please check your internet connection and try again."}</p>
        </div>
        {onRetry && (
          <Button 
            variant="accent" 
            onClick={onRetry}
            className="flex items-center space-x-2"
          >
            <ApperIcon name="RotateCcw" className="w-4 h-4" />
            <span>Retry</span>
          </Button>
        )}
      </div>
    </div>
  </div>
);

export default Error;