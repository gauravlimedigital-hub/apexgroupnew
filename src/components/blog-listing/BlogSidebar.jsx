import React, { useState } from 'react';
import { SearchBar } from '../ui/SearchBar';
import { useLeadModal } from '../../contexts/LeadModalContext';
import { 
  House, 
  ChartNoAxesCombined, 
  Building2, 
  MapPinned, 
  Lightbulb, 
  Newspaper 
} from 'lucide-react';

const SIDEBAR_ICON_MAP = {
  'Buying Guide': House,
  'House': House,
  'buying-guide': House,
  'fa-house-chimney': House,

  'Investment': ChartNoAxesCombined,
  'ChartNoAxesCombined': ChartNoAxesCombined,
  'investment': ChartNoAxesCombined,
  'fa-chart-line': ChartNoAxesCombined,

  'Project Updates': Building2,
  'Building2': Building2,
  'project-updates': Building2,
  'fa-building': Building2,
  'fa-building-circle-arrow-right': Building2,

  'Location Guides': MapPinned,
  'MapPinned': MapPinned,
  'location-guides': MapPinned,
  'fa-map-location-dot': MapPinned,

  'Home Buying Tips': Lightbulb,
  'Lightbulb': Lightbulb,
  'home-buying-tips': Lightbulb,
  'fa-key': Lightbulb,

  'Market News': Newspaper,
  'Newspaper': Newspaper,
  'market-news': Newspaper,
  'fa-newspaper': Newspaper,
};

