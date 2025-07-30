import React, { useState, useEffect } from "react";
import {
  Zap,
  Calculator,
  IndianRupee,
  Clock,
  Lightbulb,
  Fan,
  Tv,
  Refrigerator,
  AirVent,
  WashingMachine,
  Microwave,
  Droplets,
  Laptop,
  Shirt,
} from "lucide-react";

// Using Lucide React icons instead of emojis to avoid rendering issues
const appliances = [
  { name: "Fan", watt: 75, icon: Fan, category: "Cooling" },
  { name: "TV", watt: 120, icon: Tv, category: "Entertainment" },
  { name: "Fridge", watt: 180, icon: Refrigerator, category: "Kitchen" },
  { name: "AC", watt: 1500, icon: AirVent, category: "Cooling" },
  {
    name: "Washing Machine",
    watt: 500,
    icon: WashingMachine,
    category: "Laundry",
  },
  { name: "Microwave", watt: 800, icon: Microwave, category: "Kitchen" },
  { name: "Water Heater", watt: 2000, icon: Droplets, category: "Bathroom" },
  { name: "LED Bulb", watt: 10, icon: Lightbulb, category: "Lighting" },
  { name: "Laptop", watt: 65, icon: Laptop, category: "Electronics" },
  { name: "Iron", watt: 1200, icon: Shirt, category: "Household" },
];

