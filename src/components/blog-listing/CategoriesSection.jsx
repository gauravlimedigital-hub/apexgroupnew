import React, { useRef, useState, useEffect } from 'react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { CategoryCard } from '../cards/CategoryCard';

export function CategoriesSection({ categories = [], activeCategory, onSelectCategory }) {
  const defaultCategories = [
    { name: 'Buying Guide', icon: 'House' },
    { name: 'Investment', icon: 'ChartNoAxesCombined' },
    { name: 'Project Updates', icon: 'Building2' },
    { name: 'Location Guides', icon: 'MapPinned' },
    { name: 'Home Buying Tips', icon: 'Lightbulb' },
    { name: 'Market News', icon: 'Newspaper' },
  ];

  const list = categories.length > 0 ? categories : defaultCategories;
  const gridRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (gridRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = gridRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = gridRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [list]);

  const scroll = (direction) => {
    if (gridRef.current) {
      const scrollAmount = direction === 'left' ? -180 : 180;
      gridRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="category-section py-12 lg:py-16 bg-[#FAFAFA]" aria-labelledby="category-heading">
      <Container>
        <SectionHeading id="category-heading" title="Browse by Category">
          {/* Mobile/Tablet Arrow Navigation */}
          <div className="flex lg:hidden items-center gap-2">
            {canScrollLeft && (
              <button
                type="button"
                onClick={() => scroll('left')}
                aria-label="Previous categories"
                className="w-8 h-8 rounded-full border border-[#d7c2a3] flex items-center justify-center text-[#111f43] hover:bg-[#d7c2a3] hover:text-white transition-all cursor-pointer bg-white shadow-xs"
              >
                <i className="fa-solid fa-chevron-left text-[10px]" aria-hidden="true"></i>
              </button>
            )}
            {canScrollRight && (
              <button
                type="button"
                onClick={() => scroll('right')}
                aria-label="Next categories"
                className="w-8 h-8 rounded-full border border-[#d7c2a3] flex items-center justify-center text-[#111f43] hover:bg-[#d7c2a3] hover:text-white transition-all cursor-pointer bg-white shadow-xs"
              >
                <i className="fa-solid fa-chevron-right text-[10px]" aria-hidden="true"></i>
              </button>
            )}
          </div>
        </SectionHeading>
        <div
          ref={gridRef}
          id="categories-grid"
          className="categories-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 w-full"
        >
          {list.map((cat, idx) => (
            <CategoryCard
              key={cat.name || idx}
              category={cat}
              isActive={activeCategory === cat.name}
              onClick={() => onSelectCategory(cat.name)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
