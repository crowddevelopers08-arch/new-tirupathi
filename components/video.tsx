"use client";
import { motion, useInView } from "framer-motion";
import React, { useState, useRef } from "react";

const VideoCarousel = () => {
  const [activeVideo, setActiveVideo] = useState<string | null >(null);
  const sectionRef = useRef(null);
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

  const videos = [
    { 
      id: "video1", 
      youtubeUrl: "https://www.youtube.com/embed/bUZmOxsDWQ4", 
      title: "Patient Success Story 1" 
    },
    { 
      id: "video5", 
      youtubeUrl: "https://www.youtube.com/embed/E2bcp59ZYFw", // Replace with actual YouTube URL
      title: "Patient Success Story 5" 
    },
    { 
      id: "video2", 
      youtubeUrl: "https://www.youtube.com/embed/Lz7AdYOWCus", 
      title: "Patient Success Story 2" 
    },
    { 
      id: "video3", 
      youtubeUrl: "https://www.youtube.com/embed/n9sqJtN16iQ", 
      title: "Patient Success Story 3" 
    },
    { 
      id: "video4", 
      youtubeUrl: "https://www.youtube.com/embed/Fyp1F_idu94", 
      title: "Patient Success Story 4" 
    },  
  ];

  // Function to extract YouTube ID from various URL formats
  const getYouTubeId = (url : string): string => {
    if (!url) return '';
    
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : '';
  };

  const playVideo = (videoId : string): void => {
    if (activeVideo === videoId) {
      setActiveVideo(null);
    } else {
      setActiveVideo(videoId);
    }
  };

  return (
    <div className="w-full bg-[#101828] py-12 max-[470px]:py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          ref={sectionRef}
          className="mb-4 sm:mb-6 text-center"
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
                Real Stories, Real Results
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

        {/* Disclaimer text added below the main heading */}
        <div className="text-center mb-8">
          <p className="text-gray-300 text-lg italic">
            Results may vary for each individual
          </p>
        </div>

        {/* First Row - Two Videos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          {videos.slice(0, 2).map((video) => (
            <div 
              key={video.id}
              className="bg-white/10 rounded-xl md:rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:bg-white/15 border border-white/10 hover:border-[#ff0279]/30 backdrop-blur-sm cursor-pointer"
              onClick={() => playVideo(video.id)}
            >
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> {/* 16:9 aspect ratio */}
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeId(video.youtubeUrl)}?rel=0`}
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={video.title}
                />
                
                {/* Playing indicator */}
                {activeVideo === video.id && (
                  <div className="absolute top-4 right-4">
                    <div className="w-4 h-4 bg-[#d90f12] rounded-full animate-pulse shadow-lg"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Second Row - Three Videos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {videos.slice(2).map((video) => (
            <div 
              key={video.id}
              className="bg-white/10 rounded-xl md:rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:bg-white/15 border border-white/10 hover:border-[#ff0279]/30 backdrop-blur-sm cursor-pointer"
              onClick={() => playVideo(video.id)}
            >
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> {/* 16:9 aspect ratio */}
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeId(video.youtubeUrl)}?rel=0`}
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={video.title}
                />
                
                {/* Playing indicator */}
                {activeVideo === video.id && (
                  <div className="absolute top-3 right-3">
                    <div className="w-3 h-3 bg-[#d90f12] rounded-full animate-pulse shadow-lg"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            Click on any video to play • Only one video plays at a time
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCarousel;