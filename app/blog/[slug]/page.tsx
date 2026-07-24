import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { HeroSection } from "@/components/blog/HeroSection";
import { QuickSummary } from "@/components/blog/QuickSummary";
import { Sidebar } from "@/components/blog/Sidebar";
import { InContentCTA } from "@/components/blog/InContentCTA";
import {
  mockFAQs,
  mockKeyTakeaways,
  mockPopularArticles,
  mockCTAs,
  getAdjacentArticles,
  getArticleBySlug,
  getAllArticles,
  getRelatedArticles
} from "@/data/mock-data";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReadingProgressBar } from "@/components/blog/ReadingProgressBar";
import { StickyBottomCTA } from "@/components/blog/StickyBottomCTA";
import { BackToTop } from "@/components/blog/BackToTop";

import { TableOfContents } from "@/components/blog/TableOfContents";
import { LeadModalProvider } from "@/contexts/LeadModalContext";
import { SiteVisitModal } from "@/components/forms/SiteVisitModal";

const FAQSection = dynamic(() => import("@/components/blog/FAQSection").then(mod => mod.FAQSection));
const RelatedArticles = dynamic(() => import("@/components/blog/RelatedArticles").then(mod => mod.RelatedArticles));
const AuthorSection = dynamic(() => import("@/components/blog/AuthorSection").then(mod => mod.AuthorSection));
const FinalCTA = dynamic(() => import("@/components/blog/FinalCTA").then(mod => mod.FinalCTA));

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);
  
  if (!article) {
    return { title: 'Not Found' };
  }

  const url = `https://example.com/blog/${article.slug}`;
  const firstParagraph = article.content?.find(b => b.type === 'paragraph');
  const description = firstParagraph && 'text' in firstParagraph ? firstParagraph.text.slice(0, 150) + "..." : "Discover the best areas to buy property with our comprehensive real estate guide.";
  
  return {
    title: article.title,
    description: description,
    authors: [{ name: article.author.name }],
    openGraph: {
      title: article.title,
      description: description,
      images: [{ url: article.featuredImage, width: 1200, height: 630 }],
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      url: url,
      siteName: "Apex Real Estate",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: description,
      images: [article.featuredImage],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: article.category, href: `/blog/category/${article.category.toLowerCase().replace(/\s+/g, "-")}` },
    { label: article.title },
  ];

  const currentUrl = `https://example.com/blog/${article.slug}`;
  const adjacent = getAdjacentArticles(article.slug);
  const relatedArticles = getRelatedArticles(article.slug);

  // Dynamically extract headings for TOC
  const headings = (article.content || [])
    .filter(block => block.type === 'heading')
    .map(block => {
      if (block.type === 'heading') {
        return { id: block.id, text: block.text, level: block.level };
      }
      return { id: "", text: "", level: 2 };
    });

  // Calculate plain text body for Schema
  const articleBodyText = (article.content || [])
    .filter(b => b.type === 'paragraph' || b.type === 'heading')
    .map(b => (b as any).text)
    .join(' ');

  const sidebarCtaConfig = mockCTAs.find(c => c.type === 'sidebar');
  const bottomCtaConfig = mockCTAs.find(c => c.type === 'bottom');
  const finalCtaConfig = mockCTAs.find(c => c.type === 'banner');

  return (
    <LeadModalProvider>
      <div className="min-h-screen bg-[#fafafa]">
        <ReadingProgressBar />
        <Header />
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 max-w-[1440px] py-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          {/* Main 2-column layout */}
          <div className="flex flex-col lg:flex-row gap-10 xl:gap-12 mt-4">
            
            {/* Left Column - Article */}
            <div className="w-full min-w-0 lg:max-w-[880px] xl:max-w-[920px] flex flex-col">
              <div className="order-1">
              <HeroSection meta={article} />
              
              {/* Mobile TOC */}
              <div className="block lg:hidden mb-8">
                <TableOfContents headings={headings} />
              </div>

              <QuickSummary takeaways={mockKeyTakeaways} />
              
              {/* Dynamic CMS Article Content */}
              <article className="prose prose-zinc max-w-full lg:max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:text-zinc-900 prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:pb-2 prose-h2:border-zinc-200 prose-p:text-zinc-700 prose-p:text-[16px] sm:prose-p:text-[18px] prose-p:leading-[1.8] prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:max-w-full prose-video:max-w-full prose-table:max-w-full prose-pre:max-w-full">
                {article.content?.map((block, idx) => {
                switch (block.type) {
                  case 'heading': {
                    if (block.level === 2) return <h2 key={idx} id={block.id} className="scroll-mt-24">{block.text}</h2>;
                    if (block.level === 3) return <h3 key={idx} id={block.id} className="scroll-mt-24">{block.text}</h3>;
                    if (block.level === 4) return <h4 key={idx} id={block.id} className="scroll-mt-24">{block.text}</h4>;
                    return null;
                  }
                  case 'paragraph': {
                    if (block.html) {
                      return <p key={idx} dangerouslySetInnerHTML={{ __html: block.text }} />;
                    }
                    return <p key={idx}>{block.text}</p>;
                  }
                  case 'image': {
                    return (
                      <div key={idx} className="my-8 aspect-video w-full rounded-xl overflow-hidden bg-zinc-100 relative">
                        <Image 
                          src={block.src} 
                          alt={block.alt} 
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
                        />
                      </div>
                    );
                  }
                  case 'list': {
                    if (block.ordered) {
                      return (
                        <ol key={idx} className="list-decimal pl-6 space-y-2 mt-4 text-zinc-700">
                          {block.items.map((item, i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                          ))}
                        </ol>
                      );
                    } else {
                      return (
                        <ul key={idx} className="list-disc pl-6 space-y-2 mt-4 text-zinc-700">
                          {block.items.map((item, i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                          ))}
                        </ul>
                      );
                    }
                  }
                  case 'table': {
                    return (
                      <div key={idx} className="overflow-x-auto my-8">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                          <thead>
                            <tr className="bg-zinc-100 border-b border-zinc-200">
                              {block.headers.map((h, i) => (
                                <th key={i} className="py-3 px-4 font-semibold text-zinc-900">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {block.rows.map((row, i) => (
                              <tr key={i} className={`border-b border-zinc-200 ${i % 2 !== 0 ? 'bg-zinc-50/50' : ''}`}>
                                {row.map((cell, j) => (
                                  <td key={j} className="py-3 px-4 text-zinc-700" dangerouslySetInnerHTML={{ __html: String(cell) }} />
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  }
                  case 'cta': {
                    const config = mockCTAs.find(c => c.id === block.ctaId);
                    return <InContentCTA key={idx} config={config} />;
                  }
                  default:
                    return null;
                }
              })}
            </article>



            {/* Internal Linking: Previous and Next Articles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-zinc-200">
              {adjacent.previous ? (
                <Link href={`/blog/${adjacent.previous.slug}`} className="p-4 border border-zinc-200 rounded-xl hover:border-blue-600 transition-colors group">
                  <div className="text-sm text-zinc-500 mb-1">← Previous Article</div>
                  <div className="font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors">{adjacent.previous.title}</div>
                </Link>
              ) : <div />}
              {adjacent.next ? (
                <Link href={`/blog/${adjacent.next.slug}`} className="p-4 border border-zinc-200 rounded-xl hover:border-blue-600 transition-colors group text-right">
                  <div className="text-sm text-zinc-500 mb-1">Next Article →</div>
                  <div className="font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors">{adjacent.next.title}</div>
                </Link>
              ) : <div />}
            </div>
            </div>

            {/* Post-article components */}
            <div className="order-2 w-full max-w-full overflow-hidden">
              <FAQSection faqs={mockFAQs} />
              <RelatedArticles articles={relatedArticles} />
            </div>
            <div className="hidden lg:block order-3">
              <AuthorSection author={article.author} />
            </div>
          </div>
          
          {/* Right Column (Sidebar) */}
          <aside className="w-full min-w-0 lg:w-[400px] xl:w-[420px] shrink-0 flex flex-col gap-6">
            <Sidebar headings={headings} popularArticles={mockPopularArticles} ctaConfig={sidebarCtaConfig} pageMeta={{ title: article.title, slug: article.slug, category: article.category }} />
            <div className="block lg:hidden mt-4">
              <AuthorSection author={article.author} />
            </div>
          </aside>
          
        </div>
      </main>

      <FinalCTA config={finalCtaConfig} />
      <Footer />
      
      <StickyBottomCTA config={bottomCtaConfig} />
      <BackToTop />
      
      {/* Schema.org JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            image: [article.featuredImage],
            datePublished: article.publishedAt,
            dateModified: article.updatedAt,
            author: [{
                "@type": "Person",
                name: article.author.name,
                url: article.author.socials.linkedin
            }],
            publisher: {
              "@type": "Organization",
              name: "Apex Real Estate",
              logo: {
                "@type": "ImageObject",
                url: "https://example.com/logo.png"
              }
            },
            articleBody: articleBodyText,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": currentUrl
            }
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbItems.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.label,
              "item": item.href ? `https://example.com${item.href}` : undefined
            }))
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": mockFAQs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          }),
        }}
      />
      <SiteVisitModal />
      </div>
    </LeadModalProvider>
  );
}
