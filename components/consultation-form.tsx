"use client";

import { useState } from "react";
import { ChevronDown, Phone } from "lucide-react";
import { useRouter } from "next/navigation";

const commonConcerns = [
  "Hair Transplant",
  "Hair Loss Treatment",
  "Alopecia Areata",
  "Dandruff Treatment",
  "Baldness Treatment",
  "Hair Thinning Treatment",
  "Receding Hair Solutions",
  "Genetic Hair Loss Treatment",
];

const inputClass =
  "w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d90f12]/30 focus:border-[#d90f12] focus:bg-white transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed placeholder:text-gray-400";

const labelClass = "text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block";

const ConsultationForm = () => {
  const router = useRouter();

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectConcern = (concern: string) => {
    setFormData((prev) => ({ ...prev, concerns: concern }));
    setShowConcernsDropdown(false);
  };

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
        setTimeout(() => { setSubmitStatus("idle"); router.push("/thank-you"); }, 500);
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
    <section className="w-full bg-gray-50 px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto w-full max-w-xl">
      <div className="w-full overflow-hidden rounded-xl bg-white shadow-2xl">
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
            Book Hair Consultation With Trichologist
          </h2>
          <div className="mt-2 flex gap-1">
            <div className="h-[2px] w-8 rounded-full bg-white/80" />
            <div className="h-[2px] w-3 rounded-full bg-white/40" />
            <div className="h-[2px] w-1.5 rounded-full bg-white/20" />
          </div>
        </div>

        {/* ── Form ── */}
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
            <label className={labelClass}>Describe Hair Problem <span className="text-[#d90f12]">*</span></label>
            <textarea
              name="hairProblems" value={formData.hairProblems}
              onChange={handleChange} required rows={2} disabled={isSubmitting}
              placeholder="Briefly describe your hair concern…"
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Submit */}
          <button
            type="submit" disabled={isSubmitting}
            className="w-full py-3 rounded-lg font-bold text-sm text-white transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 shadow-lg mt-1"
            style={{
              background: isSubmitting ? "#9ca3af" : "linear-gradient(135deg, #d90f12 0%, #a80c0e 100%)",
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
      </div>
      </div>
    </section>
  );
};

export default ConsultationForm;
