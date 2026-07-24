import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { getAllArticles } from "@/data/mock-data";
import { ArticleMeta } from "@/types";

const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
};

const getExcerpt = (article: ArticleMeta) => {
  if (!article.content) return "";
  const firstPara = article.content.find((block) => block.type === "paragraph");
  if (firstPara && "text" in firstPara) {
    let text = firstPara.text
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/<[^>]*>?/gm, "");
    return text.length > 140 ? text.slice(0, 140) + "..." : text;
  }
  return "";
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const query = typeof resolvedParams.q === "string" ? resolvedParams.q : "";
  const trimmedQuery = query.trim();
  const lowerQ = trimmedQuery.toLowerCase();

  const allArticles = getAllArticles();

  const matchingArticles = trimmedQuery
    ? allArticles.filter((article) => {
        const titleMatch = article.title.toLowerCase().includes(lowerQ);
        const categoryMatch = article.category.toLowerCase().includes(lowerQ);
        const tagsMatch = article.tags?.some((tag) =>
          tag.toLowerCase().includes(lowerQ)
        );

        let contentText = "";
        if (article.content) {
          article.content.forEach((block) => {
            if (block.type === "paragraph" || block.type === "heading") {
              contentText += block.text + " ";
            } else if (block.type === "list") {
              contentText += block.items.join(" ") + " ";
            }
          });
        }
        const contentMatch = contentText.toLowerCase().includes(lowerQ);

        return titleMatch || categoryMatch || tagsMatch || contentMatch;
      })
    : [];

  // Sort matching blog results by publication date: LATEST BLOG FIRST → OLDEST BLOG LAST.
  matchingArticles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-16 flex-1">
        {!trimmedQuery ? (
          <div className="bg-white p-10 md:p-12 rounded-[16px] shadow-[0_12px_40px_rgba(17,31,67,.08)] border border-[#d9cbc2]/40 max-w-xl mx-auto text-center my-8 md:my-12">
            <div className="w-16 h-16 bg-[#fbf6f0] text-[#d7c2a3] rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-8 w-8 text-[#111f43]" />
            </div>
            <h1 className="font-cormorant font-bold text-[32px] text-[#111f43] mb-4">
              Search Our Blog
            </h1>
            <p className="font-poppins text-[#555555] text-[15px] mb-8 leading-relaxed">
              Please enter a search term, keyword, location, or property topic in the header search bar above to explore our real estate articles.
            </p>
          </div>
        ) : matchingArticles.length === 0 ? (
          <div className="bg-white p-10 md:p-12 rounded-[16px] shadow-[0_12px_40px_rgba(17,31,67,.08)] border border-[#d9cbc2]/40 max-w-xl mx-auto text-center my-8 md:my-12">
            <div className="w-16 h-16 bg-[#fbf6f0] text-[#d7c2a3] rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-8 w-8 text-[#111f43]" />
            </div>
            <h1 className="font-cormorant font-bold text-[32px] text-[#111f43] mb-4">
              Search Results
            </h1>
            <p className="font-poppins text-[#555555] text-[16px] mb-8">
              No related blogs found for your search.
            </p>
            <Link
              href="/blog/best-areas-to-buy-property-in-ghaziabad"
              className="inline-flex items-center justify-center bg-[#111f43] hover:bg-[#354773] text-white font-poppins font-medium text-[15px] px-8 py-3.5 rounded-[10px] transition-all shadow-md"
            >
              Read Our Latest Article
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-12 text-center sm:text-left">
              <h1 className="font-cormorant font-bold text-[38px] md:text-[46px] text-[#111f43] leading-tight mb-4">
                Search Results for &quot;{trimmedQuery}&quot;
              </h1>
              <p className="font-poppins text-[16px] text-[#555555]">
                Found {matchingArticles.length} related{" "}
                {matchingArticles.length === 1 ? "article" : "articles"}, sorted by latest published.
              </p>
              <div className="w-20 h-[2px] bg-[#d7c2a3] mt-6 mx-auto sm:mx-0" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {matchingArticles.map((article) => {
                const excerpt = getExcerpt(article);
                return (
                  <Link
                    href={`/blog/${article.slug}`}
                    key={article.slug}
                    className="group flex flex-col bg-white border border-[#d9cbc2] rounded-[12px] overflow-hidden shadow-[0_12px_40px_rgba(17,31,67,.08)] transition-transform duration-300 transform hover:-translate-y-[6px] text-left"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#fbf6f0]">
                      {article.featuredImage ? (
                        <Image
                          src={article.featuredImage}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#d9cbc2]">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-poppins text-[12px] font-semibold uppercase tracking-widest text-[#d7c2a3]">
                          {article.category}
                        </span>
                        <span className="font-poppins text-[12px] text-[#777777]">
                          {formatDate(article.publishedAt)}
                        </span>
                      </div>
                      <h2 className="font-cormorant font-bold text-[24px] text-[#111f43] leading-snug mb-3 group-hover:text-[#354773] transition-colors line-clamp-2">
                        {article.title}
                      </h2>
                      {excerpt && (
                        <p className="font-poppins text-[14px] text-[#555555] line-clamp-3 mb-6 leading-relaxed">
                          {excerpt}
                        </p>
                      )}
                      <div className="mt-auto pt-4 border-t border-[#d9cbc2]/30 flex items-center justify-between text-[13px] text-[#111f43] font-poppins font-medium">
                        <span className="group-hover:text-[#d7c2a3] transition-colors flex items-center gap-1">
                          Read Article &rarr;
                        </span>
                        <span className="text-[#555555]">
                          {article.readingTimeMinutes} Min Read
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
