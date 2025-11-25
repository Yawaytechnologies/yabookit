import React from "react";
import HeaderBar from "../components/Homepage/HeaderBar";
import HeroSection from "../components/Homepage/HeroSection";
import ShowcaseSections from "../components/Homepage/ShowcaseSections";

import YabookitStreamBanner from "../components/Homepage/YabookitStreamBanner";



export default function MovieBookingHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-x-hidden">
      <HeaderBar />
      <HeroSection />

      <YabookitStreamBanner />
      
      <ShowcaseSections />
      
     
     
    </div>
  );
}
