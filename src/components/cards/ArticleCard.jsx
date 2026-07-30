import React from 'react';

export function ArticleCard({ article, index = 0, onClick }) {
  const fallbackImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop';

  return (
    <article
      className="article-card bg-white border border-[#d9cbc2]/60 rounded-xl overflow-hidden shadow-sm hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col"
      style={{ opacity: 1, visibility: 'visible' }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (onClick) onClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Read article: ${article.title}`}
    >
      <div className="article-image-wrapper aspect-[16/10] overflow-hidden bg-neutral-100">
        <img
          src={article.featuredImage || fallbackImage}
          alt={article.title}
          width="400"
          height="250"
          loading="lazy"
          decoding="async"
          className="article-img w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImage;
          }}
        />
      </div>
      <div className="article-content p-6 flex flex-col justify-start flex-grow">
        <h3 className="article-card-title font-cormorant font-bold text-[22px] md:text-[24px] text-[#0F2147] mb-5 line-clamp-2 leading-[1.45] h-auto">
          {article.title}
        </h3>
        <p className="article-excerpt font-poppins text-sm text-[#555555] mb-5 line-clamp-3 leading-relaxed h-auto">
          {article.summary}
        </p>
        <div className="article-footer pt-4 border-t border-[#d9cbc2]/30 flex justify-between items-center text-xs font-poppins text-[#777777] mt-auto">
          <span className="article-read-time font-medium">
            {article.readingTime}
            {article.category && <span className="text-[#999]"> &nbsp;|&nbsp; {article.category}</span>}
          </span>
        </div>
      </div>
    </article>
  );
}
