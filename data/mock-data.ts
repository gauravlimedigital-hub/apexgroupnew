import { ArticleMeta, CTAConfig, FAQ, KeyTakeaway, RelatedArticle, ContentBlock } from "../types";

export const mockCTAs: CTAConfig[] = [
  {
    id: "in-content-1",
    type: "inline",
    title: "Looking For The Right Property?",
    description: "Get Free Consultation From Our Experts",
    buttonText: "Schedule Site Visit",
    buttonLink: "#schedule",
    bgColor: "bg-blue-50",
    positionIndex: 2
  },
  {
    id: "final-cta",
    type: "banner",
    title: "Thinking About Buying Property?",
    description: "Schedule a Free Site Visit Today",
    buttonText: "Talk To Expert",
    buttonLink: "#expert",
    bgColor: "bg-blue-50"
  },
  {
    id: "sidebar-cta",
    type: "sidebar",
    title: "Looking for Property?",
    description: "Get free consultation from our expert real estate advisors.",
    buttonText: "Talk To Expert",
    buttonLink: "#expert",
    bgColor: "bg-white"
  },
  {
    id: "bottom-cta",
    type: "bottom",
    title: "Mobile Sticky CTA",
    description: "",
    buttonText: "Schedule Visit",
    buttonLink: "#schedule"
  }
];

export const mockFAQs: FAQ[] = [
  {
    question: "Is Ghaziabad a good place to invest in real estate?",
    answer: "Yes, Ghaziabad is rapidly developing with improved infrastructure like the Delhi-Meerut RRTS and metro connectivity, making it a lucrative market for both end-users and investors.",
  },
  {
    question: "Which area is best for a family in Ghaziabad?",
    answer: "Indirapuram and Vaishali are highly preferred for families due to the presence of reputed schools, hospitals, parks, and shopping complexes.",
  },
  {
    question: "Are property rates expected to rise in Raj Nagar Extension?",
    answer: "Given the continuous infrastructural upgrades and the upcoming Hindon Elevated Road connectivity, Raj Nagar Extension is expected to see a steady appreciation in property values.",
  },
];

export const mockKeyTakeaways: KeyTakeaway[] = [
  { id: "1", text: "Indirapuram and Raj Nagar Extension remain the top choices for mid-segment buyers due to excellent connectivity." },
  { id: "2", text: "Property prices in Crossings Republik offer the best ROI for long-term investors looking for steady rental yields." },
  { id: "3", text: "Upcoming metro expansions are projected to boost property rates in Vaishali by 12-15% over the next two years." },
];

