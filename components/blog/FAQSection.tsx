"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { FAQ } from "../../types";

export function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const [openItem, setOpenItem] = useState<string | undefined>("item-0");

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="my-16">
      <h2 className="text-[32px] lg:text-[36px] font-cormorant font-bold text-[#111f43] tracking-tight leading-snug mb-3">Frequently Asked Questions</h2>
      <div className="w-12 h-[2px] bg-[#d7c2a3] mb-10" />
      <Accordion.Root
        type="single"
        collapsible
        className="border border-[#111f43]/10 rounded-[4px] overflow-hidden bg-white shadow-sm"
        value={openItem}
        onValueChange={setOpenItem}
      >
        {faqs.map((faq, index) => {
          const value = `item-${index}`;
          const isOpen = openItem === value;
          
          return (
            <Accordion.Item
              key={index}
              value={value}
              className="border-b border-[#111f43]/10 last:border-b-0"
            >
              <Accordion.Header className="flex">
                <Accordion.Trigger className="flex flex-1 items-center justify-between py-6 px-8 font-semibold font-poppins text-[18px] transition-all duration-300 hover:bg-[#fbf6f0] text-left data-[state=open]:text-[#354773] text-[#111f43] group">
                  <span className="pr-4 leading-snug">{faq.question}</span>
                  {isOpen ? (
                    <Minus className="h-5 w-5 shrink-0 text-[#d7c2a3] transition-transform duration-300" strokeWidth={1.5} />
                  ) : (
                    <Plus className="h-5 w-5 shrink-0 text-[#354773] transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                  )}
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="pb-8 pt-2 px-8 text-[#555555] font-poppins text-[16px] leading-[1.9]">
                  {faq.answer}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
      
      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
