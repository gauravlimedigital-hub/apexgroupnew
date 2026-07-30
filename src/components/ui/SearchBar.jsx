import React from 'react';

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search blogs...',
  id = 'hero-search-input',
}) {
  return (
    <div className="hero-search-wrapper blog-search-wrapper search-bar-wrapper flex items-center w-full h-[64px] px-[28px] gap-[18px] box-border bg-white border border-[#d9cbc2]/60 rounded-[20px]">
      <label htmlFor={id} className="sr-only">{placeholder}</label>
      <i
        className="fa-solid fa-magnifying-glass hero-search-icon blog-search-icon text-[20px] text-[#d2b783] shrink-0 m-0 p-0"
        aria-hidden="true"
      ></i>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={placeholder}
        className="hero-search-input blog-search-input flex-1 h-full border-none outline-none p-0 bg-transparent text-[#0F2147] font-poppins text-[16px]"
      />
    </div>
  );
}
