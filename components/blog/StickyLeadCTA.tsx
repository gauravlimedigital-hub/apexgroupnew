"use client";

import { CTAConfig } from "../../types";
import { SiteVisitForm } from "../forms/SiteVisitForm";

export function StickyLeadCTA({ config, pageMeta }: { config?: CTAConfig, pageMeta?: { title: string; slug: string; category: string } }) {
  return (
    <div className="bg-white border border-[#111f43]/10 rounded-[4px] p-6 lg:p-7 shadow-sm mb-6">
      <h3 className="font-cormorant font-bold text-[26px] text-[#111f43] mb-2 leading-tight tracking-tight text-center">
        Book a Free Consultation
      </h3>
      <p className="font-poppins text-[#555555] text-[14px] leading-relaxed mb-5 text-center">
        Speak with our Real Estate Expert and receive project recommendations tailored to your requirements.
      </p>

      <SiteVisitForm source="Blog Sidebar Form" isModal={false} pageMeta={pageMeta} />
    </div>
  );
}
