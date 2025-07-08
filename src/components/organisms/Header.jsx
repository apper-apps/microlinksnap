import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      <div className="flex items-center justify-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center electric-glow">
          <ApperIcon name="Zap" className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-4xl font-bold font-display gradient-text">
          LinkSnap
        </h1>
      </div>
      
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Transform long URLs into clean, shareable links instantly. No sign-up required, 
        permanent redirects, and QR codes included.
      </p>
      
      <div className="mt-6 flex items-center justify-center space-x-8">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>100% Free</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span>Instant Results</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
          <span>Never Expires</span>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;