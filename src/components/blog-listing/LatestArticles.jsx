import React, { useState } from 'react';
import { ArticleCard } from '../cards/ArticleCard';
import { SectionHeading } from '../ui/SectionHeading';

export function LatestArticles({ articles = [], activeCategory, searchQuery }) {
  const defaultArticles = [
    {
      id: 2,
      title: 'Top 7 Luxury Residential Projects in Noida Extension for 2026',
      summary: 'Explore high-end 3 & 4 BHK luxury apartments in Noida Extension with modern clubhouses and fast connectivity.',
      category: 'Investment',
      readingTime: '6 Min Read',
      featuredImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop',
    },
    {
      id: 3,
      title: 'Siddharth Vihar Property Buying Guide: Infrastructure & Prices',
      summary: 'Why Siddharth Vihar Ghaziabad is emerging as the top destination for luxury real estate buyers near Delhi.',
      category: 'Location Guides',
      readingTime: '7 Min Read',
      featuredImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=500&fit=crop',
    },
    {
      id: 4,
      title: 'Home Loan Interest Rates 2026: Tax Benefits & Smart Tips',
      summary: 'Calculate your home loan EMI savings with the latest tax deductions and interest rates for home buyers in NCR.',
      category: 'Buying Guide',
      readingTime: '5 Min Read',
      featuredImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop',
    },
    {
      id: 5,
      title: 'Why Luxury Apartments in Indirapuram Offer High Rental ROI',
      summary: 'Analysis of rental yields and capital appreciation in prime Indirapuram localities for investors.',
      category: 'Investment',
      readingTime: '6 Min Read',
      featuredImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop',
    },
    {
      id: 6,
      title: 'Delhi-NCR Infrastructure Blueprint 2026: Impact on Real Estate',
      summary: 'Comprehensive report on upcoming expressways, metro extensions, and airport connectivity.',
      category: 'Market Trends',
      readingTime: '8 Min Read',
      featuredImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=500&fit=crop',
    },
    {
      id: 7,
      title: 'Smart Home Automation Trends in Modern Indian Apartments',
      summary: 'How IoT, keyless entry, and automated climate control are redefining luxury living standards.',
      category: 'Architecture & Design',
      readingTime: '5 Min Read',
      featuredImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=500&fit=crop',
    },
  ];

  const list = articles.length > 0 ? articles : defaultArticles;
  const [showAllArticles, setShowAllArticles] = useState(false);

  // Filter
  let filtered = list.filter((a) => !a.isFeatured);
  if (activeCategory) {
    filtered = filtered.filter((a) => a.category === activeCategory);
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );
  }

  // Show 3 articles initially or all when toggled
  const visibleArticles = showAllArticles ? filtered : filtered.slice(0, 3);

  return (
    <div id="latest-articles-section" className="latest-articles-block">
      <SectionHeading id="latest-heading" title="Latest Articles" className="!mb-7">
        <button
          type="button"
          onClick={() => setShowAllArticles((prev) => !prev)}
          className="latest-articles-toggle text-[#d7c2a3] hover:text-[#111f43] font-poppins text-sm font-semibold transition-colors flex items-center gap-1.5 border-none bg-transparent cursor-pointer"
          aria-expanded={showAllArticles}
        >
          {showAllArticles ? "SHOW LESS ↑" : "VIEW ALL →"}
        </button>
      </SectionHeading>

      {visibleArticles.length === 0 ? (
        <div className="no-results py-12 text-center bg-white rounded-2xl border border-[#d9cbc2]/60 p-8">
          <i className="fa-regular fa-folder-open text-4xl text-[#d7c2a3] mb-3" aria-hidden="true"></i>
          <h3 className="font-cormorant font-bold text-2xl text-[#111f43] mb-2">No articles found</h3>
          <p className="font-poppins text-sm text-[#555555]">We couldn't find any articles matching your search criteria. Try clearing search filters.</p>
        </div>
      ) : (
        <div id="latest-articles-grid" className="latest-articles-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-[40px] w-full transition-all duration-300">
          {visibleArticles.map((article, idx) => (
            <ArticleCard
              key={article.id || idx}
              article={article}
              index={idx}
              onClick={() => {
                window.location.href = `article-detail.html?id=${article.id}`;
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
