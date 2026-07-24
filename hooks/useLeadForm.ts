"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { LeadPayload, LeadValidationErrors } from "@/types/lead";
import { submitLead } from "@/lib/api/leads";

export function useLeadForm() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState<LeadValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: LeadValidationErrors = {};
    
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = "Please enter your name.";
    }
    
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number.";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof LeadValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (
    e: React.FormEvent, 
    pageMeta: { title: string; slug: string; category: string },
    source: string = "Blog Site Visit"
  ) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const payload: LeadPayload = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      source: source,
      pageTitle: pageMeta.title,
      pageSlug: pageMeta.slug,
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      articleCategory: pageMeta.category,
      campaign: searchParams?.get("utm_campaign") || "",
      medium: searchParams?.get("utm_medium") || "",
      timestamp: new Date().toISOString(),
      referrer: typeof document !== "undefined" ? document.referrer : "",
      device: typeof navigator !== "undefined" ? (/Mobile|Android|iP(ad|hone)/.test(navigator.userAgent) ? "Mobile" : "Desktop") : "Unknown",
      utm_source: searchParams?.get("utm_source") || "",
      utm_medium: searchParams?.get("utm_medium") || "",
      utm_campaign: searchParams?.get("utm_campaign") || "",
      utm_content: searchParams?.get("utm_content") || "",
      utm_term: searchParams?.get("utm_term") || "",
      gclid: searchParams?.get("gclid") || "",
      fbclid: searchParams?.get("fbclid") || "",
    };

    try {
      const response = await submitLead(payload);
      if (response.success) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    handleChange,
    handleSubmit,
    setIsSuccess
  };
}
