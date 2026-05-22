"use client";

import Image from "next/image";
import { ArrowRight, CheckCircle2, MapPin, ShieldCheck } from "lucide-react";
import { useState } from "react";
import ConsultationFormPopup from "./popup";

const searches = [
  "Hair transplant near me",
  "Bald hair transplant",
  "Good hair transplant",
  "FUE hair transplant near me",
  "Hair transplant clinic near me",
  "Best hair transplant doctor Tirupati",
  "Hair graft transplant Tirupati",
  "Permanent hair transplant",
  "Natural hair transplant",
];

export default function BestHairTransplantClinic() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden px-4 py-12 text-white sm:px-6 lg:py-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(0deg, rgba(217,15,18,0.18) 1px, transparent 1px)",
            backgroundSize: "18px 18px, 100% 72px",
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d90f12] to-transparent" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-8 text-center sm:mb-10">
            <h2 className="mx-auto max-w-5xl text-3xl font-bold leading-tight tracking-tight text-[#d90f12] sm:text-4xl lg:text-5xl">
              Best Hair Transplant Clinic in Tirupati
            </h2>
            <p className="mt-3 text-lg font-semibold text-white sm:text-xl">Advanced Grohair Clinic</p>
            <div className="mx-auto mt-4 h-1 w-full max-w-xl bg-gradient-to-r from-transparent via-[#d90f12] to-transparent" />
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
            <div className="flex flex-col justify-center rounded-2xl border border-white/10 bg-[#101828]/95 p-5 sm:p-8 lg:p-10">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#d90f12]/40 bg-[#d90f12]/10 px-4 py-2 text-sm font-semibold text-[#ffb4b5]">
                  <MapPin className="h-4 w-4" />
                  Tirupati Hair Transplant Clinic
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-[#d9dde8]">
                  <ShieldCheck className="h-4 w-4 text-green-400" />
                  FUE and FUT techniques
                </span>
              </div>

              <div className="space-y-4 text-base leading-8 text-[#c8cedd] sm:text-lg">
                <p>
                  Looking for the best hair transplant in Tirupati? At Advanced Grohair, we provide advanced hair
                  transplant solutions with natural-looking results for men and women experiencing hair loss, bald spots,
                  receding hairline, thinning crown, and male pattern baldness.
                </p>
                <p>
                  Our experienced hair transplant surgeons use advanced FUE Hair Transplant and FUT Hair Transplant
                  techniques to deliver safe, effective, and permanent hair restoration treatments.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {searches.map((search) => (
                  <div
                    key={search}
                    className="group flex min-h-[64px] items-center gap-3 rounded-xl  border-3 border-double  border-border/60 bg-[#101828] px-4 py-3 transition duration-300"
                  >
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-yellow-300 transition duration-300 group-hover:text-white" />
                    <span className="text-sm font-semibold leading-snug text-white sm:text-base">{search}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-xl border-l-4 border-[#d90f12] bg-black/25 p-5">
                <p className="text-base font-medium leading-8 text-[#edf0f7] sm:text-lg">
                  Advanced Grohair is trusted as one of the top hair transplant clinics in Tirupati.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsPopupOpen(true)}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#d90f12] px-6 py-4 text-base font-bold text-white shadow-xl shadow-[#d90f12]/20 transition duration-300 hover:bg-[#b80d0f] hover:shadow-[#d90f12]/35 sm:w-fit"
              >
                Book Hair Transplant Consultation
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            <div className="relative min-h-[440px] overflow-hidden rounded-2xl border border-white/10 bg-[#101828]">
              <Image
                src="/Hairline-Restoration.jpg"
                alt="Advanced Grohair natural hair transplant result"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 48vw, 100vw"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090d14] via-[#090d14]/25 to-transparent" />
              <div className="absolute inset-0 mix-blend-overlay opacity-45 [background-image:linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:7px_100%]" />
            </div>
          </div>
        </div>
      </section>

      <ConsultationFormPopup isOpen={isPopupOpen} onOpenChange={setIsPopupOpen} />
    </>
  );
}
