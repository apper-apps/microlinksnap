import React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef(({ 
  className, 
  type = "text", 
  placeholder,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-4 py-3 text-base border-2 border-gray-200 rounded transition-all duration-200 ease-out focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      className={cn(baseStyles, className)}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;