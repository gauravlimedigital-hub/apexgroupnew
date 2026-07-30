import React from 'react';

export function SectionHeading({ title, linkText, linkHref, id, className = '', children }) {
  return (
    <div className={`section-header flex justify-between items-center mb-8 ${className}`}>
      <h2 id={id} className="font-cormorant text-3xl md:text-4xl font-bold text-[#111f43]">
        {title}
      </h2>
      {children}
      {linkText && linkHref && (
        <a href={linkHref} className="section-header-link text-[#d7c2a3] hover:text-[#111f43] font-poppins text-sm font-semibold transition-colors flex items-center gap-2">
          {linkText} <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </a>
      )}
    </div>
  );
}
