"use client";
import Link from 'next/link';
import Script from 'next/script';

export default function ThankYou() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>     
      <div className="min-h-screen bg-[#101828] text-white flex flex-col"
            style={{fontFamily: "'Outfit', sans-serif"}}>
        <main className="flex-grow flex items-center justify-center px-4 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 rounded-full bg-[#d90f12] flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-12 w-12 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Thank You for Choosing AdgroHair
            </h1>
            
            <p className="text-xl mb-8 text-gray-300">
              We are honored to be your trusted partner in Hair Care. Your faith in us drives our commitment to deliver advanced medical solutions and personalized care for every patient.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 shadow-xl border border-[#ff0279]/20 mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-[#d90f12]">Our Commitment to You</h2>
              <p className="text-lg text-gray-300 text-left mb-4">
                Our dedicated team, supported by state-of-the-art technology and comprehensive in-house services, ensures you receive seamless and world-class treatment.
              </p>
              <p className="text-lg text-gray-300 text-left">
                One of our team members will connect with you within 24 hours to assist with your queries or next steps. If you need immediate assistance, please reach out at <strong className="text-white">+91 89400 56789</strong>
              </p>
            </div>
            
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-4 text-[#d90f12]">Why Choose AdgroHair?</h3>
              <div className="bg-white/10 p-4 rounded-lg inline-block">
                <p className="text-lg font-medium text-white">Advanced Hair Restoration Solutions</p>
                <p className="text-[#d90f12]">Expert Dermatologists • FDA-Approved Technology • 2,00,000+ Happy Patients</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link 
                href="/" 
                className="bg-[#d90f12] hover:bg-[#d90f12] text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg"
              >
                Return to Home
              </Link>
              <a 
                href="tel:+9189400 56789" 
                className="border-2 border-[#d90f12] text-[#d90f12] hover:bg-[#d90f12] hover:text-white font-bold py-3 px-8 rounded-full transition-colors"
              >
                Call Us Now
              </a>
            </div>
            
            <div className="text-gray-300">
              <p className="font-semibold">Need immediate assistance?</p>
              <p className="mt-2">Call us directly at: +91 89400 56789</p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-[#101828] py-8 px-6 border-t border-[#ff0279]/20">
          <div className="container mx-auto text-center">
            <p className="text-white">
              Copyright © 2025 Adgro Hair Royapuram | Powered by Adglo Skin Royapuram
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}