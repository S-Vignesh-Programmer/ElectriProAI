import React, { useState } from "react";
import {
  Zap,
  Calculator,
  Home,
  Sun,
  Car,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  Shield,
} from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      href: "#unit",
      label: "Bill Calculator",
      icon: Calculator,
      description: "Calculate electricity costs",
    },
    {
      href: "#appliance",
      label: "Home Appliances",
      icon: Home,
      description: "Power consumption analysis",
    },
    {
      href: "#solar",
      label: "Solar Analysis",
      icon: Sun,
      description: "Solar ROI calculator",
    },
    {
      href: "#ev",
      label: "EV Calculator",
      icon: Car,
      description: "Electric vehicle costs",
    },
    {
      href: "#chat",
      label: "Expert Chat",
      icon: MessageCircle,
      description: "Professional consultation",
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (href) => {
    setIsMobileMenuOpen(false);
    // Update the URL hash to trigger section change
    window.location.hash = href;
  };

  return (
    <>
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Professional Logo Section - Make it clickable to go home */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleNavClick("#home")}
                  className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm">
                    <Zap className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight">
                      ElectriProAI
                    </h1>
                    <p className="text-xs text-gray-600 hidden sm:block font-medium">
                      Energy Management Solutions
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="group relative px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2 border border-transparent hover:border-gray-200"
                  >
                    <IconComponent className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                      {item.label}
                    </span>

                    {/* Professional Tooltip */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                      {item.description}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                    </div>
                  </button>
                );
              })}
            </nav>

            {/* Desktop CTA Section */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  Trusted Platform
                </span>
              </div>
              <button
                onClick={() => handleNavClick("#unit")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md border border-blue-600"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden relative z-50 w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center border border-gray-300"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/20"
            onClick={toggleMobileMenu}
          ></div>
        )}

        {/* Professional Mobile Menu */}
        <div
          className={`lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white transform transition-transform duration-300 ease-in-out z-50 shadow-2xl ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 pt-20 h-full overflow-y-auto">
            {/* Mobile Header */}
            <div className="flex items-center space-x-3 mb-8 pb-6 border-b border-gray-200">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">ElectriProAI</h2>
                <p className="text-sm text-gray-600">Professional Platform</p>
              </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-2 mb-8">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="w-full flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-all duration-200 group text-left border border-transparent hover:border-gray-200"
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-all">
                      <IconComponent className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-900 font-semibold text-sm">
                        {item.label}
                      </div>
                      <div className="text-gray-500 text-xs mt-0.5">
                        {item.description}
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
                  </button>
                );
              })}
            </nav>

            {/* Mobile CTA Section */}
            <div className="space-y-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => handleNavClick("#unit")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 shadow-sm"
              >
                Start Analysis
              </button>

              <div className="flex items-center justify-center space-x-5 p-3 bg-green-50 rounded-lg border border-green-200">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  Secure & Trusted
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
