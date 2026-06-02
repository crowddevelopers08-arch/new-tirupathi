import BestHairTransplantClinic from "@/components/hairrestore/best-hair-transplant-clinic";
import Chatbot from "@/components/hairrestore/chatbots";
import ClinicChoice from "@/components/hairrestore/clinic-choice";
import ContactForm from "@/components/hairrestore/contact";
import FAQ from "@/components/hairrestore/faq";
import Footer from "@/components/hairrestore/footer";
import HairCareBanner from "@/components/hairrestore/haircarebanner";
import HeroSection from "@/components/hairrestore/hero-section";
import MarqueeImageRow from "@/components/hairrestore/marqueeImagerow";
import { Navbar } from "@/components/hairrestore/navbar";
import StudentTransformations from "@/components/hairrestore/studenttransformations";
import VideoCarousel from "@/components/hairrestore/video";
import { WhySection } from "@/components/hairrestore/why-section";


export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <MarqueeImageRow />
      <BestHairTransplantClinic />
      <WhySection />
      <StudentTransformations />
      <ClinicChoice />
      <VideoCarousel />
      <HairCareBanner />
      <FAQ />
      <ContactForm />
      {/* <ContactForm /> */} 
      <Chatbot />
      <Footer />
    </div>
  );
}
