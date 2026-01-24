"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion, useInView } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
  const sectionRef = useRef<HTMLElement>(null);
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
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-content', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const leftFaqs = [
    {
      question: 'What is the best hair regrowth treatment available at your hair treatment clinic in Chennai?',
      answer: 'At our Advanced grohair Clinic, we offer a range of hair regrowth treatments, including Oxygen Laser Therapy, Mesotherapy, and Cosmetic Hair Transplant. Each treatment is tailored to address specific hair loss issues and provide effective results.',
    },
    {
      question: 'How does the hair transplant procedure work at your hair transplant center in Chennai?',
      answer: 'Our hair transplant center uses advanced techniques to ensure minimal scarring and quick recovery. We employ the latest methods, including minimally invasive techniques, to achieve a 97%+ success rate in our hair transplantation procedures.',
    },
    {
      question: 'What makes Advanced Grohair a leading hair restoration clinic?',
      answer: 'Advanced Grohair is renowned for its exceptional results in hair restoration. Our clinic features board-certified specialists, FDA-approved equipment, and a commitment to 24/7 support. We pride ourselves on our ability to deliver personalized care and effective solutions.',
    },
    {
      question: 'Are there any hair loss treatment clinics near me that offer no-cost EMI options?',
      answer: 'Yes, our Advanced grohair Clinic provides hair loss treatments with flexible no-cost EMI options. This makes accessing top-quality care both convenient and affordable.',
    },
  ];

  const rightFaqs = [
    {
      question: 'How effective is the Cosmetic Hair System at your hair restoration center?',
      answer: 'The Cosmetic Hair System at our hair restoration center offers a natural appearance and is lightweight and breathable. It\'s a non-invasive solution with no recovery time, making it ideal for those seeking a versatile and effective option.',
    },
    {
      question: 'What can I expect during a consultation at your hair treatment clinic?',
      answer: 'During your consultation at our hair treatment clinic, we will assess your specific needs and discuss various hair regrowth treatments and hair transplant options available. Our experts will guide you through the best solutions tailored to your condition.',
    },
    {
      question: 'How long is the recovery period after a hair transplant at your clinic?',
      answer: 'Recovery time after a hair transplant at our clinic is minimal. Our advanced techniques ensure quick healing, with most patients returning to normal activities within a short period. We provide comprehensive post-treatment care to ensure optimal results.',
    },
    {
      question: 'Can you tell me more about the hair restoration options available at your hair restoration clinic?',
      answer: 'Our hair restoration clinic offers a variety of solutions, including Oxygen Laser Therapy, Mesotherapy, and Cosmetic Hair Transplants. Each option is designed to address different aspects of hair loss and restoration, ensuring comprehensive care for every need.',
    },
  ];

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      <section ref={sectionRef} className="py-10 max-[470px]:py-6 bg-background" style={{fontFamily: "'Outfit', sans-serif"}}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Remove the duplicate heading and use only the animated one */}
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
                    Frequently Asked Questions!
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

            <div className="faq-content">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - 4 FAQs */}
                <div className="space-y-6">
                  <Accordion type="single" collapsible className="space-y-6">
                    {leftFaqs.map((faq, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`left-item-${index}`}
                        className="bg-[#fefefe] border-l-4 border-[#d90f12] rounded-lg px-6 shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_25px_rgba(217,15,18,0.3)] hover:translate-y-[-2px] transition-all duration-300"
                      >
                        <AccordionTrigger className="text-lg font-semibold text-[black] hover:text-[#d90f12] text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-foreground/80 text-base leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                {/* Right Column - 4 FAQs */}
                <div className="space-y-6">
                  <Accordion type="single" collapsible className="space-y-6">
                    {rightFaqs.map((faq, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`right-item-${index}`}
                        className="bg-[#fefefe] border-l-4 border-[#d90f12] rounded-lg px-6 shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_25px_rgba(217,15,18,0.3)] hover:translate-y-[-2px] transition-all duration-300"
                      >
                        <AccordionTrigger className="text-lg font-semibold text-[black] hover:text-[#d90f12] text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-foreground/80 text-base leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;