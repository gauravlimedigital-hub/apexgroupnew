import Image from "next/image";
import Link from "next/link";
import { RelatedArticle } from "../../types";

export function RelatedArticles({ articles }: { articles: RelatedArticle[] }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="my-16">
      <h2 className="text-[32px] lg:text-[36px] font-cormorant font-bold text-[#111f43] tracking-tight leading-snug mb-3">
        Related Articles
      </h2>
      <div className="w-12 h-[2px] bg-[#d7c2a3] mb-10" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article, i) => (
          <Link href={`/blog/${article.slug}`} key={i} className="group flex flex-col bg-white border border-[#111f43]/10 rounded-[4px] overflow-hidden shadow-sm hover:border-[#d7c2a3]/60 transition-colors duration-500">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#fbf6f0]">
              {article.imageUrl ? (
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-[1.015] transition-transform duration-600 ease-out"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#d9cbc2]">
                  No Image
                </div>
              )}
            </div>
            <div className="p-6 flex flex-col flex-1">
              <span className="font-poppins text-[11px] font-bold uppercase tracking-[0.18em] text-[#d7c2a3] mb-3">
                {article.category}
              </span>
              <h3 className="font-cormorant font-bold text-[22px] lg:text-[24px] text-[#111f43] leading-snug tracking-tight mb-4 group-hover:text-[#354773] transition-colors duration-300 line-clamp-2">
                {article.title}
              </h3>
              <div className="mt-auto pt-4 border-t border-[#111f43]/10 flex items-center text-[13px] text-[#555555] font-poppins font-medium">
                {article.readingTimeMinutes} Min Read
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
