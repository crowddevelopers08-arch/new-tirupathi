"use client";

import Image from "next/image";
import { Activity, CheckCircle2, MapPin, ShieldCheck, Sparkles } from "lucide-react";

const concerns = [
  "Hair loss and hair regrowth concerns",
  "Severe hair thinning",
  "Weak hair roots",
  "Receding hairline",
  "Bald patches",
  "Excessive hair fall",
];

export default function BestRegrowthTreatment() {
  return (
    <section className="relative overflow-hidden  px-4 py-12 text-white sm:px-6 lg:py-12">
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
          <h2 className="mx-auto text-[#d90f12] max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Best Hair Regrowth Treatment{" "}
            <span className="text-[#d90f12]">Near You</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-full max-w-xl bg-gradient-to-r from-transparent via-[#d90f12] to-transparent" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        <div className="flex flex-col justify-center rounded-2xl border border-white/10 bg-[#101828]/95 p-5 sm:p-8 lg:p-10">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d90f12]/40 bg-[#d90f12]/10 px-4 py-2 text-sm font-semibold text-[#ffb4b5]">
              <MapPin className="h-4 w-4" />
              Tirupati Hair Regrowth Clinic
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-[#d9dde8]">
              <ShieldCheck className="h-4 w-4 text-green-400" />
              Medically backed care
            </span>
          </div>

          <div className="mt-5 space-y-4 text-base leading-8 text-[#c8cedd] sm:text-lg">
            <p>
              Looking for the best treatment for hair regrowth or advanced hair regrowth treatment in Tirupati?
            </p>
            <p>
              Advanced Grohair offers medically backed hair regrowth treatment solutions designed to reduce hair fall,
              stimulate natural hair regrowth, and improve scalp health for both men and women.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {concerns.map((concern) => (
              <div
                key={concern}
                className="group flex min-h-[64px] items-center gap-3 rounded-xl border-3 border-double  border-border/60 bg-[#101828] px-4 py-3 transition duration-300  hover:bg-[#101828]"
              >
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500 transition duration-300 group-hover:text-white" />
                <span className="text-sm font-semibold leading-snug text-white sm:text-base">{concern}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border-l-4 border-[#d90f12] bg-black/25 p-5">
            <p className="text-base font-medium leading-8 text-[#edf0f7] sm:text-lg">
              Our customized hair treatment for regrowth helps restore healthier, thicker, and stronger hair naturally.
            </p>
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-[#101828]">
          <Image
            src="/Laser-Hair-Restoration.avif"
            alt="Advanced Grohair hair regrowth treatment"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 48vw, 100vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090d14] via-[#090d14]/25 to-transparent" />
          <div className="absolute inset-0 mix-blend-overlay opacity-45 [background-image:linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:7px_100%]" />

          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/15 bg-black/55 p-4 backdrop-blur-md">
                <Activity className="mb-3 h-6 w-6 text-[#d90f12]" />
                <p className="text-sm font-semibold text-white">Reduces hair fall and supports stronger roots.</p>
              </div>
              <div className="rounded-xl border border-white/15 bg-black/55 p-4 backdrop-blur-md">
                <Sparkles className="mb-3 h-6 w-6 text-green-400" />
                <p className="text-sm font-semibold text-white">Designed for natural regrowth and scalp health.</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
