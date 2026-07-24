import { ReactNode } from "react";

// For demonstration, we'll use a wrapper that adds proper prose styling
export function ArticleContent({ children }: { children: ReactNode }) {
  return (
    <div className="prose max-w-[760px] mx-auto lg:prose-lg 
      prose-headings:font-cormorant prose-headings:font-bold prose-headings:text-[#111f43] prose-headings:tracking-tight
      prose-h2:text-[38px] lg:prose-h2:text-[40px] prose-h2:mt-16 prose-h2:mb-8 prose-h2:leading-[1.18]
      prose-h2:after:content-[''] prose-h2:after:block prose-h2:after:w-12 prose-h2:after:h-[2px] prose-h2:after:bg-[#d7c2a3] prose-h2:after:mt-6
      prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-6 prose-h3:leading-[1.25]
      prose-p:font-poppins prose-p:text-[18px] prose-p:leading-[1.85] prose-p:text-[#555555] prose-p:mb-8
      prose-a:text-[#354773] prose-a:font-medium hover:prose-a:text-[#111f43] prose-a:underline-offset-4 prose-a:decoration-[#d7c2a3]/40 hover:prose-a:decoration-[#111f43] prose-a:transition-all
      prose-img:rounded-[4px] prose-img:shadow-sm prose-img:my-12 prose-img:border prose-img:border-[#111f43]/15
      prose-blockquote:border-l-4 prose-blockquote:border-[#d7c2a3] prose-blockquote:pl-8 prose-blockquote:py-6 prose-blockquote:pr-8 prose-blockquote:rounded-r-[4px] prose-blockquote:shadow-sm prose-blockquote:my-12 prose-blockquote:bg-[#fbf6f0] prose-blockquote:relative prose-blockquote:overflow-hidden
      prose-blockquote:before:content-['\201C'] prose-blockquote:before:font-cormorant prose-blockquote:before:absolute prose-blockquote:before:-top-4 prose-blockquote:before:left-2 prose-blockquote:before:text-[120px] prose-blockquote:before:text-[#d7c2a3]/20 prose-blockquote:before:leading-none
      prose-blockquote:text-[#111f43] prose-blockquote:font-cormorant prose-blockquote:text-2xl prose-blockquote:italic prose-blockquote:leading-snug
      prose-li:font-poppins prose-li:text-[18px] prose-li:leading-[1.85] prose-li:text-[#555555] prose-li:marker:text-[#d7c2a3] prose-li:mb-3
      prose-ul:my-8 prose-ol:my-8
      prose-strong:text-[#111f43] prose-strong:font-semibold
      prose-pre:bg-[#111f43] prose-pre:text-[#fbf6f0] prose-pre:rounded-[4px] prose-pre:shadow-sm
      prose-code:text-[#354773] prose-code:bg-[#d9cbc2]/20 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-[4px] prose-code:before:content-none prose-code:after:content-none
      prose-table:border-collapse prose-table:w-full prose-table:my-12 prose-table:border-y prose-table:border-[#111f43]/15
      prose-th:bg-white prose-th:text-[#111f43] prose-th:font-poppins prose-th:font-semibold prose-th:p-5 prose-th:text-left prose-th:border-b-2 prose-th:border-[#111f43]/20
      prose-td:p-5 prose-td:border-b prose-td:border-[#111f43]/10 prose-td:text-[#555555] prose-td:font-poppins
      prose-figure:my-12 prose-figcaption:text-center prose-figcaption:text-[#354773] prose-figcaption:text-[15px] prose-figcaption:italic prose-figcaption:mt-4 prose-figcaption:font-poppins
    ">
      {children}
    </div>
  );
}
