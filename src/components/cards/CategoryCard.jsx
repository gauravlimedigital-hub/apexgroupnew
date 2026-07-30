import React from 'react';
import { 
  House, 
  ChartNoAxesCombined, 
  Building2, 
  MapPinned, 
  Lightbulb, 
  Newspaper 
} from 'lucide-react';

const CATEGORY_ICON_MAP = {
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

export function CategoryCard({ category, isActive, onClick }) {
  const IconComponent =
    CATEGORY_ICON_MAP[category.icon] ||
    CATEGORY_ICON_MAP[category.name] ||
    CATEGORY_ICON_MAP[category.id] ||
    House;

  return (
    <div
      className={`category-card border border-[#d9cbc2]/60 rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 bg-white hover:-translate-y-1 hover:border-[#d7c2a3] hover:shadow-md ${
        isActive ? 'active border-[#d7c2a3] bg-[#FAFAFA] ring-2 ring-[#d7c2a3]/50' : ''
      }`}
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
      aria-label={`Filter by category ${category.name}`}
    >
      <div className="category-icon-wrapper flex items-center justify-center mb-3 !bg-transparent !border-none !rounded-none !p-0 !w-auto !h-auto !shadow-none">
        <IconComponent 
          size={46}
          strokeWidth={1.8}
          color="#CDA55A"
          className="category-icon flex-shrink-0"
          aria-hidden="true"
        />
      </div>
      <span className="category-name font-poppins font-medium text-sm text-[#111f43]">
        {category.name}
      </span>
    </div>
  );
}

