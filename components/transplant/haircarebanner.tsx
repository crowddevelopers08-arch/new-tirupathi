"use client";
import { useState } from 'react';
import ConsultationFormPopup from './popup';
// import ConsultationFormPopup from './popupform';

export default function HairCareBanner() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-[#101828] text-white">
        {/* Main Banner Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 max-[470px]:pt-0 lg:px-8 py-8">
          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content Section - Centered on mobile */}
            <div className="space-y-6 text-center lg:text-left">
              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
               Facing Hair Fall {' '}
                <span className="text-[#d90f12]">or Hair Thinning?</span>
              </h1>
              <p>Special Hair Restoration Offer</p>
              {/* Offer Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-center lg:justify-start gap-4 flex-wrap">
                  <span className="bg-[#d90f12] px-4 py-2 rounded-lg font-semibold text-lg">
                  ₹4,999 → ₹499 
                  </span>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-2xl font-bold text-white">
                    Consultation Offer
                    </span>
                  </div>
                </div>
                
                {/* Features List */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-lg">
                  {[
                    "Personalized Hair Consultation",
                    "Detailed Scalp Analysis",
                    "Hair Restoration Assessment",
                    "Hair Root Health Check",
                    "Advanced Hair Stimulation Therapy Trial",
                  ].map((item) => (
                    <li key={item} className="flex items-center justify-center sm:justify-start gap-3">
                      <span className="text-[#d90f12] font-bold flex-shrink-0">✔</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Trust Badge */}
              <div className="pt-4 border-t border-gray-700">
                <p className="text-lg font-semibold text-gray-300">
                  No fake promises — only expert-backed hair restoration care designed for healthier, stronger hair.
                </p>
              </div>
            </div>
            
            {/* Right CTA Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl">
              <div className="text-center space-y-6">
                {/* Clinic Info */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-[#101828]">
                    Advanced Grohair Hair Restoration Center
                  </h3>
                  <p className="text-gray-600 font-medium">Tirupati</p>
                </div>
                
                {/* Price Highlight */}
                <div className="space-y-2">
                  <div className="text-5xl font-bold text-[#d90f12]">₹499</div>
                  <div className="text-gray-500 line-through text-xl">₹4,999</div>
                  <div className="text-green-600 font-semibold">Save ₹4,500</div>
                </div>
                
                {/* CTA Button - Now triggers the popup */}
                <button 
                  onClick={() => setIsPopupOpen(true)}
                  className="w-full bg-[#101828] hover:bg-[#d90f12] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg"
                >
                  Book now - Pay Later
                </button>
                
                {/* Limited Time Offer */}
                <div className="bg-red-50 border border-[#d90f12] rounded-lg p-3">
                  <p className="text-[#d90f12] font-semibold text-sm">
                    ⚡ Limited Time Offer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Consultation Form Popup */}
      <ConsultationFormPopup 
        isOpen={isPopupOpen}
        onOpenChange={setIsPopupOpen}
      />
    </>
  );
}