const mainArticleContent: ContentBlock[] = [
  { type: "heading", level: 2, id: "introduction", text: "Introduction" },
  { type: "paragraph", text: "Ghaziabad, often referred to as the &quot;Gateway to UP,&quot; has transformed from an industrial hub to a thriving real estate destination. With the rapid development of infrastructure, including the Delhi-Meerut Expressway and the upcoming RRTS, the city has become a hotspot for both end-users and investors." },
  { type: "paragraph", text: "In this comprehensive guide, we will explore the best areas to buy property in Ghaziabad, analyzing connectivity, livability, and future appreciation potential." },
  { type: "heading", level: 2, id: "why-ghaziabad", text: "Why Ghaziabad?" },
  { type: "paragraph", text: "The primary reason driving real estate demand in Ghaziabad is affordability coupled with excellent connectivity to Delhi and Noida. Unlike the saturated markets of central NCR, Ghaziabad offers spacious apartments and independent floors at competitive prices." },
  { type: "image", src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=450&fit=crop", alt: "Ghaziabad Cityscape showing modern buildings and infrastructure", width: 800, height: 450 },
  { type: "paragraph", text: "Furthermore, the city&apos;s green cover, educational institutions, and healthcare facilities have improved significantly over the past decade." },
  { type: "heading", level: 2, id: "price-comparison", text: "Price Comparison" },
  { type: "paragraph", text: "Before diving into specific areas, let&apos;s look at the average property prices across major micro-markets in Ghaziabad." },
  { 
    type: "table", 
    headers: ["Locality", "Avg. Price (₹/sq.ft)", "1-Year Appreciation", "Rental Yield"],
    rows: [
      ["Indirapuram", "₹6,500 - 8,500", "<span class='text-green-600 font-medium'>+8%</span>", "3.5%"],
      ["Vaishali", "₹7,000 - 9,000", "<span class='text-green-600 font-medium'>+6%</span>", "3.2%"],
      ["Raj Nagar Extension", "₹4,000 - 5,500", "<span class='text-green-600 font-medium'>+12%</span>", "4.1%"]
    ]
  },
  { type: "cta", ctaId: "in-content-1" },
  { type: "heading", level: 2, id: "best-areas", text: "Best Areas to Buy" },
  { type: "paragraph", text: "Based on our analysis, here are the top localities for homebuyers:" },
  { type: "list", items: [
    "<strong>Indirapuram:</strong> Ideal for families seeking ready-to-move-in apartments with established infrastructure.",
    "<strong>Raj Nagar Extension:</strong> Perfect for budget buyers and long-term investors aiming for high appreciation.",
    "<strong>Crossings Republik:</strong> A well-planned integrated township offering a holistic lifestyle.",
    "<strong>Vaishali:</strong> Best for those who rely on metro connectivity for daily commute."
  ], ordered: false },
  { type: "heading", level: 2, id: "conclusion", text: "Conclusion" },
  { type: "paragraph", text: "Ghaziabad&apos;s real estate market offers a diverse range of options catering to different budgets and preferences. By carefully analyzing your requirements and consulting with local experts, you can make a secure and profitable investment in this growing city." }
];

export function calculateReadingTime(content?: ContentBlock[]): number {
  if (!content) return 1;
  const wpm = 225;
  let text = '';
  content.forEach(block => {
    if (block.type === 'paragraph' || block.type === 'heading') {
      text += block.text + ' ';
    } else if (block.type === 'list') {
      text += block.items.join(' ') + ' ';
    } else if (block.type === 'table') {
      text += block.rows.flat().join(' ') + ' ';
    }
  });
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wpm) || 1;
}

const defaultAuthor = {
  name: "Apex Editorial Team",
  designation: "Real Estate Content Experts",
  bio: "We create research backed content to help you make better property decisions.",
  avatarUrl: "https://i.pravatar.cc/150?u=apex-editorial",
  socials: {
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
  },
};

export const allArticles: ArticleMeta[] = [
  {
    title: "Best Areas to Buy Property in Ghaziabad",
    slug: "best-areas-to-buy-property-in-ghaziabad",
    author: defaultAuthor,
    publishedAt: "2026-06-15T00:00:00Z",
    updatedAt: "2026-06-20T00:00:00Z",
    featuredImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&h=900&fit=crop",
    category: "Property Guides",
    tags: ["Ghaziabad", "Real Estate", "Investment", "NCR"],
    content: mainArticleContent
  },
  {
    title: "Top 10 Emerging Real Estate Markets in NCR",
    slug: "top-10-emerging-real-estate-markets-ncr",
    author: defaultAuthor,
    publishedAt: "2026-06-10T00:00:00Z",
    updatedAt: "2026-06-12T00:00:00Z",
    featuredImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    category: "Market Trends",
    tags: ["NCR", "Real Estate", "Investment"],
    content: mainArticleContent
  },
  {
    title: "A Complete Guide to Home Loans in India",
    slug: "complete-guide-to-home-loans",
    author: defaultAuthor,
    publishedAt: "2026-06-05T00:00:00Z",
    updatedAt: "2026-06-05T00:00:00Z",
    featuredImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    category: "Finance",
    tags: ["Home Loan", "Finance", "Real Estate"],
    content: mainArticleContent
  },
  {
    title: "Understanding RERA Guidelines Before Buying",
    slug: "understanding-rera-guidelines",
    author: defaultAuthor,
    publishedAt: "2026-06-01T00:00:00Z",
    updatedAt: "2026-06-02T00:00:00Z",
    featuredImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&h=600&fit=crop",
    category: "Legal Insights",
    tags: ["RERA", "Legal", "Real Estate"],
    content: mainArticleContent
  },
  {
    title: "Noida vs Greater Noida: Where should you invest?",
    slug: "noida-vs-greater-noida",
    author: defaultAuthor,
    publishedAt: "2026-05-20T00:00:00Z",
    updatedAt: "2026-05-25T00:00:00Z",
    featuredImage: "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?w=800&h=600&fit=crop",
    category: "Property Guides",
    tags: ["Noida", "Greater Noida", "Investment", "NCR"],
    content: mainArticleContent
  }
].map(article => ({
  ...article,
  readingTimeMinutes: calculateReadingTime(article.content)
}));

