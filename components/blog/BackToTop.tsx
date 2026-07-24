"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "../../lib/utils";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={cn(
        "fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40 p-3 rounded-[4px] bg-[#111f43] text-[#d7c2a3] border border-[#d7c2a3]/30 shadow-sm hover:bg-[#354773] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111f43] focus-visible:ring-offset-2 transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      )}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
