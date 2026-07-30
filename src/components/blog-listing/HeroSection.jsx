import React from 'react';
import { Container } from '../ui/Container';
import { SearchBar } from '../ui/SearchBar';

export function HeroSection({ searchQuery, onSearchChange }) {
  const heroImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&h=850&fit=crop';

  return (
    <section className="hero-blog py-8 lg:py-12 bg-[#FAFAFA]" aria-labelledby="hero-heading">
      <Container>
        <div className="hero-blog-grid grid grid-cols-1 lg:grid-cols-[45%_1fr] gap-8 lg:gap-12 items-center w-full">
          {/* Left Column: 45% text */}
          <div className="hero-blog-left flex flex-col justify-center w-full">
            <nav aria-label="Breadcrumb" className="breadcrumb-container mb-4">
              <ol className="breadcrumb-list flex items-center gap-2 text-xs font-poppins text-[#777777]">
                <li>
                  <a href="https://www.theapexgroup.in/" target="_blank" rel="noopener noreferrer" className="text-[#111f43] font-medium hover:text-[#C9A66B]">
                    Home
                  </a>
                </li>
                <li aria-hidden="true" className="text-[10px] text-[#999]">
                  <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li aria-current="page" className="text-[#C9A66B] font-semibold">
                  Blog
                </li>
              </ol>
            </nav>

            <h1 id="hero-heading" className="font-cormorant font-bold text-4xl sm:text-5xl lg:text-[54px] text-[#0F2147] leading-[1.15] mb-5">
              Real Estate Insights,<br />Home Buying Guides &amp;<br />Investment Tips
            </h1>
            
            <p className="description font-poppins text-base sm:text-lg text-[#555555] leading-relaxed mb-8 w-full">
              Expert articles on property buying, real estate investment, market trends, Ghaziabad, Noida Extension and more.
            </p>

            <div className="w-full">
              <SearchBar
                id="hero-search-input"
                value={searchQuery}
                onChange={onSearchChange}
                placeholder="Search blogs..."
              />
            </div>
          </div>

          {/* Right Column: 55% image */}
          <div className="hero-blog-right w-full">
            <div className="hero-featured-image-container h-[340px] sm:h-[400px] lg:h-[460px] max-h-[480px] w-full rounded-[24px] overflow-hidden shadow-xl border border-[#d9cbc2]/40 bg-neutral-100 group relative">
              <img
                src={heroImage}
                alt="Modern Luxury Real Estate Architecture in Delhi NCR"
                width="1600"
                height="850"
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = heroImage;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
