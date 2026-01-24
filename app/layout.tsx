import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})

export const metadata: Metadata = {
  title: "Adgro Hair Thirupathi",
  description:
    "Our experienced professionals and experts recommend you the best treatment that matches your needs and assist you achieve the desired results that you have always longed for.",
  generator: 'Nextjs15',
  icons: {
    icon: [
      {
        url: "/favvv.jpg",
        sizes: "any",
      },
      {
        url: "/favvv.jpg",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favvv.jpg",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/favvv.jpg",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "icon",
        url: "/favvv.jpg",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/favvv.jpg",
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
      </head>
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}