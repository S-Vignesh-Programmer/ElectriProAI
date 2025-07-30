import React, { useState } from "react";
import {
  Zap,
  MapPin,
  Calculator,
  TrendingUp,
  AlertCircle,
  Info,
  BarChart3,
  Calendar,
} from "lucide-react";

const stateRates = {
  "Tamil Nadu": 8.0,
  Delhi: 6.5,
  Maharashtra: 7.2,
  Kerala: 6.8,
  Karnataka: 7.0,
  "Andhra Pradesh": 7.5,
  Telangana: 7.3,
  Gujarat: 6.9,
  Rajasthan: 7.8,
  "West Bengal": 7.1,
  "Uttar Pradesh": 6.2,
  Punjab: 7.6,
  Haryana: 7.4,
  "Madhya Pradesh": 6.8,
  Odisha: 6.5,
  Jharkhand: 6.9,
  Bihar: 6.3,
  Assam: 6.7,
  Goa: 8.2,
  "Himachal Pradesh": 5.8,
};

export default function UnitPredictor() {
  const [units, setUnits] = useState("");
  const [state, setState] = useState("Tamil Nadu");
  const [bill, setBill] = useState(null);
  const [showComparison, setShowComparison] = useState(false);

  const handleCalculate = () => {
    if (!units || units <= 0) return;
    const rate = stateRates[state];
    const total = parseFloat(units) * rate;
    setBill(total.toFixed(2));
  };

  const getUsageCategory = () => {
    if (!units)
      return { category: "", color: "text-gray-500", description: "" };
    const monthly = parseFloat(units);

    if (monthly <= 100)
      return {
        category: "Low Usage",
        color: "text-green-600",
        description: "Energy efficient household",
      };
    if (monthly <= 300)
      return {
        category: "Average Usage",
        color: "text-blue-600",
        description: "Typical family consumption",
      };
    if (monthly <= 500)
      return {
        category: "High Usage",
        color: "text-yellow-600",
        description: "Above average consumption",
      };
    return {
      category: "Very High Usage",
      color: "text-red-600",
      description: "Consider energy efficiency measures",
    };
  };

  const calculateYearlyBill = () => {
    if (!bill) return 0;
    return (parseFloat(bill) * 12).toFixed(2);
  };

  const getStateComparison = () => {
    if (!units) return [];
    const currentUnits = parseFloat(units);
    return Object.entries(stateRates)
      .map(([stateName, rate]) => ({
        state: stateName,
        rate,
        bill: (currentUnits * rate).toFixed(2),
        difference: (
          currentUnits * rate -
          currentUnits * stateRates[state]
        ).toFixed(2),
      }))
      .sort((a, b) => parseFloat(a.bill) - parseFloat(b.bill));
  };

  const getCheapestAndExpensive = () => {
    const comparison = getStateComparison();
    if (comparison.length === 0) return { cheapest: null, expensive: null };
    return {
      cheapest: comparison[0],
      expensive: comparison[comparison.length - 1],
    };
  };

  const getSlabStructure = () => {
    // Simplified slab structure - this would vary by state in reality
    return [
      { range: "0-100 kWh", rate: "₹3-5", description: "Subsidized rate" },
      { range: "101-200 kWh", rate: "₹5-7", description: "Normal rate" },
      { range: "201-400 kWh", rate: "₹7-9", description: "Higher rate" },
      { range: "400+ kWh", rate: "₹9-12", description: "Premium rate" },
    ];
  };

  const usage = getUsageCategory();
  const { cheapest, expensive } = getCheapestAndExpensive();

  return (
    <section
      id="unit"
      className="py-8 md:py-12 bg-gradient-to-br from-purple-50 to-blue-50 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mb-4">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold mb-2 text-gray-800">
            Electricity Bill Predictor
          </h3>
          <p className="text-gray-600">
            Calculate your electricity bill across different Indian states
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Calculator Card */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
              <div className="flex items-center mb-4">
                <Zap className="w-5 h-5 text-blue-500 mr-2" />
                <h4 className="text-xl font-semibold text-gray-800">
                  Bill Calculator
                </h4>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Select Your State
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    {Object.keys(stateRates).map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <div className="text-sm text-gray-600 mt-1">
                    Current rate: ₹{stateRates[state]} per kWh
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Zap className="w-4 h-4 inline mr-1" />
                    Monthly Units Used (kWh)
                  </label>
                  <input
                    type="number"
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                    placeholder="e.g., 250"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                  {units && (
                    <div className={`text-sm mt-1 ${usage.color}`}>
                      {usage.category} • {usage.description}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleCalculate}
                  disabled={!units || units <= 0}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 text-white py-4 px-6 rounded-xl hover:from-purple-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-lg"
                >
                  Calculate Bill
                </button>

                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className="px-4 py-4 border-2 border-blue-300 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors"
                  title="Compare Across States"
                >
                  <BarChart3 className="w-5 h-5" />
                </button>
              </div>

              {/* Results */}
              {bill && (
                <div className="space-y-6">
                  {/* Main Bill Result */}
                  <div className="text-center p-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      ₹{bill}
                    </div>
                    <div className="text-lg text-gray-700 mb-1">
                      Monthly Bill in {state}
                    </div>
                    <div className="text-sm text-gray-600">
                      {units} kWh × ₹{stateRates[state]} per kWh
                    </div>
                  </div>

                  {/* Extended Calculations */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <Calendar className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                      <div className="text-xl font-bold text-blue-600">
                        ₹{calculateYearlyBill()}
                      </div>
                      <div className="text-sm text-blue-700">Yearly Bill</div>
                    </div>

                    <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                      <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
                      <div className="text-xl font-bold text-green-600">
                        ₹{(parseFloat(bill) / parseFloat(units)).toFixed(2)}
                      </div>
                      <div className="text-sm text-green-700">Cost per kWh</div>
                    </div>

                    <div className="text-center p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                      <Zap className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                      <div className="text-xl font-bold text-yellow-600">
                        ₹{(parseFloat(bill) / 30).toFixed(2)}
                      </div>
                      <div className="text-sm text-yellow-700">
                        Daily Average
                      </div>
                    </div>
                  </div>

                  {/* State Comparison */}
                  {showComparison && cheapest && expensive && (
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <h5 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <BarChart3 className="w-5 h-5 text-blue-500 mr-2" />
                        State-wise Comparison
                      </h5>
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-center flex-1">
                          <div className="text-lg font-bold text-green-600">
                            ₹{cheapest.bill}
                          </div>
                          <div className="text-sm text-gray-600">
                            Cheapest: {cheapest.state}
                          </div>
                          <div className="text-xs text-green-600">
                            ₹{cheapest.rate}/kWh
                          </div>
                        </div>
                        <div className="text-center flex-1">
                          <div className="text-lg font-bold text-purple-600">
                            ₹{bill}
                          </div>
                          <div className="text-sm text-gray-600">
                            Your State: {state}
                          </div>
                          <div className="text-xs text-purple-600">
                            ₹{stateRates[state]}/kWh
                          </div>
                        </div>
                        <div className="text-center flex-1">
                          <div className="text-lg font-bold text-red-600">
                            ₹{expensive.bill}
                          </div>
                          <div className="text-sm text-gray-600">
                            Expensive: {expensive.state}
                          </div>
                          <div className="text-xs text-red-600">
                            ₹{expensive.rate}/kWh
                          </div>
                        </div>
                      </div>

                      {parseFloat(bill) !== parseFloat(cheapest.bill) && (
                        <div className="text-center text-sm text-gray-600">
                          You could save ₹
                          {(
                            parseFloat(bill) - parseFloat(cheapest.bill)
                          ).toFixed(2)}{" "}
                          per month in {cheapest.state}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Usage Insights */}
                  <div className="p-4 bg-blue-100 rounded-lg">
                    <div className="flex items-start">
                      <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div className="text-sm text-blue-700">
                        <strong>Usage Insight:</strong> Your{" "}
                        {usage.category.toLowerCase()} of {units} kWh costs ₹
                        {(parseFloat(bill) / parseFloat(units)).toFixed(2)} per
                        unit.
                        {parseFloat(units) > 300 &&
                          " Consider energy-saving measures to reduce your bill."}
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
                Rate Structure
              </h4>
              <div className="space-y-3">
                {getSlabStructure().map((slab, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <div className="text-sm font-medium text-gray-700">
                        {slab.range}
                      </div>
                      <div className="text-xs text-gray-500">
                        {slab.description}
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-gray-800">
                      {slab.rate}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div className="text-sm text-yellow-700">
                    Actual rates may vary based on slab structure, subsidies,
                    and additional charges.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Average State Rates
              </h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {Object.entries(stateRates)
                  .sort((a, b) => a[1] - b[1])
                  .map(([stateName, rate]) => (
                    <div
                      key={stateName}
                      className={`flex justify-between items-center p-2 rounded ${
                        stateName === state
                          ? "bg-blue-50 border border-blue-200"
                          : ""
                      }`}
                    >
                      <span
                        className={`text-sm ${
                          stateName === state
                            ? "font-semibold text-blue-700"
                            : "text-gray-600"
                        }`}
                      >
                        {stateName}
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          rate <= 6.5
                            ? "text-green-600"
                            : rate <= 7.5
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        ₹{rate}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                💡 Money Saving Tips
              </h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Use LED bulbs (75% less energy)</li>
                <li>• Set AC to 24°C or higher</li>
                <li>• Unplug devices when not in use</li>
                <li>• Use natural light during day</li>
                <li>• Regular maintenance of appliances</li>
                <li>• Consider solar water heater</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
