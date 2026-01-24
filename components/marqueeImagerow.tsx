"use client";
import { motion, useInView } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';

const MarqueeImageRow = () => {
  const images = [
    {
      id: 1,
      src: "bef1.jpg",
      alt: "Logo 1"
    },
    {
      id: 2,
      src: "bef2.jpg",
      alt: "Logo 2"
    },
    {
      id: 3,
      src: "bef3.jpg",
      alt: "Logo 3"
    },
    {
      id: 4,
      src: "bef4.jpg",
      alt: "Logo 4"
    },
    {
      id: 5,
      src: "bef5.jpg",
      alt: "Logo 5"
    },
    {
      id: 6,
      src: "bef6.jpg",
      alt: "Logo 6"
    },
    {
      id: 7,
      src: "bef7.jpg",
      alt: "Logo 7"
    },
      {
      id: 7,
      src: "bef8.jpg",
      alt: "Logo 8"
    }
  ];

  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
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
  };

  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images, ...images];

  const scroll = () => {
    if (isPaused || !scrollRef.current) return;

    setScrollPosition(prev => {
      const maxScroll = (scrollRef.current?.scrollWidth ?? 0) / 3;
      const newPosition = prev + 1;
      
      if (newPosition >= maxScroll) {
        return 0;
      }
      return newPosition;
    });

    animationRef.current = requestAnimationFrame(scroll);
  };

  useEffect(() => {
    if (!isPaused) {
      animationRef.current = requestAnimationFrame(scroll);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    // Add sectionRef to the main container
    <section ref={sectionRef} style={{
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      position: 'relative'
    }}>
      
      <div style={{
        backgroundColor: '#ffffff',
        padding: '1rem 0.5rem',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        position: 'relative'
      }}>
        
        {/* Heading - Fixed background and text colors */}
        <motion.div 
          className="mb-8 sm:mb-12 text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <div className="relative inline-block">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              <motion.span 
                className="text-[#d90f12] px-4 py-2 inline-block"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                Real Patients, Real Transformations!
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

        {/* Marquee Container */}
        <div
          ref={containerRef}
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '0.5rem',
            backgroundColor: '#f8fafc',
            padding: '1.5rem 0'
          }}
        >
          <div
            ref={scrollRef}
            style={{
              display: 'flex',
              gap: '2.5rem',
              alignItems: 'center',
              transform: `translateX(-${scrollPosition}px)`,
              transition: isPaused ? 'transform 0.3s ease' : 'none',
              width: 'fit-content'
            }}
          >
            {duplicatedImages.map((image, index) => (
              <div
                key={`${image.id}-${index}`}
                className="image-container" // Added class for responsive styling
                style={{
                  flex: '0 0 auto',
                  width: '350px', // Default desktop size
                  height: '250px', // Default desktop size
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.08)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                }}
                onClick={togglePause}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.backgroundColor = '#f1f5f9';
                    target.style.display = 'flex';
                    target.style.alignItems = 'center';
                    target.style.justifyContent = 'center';
                    target.style.color = '#64748b';
                    target.style.fontSize = '1.2rem';
                    target.style.fontWeight = '600';
                    target.innerHTML = 'Patient Photo';
                  }}
                />
              </div>
            ))}
          </div>

          {/* Gradient overlays for smooth edges */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: '120px',
            background: 'linear-gradient(90deg, #f8fafc 0%, transparent 100%)',
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '120px',
            background: 'linear-gradient(270deg, #f8fafc 0%, transparent 100%)',
            pointerEvents: 'none'
          }} />
        </div>

        <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }

          /* Mobile-specific styles */
          @media (max-width: 768px) {
            .image-container {
              width: 280px !important;
              height: 200px !important;
            }
          }

          @media (max-width: 640px) {
            .image-container {
              width: 250px !important;
              height: 180px !important;
            }
          }

          @media (max-width: 480px) {
            .image-container {
              width: 220px !important;
              height: 160px !important;
            }
          }

          @media (max-width: 380px) {
            .image-container {
              width: 200px !important;
              height: 140px !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default MarqueeImageRow;