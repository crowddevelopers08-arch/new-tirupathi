import Chatbot from "@/components/hairregrowth/chatbots";
import BestRegrowthTreatment from "@/components/hairregrowth/best-regrowth-treatment";
import ClinicChoice from "@/components/hairregrowth/clinic-choice";
import ContactForm from "@/components/hairregrowth/contact";
import FAQ from "@/components/hairregrowth/faq";
import Footer from "@/components/hairregrowth/footer";
import HairCareBanner from "@/components/hairregrowth/haircarebanner";
import HeroSection from "@/components/hairregrowth/hero-section";
import MarqueeImageRow from "@/components/hairregrowth/marqueeImagerow";
import { Navbar } from "@/components/hairregrowth/navbar";
import StudentTransformations from "@/components/hairregrowth/studenttransformations";
import VideoCarousel from "@/components/hairregrowth/video";
import { WhySection } from "@/components/hairregrowth/why-section";


export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <MarqueeImageRow />
      <BestRegrowthTreatment />
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
