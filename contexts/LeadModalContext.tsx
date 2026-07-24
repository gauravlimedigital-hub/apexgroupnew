"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface LeadModalData {
  title: string;
  slug: string;
  category: string;
}

interface LeadModalContextType {
  isOpen: boolean;
  modalData: LeadModalData | null;
  openModal: (data?: LeadModalData) => void;
  closeModal: () => void;
}

const LeadModalContext = createContext<LeadModalContextType | undefined>(undefined);

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<LeadModalData | null>(null);

  const openModal = (data?: LeadModalData) => {
    if (data) setModalData(data);
    setIsOpen(true);
  };
  
  const closeModal = () => {
    setIsOpen(false);
    // Optionally reset modalData if needed, but keeping it helps exit animations
  };

  return (
    <LeadModalContext.Provider value={{ isOpen, modalData, openModal, closeModal }}>
      {children}
    </LeadModalContext.Provider>
  );
}

export function useLeadModal() {
  const context = useContext(LeadModalContext);
  if (!context) {
    throw new Error("useLeadModal must be used within a LeadModalProvider");
  }
  return context;
}
