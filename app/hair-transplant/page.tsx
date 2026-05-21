import Chatbot from "@/components/transplant/chatbots";
import BestHairRestoration from "@/components/transplant/best-hair-restoration";
import ClinicChoice from "@/components/transplant/clinic-choice";
import ContactForm from "@/components/transplant/contact";
import FAQ from "@/components/transplant/faq";
import Footer from "@/components/transplant/footer";
import HairCareBanner from "@/components/transplant/haircarebanner";
import HeroSection from "@/components/transplant/hero-section";
import MarqueeImageRow from "@/components/transplant/marqueeImagerow";
import { Navbar } from "@/components/transplant/navbar";
import StudentTransformations from "@/components/transplant/studenttransformations";
import VideoCarousel from "@/components/transplant/video";
import { WhySection } from "@/components/transplant/why-section";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <MarqueeImageRow />
      <BestHairRestoration />
      <WhySection />
      <StudentTransformations />

      <VideoCarousel />
      <HairCareBanner />
      <ClinicChoice />
      
      <FAQ />
      <ContactForm />
      {/* <ContactForm /> */}
      <Chatbot />
      <Footer />
    </div>
  );
}
