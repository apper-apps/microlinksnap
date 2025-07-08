import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-16 pt-8 border-t border-gray-200"
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded flex items-center justify-center">
                <ApperIcon name="Zap" className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-semibold text-gray-900">LinkSnap</span>
            </div>
            <p className="text-sm text-gray-600">
              Fast, free URL shortening service with QR codes and permanent redirects.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Features</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <ApperIcon name="Check" className="w-4 h-4 text-green-500" />
                <span>Instant URL shortening</span>
              </li>
              <li className="flex items-center space-x-2">
                <ApperIcon name="Check" className="w-4 h-4 text-green-500" />
                <span>QR code generation</span>
              </li>
              <li className="flex items-center space-x-2">
                <ApperIcon name="Check" className="w-4 h-4 text-green-500" />
                <span>Click tracking</span>
              </li>
              <li className="flex items-center space-x-2">
                <ApperIcon name="Check" className="w-4 h-4 text-green-500" />
                <span>No registration required</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Technical</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <ApperIcon name="Shield" className="w-4 h-4 text-blue-500" />
                <span>HTTPS redirects</span>
              </li>
              <li className="flex items-center space-x-2">
                <ApperIcon name="Globe" className="w-4 h-4 text-blue-500" />
                <span>Global accessibility</span>
              </li>
              <li className="flex items-center space-x-2">
                <ApperIcon name="Database" className="w-4 h-4 text-blue-500" />
                <span>Local storage</span>
              </li>
              <li className="flex items-center space-x-2">
                <ApperIcon name="Smartphone" className="w-4 h-4 text-blue-500" />
                <span>Mobile optimized</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600">
              © 2024 LinkSnap. Built with React and modern web technologies.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Code" className="w-4 h-4" />
                <span>Open Source</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Heart" className="w-4 h-4 text-red-500" />
                <span>Made with care</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;