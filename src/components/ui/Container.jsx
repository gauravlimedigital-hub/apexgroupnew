import React from 'react';

export function Container({ children, className = '' }) {
  return (
    <div className={`page-container ${className}`}>
      {children}
    </div>
  );
}
