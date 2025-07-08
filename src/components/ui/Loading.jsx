import React from "react";
import { cn } from "@/utils/cn";

const Loading = ({ className, size = "md", text = "Loading..." }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  };

  return (
    <div className={cn("flex items-center justify-center space-x-2", className)}>
      <div className={cn(
        "border-2 border-primary-100 border-t-primary-500 rounded-full animate-spin",
        sizes[size]
      )} />
      {text && (
        <span className="text-gray-600 font-medium">{text}</span>
      )}
    </div>
  );
};

export const UrlShorteningSkeleton = () => (
  <div className="w-full max-w-4xl mx-auto space-y-8">
    {/* Header Skeleton */}
    <div className="text-center space-y-4">
      <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse mx-auto w-80" />
      <div className="h-6 bg-gray-200 rounded animate-pulse mx-auto w-96" />
    </div>

    {/* URL Input Skeleton */}
    <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-4">
      <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
      <div className="h-14 bg-gray-200 rounded animate-pulse w-full" />
      <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-32" />
    </div>

    {/* Result Skeleton */}
    <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-6">
      <div className="h-6 bg-gray-200 rounded animate-pulse w-32" />
      <div className="flex items-center space-x-4">
        <div className="h-12 bg-gray-200 rounded animate-pulse flex-1" />
        <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-24" />
      </div>
      <div className="flex items-center space-x-6">
        <div className="w-20 h-20 bg-gray-200 rounded animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
        </div>
      </div>
    </div>

    {/* Recent Links Skeleton */}
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
      <div className="h-6 bg-gray-200 rounded animate-pulse w-32" />
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-64" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-48" />
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse w-12" />
              <div className="h-8 bg-gray-200 rounded animate-pulse w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Loading;