"use client";

import Image from "next/image";
import { ArticleMeta } from "../../types";
import { useLeadModal } from "@/contexts/LeadModalContext";

export function HeroSection({ meta }: { meta: ArticleMeta }) {
  const { openModal } = useLeadModal();
  const publishedDate = new Date(meta.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="relative w-full rounded-[4px] overflow-hidden border border-[#111f43]/15 shadow-sm mb-12 sm:mb-16 min-h-[400px] h-auto md:h-[500px] flex items-end">
      <div className="absolute inset-0 z-0">
        <Image
          src={meta.featuredImage}
          alt={meta.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
        <div className="absolute inset-0 bg-[#111f43]/55 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111f43]/95 via-[#111f43]/40 to-transparent" />
      </div>

      <div className="relative z-10 p-8 md:p-12 w-full text-white">
        <span className="inline-flex items-center gap-2 uppercase tracking-[0.18em] text-[12px] font-bold text-[#d7c2a3] mb-3">
          <span className="w-4 h-[1.5px] bg-[#d7c2a3]"></span>
          {meta.category}
        </span>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-cormorant font-bold leading-[1.12] tracking-tight mb-4 md:mb-6 text-white max-w-[900px] break-words [overflow-wrap:anywhere]">
          {meta.title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-[14px] sm:text-[15px] font-poppins text-[#fbf6f0]/90">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative h-8 w-8 sm:h-10 sm:w-10 overflow-hidden rounded-full border border-[#fbf6f0]/30 shadow-sm shrink-0">
                <Image
                  src={meta.author.avatarUrl}
                  alt={meta.author.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 32px, 40px"
                />
              </div>
              <span className="font-medium text-white">{meta.author.name}</span>
            </div>
            <span className="inline text-[#fbf6f0]/40">|</span>
            <span>{publishedDate}</span>
            <span className="inline text-[#fbf6f0]/40">|</span>
            <span className="text-[#d7c2a3]">{meta.readingTimeMinutes} Min Read</span>
          </div>

            <button 
              onClick={() => openModal()}
              className="w-full sm:w-auto flex items-center justify-center px-7 h-[44px] bg-[#d7c2a3] hover:bg-[#c2ab8a] text-[#111f43] font-poppins text-sm font-semibold tracking-[0.05em] rounded-[4px] shadow-sm transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-[#d7c2a3] focus:ring-offset-2 shrink-0 mt-4 sm:mt-0"
            >
              Book Site Visit
            </button>
        </div>
      </div>
    </section>
  );
}
