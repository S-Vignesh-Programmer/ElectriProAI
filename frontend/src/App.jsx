// src/App.jsx
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import UnitPredictor from "./components/UnitPredictor";
import AppliancePredictor from "./components/AppliancePredictor";
import SolarComparison from "./components/SolarComparison";
import EVBillPredictor from "./components/EVBillPredictor";
import ChatBot from "./components/ChatBot";
import Footer from "./components/Footer";

function App() {
  const [activeSection, setActiveSection] = useState("home");

  // Listen for hash changes to update active section
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setActiveSection(hash);
      } else {
        setActiveSection("home");
      }
    };

    // Set initial section based on current hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Function to render only the active section
  const renderActiveSection = () => {
    switch (activeSection) {
      case "home":
        return <Hero />;
      case "unit":
        return <UnitPredictor />;
      case "appliance":
        return <AppliancePredictor />;
      case "solar":
        return <SolarComparison />;
      case "ev":
        return <EVBillPredictor />;
      case "chat":
        return <ChatBot />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <Header />
      <main className="min-h-screen">{renderActiveSection()}</main>
      <Footer />
    </div>
  );
}

export default App;
