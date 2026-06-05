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
      question: 'Which is the best hair transplant clinic in Tirupati?',
      answer: 'Advanced Grohair is one of the leading hair transplant clinics in Tirupati offering advanced FUE and FUT hair transplant procedures with natural results.',
    },
    {
      question: 'What is the hair transplant cost in Tirupati?',
      answer: 'Hair transplant cost in Tirupati depends on graft count, hair loss stage, and treatment technique. Consultation helps determine exact pricing.',
    },
    {
      question: 'What is the recovery time after hair transplantation?',
      answer: 'Most patients recover within a few days, while complete hair growth gradually improves over several months.',
    },
  ];

  const rightFaqs = [
    {
      question: 'Is FUE hair transplant permanent?',
      answer: 'Yes, FUE hair transplant is considered a permanent hair restoration solution when performed by experienced specialists.',
    },
    {
      question: 'Do you provide hair transplant for women?',
      answer: 'Yes, we offer customized hair transplant treatments for women experiencing thinning hair and hairline loss.',
    },
    {
      question: 'Which is better – FUE or FUT hair transplant?',
      answer: 'Both are effective procedures. Our hair transplant doctor recommends the best option based on your scalp condition and graft requirement.',
    },
  ];

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      <section id='faq' ref={sectionRef} className="py-10 max-[470px]:py-6 bg-background" style={{fontFamily: "'Outfit', sans-serif"}}>
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
                {/* Left Column */}
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

                {/* Right Column */}
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
