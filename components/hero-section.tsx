"use client";
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

// Import your desktop images
import heroImage1 from '../public/01.jpg';
// import heroImage2 from '../public/02.jpg';
import heroImage3 from '../public/03.jpg';

// Import your mobile images
import mobileImage1 from '../public/04.jpg';
import mobileImage2 from '../public/05.jpg';
import mobileImage3 from '../public/06.jpg';
import mobileImage4 from '../public/07.jpg';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [screenSize, setScreenSize] = useState<'xs' | 'sm' | 'md' | 'lg'>('lg');
  const [isLoading, setIsLoading] = useState(true);
  const [containerHeight, setContainerHeight] = useState('80vh');

  // Desktop slides
  const desktopSlides = [
    {
      image: heroImage1,
      alt: "Adgrow Tripathi",
    },
    // {
    //   image: heroImage2,
    //   alt: "Adgrow Tripathi",
    // },
    {
      image: heroImage3,
      alt: "Adgrow Tripathi",
    }
  ];

  // Mobile slides - optimized for different screen sizes
  const mobileSlides = [
    {
      image: mobileImage1,
      alt: "Adgrow Tripathi Mobile",
    },
    {
      image: mobileImage2,
      alt: "Adgrow Tripathi Mobile",
    },
    {
      image: mobileImage3,
      alt: "Adgrow Tripathi Mobile",
    },
    {
      image: mobileImage4,
      alt: "Adgrow Tripathi Mobile",
    }
  ];

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      
      setIsMobile(mobile);
      
      // Determine specific screen size category
      if (width < 320) {
        setScreenSize('xs');
        setContainerHeight('350px');
      } else if (width < 375) {
        setScreenSize('xs');
        setContainerHeight('350px');
      } else if (width < 425) {
        setScreenSize('sm');
        setContainerHeight('400px');
      } else if (width < 475) {
        setScreenSize('md');
        setContainerHeight('500px');
      } else if (width < 768) {
        setScreenSize('md');
        setContainerHeight('500px');
      } else {
        setScreenSize('lg');
        setContainerHeight('80vh');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Get current slides based on device
  const slides = isMobile ? mobileSlides : desktopSlides;

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Calculate responsive sizes based on viewport width
  const getResponsiveSizes = () => {
    if (typeof window === 'undefined') return "100vw";
    return "100vw";
  };

  // Get optimized image quality based on screen size
  const getImageQuality = () => {
    if (typeof window === 'undefined') return 85;
    
    const width = window.innerWidth;
    const pixelRatio = window.devicePixelRatio || 1;
    
    // Higher quality for high DPI screens and larger displays
    if (pixelRatio >= 2 || width >= 1920) {
      return 90;
    } else if (width >= 1024) {
      return 85;
    } else {
      return 80;
    }
  };

  // Get button size based on screen size
  const getButtonSize = () => {
    switch (screenSize) {
      case 'xs':
        return 'p-1.5';
      case 'sm':
        return 'p-2';
      case 'md':
        return 'p-2';
      case 'lg':
        return 'p-3';
      default:
        return 'p-2';
    }
  };

  // Get icon size based on screen size
  const getIconSize = () => {
    switch (screenSize) {
      case 'xs':
        return 'w-3 h-3';
      case 'sm':
        return 'w-3.5 h-3.5';
      case 'md':
        return 'w-4 h-4';
      case 'lg':
        return 'w-6 h-6';
      default:
        return 'w-4 h-4';
    }
  };

  // Get button position based on screen size
  const getLeftButtonPosition = () => {
    switch (screenSize) {
      case 'xs':
        return 'left-1';
      case 'sm':
        return 'left-2';
      case 'md':
        return 'left-4';
      case 'lg':
        return 'left-8';
      default:
        return 'left-4';
    }
  };

  const getRightButtonPosition = () => {
    switch (screenSize) {
      case 'xs':
        return 'right-1';
      case 'sm':
        return 'right-2';
      case 'md':
        return 'right-4';
      case 'lg':
        return 'right-8';
      default:
        return 'right-4';
    }
  };

  // Get vertical position based on screen size
  const getButtonVerticalPosition = () => {
    return 'top-1/2 transform -translate-y-1/2';
  };

  // Render images for all screen sizes - full width with specific heights
  const renderImage = (slide: any, index: number) => {
    return (
      <Image 
        src={slide.image}
        alt={slide.alt}
        fill
        className={`object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${
          index === currentSlide ? 'opacity-100' : 'opacity-0'
        }`}
        priority={index === 0}
        quality={getImageQuality()}
        placeholder="blur"
        sizes={getResponsiveSizes()}
        onLoad={() => {
          if (index === 0) setIsLoading(false);
        }}
        onError={() => {
          if (index === 0) setIsLoading(false);
        }}
        style={{
          objectFit: 'cover',
          objectPosition: 'center'
        }}
      />
    );
  };

  return (
    <section 
      className="relative flex items-center justify-center overflow-hidden w-full bg-gray-100"
      style={{ height: containerHeight }}
    >
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Carousel Container */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="absolute inset-0 w-full h-full"
          >
            {renderImage(slide, index)}
            
            {/* Overlay for better contrast and performance */}
            <div className="absolute inset-0 bg-black/5"></div>
          </div>
        ))}
      </div>

      {/* Carousel Controls - Show on ALL screen sizes */}
      <>
        <button
          onClick={prevSlide}
          className={`absolute z-20 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/20 ${getButtonSize()} ${getLeftButtonPosition()} ${getButtonVerticalPosition()}`}
          aria-label="Previous slide"
        >
          <ChevronLeft className={`text-white ${getIconSize()}`} />
        </button>
        
        <button
          onClick={nextSlide}
          className={`absolute z-20 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/20 ${getButtonSize()} ${getRightButtonPosition()} ${getButtonVerticalPosition()}`}
          aria-label="Next slide"
        >
          <ChevronRight className={`text-white ${getIconSize()}`} />
        </button>
      </>

      {/* Carousel Indicators */}
      <div className="absolute bottom-3 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-1.5 sm:space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all duration-300 border border-white/30 ${
              index === currentSlide 
                ? 'bg-white scale-110' 
                : 'bg-white/50 hover:bg-white/70'
            } ${
              // Responsive indicator sizes based on screen size
              screenSize === 'xs' ? 'w-1 h-1' :
              screenSize === 'sm' ? 'w-1.5 h-1.5' :
              screenSize === 'md' ? 'w-2 h-2' : 'w-2.5 h-2.5 sm:w-3 sm:h-3'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Performance optimization: Preload next image */}
      {slides.length > 1 && (
        <div className="sr-only" aria-hidden="true">
          <Image
            src={slides[(currentSlide + 1) % slides.length].image}
            alt="Preload next slide"
            width={100}
            height={100}
            priority={false}
            quality={60}
          />
        </div>
      )}
    </section>
  );
};

export default HeroSection;