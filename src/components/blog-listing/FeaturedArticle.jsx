import React from 'react';

export function FeaturedArticle({ article }) {
  const defaultArticle = {
    id: 1,
    title: 'Best Areas to Buy Property in Ghaziabad (2026)',
    author: 'Apex Editorial Team',
    date: 'June 2026',
    readingTime: '8 Min Read',
    summary: 'Discover the best localities to invest and buy residential property in Ghaziabad in 2026. Explore price trends, ROI, rental yields, connectivity, and infrastructure development.',
    featuredImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&h=900&fit=crop',
  };

  const item = article || defaultArticle;

  return (
    <div
      id="featured-article-card"
      className="featured-article-card group bg-white border border-[#0F2238]/10 rounded-[20px] overflow-hidden shadow-[0_20px_50px_rgba(15,34,56,0.08)] hover:shadow-2xl transition-all duration-300 grid grid-cols-1 md:grid-cols-2 items-stretch min-h-[440px] text-left cursor-pointer"
      onClick={() => {
        window.location.href = `article-detail.html?id=${item.id}`;
      }}
    >
      {/* Left Column: Image (1fr) */}
      <div className="featured-image-column relative overflow-hidden bg-neutral-100 min-h-[280px] md:min-h-full">
        <img
          id="featured-card-img"
          src={item.featuredImage}
          alt={item.title}
          width="1600"
          height="900"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = defaultArticle.featuredImage;
          }}
        />
        <span
          id="featured-card-badge"
          className="featured-badge absolute top-5 left-5 bg-[#0F2147] text-[#D6B37A] border border-[#D6B37A]/30 font-poppins text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md z-10"
        >
          Featured Article
        </span>
      </div>

      {/* Right Column: Content Column (1fr) -> Centered Inner Block */}
      <div className="featured-content-column flex items-center justify-center min-w-0 h-full p-6 sm:p-10 lg:p-[48px_56px] box-border bg-white text-left">
        <div className="featured-content-inner w-full max-w-[540px] flex flex-col items-start justify-center text-left">
          {/* 1. Article Title */}
          <h2
            id="featured-card-title"
            className="font-cormorant font-bold text-[30px] sm:text-[34px] lg:text-[38px] leading-[1.2] text-[#0F2147] mt-0 mb-[20px] group-hover:text-[#D6B37A] transition-colors text-left"
          >
            {item.title}
          </h2>

          {/* 2. Metadata */}
          <div 
            id="featured-card-meta" 
            className="featured-meta font-poppins font-medium text-[14px] sm:text-[15px] tracking-[0.03em] text-[#64748B] mb-[24px] text-left"
          >
            By {item.author || 'Apex Editorial Team'} | {item.date || 'June 2026'} | {item.readingTime || '8 Min Read'}
          </div>

          {/* 3. Description */}
          <p 
            id="featured-card-summary" 
            className="font-poppins text-[16px] sm:text-[17px] leading-[1.7] text-[#475569] mt-0 mb-[28px] text-left"
          >
            {item.summary}
          </p>

          {/* 4. Read More Button */}
          <a
            href={`article-detail.html?id=${item.id}`}
            id="featured-card-link"
            className="featured-read-more inline-flex items-center justify-center gap-[10px] w-auto min-w-[145px] h-[48px] px-[22px] rounded-[8px] whitespace-nowrap text-[14px] font-poppins font-semibold leading-none bg-[#0F2147] hover:bg-[#10254A] active:bg-[#07133b] text-white transition-all cursor-pointer border-none no-underline shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <span>Read More</span>
            <span aria-hidden="true" className="text-[#D6B37A] font-bold text-[15px]">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}
