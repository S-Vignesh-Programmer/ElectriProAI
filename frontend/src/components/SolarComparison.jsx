import React, { useState } from "react";
import {
  Sun,
  Zap,
  Calculator,
  TrendingDown,
  PiggyBank,
  Leaf,
  BarChart3,
  Info,
} from "lucide-react";

export default function SolarComparison() {
  const [units, setUnits] = useState("");
  const [result, setResult] = useState(null);
  const [rooftopArea, setRooftopArea] = useState("");
  const [showROI, setShowROI] = useState(false);

  const handleCompare = () => {
    if (!units || units <= 0) return;

    const normalCost = units * 7; // ₹7 per unit
    const solarCost = units * 2; // ₹2 per unit
    const savings = normalCost - solarCost;

    setResult({
      normalCost: normalCost.toFixed(2),
      solarCost: solarCost.toFixed(2),
      savings: savings.toFixed(2),
    });
  };

  const calculateYearlySavings = () => {
    if (!result) return 0;
    return (parseFloat(result.savings) * 12).toFixed(2);
  };

  const calculate25YearSavings = () => {
    if (!result) return 0;
    return (parseFloat(result.savings) * 12 * 25).toFixed(2);
  };

  const calculateSystemSize = () => {
    if (!units) return 0;
    // Assuming 4.5 units per kW per day on average
    return (units / (4.5 * 30)).toFixed(1);
  };

  const calculateInstallationCost = () => {
    const systemSize = calculateSystemSize();
    // Assuming ₹50,000 per kW installed
    return (systemSize * 50000).toFixed(0);
  };

  const calculatePaybackPeriod = () => {
    if (!result) return 0;
    const installationCost = calculateInstallationCost();
    const yearlySavings = calculateYearlySavings();
    if (yearlySavings > 0) {
      return (installationCost / yearlySavings).toFixed(1);
    }
    return 0;
  };

  const calculateCO2Savings = () => {
    if (!units) return 0;
    // 1 kWh = ~0.82 kg CO2 savings
    return (units * 0.82 * 12).toFixed(0);
  };

  const getUsageCategory = () => {
    if (!units) return "";
    const monthly = parseFloat(units);
    if (monthly < 200) return "Low Usage";
    if (monthly < 400) return "Medium Usage";
    if (monthly < 800) return "High Usage";
    return "Very High Usage";
  };

  const getUsageColor = () => {
    if (!units) return "text-gray-500";
    const monthly = parseFloat(units);
    if (monthly < 200) return "text-green-600";
    if (monthly < 400) return "text-yellow-600";
    if (monthly < 800) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <section
      id="solar"
      className="py-8 md:py-12 bg-gradient-to-br from-yellow-50 to-orange-50 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full mb-4">
            <Sun className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold mb-2 text-gray-800">
            Solar vs Grid Electricity
          </h3>
          <p className="text-gray-600">
            Compare costs and discover your potential savings with solar power
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Calculator Card */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
              <div className="flex items-center mb-4">
                <Calculator className="w-5 h-5 text-orange-500 mr-2" />
                <h4 className="text-xl font-semibold text-gray-800">
                  Cost Comparison Calculator
                </h4>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Zap className="w-4 h-4 inline mr-1" />
                    Monthly Electricity Usage (kWh)
                  </label>
                  <input
                    type="number"
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                    placeholder="e.g., 300"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                  />
                  {units && (
                    <div className={`text-sm mt-1 ${getUsageColor()}`}>
                      {getUsageCategory()} • ₹{(units * 7).toFixed(0)}/month at
                      grid rates
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Rooftop Area (sq ft) - Optional
                  </label>
                  <input
                    type="number"
                    value={rooftopArea}
                    onChange={(e) => setRooftopArea(e.target.value)}
                    placeholder="e.g., 500"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                  />
                  {rooftopArea && (
                    <div className="text-sm text-gray-600 mt-1">
                      Can install ~{(rooftopArea / 100).toFixed(1)} kW system
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleCompare}
                  disabled={!units || units <= 0}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-4 px-6 rounded-xl hover:from-yellow-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-lg"
                >
                  Compare Costs
                </button>

                <button
                  onClick={() => setShowROI(!showROI)}
                  className="px-4 py-4 border-2 border-orange-300 text-orange-600 rounded-xl hover:bg-orange-50 transition-colors"
                  title="Toggle ROI Details"
                >
                  <BarChart3 className="w-5 h-5" />
                </button>
              </div>

              {/* Results */}
              {result && (
                <div className="space-y-6">
                  {/* Cost Comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-6 bg-red-50 rounded-xl border border-red-200">
                      <Zap className="w-8 h-8 text-red-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-red-600">
                        ₹{result.normalCost}
                      </div>
                      <div className="text-sm text-red-700">
                        Grid Electricity
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        ₹7 per kWh
                      </div>
                    </div>

                    <div className="text-center p-6 bg-yellow-50 rounded-xl border border-yellow-200">
                      <Sun className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-yellow-600">
                        ₹{result.solarCost}
                      </div>
                      <div className="text-sm text-yellow-700">Solar Power</div>
                      <div className="text-xs text-gray-600 mt-1">
                        ₹2 per kWh
                      </div>
                    </div>

                    <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
                      <PiggyBank className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">
                        ₹{result.savings}
                      </div>
                      <div className="text-sm text-green-700">
                        Monthly Savings
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {(
                          (parseFloat(result.savings) /
                            parseFloat(result.normalCost)) *
                          100
                        ).toFixed(0)}
                        % savings
                      </div>
                    </div>
                  </div>

                  {/* Extended Savings */}
                  <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                    <h5 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <TrendingDown className="w-5 h-5 text-green-500 mr-2" />
                      Long-term Savings Projection
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-blue-600">
                          ₹{calculateYearlySavings()}
                        </div>
                        <div className="text-sm text-gray-600">
                          Yearly Savings
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-purple-600">
                          ₹{calculate25YearSavings()}
                        </div>
                        <div className="text-sm text-gray-600">
                          25-Year Savings
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-green-600">
                          {calculateCO2Savings()} kg
                        </div>
                        <div className="text-sm text-gray-600">
                          CO₂ Saved/Year
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ROI Section */}
                  {showROI && (
                    <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                      <h5 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <BarChart3 className="w-5 h-5 text-blue-500 mr-2" />
                        Return on Investment Analysis
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-orange-600">
                            {calculateSystemSize()} kW
                          </div>
                          <div className="text-sm text-gray-600">
                            Required System
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-red-600">
                            ₹
                            {Number(
                              calculateInstallationCost()
                            ).toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">
                            Installation Cost
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">
                            {calculatePaybackPeriod()} years
                          </div>
                          <div className="text-sm text-gray-600">
                            Payback Period
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">
                            {((1 / calculatePaybackPeriod()) * 100).toFixed(1)}%
                          </div>
                          <div className="text-sm text-gray-600">
                            Annual ROI
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Environmental Impact */}
                  <div className="p-4 bg-green-100 rounded-lg">
                    <div className="flex items-start">
                      <Leaf className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div className="text-sm text-green-700">
                        <strong>Environmental Impact:</strong> By switching to
                        solar, you'll prevent {calculateCO2Savings()} kg of CO₂
                        emissions annually - equivalent to planting{" "}
                        {Math.round(calculateCO2Savings() / 21)} trees per year!
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Info Panel */}
          <div className="xl:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Why Choose Solar?
              </h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <PiggyBank className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Save Money</div>
                    <div className="text-sm text-gray-600">
                      Up to 70% reduction in electricity bills
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <Leaf className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">
                      Eco-Friendly
                    </div>
                    <div className="text-sm text-gray-600">
                      Reduce carbon footprint significantly
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <TrendingDown className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">
                      Long-term Investment
                    </div>
                    <div className="text-sm text-gray-600">
                      25+ year system lifespan
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Current Electricity Rates
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Grid Electricity</span>
                  <span className="font-medium">₹7 per kWh</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Solar Power</span>
                  <span className="font-medium text-green-600">₹2 per kWh</span>
                </div>
                <div className="flex justify-between items-center border-t pt-2">
                  <span className="text-gray-600 font-medium">You Save</span>
                  <span className="font-bold text-green-600">₹5 per kWh</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-start">
                  <Info className="w-4 h-4 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div className="text-sm text-yellow-700">
                    Prices include maintenance, net metering benefits, and
                    government subsidies.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Government Benefits
              </h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Up to 40% subsidy on installation</li>
                <li>• Net metering - sell excess power</li>
                <li>• Tax benefits under Section 80C</li>
                <li>• Accelerated depreciation for businesses</li>
                <li>• No GST on residential systems</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
