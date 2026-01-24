
// import FAQ from "@/components/faq";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import { Navbar } from "@/components/navbar";
import { WhySection } from "@/components/why-section";
import StudentTransformations from "@/components/studenttransformations";
import MarqueeImageRow from "@/components/marqueeImagerow";
import HairCareBanner from "@/components/haircarebanner";
// import ContactForm from "@/components/popup";
import FAQ from "@/components/faq";
import VideoCarousel from "@/components/video";
import ContactForm from "@/components/contact";
import Chatbot from "@/components/chatbots";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <WhySection />
      <StudentTransformations />
      <MarqueeImageRow />
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
