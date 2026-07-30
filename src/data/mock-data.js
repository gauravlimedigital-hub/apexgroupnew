import { BLOG_ARTICLES, BLOG_CATEGORIES, FEATURED_PROJECTS, EXPLORE_LOCATIONS } from '../js/blog-data.js';

export { BLOG_ARTICLES, BLOG_CATEGORIES, FEATURED_PROJECTS, EXPLORE_LOCATIONS };

export const allArticles = (BLOG_ARTICLES || []).map(article => {
  return {
    ...article,
    slug: article.id.toString(),
    publishedAt: article.date,
    excerpt: article.summary,
    content: article.summary,
    title: article.title,
    category: article.category,
    tags: article.tags || [],
    featuredImage: article.featuredImage
  };
});
