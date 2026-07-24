"use client";

import { useLeadForm } from "@/hooks/useLeadForm";
import { useLeadModal } from "@/contexts/LeadModalContext";

import { Suspense } from "react";

interface SiteVisitFormProps {
  isModal?: boolean;
  source?: string;
  onSuccess?: () => void;
  pageMeta?: { title: string; slug: string; category: string };
}

function SiteVisitFormInner({ isModal = true, source = "Blog Site Visit", onSuccess, pageMeta }: SiteVisitFormProps) {
  const { modalData, closeModal } = useLeadModal();
  const {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    handleChange,
    handleSubmit
  } = useLeadForm();

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-10 px-4 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-[#e6f4ea] text-[#1e8e3e] rounded-full flex items-center justify-center mb-6 shadow-sm">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-2xl font-cormorant font-bold text-[#111f43] mb-3">✓ Thank You!</h3>
        <p className="text-zinc-600 font-poppins mb-8 max-w-sm">
          Our property advisor will contact you shortly.
        </p>
        {isModal && (
          <button
            onClick={closeModal}
            className="w-full sm:w-auto px-8 py-3 bg-[#111f43] text-white font-poppins text-[14px] font-medium rounded-full shadow-md hover:bg-[#354773] hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#111f43] focus:ring-offset-2"
          >
            Close
          </button>
        )}
      </div>
    );
  }

  const inputClasses = isModal 
    ? "w-full h-[52px] px-[18px] rounded-[4px] border border-[#111f43]/20 bg-white text-[16px] font-medium text-[#111f43] placeholder:text-[#6B7280] placeholder:text-[15px] placeholder:opacity-100 placeholder:font-normal shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#111f43]/20 focus:border-[#111f43]"
    : "w-full h-[44px] px-[14px] py-[10px] rounded-[4px] border border-[#111f43]/20 bg-white text-[15px] font-medium text-[#111f43] placeholder:text-[#6B7280] placeholder:text-[14px] placeholder:opacity-100 placeholder:font-normal shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#111f43]/20 focus:border-[#111f43]";

  const phoneClasses = isModal
    ? "w-full h-[52px] pl-[56px] pr-[18px] rounded-[4px] border border-[#111f43]/20 bg-white text-[16px] font-medium text-[#111f43] placeholder:text-[#6B7280] placeholder:text-[15px] placeholder:opacity-100 placeholder:font-normal shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#111f43]/20 focus:border-[#111f43]"
    : "w-full h-[44px] pl-[50px] pr-[14px] py-[10px] rounded-[4px] border border-[#111f43]/20 bg-white text-[15px] font-medium text-[#111f43] placeholder:text-[#6B7280] placeholder:text-[14px] placeholder:opacity-100 placeholder:font-normal shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#111f43]/20 focus:border-[#111f43]";

  const buttonClasses = isModal
    ? "w-full flex items-center justify-center px-6 h-[50px] bg-[#111f43] text-white font-poppins text-[15px] font-semibold tracking-[0.05em] rounded-[4px] shadow-sm hover:bg-[#354773] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#111f43] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
    : "w-full flex items-center justify-center px-6 h-[44px] bg-[#111f43] text-white font-poppins text-[14px] font-semibold tracking-[0.05em] rounded-[4px] shadow-sm hover:bg-[#354773] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#111f43] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed";

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e, {
          title: pageMeta?.title || modalData?.title || "",
          slug: pageMeta?.slug || modalData?.slug || "",
          category: pageMeta?.category || modalData?.category || "",
        }, source).then(() => {
          if (onSuccess) onSuccess();
        });
      }}
      className={isModal ? "space-y-[24px]" : "space-y-[12px]"}
    >
      <div>
        <label htmlFor="name" className={`block ${isModal ? 'text-[16px]' : 'text-[15px]'} font-semibold text-[#111f43] tracking-[0.5px] ${isModal ? 'mb-[10px]' : 'mb-[4px]'}`}>
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className={`${inputClasses} ${
            errors.name ? "border-[#D32F2F] bg-[#FEF2F2] focus:border-[#D32F2F] focus:ring-[#D32F2F]/20" : "border-[#d9cbc2] hover:border-[#354773] focus:border-[#111f43] focus:ring-[#111f43]/8"
          }`}
          placeholder="Enter your full name"
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="mt-1.5 text-sm text-[#D32F2F] font-medium">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="phone" className={`block ${isModal ? 'text-[16px]' : 'text-[15px]'} font-semibold text-[#111f43] tracking-[0.5px] ${isModal ? 'mb-[10px]' : 'mb-[4px]'}`}>
          Mobile Number <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className={`absolute ${isModal ? 'left-[20px]' : 'left-[16px]'} top-1/2 -translate-y-1/2 text-[#111f43] font-medium ${isModal ? 'text-[18px]' : 'text-[16px]'}`}>+91</span>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            value={formData.phone}
            onChange={handleChange}
            className={`${phoneClasses} ${
              errors.phone ? "border-[#D32F2F] bg-[#FEF2F2] focus:border-[#D32F2F] focus:ring-[#D32F2F]/20" : "border-[#d9cbc2] hover:border-[#354773] focus:border-[#111f43] focus:ring-[#111f43]/8"
            }`}
            placeholder="Enter your mobile number"
            aria-invalid={!!errors.phone}
          />
        </div>
        {errors.phone && <p className="mt-1.5 text-sm text-[#D32F2F] font-medium">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="email" className={`block ${isModal ? 'text-[16px]' : 'text-[15px]'} font-semibold text-[#111f43] tracking-[0.5px] ${isModal ? 'mb-[10px]' : 'mb-[4px]'}`}>
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={`${inputClasses} ${
            errors.email ? "border-[#D32F2F] bg-[#FEF2F2] focus:border-[#D32F2F] focus:ring-[#D32F2F]/20" : "border-[#d9cbc2] hover:border-[#354773] focus:border-[#111f43] focus:ring-[#111f43]/8"
          }`}
          placeholder="Enter your email address"
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="mt-1.5 text-sm text-[#D32F2F] font-medium">{errors.email}</p>}
      </div>

      <div className={isModal ? "pt-2" : "pt-[2px]"}>
        <button
          type="submit"
          disabled={isSubmitting}
          className={buttonClasses}
        >
          {isSubmitting ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : null}
          {isSubmitting ? "Submitting..." : "Schedule Site Visit"}
        </button>
      </div>
    </form>
  );
}

export function SiteVisitForm(props: SiteVisitFormProps) {
  return (
    <Suspense fallback={<div className="h-[300px] w-full animate-pulse bg-zinc-100 rounded-[12px]" />}>
      <SiteVisitFormInner {...props} />
    </Suspense>
  );
}
