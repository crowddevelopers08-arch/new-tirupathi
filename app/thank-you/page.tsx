"use client"

import { ThankNavbar } from '@/components/navbar-policy'
import ThankYouPage from '@/components/thank-page'
import Script from 'next/script'
import { useEffect } from 'react'

// Type declaration for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const Page = () => {
  useEffect(() => {
    // Track conversion when component mounts
    if (typeof window !== 'undefined' && window.gtag) {
      // Type assertion for gtag
      const gtag = window.gtag as (...args: any[]) => void;
      
      gtag('event', 'conversion', {
        'send_to': 'AW-17491253863/4lSxCPfO_okbEOe0vZRB',
        'value': 1.0,
        'currency': 'INR'
      })
      
      console.log('Conversion tracked via useEffect')
    } else {
      console.warn('gtag not available yet')
    }
  }, [])

  return (
    <div>
      {/* Google Ads Conversion Tracking Script */}
      <Script
        id="google-ads-conversion-tracking"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Type-safe conversion tracking function
            function trackConversion() {
              if (typeof gtag === 'function') {
                gtag('event', 'conversion', {
                  'send_to': 'AW-17491253863/4lSxCPfO_okbEOe0vZRB',
                  'value': 1.0,
                  'currency': 'INR'
                });
                console.log('Conversion tracked via inline script');
                return true;
              }
              return false;
            }
            
            // Try tracking immediately
            const tracked = trackConversion();
            
            if (!tracked) {
              // Fallback: try again after a short delay
              setTimeout(trackConversion, 500);
            }
          `,
        }}
      />
      
      <ThankNavbar />
      <ThankYouPage />
    </div>
  )
}

export default Page