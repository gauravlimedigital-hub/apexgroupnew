import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';

export function PopularArticles({ articles = [] }) {
  const defaultPopular = [
    { id: 1, title: 'Best Areas to Buy Property in Ghaziabad (2026)', readingTime: '8 Min Read' },
    { id: 2, title: 'Top 7 Luxury Residential Projects in Noida Extension for 2026', readingTime: '6 Min Read' },
    { id: 3, title: 'Siddharth Vihar Property Buying Guide: Infrastructure & Prices', readingTime: '7 Min Read' },
    { id: 4, title: 'Home Loan Interest Rates 2026: Tax Benefits & Smart Tips', readingTime: '5 Min Read' },
    { id: 5, title: 'Why Luxury Apartments in Indirapuram Offer High Rental ROI', readingTime: '6 Min Read' },
  ];

  const list = articles.length > 0 ? articles : defaultPopular;

  return (
    <div className="popular-column flex flex-col">
      <SectionHeading title="Popular Articles" className="mb-6" />
      <ul id="popular-articles-list" className="popular-articles-list flex flex-col gap-4">
        {list.slice(0, 5).map((article, idx) => (
          <li
            key={article.id || idx}
            className="popular-article-item bg-white border border-[#d9cbc2]/60 rounded-xl p-4 flex items-center justify-between gap-4 cursor-pointer hover:border-[#d7c2a3] transition-all hover:shadow-sm"
            onClick={() => {
              window.location.href = `article-detail.html?id=${article.id}`;
            }}
            tabIndex={0}
            role="button"
            aria-label={`Read popular article: ${article.title}`}
          >
            <div className="flex items-center gap-4 min-w-0">
              <span className="popular-num font-cormorant font-bold text-2xl text-[#d7c2a3] w-6 shrink-0 text-center">
                {idx + 1}
              </span>
              <h4 className="popular-title font-poppins font-medium text-sm text-[#111f43] truncate hover:text-[#d7c2a3] transition-colors">
                {article.title}
              </h4>
            </div>
            <span className="popular-read-time font-poppins text-xs text-[#777777] shrink-0">
              {article.readingTime}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-right">
        <a href="#latest-articles-section" className="font-poppins text-sm font-semibold text-[#d7c2a3] hover:text-[#111f43] inline-flex items-center gap-1">
          View All <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  );
}
