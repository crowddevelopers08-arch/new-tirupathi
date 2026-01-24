"use client"

import { useState } from "react"
import { X, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"

interface ConsultationFormPopupProps {
  triggerButton?: React.ReactNode
  isOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
}

const ConsultationFormPopup: React.FC<ConsultationFormPopupProps> = ({
  triggerButton,
  isOpen: controlledIsOpen,
  onOpenChange,
}) => {
  const router = useRouter()
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    concerns: "",
    hairProblems: "",
    pincode: "",
  })
  const [showConcernsDropdown, setShowConcernsDropdown] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle",
  )

  const isControlled = controlledIsOpen !== undefined
  const open = isControlled ? controlledIsOpen : internalIsOpen

  const setIsOpen = (value: boolean) => {
    if (isControlled) onOpenChange?.(value)
    else setInternalIsOpen(value)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSelectConcern = (concern: string) => {
    setFormData((prev) => ({ ...prev, concerns: concern }))
    setShowConcernsDropdown(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const leadData = {
        name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        concerns: formData.concerns,
        hairProblems: formData.hairProblems,
        message: formData.hairProblems,
        pincode: formData.pincode,
        consent: true,
        source:
          typeof window !== "undefined" ? window.location.href : "unknown",
        formName: "Hair Consultation Form",
      }

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadData),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus("success")

        setFormData({
          fullName: "",
          phone: "",
          email: "",
          concerns: "",
          hairProblems: "",
          pincode: "",
        })

        setTimeout(() => {
          setIsOpen(false)
          setSubmitStatus("idle")
          router.push("/thank-you")
        }, 500)
      } else {
        throw new Error(result.error || "Failed to submit form")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const commonConcerns = [
    "Hair Transplant",
    "Hair Loss Treatment",
    "Alopecia Areata",
    "Dandruff Treatment",
    "Baldness Treatment",
    "Hair Thinning Treatment",
    "Receding Hair Solutions",
    "Genetic Hair Loss Treatment",
  ]

  return (
    <>
      {/* Custom Trigger Button */}
      {triggerButton && (
        <div onClick={() => setIsOpen(true)} className="inline-block">
          {triggerButton}
        </div>
      )}

      {/* Popup Overlay - Centered on all screens */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-50">
          {/* Form Container - Centered with max width constraints */}
          <div 
            className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md mx-auto my-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside form
          >
            {/* Close button positioned absolutely */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-2 -right-2 z-10 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100 transition-colors"
              disabled={isSubmitting}
            >
              <X size={20} className="text-gray-600" />
            </button>

            {/* Header */}
            <div className="bg-[#d90f12] text-white p-4 sm:p-6 rounded-t-xl sm:rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-bold leading-tight pr-2">
                  Book Hair Consultation With Trichologist
                </h2>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4 max-h-[80vh] overflow-y-auto">
              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-green-800 text-sm font-medium">
                    Thank you! Your consultation has been booked successfully. 
                    Redirecting to thank you page...
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-800 text-sm font-medium">
                    There was an error submitting your form. Please try again.
                  </p>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d90f12] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Valid 10 Digit Phone No.
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
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d90f12] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter 10 digit phone number"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d90f12] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Example@gmail.com"
                />
              </div>

              {/* Concerns - Dropdown */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  What Are Your Concerns
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowConcernsDropdown(!showConcernsDropdown)}
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d90f12] focus:border-transparent text-left bg-white flex justify-between items-center disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <span className={formData.concerns ? "text-gray-900" : "text-gray-500"}>
                      {formData.concerns || "Select your concerns"}
                    </span>
                    <ChevronDown 
                      size={16} 
                      className={`transform transition-transform ${showConcernsDropdown ? 'rotate-180' : ''}`}
                    />
                  </button>
                  
                  {showConcernsDropdown && (
                    <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-32 overflow-y-auto">
                      {commonConcerns.map((concern, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleSelectConcern(concern)}
                          className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg border-b border-gray-200 last:border-b-0"
                        >
                          {concern}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  type="hidden"
                  name="concerns"
                  value={formData.concerns}
                  required
                />
              </div>

              {/* Hair Problems */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  What Hair Problems Are You Facing
                </label>
                <textarea
                  name="hairProblems"
                  value={formData.hairProblems}
                  onChange={handleChange}
                  required
                  rows={2}
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d90f12] focus:border-transparent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Describe your hair problems in detail"
                />
              </div>

              {/* Pincode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type 6 Digit Your Pincode Here
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
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d90f12] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter 6 digit pincode"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#d90f12] text-white py-3 rounded-lg font-semibold hover:bg-[#b80d0f] transition-colors text-sm sm:text-base mt-3 sm:mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Book Consultation'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ConsultationFormPopup;