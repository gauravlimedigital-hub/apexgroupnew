export type CTAStyle = 'banner' | 'sidebar' | 'inline' | 'bottom';

export interface CTAConfig {
  id: string;
  type: CTAStyle;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  bgColor?: string;
  positionIndex?: number;
}

export type ContentBlock =
  | { type: 'heading'; level: 2 | 3 | 4; text: string; id: string }
  | { type: 'paragraph'; text: string; html?: boolean }
  | { type: 'image'; src: string; alt: string; width: number; height: number; caption?: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'cta'; ctaId: string };

export interface ArticleMeta {
  title: string;
  slug: string;
  author: {
    name: string;
    designation: string;
    bio: string;
    avatarUrl: string;
    socials: {
      twitter?: string;
      linkedin?: string;
      facebook?: string;
    };
  };
  publishedAt: string;
  updatedAt: string;
  readingTimeMinutes?: number; // Dynamic now
  featuredImage: string;
  category: string;
  tags: string[];
  content?: ContentBlock[];
}

export interface KeyTakeaway {
  id: string;
  text: string;
}

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface RelatedArticle {
  title: string;
  slug: string;
  category: string;
  readingTimeMinutes: number;
  imageUrl: string;
  tags?: string[];
}
