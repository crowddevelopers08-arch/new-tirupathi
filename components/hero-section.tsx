import Image from "next/image";

const HeroSection = () => (
  <section className="w-full bg-white" aria-label="Adgrohair Tirupati offer">
    <Image
      src="/banner-main-mble.png"
      alt="Adgrohair Tirupati hair transplant offer and consultation details"
      width={821}
      height={1916}
      priority
      sizes="(max-width: 767px) 100vw, 1px"
      className="block h-auto w-full md:hidden"
    />
    <Image
      src="/banner-main.jpeg"
      alt="Adgrohair Tirupati hair transplant offer and consultation details"
      width={1600}
      height={703}
      priority
      sizes="(min-width: 768px) 100vw, 1px"
      className="hidden h-auto w-full md:block"
    />
  </section>
);

export default HeroSection;
