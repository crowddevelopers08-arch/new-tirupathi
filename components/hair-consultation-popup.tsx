"use client"

import type { ChangeEvent, FormEvent, ReactNode } from "react"
import { useState } from "react"
import { CheckCircle, ChevronDown, X } from "lucide-react"

interface ConsultationFormPopupProps {
  triggerButton?: ReactNode
  isOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  formName?: string
}

const commonConcerns = [
  "Hair Loss",
  "Hair Thinning",
  "Bald Patches",
  "Receding Hairline",
  "Hair Transplant Consultation",
]

const emptyFormData = {
  fullName: "",
  phone: "",
  email: "",
  concerns: "",
  hairProblems: "",
  pincode: "",
}

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-[#d90f12] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#d90f12]/30 disabled:cursor-not-allowed disabled:bg-gray-100 sm:text-base lg:py-2.5"

const labelClass =
  "mb-0.5 block text-[10px] font-semibold uppercase tracking-wide text-gray-500"

const ConsultationFormPopup: React.FC<ConsultationFormPopupProps> = ({
  triggerButton,
  isOpen: controlledIsOpen,
  onOpenChange,
  formName = "website leads",
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const [formData, setFormData] = useState(emptyFormData)
  const [showConcernsDropdown, setShowConcernsDropdown] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle",
  )
  const [showThankYou, setShowThankYou] = useState(false)

  const isControlled = controlledIsOpen !== undefined
  const open = isControlled ? controlledIsOpen : internalIsOpen

  const setIsOpen = (value: boolean) => {
    if (isControlled) onOpenChange?.(value)
    else setInternalIsOpen(value)
  }

  const isFormValid = Object.values(formData).every(
    (value) => value.trim() !== "",
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSelectConcern = (concern: string) => {
    setFormData((prev) => ({ ...prev, concerns: concern }))
    setShowConcernsDropdown(false)
  }

  const closePopup = () => {
    setShowConcernsDropdown(false)
    setShowThankYou(false)
    setSubmitStatus("idle")
    setIsOpen(false)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

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
          formName,
        }),
      })
      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || "Failed to submit form")
      }

      setSubmitStatus("success")
      setFormData(emptyFormData)
      setTimeout(() => {
        setSubmitStatus("idle")
        setShowThankYou(true)
      }, 500)
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {triggerButton && (
        <div onClick={() => setIsOpen(true)} className="inline-block">
          {triggerButton}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div
            className="relative mx-auto my-auto w-full max-w-xl rounded-xl bg-white shadow-2xl sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closePopup}
              className="absolute -right-2 -top-2 z-10 rounded-full bg-white p-1 shadow-lg transition-colors hover:bg-gray-100"
              disabled={isSubmitting}
              aria-label="Close consultation form"
            >
              <X size={20} className="text-gray-600" />
            </button>

            <div className="rounded-t-xl bg-[#d90f12] px-5 py-4 text-white sm:rounded-t-2xl sm:px-6">
              <div className="mb-1 flex items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-widest opacity-80">
                  Free hair  consultation
                </span>
              </div>
              <h2 className="text-base font-bold leading-snug sm:text-lg">
                Book Hair Consultation With Trichologist
              </h2>
              <div className="mt-3 flex gap-1">
                <div className="h-[2px] w-8 rounded-full bg-white/80" />
                <div className="h-[2px] w-3 rounded-full bg-white/40" />
                <div className="h-[2px] w-1.5 rounded-full bg-white/20" />
              </div>
            </div>

            {showThankYou ? (
              <div className="flex flex-col items-center justify-center px-5 py-10 text-center sm:px-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-800">Thank You!</h3>
                <p className="mb-5 text-sm text-gray-600">
                  Your consultation has been booked successfully. Our specialist will contact you soon.
                </p>
                <button
                  type="button"
                  onClick={closePopup}
                  className="rounded-lg bg-[#d90f12] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#b80d0f]"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                id="adgrohairwebsiteform"
                onSubmit={handleSubmit}
                className="max-h-[80vh] overflow-y-auto px-4 py-4 sm:px-5 lg:px-6 lg:pb-5 lg:pt-5"
              >
                <div className="flex flex-col gap-3">
                  {submitStatus === "success" && (
                    <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-2.5">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <p className="text-xs font-medium text-green-800">
                        Booked successfully.
                      </p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-2.5">
                      <span className="text-red-500">!</span>
                      <p className="text-xs font-medium text-red-800">
                        Something went wrong. Try again.
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>
                        Full name <span className="text-[#d90f12]">*</span>
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
                        Phone <span className="text-[#d90f12]">*</span>
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
                      Email address <span className="text-[#d90f12]">*</span>
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
                        Hair concern <span className="text-[#d90f12]">*</span>
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
                        <div className="absolute left-0 top-full z-40 mt-1 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl sm:w-56">
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
                      <input
                        type="hidden"
                        name="concerns"
                        value={formData.concerns}
                        required
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Pincode <span className="text-[#d90f12]">*</span>
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
                      Describe your hair problem{" "}
                      <span className="text-[#d90f12]">*</span>
                    </label>
                    <textarea
                      name="hairProblems"
                      value={formData.hairProblems}
                      onChange={handleChange}
                      required
                      rows={2}
                      disabled={isSubmitting}
                      placeholder="Briefly describe your hair concern..."
                      className={`${inputClass} resize-none lg:min-h-[88px]`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !isFormValid}
                    className="mt-1 w-full rounded-lg py-2.5 text-sm font-bold text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-60 lg:py-3"
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
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ConsultationFormPopup
