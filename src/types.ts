export interface ArticleMeta {
  id?: number | string;
  title: string;
  category?: string;
  tags?: string[];
  content?: string;
  excerpt?: string;
  publishedAt?: string;
  slug?: string;
  featuredImage?: string;
}