export default function AppliancePredictor() {
  const [selected, setSelected] = useState([]);
  const [total, setTotal] = useState(null);
  const [usageHours, setUsageHours] = useState(5);
  const [electricityRate, setElectricityRate] = useState(7);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const handleCheck = (appliance) => {
    setSelected((prev) =>
      prev.includes(appliance)
        ? prev.filter((a) => a !== appliance)
        : [...prev, appliance]
    );
  };

  const handleCalculate = () => {
    const totalWatt = selected.reduce((acc, item) => acc + item.watt, 0);
    const totalKWhPerDay = (totalWatt * usageHours) / 1000;
    const billPerMonth = totalKWhPerDay * 30 * electricityRate;
    setTotal(billPerMonth.toFixed(2));
    setShowBreakdown(true);
  };

  const handleClear = () => {
    setSelected([]);
    setTotal(null);
    setShowBreakdown(false);
  };

  // Auto-calculate when selections change
  useEffect(() => {
    if (selected.length > 0 && usageHours > 0 && electricityRate > 0) {
      const totalWatt = selected.reduce(
        (acc, item) => acc + (item?.watt || 0),
        0
      );
      const totalKWhPerDay = (totalWatt * usageHours) / 1000;
      const billPerMonth = totalKWhPerDay * 30 * electricityRate;
      setTotal(billPerMonth.toFixed(2));
      setShowBreakdown(true);
    } else {
      setTotal(null);
      setShowBreakdown(false);
    }
  }, [selected, usageHours, electricityRate]);

  const totalWattage = selected.reduce(
    (acc, item) => acc + (item?.watt || 0),
    0
  );
  const dailyKWh =
    totalWattage > 0 && usageHours > 0 ? (totalWattage * usageHours) / 1000 : 0;

  const groupedAppliances = appliances.reduce((acc, appliance) => {
    const { category } = appliance;
    if (!acc[category]) acc[category] = [];
    acc[category].push(appliance);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-3 md:mb-4">
            <Zap className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Smart Electricity Cost Calculator
          </h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg px-4">
            Calculate your monthly electricity bill with precision
          </p>
        </div>

        <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {/* Settings Panel */}
          <div className="xl:col-span-1 lg:col-span-2 xl:order-1 order-2">
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg lg:shadow-xl p-4 md:p-6 mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Clock className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-500" />
                Usage Settings
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Daily Usage Hours
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="24"
                    value={usageHours}
                    onChange={(e) => setUsageHours(Number(e.target.value) || 1)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                        ((usageHours - 1) / 23) * 100
                      }%, #e5e7eb ${
                        ((usageHours - 1) / 23) * 100
                      }%, #e5e7eb 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1h</span>
                    <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {usageHours}h
                    </span>
                    <span>24h</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Electricity Rate (₹/kWh)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    step="0.5"
                    value={electricityRate}
                    onChange={(e) =>
                      setElectricityRate(
                        Math.max(1, Number(e.target.value) || 7)
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                  />
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            {selected.length > 0 && (
              <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg lg:shadow-xl p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Lightbulb className="w-4 h-4 md:w-5 md:h-5 mr-2 text-yellow-500" />
                  Quick Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-600">Appliances Selected:</span>
                    <span className="font-semibold">{selected.length}</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-600">Total Wattage:</span>
                    <span className="font-semibold">{totalWattage}W</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-600">Daily Consumption:</span>
                    <span className="font-semibold">
                      {dailyKWh.toFixed(2)} kWh
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Appliances Selection */}
          <div className="xl:col-span-2 lg:col-span-2 xl:order-2 order-1">
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg lg:shadow-xl p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 md:mb-6 gap-3">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                  Select Your Appliances
                </h2>
                {selected.length > 0 && (
                  <button
                    onClick={handleClear}
                    className="px-3 py-2 md:px-4 text-sm md:text-base bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors self-start sm:self-auto"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-4 md:space-y-6">
                {Object.entries(groupedAppliances).map(
                  ([category, categoryAppliances]) => (
                    <div key={category}>
                      <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-3 border-b border-gray-200 pb-2">
                        {category}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-3">
                        {categoryAppliances.map((appliance) => {
                          const IconComponent = appliance.icon;
                          return (
                            <label
                              key={appliance.name}
                              className={`flex items-center p-3 md:p-4 rounded-lg md:rounded-xl cursor-pointer transition-all duration-200 ${
                                selected.includes(appliance)
                                  ? "bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 shadow-md"
                                  : "bg-gray-50 border-2 border-transparent hover:bg-gray-100 active:bg-gray-200"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={selected.includes(appliance)}
                                onChange={() => handleCheck(appliance)}
                                className="sr-only"
                              />
                              <div className="flex items-center space-x-2 md:space-x-3 w-full min-w-0">
                                <div className="text-blue-600 flex-shrink-0">
                                  <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-gray-800 text-sm md:text-base truncate">
                                    {appliance.name}
                                  </div>
                                  <div className="text-xs md:text-sm text-gray-500">
                                    {appliance.watt}W
                                  </div>
                                </div>
                                {selected.includes(appliance) && (
                                  <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg
                                      className="w-3 h-3 md:w-4 md:h-4 text-white"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                )}
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Results */}
            {total && Number(total) > 0 && (
              <div className="mt-4 md:mt-6 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl lg:rounded-2xl shadow-lg lg:shadow-xl p-4 md:p-6 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                  <h3 className="text-lg md:text-2xl font-bold flex items-center">
                    <IndianRupee className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                    Monthly Cost Estimate
                  </h3>
                  <div className="text-2xl md:text-3xl font-bold">₹{total}</div>
                </div>

                <div className="bg-opacity-20 rounded-lg md:rounded-xl p-3 md:p-4 mt-4">
                  <h4 className="font-semibold mb-3 text-sm md:text-base">
                    Cost Breakdown
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Daily Usage:</span>
                        <span className="font-semibold">
                          {usageHours} hours
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Daily Consumption:</span>
                        <span className="font-semibold">
                          {dailyKWh.toFixed(2)} kWh
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Electricity Rate:</span>
                        <span className="font-semibold">
                          ₹{electricityRate}/kWh
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Total:</span>
                        <span className="font-bold text-lg">₹{total}</span>
                      </div>
                    </div>
                  </div>

                  {/* Additional breakdown details */}
                  <div className="mt-4 pt-3 border-t border-white border-opacity-30">
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="text-center">
                        <div className="font-semibold text-sm">
                          {selected.length}
                        </div>
                        <div className="opacity-80">Appliances</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-sm">
                          {totalWattage}W
                        </div>
                        <div className="opacity-80">Total Power</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-xs md:text-sm opacity-90">
                  💡 Tip: Use energy-efficient appliances and optimize usage
                  hours to reduce costs!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
