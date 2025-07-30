import React from "react";
import {
  Zap,
  Mail,
  Phone,
  MapPin,
  Shield,
  Users,
  TrendingUp,
  Calculator,
  Home,
  Sun,
  Car,
  MessageCircle,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { icon: Calculator, label: "Bill Calculator", href: "#unit" },
    { icon: Home, label: "Appliances", href: "#appliance" },
    { icon: Sun, label: "Solar Analysis", href: "#solar" },
    { icon: Car, label: "EV Calculator", href: "#ev" },
    { icon: MessageCircle, label: "Expert Chat", href: "#chat" },
  ];

  const companyLinks = [
    { label: "About Us", href: "#about" },
    { label: "How It Works", href: "#how" },
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
    { label: "Contact", href: "#contact" },
  ];

  const features = [
    { icon: Shield, label: "Secure & Trusted" },
    { icon: Users, label: "50,000+ Users" },
    { icon: TrendingUp, label: "30% Average Savings" },
  ];

  const handleLinkClick = (href) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">ElectriProAI</h3>
                <p className="text-sm text-gray-400">Energy Solutions</p>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Professional electricity bill management platform helping users
              optimize energy costs with real-time calculations and expert
              insights.
            </p>

            {/* Trust Indicators */}
            <div className="space-y-3">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                      <IconComponent className="w-3 h-3 text-green-400" />
                    </div>
                    <span className="text-sm text-gray-300">
                      {feature.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          {/* <div>
            <h4 className="text-lg font-semibold mb-6">Platform Features</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <li key={index}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="group flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      <IconComponent className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors" />
                      <span className="text-sm">{link.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div> */}

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 ps-0 xl:ps-28">Company</h4>
            <ul className="space-y-3 ps-0 sm:ps-4 xl:ps-28">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center space-x-2 group"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className=" ps-0 xl:ps-36">
            <h4 className="text-lg font-semibold mb-6">Get in Touch</h4>

            {/* Contact Info */}
            <div className="space-y-4 mb-10">
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm">support@electripro.com</p>
                  <p className="text-xs text-gray-500">24/7 Support</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm">Chennai, Tamil Nadu</p>
                  <p className="text-xs text-gray-500">India</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm font-medium text-gray-300 mb-3">
                Follow Us
              </p>
              <div className="flex space-x-3">
                {[
                  { icon: Github, href: "#", label: "GitHub" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                ].map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="w-9 h-9 bg-gray-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200 group"
                      title={social.label}
                    >
                      <IconComponent className="w-4 h-4 text-gray-300 group-hover:text-white" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400">
                © {currentYear} ElectriProAI. All rights reserved.
              </p>
              
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-6 text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>System Online</span>
              </div>
              <div>Last Updated: Today</div>
              <div>Version 2.1.0</div>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <button
                onClick={() => handleLinkClick("#privacy")}
                className="hover:text-gray-300 transition-colors"
              >
                Privacy
              </button>
              <span>•</span>
              <button
                onClick={() => handleLinkClick("#terms")}
                className="hover:text-gray-300 transition-colors"
              >
                Terms
              </button>
              <span>•</span>
              <button
                onClick={() => handleLinkClick("#cookies")}
                className="hover:text-gray-300 transition-colors"
              >
                Cookies
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-40 group"
        title="Back to Top"
      >
        <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>
    </footer>
  );
}
