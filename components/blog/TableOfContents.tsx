"use client";

import { useEffect, useState } from "react";
import { HeadingItem } from "../../types";
import { cn } from "../../lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

export function TableOfContents({ headings }: { headings: HeadingItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -35% 0%" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky header
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
      // On mobile, optionally close the TOC after clicking
      if (window.innerWidth < 1024) {
        setIsExpanded(false);
      }
    }
  };

  if (!headings.length) return null;

  return (
    <div className="bg-white border border-[#111f43]/10 rounded-[4px] p-6 lg:p-7 shadow-sm mb-6">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left lg:pointer-events-none lg:cursor-default lg:pb-3.5 lg:border-b lg:border-[#d7c2a3]/30 group"
      >
        <div>
          <h3 className="font-cormorant font-bold text-[22px] lg:text-[24px] text-[#111f43] tracking-tight leading-snug mb-1 lg:mb-0">
            Table of Contents
          </h3>
          <p className="text-[13px] text-zinc-500 font-poppins lg:hidden">
            Tap to {isExpanded ? 'collapse' : 'expand'}
          </p>
        </div>
        <div className="lg:hidden text-[#111f43] p-2 bg-zinc-50 rounded-full group-hover:bg-zinc-100 transition-colors">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>
      
      <nav className={cn(
        "flex flex-col gap-3 font-poppins transition-all duration-300 overflow-hidden",
        isExpanded ? "mt-4 max-h-[1000px] opacity-100" : "max-h-0 opacity-0 lg:max-h-[1000px] lg:opacity-100 lg:mt-4"
      )}>
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => scrollToHeading(heading.id, e)}
            className={cn(
              "text-[15px] transition-all duration-250 block leading-snug relative py-1 lg:py-0",
              heading.level === 3 ? "ml-4" : "",
              heading.level === 4 ? "ml-8" : "",
              activeId === heading.id
                ? "text-[#111f43] font-semibold"
                : "text-[#555555] hover:text-[#111f43] hover:underline hover:decoration-[#d7c2a3] hover:underline-offset-4"
            )}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
