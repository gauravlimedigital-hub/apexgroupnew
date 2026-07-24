import type { Metadata } from "next";
import { Poppins, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Apex Real Estate",
    default: "Apex Real Estate | Find Your Dream Home",
  },
  description: "Discover the best properties and real estate insights with Apex Real Estate.",
  metadataBase: new URL("https://example.com"),
};

import { LeadModalProvider } from "@/contexts/LeadModalContext";
import { SiteVisitModal } from "@/components/forms/SiteVisitModal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Apex Real Estate",
    "url": "https://example.com",
    "logo": "https://example.com/logo.png",
    "sameAs": [
      "https://facebook.com/apexrealestate",
      "https://twitter.com/apexrealestate",
      "https://linkedin.com/company/apexrealestate"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Apex Real Estate",
    "url": "https://example.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://example.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fbf6f0] relative">
        <LeadModalProvider>
          <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          {children}
          <SiteVisitModal />
        </LeadModalProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </body>
    </html>
  );
}
