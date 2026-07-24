import Link from "next/link";
import { Image as ImageIcon } from "lucide-react";

interface PopularArticle {
  title: string;
  slug: string;
}

export function PopularArticles({ articles }: { articles: PopularArticle[] }) {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="bg-white border border-[#111f43]/10 rounded-[4px] p-6 lg:p-7 shadow-sm mb-6">
      <h3 className="font-cormorant font-bold text-[22px] lg:text-[24px] text-[#111f43] tracking-tight leading-snug mb-4 border-b border-[#d7c2a3]/30 pb-3.5">
        Popular Articles
      </h3>
      <div className="flex flex-col gap-3 font-poppins">
        {articles.slice(0, 3).map((article, i) => (
          <Link
            href={`/blog/${article.slug}`}
            key={i}
            className="group flex items-center gap-4 p-2 -mx-2 rounded-[4px] transition-all duration-300 hover:bg-[#fbf6f0]"
          >
            <div className="w-16 h-12 bg-white rounded-[4px] shrink-0 flex items-center justify-center overflow-hidden border border-[#111f43]/10 group-hover:border-[#d7c2a3] transition-colors shadow-sm">
               <ImageIcon className="h-5 w-5 text-[#354773] opacity-70 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
            </div>
            <h4 className="text-[15px] font-medium text-[#555555] group-hover:text-[#111f43] leading-snug line-clamp-2 transition-colors duration-300">
              {article.title}
            </h4>
          </Link>
        ))}
      </div>
    </div>
  );
}
