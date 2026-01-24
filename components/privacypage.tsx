"use client";
// import { ThankNavbar } from '@/components/thank-header';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <>
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
    `}</style>
    {/* <ThankNavbar /> */}
    <div className="min-h-screen bg-[#101828] text-white"
          style={{fontFamily: "'Outfit', sans-serif"}}>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          Privacy Policy
        </h1>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-10 shadow-xl border border-[#ff0279]/20">
          <p className="mb-6 text-gray-300">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#d90f12]">Introduction</h2>
            <p className="mb-4 text-gray-300">
              Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you interact with our services, website, or facilities.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#d90f12]">1. Information We Collect</h2>
            <h3 className="text-xl font-semibold mb-3 text-white">1.1 Personal Information</h3>
            <p className="mb-4 text-gray-300">We may collect the following personal details:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-300">
              <li>Name, contact information (phone number, email address, etc.)</li>
              <li>Any information shared during inquiries, appointments, or service requests</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-3 text-white">1.2 Non-Personal Information</h3>
            <p className="mb-4 text-gray-300">We also collect general data, such as:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-300">
              <li>Browser type, IP address, and device information</li>
              <li>Website usage data through cookies and similar technologies</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#d90f12]">2. How We Use Your Information</h2>
            <p className="mb-4 text-gray-300">Your information is used to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-300">
              <li>Provide and improve the services you request</li>
              <li>Communicate with you about appointments, updates, or inquiries</li>
              <li>Process payments and manage billing</li>
              <li>Enhance website functionality and user experience</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#d90f12]">3. How We Protect Your Data</h2>
            <p className="mb-4 text-gray-300">
              We prioritize the security of your personal data by implementing:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-300">
              <li>Encryption during data transmission and storage</li>
              <li>Restricted access to sensitive information</li>
              <li>Regular reviews and updates to our security measures</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#d90f12]">4. Sharing Your Information</h2>
            <p className="mb-4 text-gray-300">
              We may share your information in limited circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-300">
              <li>With service providers assisting in delivering our services (e.g., IT support, payment processors)</li>
              <li>To comply with legal requirements, such as court orders or regulatory demands</li>
            </ul>
            <p className="mb-4 text-gray-300">
              We do not sell or rent your personal data to third parties.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#d90f12]">5. Your Rights</h2>
            <p className="mb-4 text-gray-300">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-300">
              <li>Request access to your personal data</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your data, subject to legal or operational obligations</li>
              <li>Opt out of non-essential communications</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#d90f12]">6. Cookies and Website Tracking</h2>
            <p className="mb-4 text-gray-300">
              We use cookies to improve website performance and user experience. You can control or disable cookies in your browser settings, but this may impact website functionality.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#d90f12]">7. Third-Party Links</h2>
            <p className="mb-4 text-gray-300">
              Our website may include links to third-party websites. We are not responsible for their content or privacy practices. Please review their policies before sharing your information.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#d90f12]">8. Updates to This Privacy Policy</h2>
            <p className="mb-4 text-gray-300">
              We may update this policy from time to time. Any changes will be posted on this page with a revised "Effective Date."
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#d90f12]">9. Contact Us</h2>
            <p className="mb-4 text-gray-300">
              If you have questions or concern about this Privacy Policy, please contact us:
            </p>
            <p className="text-gray-300">
              Phone: +91 7436856789<br />
              <br />
              Thank you for trusting us. Your privacy and security are our top priorities.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#101828] py-8 px-6 mt-12 border-t border-[#ff0279]/20">
        <div className="container mx-auto text-center">
          <p className="text-white">
            Copyright © 2025 Adgro Hair Tirupati
          </p>
        </div>
      </footer>
    </div>
    </>
  );
}