export function getAllArticles() {
  return allArticles;
}

export function getArticleBySlug(slug: string): ArticleMeta | undefined {
  return allArticles.find(a => a.slug === slug);
}

export function getRelatedArticles(currentSlug: string): RelatedArticle[] {
  const current = allArticles.find(a => a.slug === currentSlug) || allArticles[0];
  
  const scored = allArticles
    .filter(a => a.slug !== currentSlug)
    .map(a => {
      let score = 0;
      if (a.category === current.category) score += 2;
      const commonTags = a.tags.filter(t => current.tags.includes(t));
      score += commonTags.length;
      return { article: a, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, 3).map(({ article }) => ({
    title: article.title,
    slug: article.slug,
    category: article.category,
    readingTimeMinutes: article.readingTimeMinutes || calculateReadingTime(article.content),
    imageUrl: article.featuredImage,
    tags: article.tags
  }));
}

export function getAdjacentArticles(currentSlug: string) {
  const index = allArticles.findIndex(a => a.slug === currentSlug);
  if (index === -1) return { previous: null, next: null };
  
  const previous = index > 0 ? allArticles[index - 1] : null;
  const next = index < allArticles.length - 1 ? allArticles[index + 1] : null;
  
  return {
    previous: previous ? { title: previous.title, slug: previous.slug } : null,
    next: next ? { title: next.title, slug: next.slug } : null
  };
}

// Keeping these for backwards compatibility with any remaining static components
export const mockArticleMeta: ArticleMeta = allArticles[0];
export const mockPopularArticles = allArticles.slice(1, 5).map(a => ({
  title: a.title,
  slug: a.slug
}));
export const mockRelatedArticles: RelatedArticle[] = getRelatedArticles(mockArticleMeta.slug);

export interface ProjectItem {
  id: string;
  name: string;
  image: string; // Easy to replace later with original project asset URL/path
  url: string; // Dedicated project page destination link (to be provided later)
  status?: "Ongoing" | "Completed" | "Past";
}

export const allProjects: ProjectItem[] = [
  {
    id: "apex-quebec",
    name: "Apex Quebec",
    image: "/projects/apex-quebec.png",
    url: "https://www.theapexgroup.in/qubec.php",
    status: "Ongoing",
  },
  {
    id: "apex-drio",
    name: "Apex D'Rio",
    image: "/projects/apex-drio.png",
    url: "https://www.theapexgroup.in/drio.php",
    status: "Completed",
  },
  {
    id: "apex-alphabet",
    name: "Apex Alphabet",
    image: "/projects/apex-alphabet.png",
    url: "https://www.theapexgroup.in/apex-alphabet.php",
    status: "Completed",
  },
  {
    id: "apex-kremlin",
    name: "Apex Kremlin",
    image: "/projects/apex-kremlin.png",
    url: "https://www.theapexgroup.in/apexKremlin.php",
    status: "Completed",
  },
  {
    id: "apex-athena",
    name: "Apex Athena",
    image: "/projects/apex-athena.png",
    url: "https://www.theapexgroup.in/apexAthene.php",
    status: "Completed",
  },
  {
    id: "apex-acacia-valley",
    name: "Apex Acacia Valley",
    image: "/projects/apex-acacia-valley.png",
    url: "https://www.theapexgroup.in/accaciaValley.php",
    status: "Completed",
  },
  {
    id: "apex-royal-castle",
    name: "Apex Royal Castle",
    image: "/projects/apex-royal-castle.png",
    url: "https://www.theapexgroup.in/apexFlorus.php",
    status: "Past",
  },
  {
    id: "apex-green-valley",
    name: "Apex Green Valley",
    image: "/projects/apex-green-valley.png",
    url: "https://www.theapexgroup.in/accaciaValley.php#",
    status: "Past",
  },
];
