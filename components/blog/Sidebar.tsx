import { HeadingItem, CTAConfig } from "../../types";
import { PopularArticles } from "./PopularArticles";
import { StickyLeadCTA } from "./StickyLeadCTA";
import { TableOfContents } from "./TableOfContents";

interface SidebarProps {
  headings: HeadingItem[];
  popularArticles: { title: string; slug: string }[];
  ctaConfig?: CTAConfig;
  pageMeta?: { title: string; slug: string; category: string };
}

export function Sidebar({ headings, popularArticles, ctaConfig, pageMeta }: SidebarProps) {
  return (
    <div className="flex flex-col gap-6 lg:sticky lg:top-24">
      <div className="hidden lg:block">
        <TableOfContents headings={headings} />
      </div>
      <StickyLeadCTA config={ctaConfig} pageMeta={pageMeta} />
      <PopularArticles articles={popularArticles} />
    </div>
  );
}
