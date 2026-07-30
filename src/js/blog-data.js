export const BLOG_CATEGORIES = [
  { id: "buying-guide", name: "Buying Guide", icon: "House" },
  { id: "investment", name: "Investment", icon: "ChartNoAxesCombined" },
  { id: "project-updates", name: "Project Updates", icon: "Building2" },
  { id: "location-guides", name: "Location Guides", icon: "MapPinned" },
  { id: "home-buying-tips", name: "Home Buying Tips", icon: "Lightbulb" },
  { id: "market-news", name: "Market News", icon: "Newspaper" }
];

export const EXPLORE_LOCATIONS = [
  { id: "siddharth-vihar", name: "Siddharth Vihar", count: 12 },
  { id: "indirapuram", name: "Indirapuram", count: 8 },
  { id: "ghaziabad", name: "Ghaziabad", count: 15 },
  { id: "noida-extension", name: "Noida Extension", count: 9 },
  { id: "greater-noida-west", name: "Greater Noida (West)", count: 11 },
  { id: "eta-ii", name: "ETA II, Greater Noida", count: 6 }
];

export const FEATURED_PROJECTS = [
  {
    id: "apex-quebec",
    name: "Apex Quebec",
    location: "Siddharth Vihar, Ghaziabad",
    image: "assets/images/projects/apex-quebec.png",
    url: "https://www.theapexgroup.in/qubec.php"
  },
  {
    id: "apex-elyria",
    name: "Apex Elyria",
    location: "Siddharth Vihar, Ghaziabad",
    image: "assets/images/hero.webp",
    url: "landing.html"
  },
  {
    id: "apex-drio",
    name: "Apex D'Rio",
    location: "Siddharth Vihar, Ghaziabad",
    image: "assets/images/projects/apex-drio.png",
    url: "https://www.theapexgroup.in/drio.php"
  }
];

export const BLOG_ARTICLES = [
  {
    id: 1,
    title: "Best Areas to Buy Property in Ghaziabad (2026)",
    summary: "Discover the best localities to invest and buy residential property in Ghaziabad in 2026. Explore price trends, ROI, rental yields, connectivity, and infrastructure development.",
    featuredImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&h=900&fit=crop",
    author: "Apex Editorial Team",
    date: "June 2026",
    readingTime: "8 Min Read",
    category: "Buying Guide",
    location: "Ghaziabad",
    tags: ["Ghaziabad", "Real Estate", "Investment", "Buying Guide"],
    isFeatured: true,
    isPopular: true,
    isEditorsPick: true
  },
  {
    id: 2,
    title: "Top 10 Emerging Real Estate Markets in NCR",
    summary: "An in-depth report on the fastest-growing micro-markets in Delhi NCR. Find out which areas are poised to deliver maximum capital appreciation over the next 3 to 5 years.",
    featuredImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    author: "Apex Editorial Team",
    date: "June 2026",
    readingTime: "7 Min Read",
    category: "Investment",
    location: "Noida Extension",
    tags: ["NCR", "Real Estate", "Investment", "Noida Extension"],
    isFeatured: false,
    isPopular: true,
    isEditorsPick: true
  },
  {
    id: 3,
    title: "A Complete Guide to Home Loans in India",
    summary: "Navigating home loans can be overwhelming. Read our step-by-step guide on current interest rates, tax benefits, eligibility criteria, and critical pitfalls to avoid.",
    featuredImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    author: "Apex Editorial Team",
    date: "June 2026",
    readingTime: "6 Min Read",
    category: "Buying Guide",
    location: "Indirapuram",
    tags: ["Home Loan", "Finance", "Real Estate", "Buying Guide"],
    isFeatured: false,
    isPopular: true,
    isEditorsPick: false
  },
  {
    id: 4,
    title: "Understanding RERA Guidelines Before Buying",
    summary: "Make your home purchase secure. Here is a handy checklist of RERA rules, builder compliance responsibilities, and tips on how to verify developer credentials online.",
    featuredImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&h=600&fit=crop",
    author: "Apex Editorial Team",
    date: "June 2026",
    readingTime: "5 Min Read",
    category: "Project Updates",
    location: "Siddharth Vihar",
    tags: ["RERA", "Legal", "Real Estate", "Siddharth Vihar"],
    isFeatured: false,
    isPopular: true,
    isEditorsPick: true
  },
  {
    id: 5,
    title: "Noida vs Greater Noida: Where should you invest?",
    summary: "We benchmark Noida and Greater Noida against capital value appreciation, rental demand, connectivity, job opportunities, and upcoming infrastructure projects.",
    featuredImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    author: "Apex Editorial Team",
    date: "May 2026",
    readingTime: "7 Min Read",
    category: "Investment",
    location: "Greater Noida West",
    tags: ["Noida", "Greater Noida", "Investment", "Greater Noida West"],
    isFeatured: false,
    isPopular: true,
    isEditorsPick: false
  },
  {
    id: 6,
    title: "Siddharth Vihar: The Next Indirapuram?",
    summary: "Siddharth Vihar is quickly becoming a favorite for luxury buyers. We detail its rapid infrastructure growth, biophilic residential projects, and connectivity highlights.",
    featuredImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    author: "Apex Editorial Team",
    date: "May 2026",
    readingTime: "8 Min Read",
    category: "Location Guides",
    location: "Siddharth Vihar",
    tags: ["Siddharth Vihar", "Infrastructure", "Investment", "Location Guides"],
    isFeatured: false,
    isPopular: false,
    isEditorsPick: true
  },
  {
    id: 7,
    title: "Delhi-Meerut RRTS: Changing the Property Landscape",
    summary: "How the new high-speed rail transit corridor (RapidX) is accelerating real estate demand and property pricing along Ghaziabad, Modinagar, and Meerut regions.",
    featuredImage: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&h=600&fit=crop",
    author: "Apex Editorial Team",
    date: "April 2026",
    readingTime: "6 Min Read",
    category: "Market News",
    location: "Ghaziabad",
    tags: ["RRTS", "Ghaziabad", "Market News", "Infrastructure"],
    isFeatured: false,
    isPopular: false,
    isEditorsPick: false
  },
  {
    id: 8,
    title: "Essential Home Buying Tips for First-Time Buyers",
    summary: "Maximize your buying confidence. We list essential advice on setting realistic budgets, calculating hidden costs, verifying layouts, and finalizing property options.",
    featuredImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    author: "Apex Editorial Team",
    date: "April 2026",
    readingTime: "5 Min Read",
    category: "Home Buying Tips",
    location: "ETA II",
    tags: ["Home Buying Tips", "Finance", "Real Estate", "ETA II"],
    isFeatured: false,
    isPopular: false,
    isEditorsPick: true
  }
];

// Global window assignment to access variables in client script
window.BLOG_CATEGORIES = BLOG_CATEGORIES;
window.EXPLORE_LOCATIONS = EXPLORE_LOCATIONS;
window.FEATURED_PROJECTS = FEATURED_PROJECTS;
window.BLOG_ARTICLES = BLOG_ARTICLES;
