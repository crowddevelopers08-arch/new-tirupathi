"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import ConsultationFormPopup from "./popup"
// import ConsultationFormPopup from "./popupform"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
}

const imageVariants = {
  hidden: { 
    opacity: 0, 
    scale: 1.1,
    x: 30 
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      delay: 0.5
    }
  }
}

const titleVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
}

const iconVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    rotate: -180 
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
      duration: 0.6
    }
  },
  hover: {
    scale: 1.2,
    rotate: 5,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 10
    }
  }
}

function BentoFeature({ title, desc, className = "" }: { title: string; desc: string; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={itemVariants}
      whileHover={{ 
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      className="h-full"
    >
      <Card className={`border-border/70 bg-[#101828] p-1 backdrop-blur transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 ${className}`}>
        <div className="rounded-xl border border-border/60 p-4 sm:p-5 h-full flex flex-col justify-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <motion.div
              variants={iconVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover="hover"
            >
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
            </motion.div>
            <h3 className="text-base text-white sm:text-lg font-semibold text-center">{title}</h3>
          </div>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#b0b3c3] text-center">{desc}</p>
        </div>
      </Card>
    </motion.div>
  )
}

export function WhySection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      <div className="bg-[#101828] overflow-hidden" style={{fontFamily: "'Outfit', sans-serif"}}>
        <section 
          ref={sectionRef}
          id="why" 
          data-animate="section" 
          className="mx-auto max-w-7xl px-4 sm:px-6 py-10 max-[470px]:py-6 sm:py-10 md:py-10"
        >
          {/* Animated Title */}
          <motion.div 
            className="mb-8 sm:mb-12 text-center"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={titleVariants}
          >
            <div className="relative inline-block">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                <motion.span 
                  className="text-white px-4 py-2 inline-block"
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  Why Choose Advanced Grohair?
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d90f12] to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                  />
                </motion.span>
              </h1>
            </div>
          </motion.div>
          
          {/* Mobile Layout - Image first under 470px */}
          <div className="block max-[470px]:hidden">
            {/* Main Content Grid for larger screens */}
            <motion.div 
              className="flex flex-col lg:flex-row gap-4 sm:gap-6 h-full items-stretch"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {/* Left side - First 2 cards */}
              <div className="w-full lg:w-[30%] grid grid-cols-1 auto-rows-fr gap-3 sm:gap-4 md:gap-6 h-full">
                <BentoFeature
                  title="Proven Expertise"
                  desc="5+ years of experience in advanced hair restoration."
                />
                <BentoFeature
                  title="Personalized Plans"
                  desc="No generic treatments, only what works for you."
                />
              </div>

              {/* Center - Image with reduced height */}
              <motion.div 
                className="w-full lg:w-[40%] relative overflow-hidden rounded-xl sm:rounded-2xl border border-border h-[300px] sm:h-[350px] md:h-[400px] lg:h-auto"
                variants={imageVariants}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.4 }
                }}
              >
                <Image
                  src="/whyda.jpg"
                  alt="Advanced Grohair hair restoration results"
                  fill
                  className="object-cover"
                  data-parallax="y"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                />
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              {/* Right side - Last 2 cards */}
              <div className="w-full lg:w-[30%] grid grid-cols-1 auto-rows-fr gap-3 sm:gap-4 md:gap-6 h-full">
                <BentoFeature
                  title="Certified Dermatologists"
                  desc="Trusted professionals leading every treatment."
                />
                <BentoFeature
                  title="2,00,000+ Happy Patients"
                  desc="Real results, real confidence."
                />
              </div>
            </motion.div>
          </div>

          {/* Mobile Layout - Under 470px: Image first then cards */}
          <div className="hidden max-[470px]:block">
            <motion.div 
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {/* Image first on mobile */}
              <motion.div 
                className="w-full relative overflow-hidden rounded-xl border border-border h-[250px] mb-4"
                variants={imageVariants}
              >
                <Image
                  src="/whyda.jpg"
                  alt="Advanced Grohair hair restoration results"
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                />
              </motion.div>

              {/* Cards in single column */}
              <div className="grid grid-cols-1 gap-3">
                <BentoFeature
                  title="Proven Expertise"
                  desc="5+ years of experience in advanced hair restoration."
                />
                <BentoFeature
                  title="Personalized Plans"
                  desc="No generic treatments, only what works for you."
                />
                <BentoFeature
                  title="Certified Dermatologists"
                  desc="Trusted professionals leading every treatment."
                />
                <BentoFeature
                  title="2,00,000+ Happy Patients"
                  desc="Real results, real confidence."
                />
              </div>
            </motion.div>
          </div>

          {/* Bottom row - Full width cards and CTA */}
          <motion.div 
            className="mt-4 sm:mt-6 md:mt-8"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* FDA Approved Technology Card - Reduced width to match image */}
            <div className="mb-4 sm:mb-6 md:mb-8 flex justify-center">
              <div className="w-full lg:w-[40%]">
                <BentoFeature
                  title="FDA-Approved Technology"
                  desc="Safe, effective, and backed by science."
                  className="h-full"
                />
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="w-full max-w-md"
              >
                <Button 
                  size="lg"
                  onClick={() => setIsPopupOpen(true)}
                  className="bg-[#d90f12] hover:bg-[#b80d0f] text-white px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-xl w-full"
                >
                  Your Hair Deserves the Best – Take Action Today!
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Consultation Form Popup */}
        <ConsultationFormPopup 
          isOpen={isPopupOpen}
          onOpenChange={setIsPopupOpen}
        />
      </div>
    </>
  )
}