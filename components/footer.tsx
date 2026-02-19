"use client";
import React, { useState } from 'react';
import ContactForm from './popup';

const Footer = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Handle book now click
  const handleBookNowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFormOpen(true);
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
    
      <footer className="bg-[#101828] text-white pt-8 max-[426px]:pt-6 pb-8 relative overflow-hidden" style={{fontFamily: "'Outfit', sans-serif"}}>
        {/* Decorative top element */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#d90f12] to-[#d90f12]"></div>
        
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Bottom section */}
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
             <p className="text-base max-[425px]:text-[14px] opacity-70 text-center sm:text-left">
                Copyright © {new Date().getFullYear()} Adgro Hair Tirupati | Powered by Adgro Hair Tirupati
              </p>
            </div>
          </div>

          {/* Mobile fixed buttons */}
          <div className="lg:hidden max-[470px]:flex fixed bottom-0 left-0 right-0 z-50 w-full">
            <a 
              href="tel:+9189400 56789" 
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#d90f12] text-white font-bold text-base transition-all duration-300 hover:bg-[#e0006a] active:translate-y-px cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
              </svg>
              Call Now
            </a>

            <a 
              href="#form" 
              onClick={handleBookNowClick}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#101828] text-white font-bold text-base transition-all duration-300 hover:bg-[#3a3b6a] active:translate-y-px cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/>
              </svg>
              Book Now
            </a>
          </div>
        </div>

        {/* Consultation Form Popup */}
        <ContactForm 
          isOpen={isFormOpen}
          onOpenChange={setIsFormOpen}
        />
      </footer>
    </>
  );
};

export default Footer;