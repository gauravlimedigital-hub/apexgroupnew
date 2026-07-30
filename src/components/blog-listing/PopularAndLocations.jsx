import React, { useState } from 'react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

export function PopularAndLocations({ popularArticles = [], locations = [], onSelectLocation }) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const defaultPopular = [
    { id: 1, title: 'Best Areas to Buy Property in Ghaziabad (2026)', readingTime: '8 Min Read' },
    { id: 2, title: 'Top 10 Emerging Real Estate Markets in NCR', readingTime: '7 Min Read' },
    { id: 3, title: 'A Complete Guide to Home Loans in India', readingTime: '6 Min Read' },
    { id: 4, title: 'Understanding RERA Guidelines Before Buying', readingTime: '5 Min Read' },
    { id: 5, title: 'Noida vs Greater Noida: Where should you invest?', readingTime: '7 Min Read' },
  ];

  const defaultLocations = [
    { name: 'Siddharth Vihar' },
    { name: 'Indirapuram' },
    { name: 'Ghaziabad' },
    { name: 'Noida Extension' },
    { name: 'Greater Noida (West)' },
    { name: 'ETA II, Greater Noida' },
  ];

  const popularList = popularArticles.length >= 5 ? popularArticles.slice(0, 5) : defaultPopular;
  const locationList = locations.length > 0 ? locations : defaultLocations;

  const handleLocationClick = (name) => {
    setSelectedLocation(name);
    if (onSelectLocation) onSelectLocation(name);
  };

  return (
    <section className="popular-locations-section py-10 md:py-[80px] pb-24 md:pb-[80px] bg-[#FAFAFA]">
      <Container>
        <div className="popular-location-wrapper articles-location-wrapper grid grid-cols-1 md:grid-cols-2 gap-[18px] lg:gap-[28px] items-start md:items-stretch w-full">
          {/* =========================================================================
             LEFT CARD: POPULAR ARTICLES
             ========================================================================= */}
          <div className="popular-articles-card popular-card bg-white rounded-[22px] p-6 px-7 sm:px-8 py-6 md:p-[30px_34px] border border-[#0F2238]/10 shadow-[0_12px_40px_rgba(15,34,56,0.06)] flex flex-col justify-start md:justify-between h-auto md:h-full min-h-0 md:min-h-[420px] box-border relative overflow-hidden w-full">
            <div>
              {/* Header: SectionHeading Component */}
              <SectionHeading title="Popular Articles" className="mb-4 sm:mb-6 pb-2">
                <a
                  href="#latest-articles-section"
                  className="font-poppins font-semibold text-[13px] sm:text-[14px] text-[#0F2147] hover:text-[#D6B37A] transition-colors flex items-center gap-1.5 shrink-0 no-underline"
                >
                  <span>View All Articles</span>
                  <i className="fa-solid fa-arrow-right text-[12px] text-[#D6B37A]" aria-hidden="true"></i>
                </a>
              </SectionHeading>

              {/* 5 Rows (4-column grid) */}
              <div className="divide-y divide-[#0F2238]/10">
                {popularList.map((article, idx) => (
                  <div
                    key={article.id || idx}
                    onClick={() => {
                      window.location.href = `article-detail.html?id=${article.id}`;
                    }}
                    className="popular-article-row popular-row grid grid-cols-[28px_minmax(0,1fr)_auto_18px] sm:grid-cols-[42px_minmax(0,1fr)_110px_28px] items-center gap-x-2.5 sm:gap-x-[18px] min-h-[52px] py-3 cursor-pointer group hover:bg-slate-50/80 rounded-lg transition-colors"
                    role="button"
                    tabIndex={0}
                  >
                    {/* Col 1: Gold Number */}
                    <span className="popular-article-number font-cormorant font-bold text-[18px] sm:text-[22px] text-[#D6B37A] text-left pl-[1px]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>

                    {/* Col 2: Headline */}
                    <span className="location-name popular-article-title card-list-text font-poppins font-normal text-[13.5px] sm:text-[15px] text-[#0F2147] line-clamp-2 leading-snug group-hover:text-[#D6B37A] transition-colors text-left m-0">
                      {article.title}
                    </span>

                    {/* Col 3: Read Time */}
                    <div className="font-poppins text-[11px] sm:text-[13px] text-[#64748B] flex items-center justify-end gap-1 shrink-0 text-right pr-0.5">
                      <i className="fa-regular fa-clock text-[11px] sm:text-[12px] text-[#64748B]" aria-hidden="true"></i>
                      <span>{article.readingTime || '7 Min Read'}</span>
                    </div>

                    {/* Col 4: Gold Arrow */}
                    <div className="popular-article-arrow text-right justify-self-end mr-[1px]">
                      <i className="fa-solid fa-arrow-right text-[11px] sm:text-[13px] text-[#D6B37A] group-hover:translate-x-1 transition-transform" aria-hidden="true"></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* =========================================================================
             RIGHT CARD: EXPLORE BY LOCATION (Vertical Layout)
             ========================================================================= */}
          <div className="location-card bg-white rounded-[22px] p-6 px-7 sm:px-8 py-6 md:p-[30px_34px] border border-[#0F2238]/10 shadow-[0_12px_40px_rgba(15,34,56,0.06)] flex flex-col justify-start md:justify-between h-auto md:h-full min-h-0 md:min-h-[420px] box-border relative overflow-hidden w-full">
            <div>
              {/* Header: SectionHeading Component */}
              <SectionHeading title="Explore by Location" className="mb-4 sm:mb-[22px]" />

              {/* Vertical Location List (Font Weight 400) */}
              <div className="location-list flex flex-col gap-2.5 sm:gap-[12px] w-full">
                {locationList.map((loc, idx) => {
                  const isSelected = selectedLocation === loc.name;
                  return (
                    <button
                      key={loc.name || idx}
                      onClick={() => handleLocationClick(loc.name)}
                      className={`location-item flex items-center gap-3 sm:gap-[14px] w-full min-h-[44px] sm:min-h-[48px] px-3 sm:px-[14px] py-2 sm:py-[10px] bg-transparent border-none rounded-none text-left cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-[#FDFBF7] rounded-[8px]"
                          : "hover:bg-[#FDFBF7] hover:rounded-[8px]"
                      }`}
                    >
                      <i className="fa-solid fa-location-dot text-[#D6B37A] text-[14px] sm:text-[15px] shrink-0" aria-hidden="true"></i>
                      <span className="location-name card-list-text font-poppins font-normal text-[13.5px] sm:text-[15px] text-[#0F2147] whitespace-normal flex-1 leading-snug">
                        {loc.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Instruction Row: Centered Text Only (No Icon) */}
            <div className="location-instruction w-full flex items-center justify-center text-center mt-4 sm:mt-[18px] pt-4 border-t border-[#0F2238]/10 font-poppins text-[12px] sm:text-[14px] text-[#64748B]">
              <span>Click any location pin to filter blogs by locality.</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

