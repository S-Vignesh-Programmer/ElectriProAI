import React, { useState } from "react";
import { Car, Zap, Calculator, Info, TrendingUp } from "lucide-react";

export default function EVBillPredictor() {
  const [batterySize, setBatterySize] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState(7);
  const [cost, setCost] = useState(null);
  const [chargingFrequency, setChargingFrequency] = useState(1);

  const handleCalculate = () => {
    if (!batterySize || batterySize <= 0) return;
    const total = batterySize * pricePerUnit;
    setCost(total.toFixed(2));
  };

  const calculateMonthlyCost = () => {
    if (!cost) return 0;
    return (parseFloat(cost) * chargingFrequency * 30).toFixed(2);
  };

  const calculateYearlyCost = () => {
    if (!cost) return 0;
    return (parseFloat(cost) * chargingFrequency * 365).toFixed(2);
  };

  const getPopularEVs = () => [
    { name: "Tata Nexon EV", battery: "30.2", range: "312 km" },
    { name: "MG ZS EV", battery: "44.5", range: "419 km" },
    { name: "Hyundai Kona", battery: "39.2", range: "452 km" },
    { name: "Tata Tigor EV", battery: "26", range: "306 km" },
  ];

  return (
    <section
      id="ev"
      className="py-8 md:py-12 bg-gradient-to-br from-blue-50 to-green-50 px-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-600 rounded-full mb-4">
            <Car className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold mb-2 text-gray-800">
            EV Charging Cost Calculator
          </h3>
          <p className="text-gray-600">
            Calculate your electric vehicle charging costs with precision
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calculator Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
              <div className="flex items-center mb-4">
                <Calculator className="w-5 h-5 text-blue-500 mr-2" />
                <h4 className="text-xl font-semibold text-gray-800">
                  Calculate Charging Cost
                </h4>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Zap className="w-4 h-4 inline mr-1" />
                    Battery Capacity (kWh)
                  </label>
                  <input
                    type="number"
                    value={batterySize}
                    onChange={(e) => setBatterySize(e.target.value)}
                    placeholder="e.g., 30.2"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Electricity Rate (₹ per kWh)
                  </label>
                  <input
                    type="number"
                    value={pricePerUnit}
                    onChange={(e) =>
                      setPricePerUnit(parseFloat(e.target.value) || 0)
                    }
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <TrendingUp className="w-4 h-4 inline mr-1" />
                  Charging Frequency (times per day)
                </label>
                <select
                  value={chargingFrequency}
                  onChange={(e) =>
                    setChargingFrequency(parseFloat(e.target.value))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value={0.5}>Once every 2 days</option>
                  <option value={1}>Once a day</option>
                  <option value={2}>Twice a day</option>
                  <option value={0.33}>Once every 3 days</option>
                </select>
              </div>

              <button
                onClick={handleCalculate}
                disabled={!batterySize || batterySize <= 0}
                className="w-full bg-gradient-to-r from-blue-500 to-green-600 text-white py-4 px-6 rounded-xl hover:from-blue-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-lg"
              >
                Calculate Charging Cost
              </button>

              {/* Results */}
              {cost && (
                <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-200">
                  <h5 className="text-lg font-semibold text-gray-800 mb-4">
                    Cost Breakdown
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-blue-600">
                        ₹{cost}
                      </div>
                      <div className="text-sm text-gray-600">
                        Per Full Charge
                      </div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-green-600">
                        ₹{calculateMonthlyCost()}
                      </div>
                      <div className="text-sm text-gray-600">Monthly Cost</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-purple-600">
                        ₹{calculateYearlyCost()}
                      </div>
                      <div className="text-sm text-gray-600">Yearly Cost</div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                    <div className="flex items-start">
                      <Info className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div className="text-sm text-blue-700">
                        <strong>Cost per km:</strong> Approximately ₹
                        {batterySize && cost
                          ? (parseFloat(cost) / (batterySize * 4)).toFixed(2)
                          : "0"}
                        <span className="text-xs block mt-1">
                          (Assuming ~4 km per kWh efficiency)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Popular EVs Reference */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Popular EVs in India
              </h4>
              <div className="space-y-3">
                {getPopularEVs().map((ev, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors"
                    onClick={() => setBatterySize(ev.battery)}
                  >
                    <div className="font-medium text-gray-800">{ev.name}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      <div>Battery: {ev.battery} kWh</div>
                      <div>Range: {ev.range}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h5 className="font-medium text-gray-800 mb-2">
                  💡 Tips to Save:
                </h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Charge during off-peak hours</li>
                  <li>• Use home charging vs public</li>
                  <li>• Consider solar charging</li>
                  <li>• Maintain optimal battery health</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Charging Types & Costs
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Home Charging</span>
                <span className="font-medium">₹4-8 per kWh</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Public AC Charging</span>
                <span className="font-medium">₹8-12 per kWh</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">DC Fast Charging</span>
                <span className="font-medium">₹12-20 per kWh</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Comparison with Petrol
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Petrol (₹100/L, 15 kmpl)</span>
                <span className="font-medium">₹6.67 per km</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">EV (₹7/kWh, 4 km/kWh)</span>
                <span className="font-medium text-green-600">₹1.75 per km</span>
              </div>
              <div className="text-sm text-green-600 font-medium">
                ~75% savings with electric!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
