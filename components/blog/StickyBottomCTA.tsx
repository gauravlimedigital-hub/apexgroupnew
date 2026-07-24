"use client";

import { useEffect, useState } from "react";
import { Calendar, Phone } from "lucide-react";
import { CTAConfig } from "../../types";
import { useLeadModal } from "@/contexts/LeadModalContext";

export function StickyBottomCTA({ config }: { config?: CTAConfig }) {
  const { openModal } = useLeadModal();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down 500px
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!config) return null;

  return (
    <div className={`flex md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-zinc-200 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] transform transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="flex gap-3 max-w-md mx-auto w-full">
        <a
          href="tel:18002003676"
          aria-label="Call Apex Expert at 1800 200 3676"
          className="flex-1 flex items-center justify-center gap-2 py-3 px-2 sm:px-4 rounded-[4px] border border-[#111f43] text-[#111f43] font-semibold text-[13px] sm:text-[14px] font-poppins bg-[#fbf6f0] active:bg-[#e8e2db] transition-colors min-h-[48px]"
        >
          <Phone className="w-[14px] h-[14px] sm:w-4 sm:h-4 shrink-0" />
          <div className="flex flex-col items-start leading-[1.2]">
            <span>Talk to Expert</span>
            <span className="text-[10px] sm:text-[11px] font-medium opacity-80">1800 200 3676</span>
          </div>
        </a>
        <button
          onClick={() => openModal()}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-2 sm:px-4 rounded-[4px] bg-[#111f43] text-white font-semibold text-[13px] sm:text-[14px] font-poppins active:bg-[#354773] transition-colors min-h-[48px]"
        >
          <Calendar className="w-[14px] h-[14px] sm:w-4 sm:h-4 text-[#d7c2a3]" />
          Schedule Site Visit
        </button>
      </div>
    </div>
  );
}
