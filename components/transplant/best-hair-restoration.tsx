"use client";

import { MapPin, Search, Sparkles } from "lucide-react";

const searchItems = [
  "Hair restoration near me",
  "Hair restoration clinic near me",
  "Hair restoration center near me",
  "Medical hair restoration clinic",
  "Hair restoration specialists",
  "Hair restoration for men near me",
  "Women's hair restoration near me",
];

export default function BestHairRestoration() {
  return (
    <section className="relative overflow-hidden bg-[#101828] px-4 py-12 sm:px-6">
      <div className="absolute inset-0 bg-[url('/Medical-Hair-Restoration-Clinic.jpg')] bg-cover bg-center opacity-25" />
      <div className="absolute inset-0 bg-[#101828]/85" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d90f12]/60 to-transparent" />
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#d90f12]/10 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid overflow-hidden rounded-2xl border border-white/10 bg-[#111b2c] shadow-2xl shadow-black/20 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative flex flex-col justify-between border-b border-white/10 bg-[#0f1726] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d90f12]/30 bg-[#d90f12]/10 px-4 py-2 text-sm font-semibold text-white">
                <MapPin className="h-4 w-4 text-[#d90f12]" />
                Tirupati
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                Best Hair Restoration Clinic Near You
              </h2>

              <div className="mt-5 h-1 w-full max-w-md bg-gradient-to-r from-[#d90f12] via-[#d90f12]/80 to-transparent" />

              <p className="mt-8 text-base leading-relaxed text-[#d8dbe8] sm:text-lg">
                Looking for the best hair restoration near me or trusted hair restoration specialists in Tirupati?
              </p>
            </div>

            <div className="mt-8 rounded-xl border-4 border-double border-yellow-400/70 bg-white/[0.04] p-5">
              <div className="mb-3 flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-[#d90f12]" />
                <p className="text-lg font-semibold text-white">Advanced Grohair</p>
              </div>
              <p className="border-l-4 border-double border-yellow-400 pl-4 text-base leading-relaxed text-[#d8dbe8]">
                Advanced Grohair delivers safe, natural-looking, and long-lasting hair restoration results.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="space-y-5 text-base leading-relaxed text-[#d8dbe8] sm:text-lg">
              <p>
                Advanced Grohair is a leading hair restoration clinic in Tirupati offering advanced, medically backed solutions for hair loss, baldness, thinning hair, receding hairline, alopecia, and scalp-related concerns.
              </p>
              <p>
                Our experienced hair restoration surgeons and hair restoration doctors provide customized treatment plans for both men and women.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-[#101828] p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-center gap-3 text-center sm:justify-start sm:text-left">
                <Search className="h-5 w-5 flex-shrink-0 text-[#d90f12]" />
                <p className="text-lg font-semibold text-white">Whether you are searching for:</p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {searchItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border-4 border-double border-white/10 bg-white/[0.04] px-4 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:border-[#d90f12]/50 hover:bg-[#d90f12]/10 sm:text-left sm:text-base"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
