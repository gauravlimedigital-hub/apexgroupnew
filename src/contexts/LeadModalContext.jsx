import React, { createContext, useContext } from 'react';

const LeadModalContext = createContext({ openModal: () => {} });

export function LeadModalProvider({ children }) {
  const openModal = () => {
    const modal = document.getElementById('private-viewing-modal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  return (
    <LeadModalContext.Provider value={{ openModal }}>
      {children}
    </LeadModalContext.Provider>
  );
}

export function useLeadModal() {
  return useContext(LeadModalContext);
}
