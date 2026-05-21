"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, useInView } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const leftFaqs = [
  {
    question: "What is the best hair restoration treatment?",
    answer:
      "The best hair restoration treatment depends on your scalp condition, hair loss stage, and hair density. Our specialists recommend customized solutions after consultation.",
  },
  {
    question: "Is Advanced Grohair a medical hair restoration clinic?",
    answer:
      "Yes, Advanced Grohair is a professional medical hair restoration clinic offering advanced treatments for men and women.",
  },
  {
    question: "Do you provide hair restoration for men?",
    answer:
      "Yes, we provide customized men's hair restoration treatments for male pattern baldness, thinning crown, and receding hairline.",
  },
  {
    question: "Are there hair restoration options for women?",
    answer:
      "Yes, we offer women's hair restoration treatments for hair thinning, hormonal hair fall, and hairline correction.",
  },
];

const rightFaqs = [
  {
    question: "How long does hair restoration treatment take?",
    answer:
      "Treatment duration varies depending on the hair loss condition and recommended therapy plan.",
  },
  {
    question: "Is hair restoration available?",
    answer:
      "Yes, we offer laser hair restoration treatments designed to stimulate scalp circulation and improve hair growth.",
  },
  {
    question: "Can I restore my natural hairline?",
    answer:
      "Yes, our hairline restoration treatments focus on restoring a dense and natural-looking hairline.",
  },
];

const FAQ = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-content", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      <section ref={sectionRef} className="py-10 max-[470px]:py-6 bg-background" style={{ fontFamily: "'Outfit', sans-serif" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
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
                      transition: { duration: 0.3 },
                    }}
                  >
                    Frequently Asked Questions
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
                <div className="space-y-6">
                  <Accordion type="single" collapsible className="space-y-6">
                    {leftFaqs.map((faq, index) => (
                      <AccordionItem
                        key={faq.question}
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

                <div className="space-y-6">
                  <Accordion type="single" collapsible className="space-y-6">
                    {rightFaqs.map((faq, index) => (
                      <AccordionItem
                        key={faq.question}
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
