export function usePathname() {
  // Emulate pathname for navigation
  return window.location.pathname;
}

export function useRouter() {
  return {
    push(url) {
      // Map slug routes in static server
      if (url.startsWith('/blog/')) {
        const slug = url.substring(6);
        // Find article with this slug and redirect to detail page
        // Wait, since we route statically via article-detail.html?id=...
        // We can look up the article ID by slug or redirect to search / fallback!
        // Let's implement search matching:
        const articles = window.BLOG_ARTICLES || [];
        const found = articles.find(a => {
          // generate slug from title or match slug directly
          const generatedSlug = a.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          return generatedSlug === slug || a.id.toString() === slug;
        });
        if (found) {
          window.location.href = `article-detail.html?id=${found.id}`;
          return;
        }
      }
      window.location.href = url;
    },
    replace(url) {
      window.location.replace(url);
    }
  };
}
