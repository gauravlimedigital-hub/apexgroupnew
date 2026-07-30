import React from 'react';
import { useLeadModal } from '../../contexts/LeadModalContext';
import { Container } from '../ui/Container';

export function ConsultationCTA() {
  const { openModal } = useLeadModal();

  return (
    <section className="consultation-cta consultation-cta-section p-[56px_20px] md:p-[90px_24px_100px] bg-white border-b border-[#0B1E59]/10 text-center flex flex-col items-center justify-center w-full">
      <Container className="flex flex-col items-center justify-center text-center max-w-[900px] mx-auto px-0">
        <h2 className="font-cormorant font-bold text-[36px] sm:text-[48px] lg:text-[64px] leading-[1.15] text-[#0B1E59] m-0 mb-6 text-center">
          Ready to Find Your Dream Home?
        </h2>
        <p className="font-poppins font-normal text-[16px] sm:text-[18px] leading-[1.6] text-[#666666] m-0 mb-[28px] md:mb-[36px] text-center max-w-[650px]">
          Book a private consultation with an Apex Property Advisor.
        </p>
        <button
          onClick={() => openModal('site-visit')}
          className="site-visit-button bg-[#D6B37A] hover:bg-[#c5a269] active:bg-[#b49158] text-[#0B1E59] font-poppins font-bold text-[16px] h-[52px] min-w-[220px] px-7 rounded-[8px] transition-all duration-200 cursor-pointer border-none shadow-md inline-flex items-center justify-center mt-0"
        >
          Book Site Visit
        </button>
      </Container>
    </section>
  );
}
