
// import FAQ from "@/components/faq";

import Chatbot from "@/components/treatments/chatbots";
import ContactForm from "@/components/treatments/contact";
import FAQ from "@/components/treatments/faq";
import Footer from "@/components/treatments/footer";
import HairCareBanner from "@/components/treatments/haircarebanner";
import HeroSection from "@/components/treatments/hero-section";
import MarqueeImageRow from "@/components/treatments/marqueeImagerow";
import { Navbar } from "@/components/treatments/navbar";
import StudentTransformations from "@/components/treatments/studenttransformations";
import VideoCarousel from "@/components/treatments/video";
import { WhySection } from "@/components/treatments/why-section";


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
