"use client";

import React from "react";
import { Phone, Calendar } from "lucide-react";
import { useLeadModal } from "../../contexts/LeadModalContext";

export function MobileStickyBar() {
  const { openModal } = useLeadModal();

  return (
    <div 
      className="md:hidden fixed left-4 right-4 z-[99999] h-[72px] bg-white rounded-[20px] p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.14)] border border-slate-100 flex items-center gap-2.5 transition-all duration-350 ease-out animate-in fade-in slide-in-from-bottom-3"
      style={{
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)",
      }}
      aria-label="Floating Mobile Action Bar"
    >
      {/* Left Button: Talk to Expert (Centered Icon + Text Group) */}
      <a
        href="tel:18002003676"
        className="flex-1 h-[60px] bg-white hover:bg-slate-50 border border-slate-200 text-[#0B1E59] rounded-[16px] px-2 flex items-center justify-center gap-3 active:scale-[0.98] transition-all duration-200 cursor-pointer no-underline min-w-0"
      >
        <div className="w-8.5 h-8.5 rounded-full bg-[#0B1E59]/10 flex items-center justify-center shrink-0">
          <Phone className="w-4 h-4 text-[#0B1E59]" />
        </div>
        <div className="flex flex-col justify-center text-left min-w-0">
          <span className="font-poppins font-semibold text-[14px] leading-tight text-[#0B1E59] whitespace-nowrap">
            Talk to Expert
          </span>
          <span className="font-poppins font-medium text-[11.5px] leading-tight text-[#64748B] whitespace-nowrap mt-0.5">
            1800 200 3676
          </span>
        </div>
      </a>

      {/* Right Button: Schedule Site Visit */}
      <button
        onClick={() => openModal('site-visit')}
        className="flex-1 h-[60px] bg-[#0B1E59] hover:bg-[#10254A] active:bg-[#07133b] text-white rounded-[16px] px-3 flex items-center justify-center gap-2 active:scale-[0.98] transition-all duration-200 cursor-pointer min-w-0 border-none"
      >
        <Calendar className="w-4.5 h-4.5 text-[#D6B37A] shrink-0" />
        <span className="font-poppins font-semibold text-[14px] leading-tight text-white truncate">
          Schedule Site Visit
        </span>
      </button>
    </div>
  );
}
