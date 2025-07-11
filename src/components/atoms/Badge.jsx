import React from "react";
import { cn } from "@/utils/cn";

const Badge = React.forwardRef(({ 
  children, 
  className, 
  variant = "default", 
  size = "sm",
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-150 ease-out";
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary-500 to-primary-600 text-white",
    secondary: "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white",
    accent: "bg-gradient-to-r from-accent-500 to-accent-600 text-white",
    success: "bg-gradient-to-r from-green-500 to-green-600 text-white",
    warning: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white",
    error: "bg-gradient-to-r from-red-500 to-red-600 text-white"
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base"
  };

  return (
    <span
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;