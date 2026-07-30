import React, { useRef } from 'react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

export function EditorsPicks({ articles = [] }) {
  const defaultPicks = [
    {
      id: 1,
      title: 'Best Areas to Buy Property in Ghaziabad (2026)',
      readingTime: '8 Min Read',
      featuredImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
    },
    {
      id: 2,
      title: 'Top 7 Luxury Residential Projects in Noida Extension',
      readingTime: '6 Min Read',
      featuredImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
    },
    {
      id: 3,
      title: 'Siddharth Vihar Property Buying Guide: Prices & Connectivity',
      readingTime: '7 Min Read',
      featuredImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop',
    },
    {
      id: 4,
      title: 'Home Loan Interest Rates 2026: Tax Benefits & Smart Tips',
      readingTime: '5 Min Read',
      featuredImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
    },
  ];

  const list = articles.length > 0 ? articles : defaultPicks;
  const trackRef = useRef(null);

  const scroll = (direction) => {
    if (trackRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="editors-picks-section py-12 lg:py-16 bg-[#FAFAFA]" aria-labelledby="editors-heading">
      <Container>
        <SectionHeading id="editors-heading" title="Editor's Picks">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => scroll('left')}
              aria-label="Previous editor pick"
              className="w-10 h-10 rounded-full border border-[#d7c2a3] flex items-center justify-center text-[#111f43] hover:bg-[#d7c2a3] hover:text-white transition-colors cursor-pointer"
            >
              <i className="fa-solid fa-chevron-left text-xs" aria-hidden="true"></i>
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Next editor pick"
              className="w-10 h-10 rounded-full border border-[#d7c2a3] flex items-center justify-center text-[#111f43] hover:bg-[#d7c2a3] hover:text-white transition-colors cursor-pointer"
            >
              <i className="fa-solid fa-chevron-right text-xs" aria-hidden="true"></i>
            </button>
          </div>
        </SectionHeading>

        <div className="carousel-container relative overflow-hidden min-w-0">
          <div
            ref={trackRef}
            id="carousel-track"
            className="carousel-track flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-2"
          >
            {list.map((article, idx) => (
              <div
                key={article.id || idx}
                className="carousel-slide flex-none w-[260px] sm:w-[280px] bg-white border border-[#d9cbc2]/60 rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                onClick={() => {
                  window.location.href = `article-detail.html?id=${article.id}`;
                }}
                tabIndex={0}
                role="button"
                aria-label={`Read Editor's Pick: ${article.title}`}
              >
                <div className="carousel-img-wrapper aspect-[16/10] overflow-hidden bg-neutral-100">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    width="400"
                    height="250"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="carousel-content p-4 flex flex-col justify-between flex-grow">
                  <h3 className="carousel-card-title font-cormorant font-bold text-[22px] text-[#0F2147] line-clamp-2 leading-[1.4] mb-3">
                    {article.title}
                  </h3>
                  <span className="carousel-card-read-time font-poppins text-[11px] text-[#777777] flex items-center gap-1.5">
                    <i className="fa-regular fa-clock text-[#d7c2a3]" aria-hidden="true"></i> {article.readingTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
