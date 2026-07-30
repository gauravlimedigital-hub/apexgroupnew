import React, { useState } from 'react';

import { HeroSection } from '../components/blog-listing/HeroSection';
import { FeaturedArticle } from '../components/blog-listing/FeaturedArticle';
import { CategoriesSection } from '../components/blog-listing/CategoriesSection';
import { LatestArticles } from '../components/blog-listing/LatestArticles';
import { FeaturedProjects } from '../components/blog-listing/FeaturedProjects';
import { PopularAndLocations } from '../components/blog-listing/PopularAndLocations';
import { EditorsPicks } from '../components/blog-listing/EditorsPicks';
import { ConsultationCTA } from '../components/blog-listing/ConsultationCTA';

import { Container } from '../components/ui/Container';
import { BLOG_ARTICLES, BLOG_CATEGORIES, FEATURED_PROJECTS, EXPLORE_LOCATIONS } from '../data/mock-data';

export function BlogListingPage() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectCategory = (catName) => {
    setActiveCategory((prev) => (prev === catName ? null : catName));
  };

  const handleSelectLocation = (locName) => {
    setSearchQuery(locName);
  };

  return (
    <main id="main-content" className="bg-[#FAFAFA] min-h-screen flex-1">
      {/* 1. Hero Section (Title + Search + Featured Image) */}
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* 2. Featured Article (Hero Blog) */}
      <section className="featured-article-section py-12 lg:py-16 bg-[#FAFAFA]">
        <Container>
          <FeaturedArticle article={BLOG_ARTICLES.find((a) => a.isFeatured) || BLOG_ARTICLES[0]} />
        </Container>
      </section>

      {/* 3. Browse by Category */}
      <CategoriesSection
        categories={BLOG_CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* 4. Latest Articles (3-Column Grid) */}
      <section className="latest-articles-section py-12 lg:py-16 bg-[#FAFAFA]">
        <Container>
          <LatestArticles
            articles={BLOG_ARTICLES}
            activeCategory={activeCategory}
            searchQuery={searchQuery}
          />
        </Container>
      </section>

      {/* 5. Featured Projects */}
      <section className="featured-projects-section py-12 lg:py-16 bg-[#FAFAFA]">
        <Container>
          <FeaturedProjects projects={FEATURED_PROJECTS} />
        </Container>
      </section>

      {/* 6. Popular Articles + Explore by Location (Side-by-Side) */}
      <PopularAndLocations
        popularArticles={BLOG_ARTICLES}
        locations={EXPLORE_LOCATIONS}
        onSelectLocation={handleSelectLocation}
      />

      {/* 7. Editor's Picks (Full-Width Carousel) */}
      <EditorsPicks articles={BLOG_ARTICLES.filter((a) => a.isEditorsPick)} />

      {/* 8. Ready to Find Your Dream Home Consultation CTA */}
      <ConsultationCTA />
    </main>
  );
}
