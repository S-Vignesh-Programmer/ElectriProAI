import React from "react";
import {
  Zap,
  TrendingDown,
  Shield,
  Users,
  Calculator,
  ArrowRight,
  CheckCircle,
  BarChart3,
} from "lucide-react";

export default function Hero() {
  const handleGetStarted = () => {
    const element = document.querySelector("#unit");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    { icon: Calculator, text: "Real-time Bill Calculations" },
    { icon: BarChart3, text: "State-wise Rate Comparison" },
    { icon: TrendingDown, text: "Cost Optimization Tips" },
    { icon: Shield, text: "Secure & Accurate Data" },
  ];

  const stats = [
    { number: "50,000+", label: "Bills Calculated" },
    { number: "28", label: "States Covered" },
    { number: "30%", label: "Average Savings" },
    { number: "4.9/5", label: "User Rating" },
  ];

  return (
    <section
      className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden"
      id="home"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.05) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Trust Badge */}
            <div className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm border border-blue-100 mb-6">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">
                Trusted by 50,000+ Users
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Smart Electricity
              <span className="block text-blue-600">Bill Management</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Professional-grade electricity cost analysis with real-time rates,
              appliance calculations, solar ROI, and AI-powered energy
              optimization recommendations.
            </p>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-2xl mx-auto lg:mx-0">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-3 text-left"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {feature.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
              <button
                onClick={handleGetStarted}
                className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2"
              >
                <span>Calculate Your Bill</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No Registration Required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>100% Free to Use</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Real-time Data</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Visual Section */}
          <div className="relative">
            {/* Main Visual Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 relative z-10">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Live Calculator
                </h3>
                <p className="text-gray-600 text-sm">
                  See instant results as you input data
                </p>
              </div>

              {/* Mock Calculator Interface */}
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">
                    State:
                  </span>
                  <span className="text-sm font-bold text-blue-600">
                    Tamil Nadu
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">
                    Units:
                  </span>
                  <span className="text-sm font-bold text-blue-600">
                    250 kWh
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200">
                  <span className="text-sm font-medium text-gray-700">
                    Monthly Bill:
                  </span>
                  <span className="text-xl font-bold text-green-600">
                    ₹2,000
                  </span>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                Save 30%
              </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-br from-green-400/20 to-blue-500/20 rounded-full blur-xl"></div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 lg:mt-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm font-medium text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-600 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-200">
            <Users className="w-4 h-4 text-blue-500" />
            <span>
              Join thousands of users saving money on electricity bills
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
