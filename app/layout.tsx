import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})

export const metadata: Metadata = {
  title: "Adgro Hair Tirupati",
  description:
    "Our experienced professionals and experts recommend you the best treatment that matches your needs and assist you achieve the desired results that you have always longed for.",
  generator: 'Nextjs15',
  icons: {
    icon: [
      {
        url: "https://ik.imagekit.io/sunncpdro/public/favvv.jpg?updatedAt=1773322703968",
        sizes: "any",
      },
      {
        url: "https://ik.imagekit.io/sunncpdro/public/favvv.jpg?updatedAt=1773322703968",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "https://ik.imagekit.io/sunncpdro/public/favvv.jpg?updatedAt=1773322703968",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "https://ik.imagekit.io/sunncpdro/public/favvv.jpg?updatedAt=1773322703968",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "icon",
        url: "https://ik.imagekit.io/sunncpdro/public/favvv.jpg?updatedAt=1773322703968",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "https://ik.imagekit.io/sunncpdro/public/favvv.jpg?updatedAt=1773322703968",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} antialiased`}>
      <head>
        {/* Google Ads Tag */}
        {/* <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17491253863"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17491253863');
            `,
          }}
        /> */}

        {/* Microsoft Clarity */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "v9ejfj6kkm");
            `,
          }}
        /> */}

        {/* Google Analytics Tag */}
        {/* <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-QNBK8JKTTS"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QNBK8JKTTS');
            `,
          }}
        /> */}

        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '904782162269524');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=904782162269524&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PJ2LL9CP');
            `,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className="font-sans">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-PJ2LL9CP"
            height="0" 
            width="0" 
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  )
}