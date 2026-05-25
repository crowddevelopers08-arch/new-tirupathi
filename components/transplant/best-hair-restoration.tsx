"use client";

import { MapPin, Search } from "lucide-react";

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
    <section className="bg-[#101828] px-4 max-sm:py-5 py-12 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#101828]">

          {/* Top Header - centered */}
          <div className="border-b border-white/10 px-6 max-sm:py-5 py-10 text-center sm:px-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d90f12]/35 bg-[#d90f12]/10 px-4 py-2 text-xs font-semibold text-[#ff5558]">
              <MapPin className="h-3.5 w-3.5" />
              Tirupati
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Best Hair Restoration Clinic Near You
            </h2>

            <div className="mx-auto mt-4 h-[3px] w-14 rounded-full bg-[#d90f12]" />

            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#8a9ab8] sm:text-base">
              Looking for the best hair restoration near me or trusted hair restoration specialists in Tirupati?
            </p>
          </div>

          {/* Body - two columns */}
          <div className="grid grid-cols-1 border-b border-white/10 sm:grid-cols-2">
            <div className="border-b border-white/10 px-6 py-6 sm:border-b-0 sm:border-r sm:px-10">
              <p className="text-sm leading-relaxed text-[#8a9ab8] sm:text-base">
                Advanced Grohair is a leading hair restoration clinic in Tirupati offering advanced, medically backed solutions for hair loss, baldness, thinning hair, receding hairline, alopecia, and scalp-related concerns.
              </p>
            </div>
            <div className="px-6 py-6 sm:px-10">
              <p className="text-sm leading-relaxed text-[#8a9ab8] sm:text-base">
                Our experienced hair restoration surgeons and hair restoration doctors provide customized treatment plans for both men and women.
              </p>
            </div>
          </div>

          {/* Search Items */}
          <div className="px-6 py-8 sm:px-10">
            <div className="mb-5 flex items-center gap-2">
              <Search className="h-4 w-4 text-[#d90f12]" />
              <p className="text-sm font-semibold text-white sm:text-base">
                Whether you are searching for:
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {searchItems.map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#0d1524] px-4 py-3 transition-colors duration-200 hover:border-[#d90f12]/45"
                >
                  <span className="pt-0.5 text-xs font-semibold text-[#d90f12]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-[#8a9ab8]">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}