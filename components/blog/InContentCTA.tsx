"use client";

import { CTAConfig } from "../../types";

import { useLeadModal } from "@/contexts/LeadModalContext";

export function InContentCTA({ config }: { config?: CTAConfig }) {
  const { openModal } = useLeadModal();

  if (!config) return null;
  return (
    <div className={`my-10 ${config.bgColor || 'bg-[#fbf6f0]'} border border-[#111f43]/15 rounded-[4px] p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm`}>
      <div>
        <h3 className="text-xl font-bold text-[#111f43] mb-2 font-cormorant text-[26px] tracking-tight">
          {config.title}
        </h3>
        {config.description && (
          <p className="text-[#555555] font-poppins text-[15px] leading-relaxed">
            {config.description}
          </p>
        )}
      </div>
      <button onClick={() => openModal()} className="whitespace-nowrap bg-[#111f43] border border-[#111f43] text-white hover:bg-[#354773] font-semibold font-poppins text-[14px] tracking-[0.05em] py-2.5 px-7 rounded-[4px] transition-colors duration-300 shadow-sm inline-block">
        {config.buttonText}
      </button>
    </div>
  );
}
