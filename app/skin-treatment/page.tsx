import Chatbot from "@/components/skintreatment/chatbots";
import ContactForm from "@/components/skintreatment/contact";
import FAQ from "@/components/skintreatment/faq";
import Footer from "@/components/skintreatment/footer";
import HairCareBanner from "@/components/skintreatment/haircarebanner";
import HeroSection from "@/components/skintreatment/hero-section";
import MarqueeImageRow from "@/components/skintreatment/marqueeImagerow";
import { Navbar } from "@/components/skintreatment/navbar";
import StudentTransformations from "@/components/skintreatment/studenttransformations";
import VideoCarousel from "@/components/skintreatment/video";
import { WhySection } from "@/components/skintreatment/why-section";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <MarqueeImageRow />
      <WhySection />
      <StudentTransformations />
      {/* <VideoCarousel /> */}
      <HairCareBanner />
      <FAQ />
      <ContactForm />
      {/* <ContactForm /> */}
      <Chatbot />
      <Footer />
    </div>
  );
}
