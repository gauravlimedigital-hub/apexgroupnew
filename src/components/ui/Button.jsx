import React from 'react';

export function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyles = 'inline-flex items-center justify-center font-poppins font-medium transition-all duration-300 rounded-lg cursor-pointer';
  const variants = {
    primary: 'btn-primary bg-[#d7c2a3] text-[#111f43] hover:bg-[#c8b08f]',
    secondary: 'btn-secondary border border-[#d7c2a3] text-[#111f43] hover:bg-[#d7c2a3]/10',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
