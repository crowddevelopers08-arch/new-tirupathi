"use client";

import { useState } from "react";
import { CheckCircle, ChevronDown, Phone } from "lucide-react";

const heroVideoUrl = "https://www.instagram.com/p/DUvQg96D3TW/embed";

const heroHighlights = [
  "Advanced Hair Restoration Treatments",
  "Expert Hair Restoration Specialists",
  "Personalized Hair Regrowth Solutions",
  "Natural Hairline Restoration",
  "FDA-Approved Hair Restoration Technology",
];


const commonConcerns = [
  "Hair Loss",
  "Hair Thinning",
  "Bald Patches",
  "Receding Hairline",
  "Hair Transplant Consultation",
];

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-[#d90f12] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#d90f12]/30 disabled:cursor-not-allowed disabled:bg-gray-100";

const labelClass =
  "mb-0.5 block text-[10px] font-semibold uppercase tracking-wide text-gray-500";

export default function HeroSection() {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectConcern = (concern: string) => {
    setFormData((prev) => ({ ...prev, concerns: concern }));
    setShowConcernsDropdown(false);
  };

  const isFormValid = Object.values(formData).every((value) => value.trim() !== "");

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

      if (!result.success) {
        throw new Error(result.error || "Failed");
      }

      setSubmitStatus("success");
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        concerns: "",
        hairProblems: "",
        pincode: "",
      });
      setTimeout(() => {
        setSubmitStatus("idle");
        setShowThankYou(true);
      }, 500);
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="relative overflow-hidden bg-[#101828] bg-cover bg-center px-4 py-6 sm:px-6 lg:py-8"
      style={{ backgroundImage: "url('/Hairline-Restoration.jpg')" }}
    >
      <div className="absolute inset-0 bg-[#101828]/55" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d90f12]/70 to-transparent" />
      <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#d90f12]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-5 text-white">

          <h1 className="max-w-5xl text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
            Best Hair Restoration Clinic in Tirupati | Advanced Grohair
          </h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <div className="flex rounded-2xl bg-white p-2 shadow-2xl shadow-black/30">
            <div className="flex w-full items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white">
              <div className="relative h-[430px] w-full max-w-[330px] overflow-hidden bg-white sm:h-[455px] lg:h-[445px]">
                <iframe
                  src={heroVideoUrl}
                  title="Advanced Grohair Instagram video"
                  className="absolute left-1/2 top-0 h-[610px] w-[390px] origin-top -translate-x-1/2 scale-[0.705] overflow-hidden sm:scale-[0.745] lg:scale-[0.73]"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  scrolling="no"
                />
              </div>
            </div>
          </div>

          <div className="flex rounded-2xl bg-white p-2 shadow-2xl shadow-black/30">
            <div className="flex w-full flex-col overflow-hidden rounded-xl border border-gray-100">
              <div className="bg-[#d90f12] px-5 py-4 text-white sm:px-6">
              <div className="mb-1 flex items-center gap-2">
                <Phone className="h-4 w-4 opacity-75" />
                <span className="text-[10px] font-semibold uppercase tracking-widest opacity-80">
                  FREE HAIR RESTORATION CONSULTATION
                </span>
              </div>
              <h2 className="text-base font-bold leading-snug sm:text-lg">
                Book Hair Consultation With Hair Restoration Specialists
              </h2>
              <div className="mt-3 flex gap-1">
                <div className="h-[2px] w-8 rounded-full bg-white/80" />
                <div className="h-[2px] w-3 rounded-full bg-white/40" />
                <div className="h-[2px] w-1.5 rounded-full bg-white/20" />
              </div>
            </div>

            {showThankYou ? (
              <div className="flex flex-1 flex-col items-center justify-center px-5 py-10 text-center sm:px-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-800">Thank You!</h3>
                <p className="mb-5 text-sm text-gray-600">
                  Your consultation has been booked successfully. Our specialist will contact you soon.
                </p>
                <button
                  type="button"
                  onClick={() => setShowThankYou(false)}
                  className="rounded-lg bg-[#d90f12] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#b80d0f]"
                >
                  Book Another Consultation
                </button>
              </div>
            ) : (
              <form
                id="adgrohairwebsiteform"
                onSubmit={handleSubmit}
                className="flex flex-1 flex-col gap-2.5 px-4 py-4 sm:px-5"
              >
                {submitStatus === "success" && (
                  <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-2.5">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <p className="text-xs font-medium text-green-800">Booked successfully.</p>
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-2.5">
                    <span className="text-red-500">!</span>
                    <p className="text-xs font-medium text-red-800">Something went wrong. Try again.</p>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      FULL NAME <span className="text-[#d90f12]">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      PHONE <span className="text-[#d90f12]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      pattern="[0-9]{10}"
                      maxLength={10}
                      disabled={isSubmitting}
                      placeholder="10-digit no."
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    EMAIL ADDRESS <span className="text-[#d90f12]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    placeholder="example@gmail.com"
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <div className="relative">
                    <label className={labelClass}>
                      HAIR CONCERN <span className="text-[#d90f12]">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowConcernsDropdown((prev) => !prev)}
                      disabled={isSubmitting}
                      className={`${inputClass} flex items-center justify-between text-left`}
                    >
                      <span
                        className={`truncate text-sm ${
                          formData.concerns ? "text-gray-900" : "text-gray-400"
                        }`}
                      >
                        {formData.concerns || "Select..."}
                      </span>
                      <ChevronDown
                        className={`ml-1 h-3.5 w-3.5 flex-shrink-0 text-gray-400 transition-transform duration-200 ${
                          showConcernsDropdown ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {showConcernsDropdown && (
                      <div className="absolute left-0 top-full z-40 mt-1 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                        {commonConcerns.map((concern) => (
                          <button
                            key={concern}
                            type="button"
                            onClick={() => handleSelectConcern(concern)}
                            className="w-full border-b border-gray-100 px-3 py-2 text-left text-xs text-gray-700 transition-colors duration-150 last:border-b-0 hover:bg-[#d90f12] hover:text-white"
                          >
                            {concern}
                          </button>
                        ))}
                      </div>
                    )}
                    <input type="hidden" name="concerns" value={formData.concerns} required />
                  </div>

                  <div>
                    <label className={labelClass}>
                      PINCODE <span className="text-[#d90f12]">*</span>
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                      pattern="[0-9]{6}"
                      maxLength={6}
                      disabled={isSubmitting}
                      placeholder="6-digit"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    DESCRIBE YOUR HAIR PROBLEM <span className="text-[#d90f12]">*</span>
                  </label>
                  <textarea
                    name="hairProblems"
                    value={formData.hairProblems}
                    onChange={handleChange}
                    required
                    rows={2}
                    disabled={isSubmitting}
                    placeholder="Briefly describe your hair concern..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !isFormValid}
                  className="mt-1 w-full rounded-lg py-2.5 text-sm font-bold text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                  style={{
                    background:
                      isSubmitting || !isFormValid
                        ? "#9ca3af"
                        : "linear-gradient(135deg, #d90f12 0%, #a80c0e 100%)",
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Submitting...
                    </span>
                  ) : (
                    "Book Free Consultation ->"
                  )}
                </button>

                <p className="pb-1 text-center text-[10px] tracking-wide text-gray-400">
                  100% Private &amp; Confidential
                </p>
              </form>
              )}
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="tel:+918940056789"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:border-[#d90f12]/60 hover:bg-[#d90f12]/20"
          >
            <Phone className="h-4 w-4" />
            +91 89400 56789
          </a>
          <a
            href="#adgrohairwebsiteform"
            className="inline-flex items-center justify-center rounded-lg bg-[#d90f12] px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#d90f12]/20 transition-colors hover:bg-[#b80d0f]"
          >
            Book Now
          </a>
        </div>

        <div className="mt-5 grid overflow-hidden rounded-xl  bg-white/[0.04]">
            <ul className=" grid gap-2 sm:grid-cols-5">
              {heroHighlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-xs font-semibold text-[#e7e9f3] sm:text-sm"
                >
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
        </div>
      </div>
    </section>
  );
}