export function BlogSidebar({
  searchQuery,
  onSearchChange,
  categories = [],
  activeCategory,
  onSelectCategory,
  popularArticles = [],
  onSelectLocation,
}) {
  const { openModal } = useLeadModal();
  const [email, setEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const defaultCategories = [
    { name: 'Buying Guide', icon: 'House' },
    { name: 'Investment', icon: 'ChartNoAxesCombined' },
    { name: 'Project Updates', icon: 'Building2' },
    { name: 'Location Guides', icon: 'MapPinned' },
    { name: 'Home Buying Tips', icon: 'Lightbulb' },
    { name: 'Market News', icon: 'Newspaper' },
  ];

  const categoryList = categories.length > 0 ? categories : defaultCategories;

  const defaultPopular = [
    { id: 1, title: 'Best Areas to Buy Property in Ghaziabad (2026)', readingTime: '8 Min Read' },
    { id: 2, title: 'Top 7 Luxury Residential Projects in Noida Extension for 2026', readingTime: '6 Min Read' },
    { id: 3, title: 'Siddharth Vihar Property Buying Guide: Infrastructure & Prices', readingTime: '7 Min Read' },
    { id: 4, title: 'Home Loan Interest Rates 2026: Tax Benefits & Smart Tips', readingTime: '5 Min Read' },
    { id: 5, title: 'Why Luxury Apartments in Indirapuram Offer High Rental ROI', readingTime: '6 Min Read' },
  ];

  const popularList = popularArticles.length > 0 ? popularArticles : defaultPopular;

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setNewsletterSubscribed(true);
    }
  };

  return (
    <aside className="blog-sidebar sticky top-[108px] space-y-8">
      {/* 1. Search Box Widget */}
      <div className="bg-white border border-[#d9cbc2]/60 rounded-2xl p-6 shadow-sm">
        <h3 className="font-cormorant font-bold text-xl text-[#111f43] mb-4">
          Search Articles
        </h3>
        <SearchBar
          id="sidebar-search-input"
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Type keywords..."
        />
      </div>

      {/* 2. Categories Widget */}
      <div className="bg-white border border-[#d9cbc2]/60 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-cormorant font-bold text-xl text-[#111f43]">
            Categories
          </h3>
          {activeCategory && (
            <button
              onClick={() => onSelectCategory(null)}
              className="text-xs font-poppins text-[#d7c2a3] hover:underline cursor-pointer"
            >
              Clear Filter
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {categoryList.map((cat, idx) => {
            const isActive = activeCategory === cat.name;
            const IconComponent = SIDEBAR_ICON_MAP[cat.icon] || SIDEBAR_ICON_MAP[cat.name];
            return (
              <button
                key={cat.name || idx}
                onClick={() => onSelectCategory(cat.name)}
                className={`font-poppins text-xs font-medium px-3.5 py-2 rounded-full border transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#111f43] text-[#d7c2a3] border-[#111f43] shadow-sm'
                    : 'bg-[#FAFAFA] text-[#111f43] border-[#d9cbc2]/60 hover:border-[#d7c2a3] hover:bg-white'
                }`}
              >
                {IconComponent ? (
                  <IconComponent size={14} strokeWidth={1.8} color={isActive ? '#d7c2a3' : '#CDA55A'} className="shrink-0" />
                ) : (
                  cat.icon && <i className={`${cat.icon} text-[11px]`} aria-hidden="true"></i>
                )}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Popular Articles Widget */}
      <div className="bg-white border border-[#d9cbc2]/60 rounded-2xl p-6 shadow-sm">
        <h3 className="font-cormorant font-bold text-xl text-[#111f43] mb-4">
          Popular Reads
        </h3>
        <ul className="space-y-3.5">
          {popularList.slice(0, 5).map((article, idx) => (
            <li
              key={article.id || idx}
              onClick={() => {
                window.location.href = `article-detail.html?id=${article.id}`;
              }}
              className="group flex items-start gap-3 cursor-pointer p-2 rounded-xl hover:bg-[#fbf6f0] transition-colors"
            >
              <span className="font-cormorant font-bold text-xl text-[#d7c2a3] w-5 shrink-0 text-center pt-0.5">
                0{idx + 1}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="font-poppins font-medium text-xs sm:text-sm text-[#111f43] leading-snug line-clamp-2 group-hover:text-[#d7c2a3] transition-colors">
                  {article.title}
                </h4>
                <span className="font-poppins text-[11px] text-[#777777] mt-1 block">
                  {article.readingTime || '5 Min Read'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* 4. Book Site Visit CTA Widget */}
      <div className="bg-[#0F2147] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#d7c2a3]/10 rounded-full blur-2xl pointer-events-none" />
        <span className="text-[#d7c2a3] font-poppins text-[11px] font-semibold uppercase tracking-wider block mb-2">
          Exclusive VIP Consultation
        </span>
        <h3 className="font-cormorant font-bold text-2xl text-white mb-3 leading-snug">
          Experience Landmark Biophilic Living in NCR
        </h3>
        <p className="font-poppins text-xs text-[#d9cbc2] leading-relaxed mb-5">
          Book a private site visit to Apex Quebec or Apex D'Rio with luxury cab pickup &amp; expert property guidance.
        </p>
        <button
          onClick={() => openModal('site-visit')}
          className="w-full bg-[#d7c2a3] text-[#0F2147] hover:bg-[#c8b08f] font-poppins text-sm font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Book Free Site Visit</span>
          <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
        </button>
      </div>

      {/* 5. Newsletter Widget */}
      <div className="bg-white border border-[#d9cbc2]/60 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-[#d7c2a3]/20 flex items-center justify-center text-[#111f43]">
            <i className="fa-regular fa-envelope text-sm" aria-hidden="true"></i>
          </div>
          <h3 className="font-cormorant font-bold text-xl text-[#111f43]">
            Newsletter
          </h3>
        </div>
        <p className="font-poppins text-xs text-[#555555] mb-4">
          Get weekly real estate investment insights &amp; NCR market updates directly in your inbox.
        </p>

        {newsletterSubscribed ? (
          <div className="bg-[#fbf6f0] p-4 rounded-xl border border-[#d7c2a3]/60 text-center text-xs font-poppins text-[#111f43]">
            <i className="fa-solid fa-circle-check text-[#d7c2a3] text-base mb-1 block" aria-hidden="true"></i>
            Subscribed successfully!
          </div>
        ) : (
          <form onSubmit={handleNewsletterSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="w-full h-11 px-4 rounded-xl border border-[#d9cbc2]/60 bg-[#fbf6f0] text-xs font-poppins text-[#111f43] placeholder-[#888888] focus:outline-none focus:border-[#d7c2a3]"
            />
            <button
              type="submit"
              className="w-full bg-[#111f43] text-white hover:bg-[#1b2f63] font-poppins text-xs font-semibold h-11 rounded-xl transition-colors cursor-pointer"
            >
              Subscribe Now
            </button>
          </form>
        )}
      </div>
    </aside>
  );
}
