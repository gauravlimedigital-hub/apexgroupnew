"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLeadModal } from "@/contexts/LeadModalContext";
import { SiteVisitForm } from "./SiteVisitForm";
import { X } from "lucide-react";

export function SiteVisitModal() {
  const { isOpen, closeModal } = useLeadModal();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  // Trap focus and prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        const firstInput = modalRef.current?.querySelector("input");
        firstInput?.focus();
      }, 100);
      return () => {
        document.body.style.overflow = "";
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
            className="absolute inset-0 bg-[#111f43]/40 backdrop-blur-[4px]"
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[600px] bg-white rounded-[4px] border border-[#111f43]/15 shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="relative pt-10 pb-6 px-8 sm:px-12 text-center bg-[#fbf6f0]">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2.5 text-zinc-400 hover:text-[#111f43] bg-white hover:bg-zinc-50 rounded-[4px] transition-colors shadow-sm border border-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#111f43]"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h2 id="modal-title" className="text-[32px] md:text-[36px] font-cormorant font-bold text-[#111f43] leading-[1.1] mb-3">
                Book Your Site Visit
              </h2>
              <p className="text-[#555555] font-poppins text-[14px] leading-relaxed max-w-[380px] mx-auto">
                Fill in your details and our property advisor will contact you shortly to schedule your exclusive site visit.
              </p>
            </div>

            {/* Form Container */}
            <div className="p-[40px] overflow-y-auto">
              <SiteVisitForm />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
