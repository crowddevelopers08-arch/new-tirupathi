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
                Facing{' '}
                <span className="text-[#d90f12]">hair fall or thinning?</span>
              </h1>
              
              {/* Offer Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-center lg:justify-start gap-4 flex-wrap">
                  <span className="bg-[#d90f12] px-4 py-2 rounded-lg font-semibold text-lg">
                    Special Offer
                  </span>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-gray-400 line-through text-lg">
                      ₹4,999
                    </span>
                    <span className="text-2xl font-bold text-white">
                    ₹499 Book now / Pay Later
                    </span>
                  </div>
                </div>
                
                {/* Features List */}
                <ul className="space-y-3 text-lg">
                  <li className="flex items-center justify-center lg:justify-start gap-3">
                    <span className="w-2 h-2 bg-[#d90f12] rounded-full flex-shrink-0"></span>
                    Personalized hair consultation
                  </li>
                  <li className="flex items-center justify-center lg:justify-start gap-3">
                    <span className="w-2 h-2 bg-[#d90f12] rounded-full flex-shrink-0"></span>
                   Detailed Scalp analysis
                  </li>
                  <li className="flex items-center justify-center lg:justify-start gap-3">
                    <span className="w-2 h-2 bg-[#d90f12] rounded-full flex-shrink-0"></span>
                   Advanced Hair stimulation therapy trial
                  </li>
                </ul>
              </div>
              
              {/* Trust Badge */}
              <div className="pt-4 border-t border-gray-700">
                <p className="text-lg font-semibold text-gray-300">
                  No fake promises — only expert care for stronger, healthier hair.
                </p>
              </div>
            </div>
            
            {/* Right CTA Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl">
              <div className="text-center space-y-6">
                {/* Clinic Info */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-[#101828]">
                    Advanced Grohair & Gloskin Clinic
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