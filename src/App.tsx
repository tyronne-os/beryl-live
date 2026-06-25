/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import DemoCenterpiece from "./components/DemoCenterpiece";
import Manifesto from "./components/Manifesto";
import ModelScroller from "./components/ModelScroller";
import VideoQualityShowcase from "./components/VideoQualityShowcase";
import ApiSection from "./components/ApiSection";
import Footer from "./components/Footer";

export default function App() {
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-cream-50 text-ocean-900 font-sans selection:bg-sage-100 selection:text-sage-900 antialiased" id="beryl-page-app">
      {/* 1. Header Bar */}
      <Header onScrollTo={handleScrollToSection} />

      {/* 2. Hero Section */}
      <Hero onScrollToDemo={() => handleScrollToSection("demo")} />

      {/* 3. Demo Centerpiece calling portal */}
      <DemoCenterpiece />

      {/* 4. Anti-Chatbox Manifesto */}
      <Manifesto />

      {/* 5. Infinite Model Scroller */}
      <ModelScroller />

      {/* 6. Video Quality Action Grid */}
      <VideoQualityShowcase />

      {/* 7. Developer API Sandbox */}
      <ApiSection />

      {/* 8. Luxury Footer */}
      <Footer onScrollToTop={handleScrollToTop} />
    </div>
  );
}

