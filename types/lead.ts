export interface LeadPayload {
  name: string;
  phone: string;
  email: string;
  source: string;
  pageTitle: string;
  pageSlug: string;
  pageUrl: string;
  articleCategory: string;
  campaign: string;
  medium: string;
  timestamp: string;
  referrer: string;
  device: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  gclid?: string;
  fbclid?: string;
}

export interface LeadValidationErrors {
  name?: string;
  phone?: string;
  email?: string;
}
