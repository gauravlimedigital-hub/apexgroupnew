"use client";

import { CTAConfig } from "../../types";

import { useLeadModal } from "@/contexts/LeadModalContext";

export function FinalCTA({ config }: { config?: CTAConfig }) {
  const { openModal } = useLeadModal();

  if (!config) return null;
  return (
    <section className="mt-20 w-full bg-white border-t border-[#111f43]/10 py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-multiply pointer-events-none" />
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <h2 className="text-4xl md:text-5xl font-cormorant font-bold text-[#111f43] mb-6 leading-[1.15] tracking-tight">
          Ready to Find Your Dream Home?
        </h2>
        <p className="font-poppins text-[#555555] text-[18px] mb-12 max-w-2xl mx-auto leading-[1.85]">
          Book a private consultation with an Apex Property Advisor.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => openModal()} 
            className="w-auto min-w-[180px] sm:min-w-[200px] max-w-[240px] flex items-center justify-center px-7 h-[44px] bg-[#d7c2a3] hover:bg-[#c2ab8a] text-[#111f43] font-poppins text-sm font-semibold tracking-[0.05em] rounded-[4px] shadow-sm transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-[#d7c2a3] focus:ring-offset-2"
          >
            Book Site Visit
          </button>
        </div>
      </div>
    </section>
  );
}
