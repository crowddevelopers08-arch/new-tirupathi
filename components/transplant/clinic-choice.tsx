"use client";

import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const rows = [
  [
    "Trusted Hair Restoration Specialists",
    "Advanced Hair Restoration Technology",
    "Personalized Hair Restoration Treatments",
    "Natural Hairline Restoration Experts",
  ],
  [
    "Hair Restoration for Men & Women",
    "Medical Hair Restoration Clinic",
    "Safe & FDA-Approved Procedures",
  ],
  ["2,00,000+ Happy Patients"],
];

function ChoiceCard({ text }: { text: string }) {
  return (
    <Card className="h-full border-border/70 bg-[#101828] p-1 backdrop-blur transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
      <div className="flex h-full items-center justify-center gap-3 rounded-xl border border-border/60 p-4 text-center sm:p-5">
        <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-400 sm:h-6 sm:w-6" />
        <p className="text-sm font-semibold leading-snug text-white sm:text-base">{text}</p>
      </div>
    </Card>
  );
}

export default function ClinicChoice() {
  return (
    <section className=" px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-12">
          <div className="relative inline-block">
            <h2 className="px-4 py-2 text-3xl font-bold tracking-tight text-[#d90f12] sm:text-4xl md:text-5xl">
              Why Patients Choose Our Hair Restoration Clinic
            </h2>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#d90f12] to-transparent" />
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {rows[0].map((item) => (
              <ChoiceCard key={item} text={item} />
            ))}
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rows[1].map((item) => (
              <ChoiceCard key={item} text={item} />
            ))}
          </div>

          <div className="mx-auto max-w-sm">
            {rows[2].map((item) => (
              <ChoiceCard key={item} text={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
