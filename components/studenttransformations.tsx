"use client";
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useInView, Variants } from 'framer-motion';
import ConsultationFormPopup from './popup';
// import ConsultationFormPopup from './popupform';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const StudentTransformations = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const titleVariants: Variants = {
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
  };

  const sections = [
    {
      title: "Hair Transplant",
      description: "Dealing with hair loss or thinning? Our expert hair transplant solutions provide natural, permanent restoration for a fuller, thicker look.",
      image: "hairtransplant.jpg",
      alt: "Hair transplant before and after results",
    },
    {
      title: "Baldness Treatment",
      description: "Regain lost hair and rebuild confidence with expert-backed restoration solutions that work. Whether it's partial or complete baldness, we've got a treatment for you.",
      image: "baldnes.jpeg",
      alt: "Baldness treatment results showing hair regrowth",
    },
    {
      title: "Hair Thinning Treatment",
      description: "Thicker, fuller hair is possible! Our specialized therapies strengthen your hair from the roots, reducing thinning and improving volume.",
      image: "thinning.jpeg",
      alt: "Hair thinning treatment showing improved density",
    },
    {
      title: "Alopecia & Patchy Hair Loss",
      description: "Tired of dealing with sudden bald patches? Our advanced treatments target alopecia, reactivating dormant follicles for visible regrowth.",
      image: "sep.jpg",
      alt: "Alopecia treatment showing patch regrowth",
    },
    {
      title: "Receding Hairline Solutions",
      description: "Stop your hairline from moving backward! Our customized approach helps strengthen existing hair and stimulate new growth for a more youthful look.",
      image: "reced.png",
      alt: "Receding hairline treatment results",
    },
    {
      title: "Genetic Hair Loss Treatment",
      description: "Inherited hair loss doesn't have to define your look. Our personalized treatments tackle hereditary patterns, giving you the best chance at long-term regrowth.",
      image: "genetic.jpg",
      alt: "Genetic hair loss treatment progress",
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate main heading - very fast
      gsap.fromTo(headingRef.current, 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4, // Much faster
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            end: 'bottom top',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Animate sections with staggered effect - much faster
      sections.forEach((_, index) => {
        // Animate content sections - much faster
        if (contentRefs.current[index]) {
          gsap.fromTo(contentRefs.current[index], 
            { x: -30, opacity: 0 }, // Reduced distance
            {
              x: 0,
              opacity: 1,
              duration: 0.5, // Much faster
              ease: 'power3.out',
              scrollTrigger: {
                trigger: contentRefs.current[index],
                start: 'top 70%',
                end: 'bottom top',
                toggleActions: 'play none none reverse',
              },
              delay: index * 0.02 // Minimal delay
            }
          );
        }

        // Animate images - much faster
        if (imageRefs.current[index]) {
          gsap.fromTo(imageRefs.current[index], 
            { 
              x: -50, // Reduced distance
              opacity: 0,
              scale: 1.05 // Reduced scale
            },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6, // Much faster
              ease: 'power2.out',
              scrollTrigger: {
                trigger: imageRefs.current[index],
                start: 'top 70%', // Trigger earlier
                end: 'bottom top',
                toggleActions: 'play none none reverse',
              },
              delay: index * 0.03 // Minimal delay
            }
          );
        }
      });

      // Background blob animations - faster
      gsap.fromTo('.bg-blob-1', 
        { x: -100, y: -100, scale: 0.8 },
        {
          x: 0,
          y: 0,
          scale: 1,
          duration: 1, // Faster
          ease: 'power1.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        }
      );

      gsap.fromTo('.bg-blob-2', 
        { x: 100, y: 100, scale: 0.8 },
        {
          x: 0,
          y: 0,
          scale: 1,
          duration: 1, // Faster
          ease: 'power1.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Add hover animations - faster
  const handleImageHover = (index: number) => {
    gsap.to(imageRefs.current[index], {
      scale: 1.05,
      duration: 0.2, // Very fast
      ease: 'power2.out'
    });
  };

  const handleImageLeave = (index: number) => {
    gsap.to(imageRefs.current[index], {
      scale: 1,
      duration: 0.2, // Very fast
      ease: 'power2.out'
    });
  };

  // Handle Fix It button click
  const handleFixItClick = () => {
    setIsPopupOpen(true);
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      
      {/* Consultation Form Popup */}
      <ConsultationFormPopup 
        isOpen={isPopupOpen}
        onOpenChange={setIsPopupOpen}
      />

      <div ref={sectionRef} className="relative overflow-hidden bg-[#101828] mt-20 max-[470px]:mt-10 max-[470px]:py-6 py-12 sm:py-12 lg:py-12" style={{fontFamily: "'Outfit', sans-serif"}}>
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="bg-blob-1 absolute top-0 left-0 w-72 h-72 bg-[#d90f12] rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="bg-blob-2 absolute bottom-0 right-0 w-72 h-72 bg-[#d90f12] rounded-full mix-blend-multiply filter blur-xl"></div>
        </div>

        {/* Main Heading */}
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
                  transition: { duration: 0.15 } // Very fast
                }}
              >
                Regain Confidence with Personalised Hair Treatments
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d90f12] to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }} // Much faster
                />
              </motion.span>
            </h1>
          </div>
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Render all 6 sections */}
          {sections.map((section, index) => (
            <div 
              key={index}
              ref={(el) => { contentRefs.current[index] = el; }}
              className={`lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center max-[470px]:mb-8 mb-15 lg:mb-15 ${
                index % 2 === 0 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              {/* Text Content */}
              <div className={`mb-12 lg:mb-0 ${index % 2 === 0 ? 'lg:order-2' : ''}`}>
                <div className="mb-6">
                  <h2 className="max-[470px]:text-[20px] text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {section.title}
                  </h2>
                </div>
                
                <p className="mt-4 text-lg text-gray-300 leading-relaxed">
                  {section.description}
                </p>

                <div className="mt-8">
                  <button 
                    onClick={handleFixItClick}
                    className="inline-flex items-center rounded-lg bg-[#d90f12] px-6 py-3 text-base font-semibold text-white shadow-sm ring-1 ring-[#d90f12] hover:bg-[#b80d0f] hover:ring-[#b80d0f] transition-all duration-100 transform hover:scale-105 hover:shadow-2xl" // Very fast
                  >
                    Fix It
                    <svg className="ml-2 h-5 w-5 transition-transform duration-100 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"> // Very fast
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Image */}
              <div className={`relative ${index % 2 === 0 ? 'lg:order-1' : ''}`}>
                <div 
                  ref={(el) => {imageRefs.current[index] = el}}
                  className="relative rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-200 cursor-pointer" // Very fast
                  onMouseEnter={() => handleImageHover(index)}
                  onMouseLeave={() => handleImageLeave(index)}
                >
                  <img 
                    loading="lazy" 
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                    src={section.image}
                    alt={section.alt}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StudentTransformations;