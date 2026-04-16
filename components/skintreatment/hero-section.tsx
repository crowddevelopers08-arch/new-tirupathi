"use client";
import { useEffect, useState } from "react";
import { ChevronDown, Phone } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Desktop image URLs
const heroImage1 = "skin-banner-1.jpg";
const heroImage3 = "skin-banners-2.jpg";

// Mobile image URLs
// const mobileImage1 = "https://ik.imagekit.io/sunncpdro/public/04.jpg";
// const mobileImage1 = "https://ik.imagekit.io/sunncpdro/public/05.jpg";
// const mobileImage2 = "https://ik.imagekit.io/sunncpdro/public/06.jpg";
const mobileImage3 = "skin-mobile.jpg";
const mobileImage4 = "skin-mobile2.jpg";
// const mobileImage4 = "https://ik.imagekit.io/sunncpdro/public/07.jpg";

const commonConcerns = [
    "Acne / Pimples",
    "Acne Scars",
    "Dark Spots / Pigmentation",
    "Uneven Skin Tone",
    "Dull Skin"
];

const inputClass =
  "w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d90f12]/30 focus:border-[#d90f12] focus:bg-white transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed placeholder:text-gray-400";

const labelClass = "text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block";

const HeroSection = () => {
  const router = useRouter();

  // ─── Carousel State ───────────────────────────────────────────────────────
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bannerHeight, setBannerHeight] = useState("260px");

  // ─── Form State ───────────────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    concerns: "",
    hairProblems: "",
    pincode: "",
  });
  const [showConcernsDropdown, setShowConcernsDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [showThankYou, setShowThankYou] = useState(false);

  const desktopSlides = [
    { image: heroImage1, alt: "Adgrow Tirupati" },
    { image: heroImage3, alt: "Adgrow Tirupati" },
  ];
  const mobileSlides = [
    // { image: mobileImage1, alt: "Adgrow Tirupati Mobile" },
    // { image: mobileImage2, alt: "Adgrow Tirupati Mobile" },
    { image: mobileImage3, alt: "Adgrow Tirupati Mobile" },
    { image: mobileImage4, alt: "Adgrow Tirupati Mobile" },
  ];

  // ─── Screen Detection ─────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setIsMobile(w < 1024);
      if (w < 325)       setBannerHeight("80vh");
      else if (w < 375)  setBannerHeight("80vh");
      else if (w < 425)  setBannerHeight("100vh");
      else if (w < 475)  setBannerHeight("110vh");
      else if (w < 640)  setBannerHeight("52vh");
      else if (w < 768)  setBannerHeight("54vh");
      else if (w < 1024) setBannerHeight("146vh");
      else               setBannerHeight("180vh");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const slides = isMobile ? mobileSlides : desktopSlides;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => setCurrentSlide(index);

  const getImageQuality = () => {
    if (typeof window === "undefined") return 85;
    const w = window.innerWidth;
    if (window.devicePixelRatio >= 2 || w >= 1920) return 90;
    if (w >= 1024) return 85;
    return 80;
  };

  // ─── Form Handlers ────────────────────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectConcern = (concern: string) => {
    setFormData((prev) => ({ ...prev, concerns: concern }));
    setShowConcernsDropdown(false);
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          concerns: formData.concerns,
          hairProblems: formData.hairProblems,
          message: formData.hairProblems,
          pincode: formData.pincode,
          consent: true,
          source: typeof window !== "undefined" ? window.location.href : "unknown",
          formName: "Hair Consultation Form",
        }),
      });
      const result = await response.json();
      if (result.success) {
        setSubmitStatus("success");
        setFormData({ fullName: "", phone: "", email: "", concerns: "", hairProblems: "", pincode: "" });
        setTimeout(() => { 
          setSubmitStatus("idle"); 
          setShowThankYou(true);
        }, 500);
      } else {
        throw new Error(result.error || "Failed");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    /**
     * LAYOUT STRATEGY
     * ───────────────────────────────────────────────────────
     * Mobile / Tablet  (<lg)  →  flex-col: Banner on top, Form below
     * Desktop          (lg+)  →  relative block: Banner fills 80vh, Form absolute right
     */
    <section
      className="w-full flex flex-col lg:block lg:relative bg-white"
      style={{ height: isMobile ? "auto" : "85vh" }}
    >
      {/* ════════════════════════════════════════
          CAROUSEL BANNER
          Mobile  → normal flow, fixed px height
          Desktop → absolute, fills full section
      ════════════════════════════════════════ */}
      <div
        className="relative w-full overflow-hidden bg-gray-100 flex-shrink-0 lg:absolute lg:inset-0"
        style={{ height: isMobile ? bannerHeight : undefined }}
      >
        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100">
            <div className="w-10 h-10 border-4 border-[#d90f12] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Slides */}
        {slides.map((slide, index) => (
          <div key={index} className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className={`object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              priority={index === 0}
              quality={getImageQuality()}
              sizes="100vw"
              onLoad={() => { if (index === 0) setIsLoading(false); }}
              onError={() => { if (index === 0) setIsLoading(false); }}
              style={{ objectFit: "cover", objectPosition: isMobile ? "top center" : "center" }}
            />
          </div>
        ))}

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full border border-white/40 transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-5 h-2"
                  : "bg-white/50 hover:bg-white/70 w-2 h-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Preload next */}
        {slides.length > 1 && (
          <div className="sr-only" aria-hidden="true">
            <Image
              src={slides[(currentSlide + 1) % slides.length].image}
              alt="preload" width={100} height={100} priority={false} quality={60}
            />
          </div>
        )}
      </div>

      {/* ════════════════════════════════════════
          CONSULTATION FORM
          Mobile/Tablet → full width, below banner
          Desktop       → absolute right panel
      ════════════════════════════════════════ */}
      <div
        className="
          w-full bg-white flex flex-col
          lg:absolute lg:right-0 lg:top-0 lg:bottom-0
          lg:w-[38%] lg:min-w-[300px] lg:max-w-[540px]
          lg:bg-white/95 lg:backdrop-blur-md lg:shadow-2xl
        "
      >
        {/* ── Header ── */}
        <div
          className="flex-shrink-0 px-5 py-4 text-white"
          style={{ background: "linear-gradient(135deg, #d90f12 0%, #a80c0e 100%)" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Phone size={14} className="opacity-75" />
            <span className="text-[10px] font-semibold uppercase tracking-widest opacity-80">
              Free Consultation
            </span>
          </div>
          <h2 className="text-sm sm:text-base font-bold leading-snug">
            Book Skin Consultation With Trichologist
          </h2>
          <div className="mt-2 flex gap-1">
            <div className="h-[2px] w-8 rounded-full bg-white/80" />
            <div className="h-[2px] w-3 rounded-full bg-white/40" />
            <div className="h-[2px] w-1.5 rounded-full bg-white/20" />
          </div>
        </div>

        {/* ── Form ── */}
        {showThankYou ? (
          <div className="flex-1 px-4 sm:px-5 py-4 flex flex-col items-center justify-center text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Thank You!</h3>
              <p className="text-sm text-gray-600 mb-4">
                Your consultation has been booked successfully. Our trichologist will contact you soon.
              </p>
              <button
                onClick={() => setShowThankYou(false)}
                className="px-4 py-2 bg-[#d90f12] text-white rounded-lg font-semibold hover:bg-[#b80d0f] transition-colors"
              >
                Book Another Consultation
              </button>
            </div>
          </div>
        ) : (
          <form
            id="adgrohairwebsiteform"
            onSubmit={handleSubmit}
            className="flex-1 px-4 sm:px-5 py-4 flex flex-col gap-3"
          >
          {/* Alerts */}
          {submitStatus === "success" && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-2.5 flex items-center gap-2">
              <span className="text-green-600">✅</span>
              <p className="text-green-800 text-xs font-medium">Booked! Redirecting…</p>
            </div>
          )}
          {submitStatus === "error" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-2.5 flex items-center gap-2">
              <span className="text-red-500">❌</span>
              <p className="text-red-800 text-xs font-medium">Something went wrong. Try again.</p>
            </div>
          )}

          {/* ROW 1 — Name + Phone */}
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className={labelClass}>Full Name <span className="text-[#d90f12]">*</span></label>
              <input
                type="text" name="fullName" value={formData.fullName}
                onChange={handleChange} required disabled={isSubmitting}
                placeholder="Your name" className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Phone <span className="text-[#d90f12]">*</span></label>
              <input
                type="tel" name="phone" value={formData.phone}
                onChange={handleChange} required pattern="[0-9]{10}" maxLength={10}
                disabled={isSubmitting} placeholder="10-digit no." className={inputClass}
              />
            </div>
          </div>

          {/* ROW 2 — Email */}
          <div>
            <label className={labelClass}>Email Address <span className="text-[#d90f12]">*</span></label>
            <input
              type="email" name="email" value={formData.email}
              onChange={handleChange} required disabled={isSubmitting}
              placeholder="example@gmail.com" className={inputClass}
            />
          </div>

          {/* ROW 3 — Concern + Pincode */}
          <div className="grid grid-cols-2 gap-3">
            {/* Concern dropdown */}
            <div className="relative">
              <label className={labelClass}>Concern <span className="text-[#d90f12]">*</span></label>
              <button
                type="button"
                onClick={() => setShowConcernsDropdown(!showConcernsDropdown)}
                disabled={isSubmitting}
                className={`${inputClass} flex justify-between items-center text-left`}
              >
                <span className={`truncate text-sm ${formData.concerns ? "text-gray-900" : "text-gray-400"}`}>
                  {formData.concerns || "Select…"}
                </span>
                <ChevronDown
                  size={13}
                  className={`flex-shrink-0 ml-1 text-gray-400 transition-transform duration-200 ${
                    showConcernsDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showConcernsDropdown && (
                <div className="absolute top-full left-0 z-40 w-56 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                  {commonConcerns.map((concern, i) => (
                    <button
                      key={i} type="button"
                      onClick={() => handleSelectConcern(concern)}
                      className="w-full px-3 py-2 text-xs text-left text-gray-700 hover:bg-[#d90f12] hover:text-white border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                    >
                      {concern}
                    </button>
                  ))}
                </div>
              )}
              <input type="hidden" name="concerns" value={formData.concerns} required />
            </div>

            {/* Pincode */}
            <div>
              <label className={labelClass}>Pincode <span className="text-[#d90f12]">*</span></label>
              <input
                type="text" name="pincode" value={formData.pincode}
                onChange={handleChange} required pattern="[0-9]{6}" maxLength={6}
                disabled={isSubmitting} placeholder="6-digit" className={inputClass}
              />
            </div>
          </div>

          {/* ROW 4 — Hair Problem */}
          <div>
            <label className={labelClass}>Describe Skin Problem <span className="text-[#d90f12]">*</span></label>
            <textarea
              name="hairProblems" value={formData.hairProblems}
              onChange={handleChange} required rows={2} disabled={isSubmitting}
              placeholder="Briefly describe your skin concern…"
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Submit */}
          <button
            type="submit" disabled={isSubmitting || !isFormValid}
            className="w-full py-3 rounded-lg font-bold text-sm text-white disabled:cursor-not-allowed disabled:opacity-60 shadow-lg mt-1"
            style={{
              background: isSubmitting || !isFormValid ? "#9ca3af" : "linear-gradient(135deg, #d90f12 0%, #a80c0e 100%)",
            }}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting…
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1.5">
                Book Free Consultation →
              </span>
            )}
          </button>

          <p className="text-center text-[10px] text-gray-400 tracking-wide pb-3">
            🔒 100% Private &amp; Confidential
          </p>
        </form>
        )}
      </div>
    </section>
  );
};

export default HeroSection;