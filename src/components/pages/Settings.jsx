import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { cn } from "@/utils/cn";

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useLocalStorage("linksnap_settings", {
    showLinkPreview: true,
    defaultCustomAlias: "",
    bulkProcessingLimit: 100
  });

  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = () => {
    setSettings(localSettings);
    toast.success("Settings saved successfully!");
  };

  const handleReset = () => {
    const defaultSettings = {
      showLinkPreview: true,
      defaultCustomAlias: "",
      bulkProcessingLimit: 100
    };
    setLocalSettings(defaultSettings);
    setSettings(defaultSettings);
    toast.success("Settings reset to defaults!");
  };

  return (
    <div className="min-h-screen bg-gray-50 pattern-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="flex items-center space-x-2"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Link Preview Settings */}
          <Card className="p-6 glass-effect">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <ApperIcon name="Eye" className="w-5 h-5 text-primary-600" />
              <span>Link Preview</span>
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Show Link Preview</label>
                  <p className="text-xs text-gray-500">Display preview cards for shortened URLs</p>
                </div>
                <button
                  onClick={() => setLocalSettings(prev => ({ ...prev, showLinkPreview: !prev.showLinkPreview }))}
                  className={cn(
                    "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                    localSettings.showLinkPreview ? "bg-primary-600" : "bg-gray-200"
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                      localSettings.showLinkPreview ? "translate-x-5" : "translate-x-0"
                    )}
                  />
                </button>
              </div>
            </div>
          </Card>

          {/* Custom Alias Settings */}
          <Card className="p-6 glass-effect">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <ApperIcon name="Tag" className="w-5 h-5 text-primary-600" />
              <span>Custom Alias</span>
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="default-alias" className="block text-sm font-medium text-gray-700 mb-2">
                  Default Alias Prefix
                </label>
                <Input
                  id="default-alias"
                  value={localSettings.defaultCustomAlias}
                  onChange={(e) => setLocalSettings(prev => ({ 
                    ...prev, 
                    defaultCustomAlias: e.target.value.replace(/[^a-zA-Z0-9-_]/g, '')
                  }))}
                  placeholder="my-links"
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This will be prepended to auto-generated aliases
                </p>
              </div>
            </div>
          </Card>

          {/* Bulk Processing Settings */}
          <Card className="p-6 glass-effect">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <ApperIcon name="Layers" className="w-5 h-5 text-primary-600" />
              <span>Bulk Processing</span>
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="bulk-limit" className="block text-sm font-medium text-gray-700 mb-2">
                  Processing Limit
                </label>
                <Input
                  id="bulk-limit"
                  type="number"
                  min="10"
                  max="1000"
                  value={localSettings.bulkProcessingLimit}
                  onChange={(e) => setLocalSettings(prev => ({ 
                    ...prev, 
                    bulkProcessingLimit: parseInt(e.target.value) || 100
                  }))}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Maximum number of URLs to process at once
                </p>
              </div>
            </div>
          </Card>

          {/* Data Management */}
          <Card className="p-6 glass-effect">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <ApperIcon name="Database" className="w-5 h-5 text-primary-600" />
              <span>Data Management</span>
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Clear Recent Links</label>
                  <p className="text-xs text-gray-500">Remove all stored recent link history</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    localStorage.removeItem("linksnap_recent");
                    toast.success("Recent links cleared!");
                  }}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  Clear
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Export Data</label>
                  <p className="text-xs text-gray-500">Download your link data as JSON</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const data = {
                      settings: localSettings,
                      recentLinks: JSON.parse(localStorage.getItem("linksnap_recent") || "[]")
                    };
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "linksnap-data.json";
                    a.click();
                    URL.revokeObjectURL(url);
                    toast.success("Data exported!");
                  }}
                >
                  Export
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex items-center justify-center space-x-4 mt-8">
          <Button
            variant="primary"
            onClick={handleSave}
            className="flex items-center space-x-2"
          >
            <ApperIcon name="Save" className="w-4 h-4" />
            <span>Save Settings</span>
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex items-center space-x-2"
          >
            <ApperIcon name="RotateCcw" className="w-4 h-4" />
            <span>Reset to Defaults</span>
          </Button>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Settings;