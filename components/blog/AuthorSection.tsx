import Image from "next/image";
import { ArticleMeta } from "../../types";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export function AuthorSection({ author }: { author: ArticleMeta["author"] }) {
  return (
    <section className="my-16 bg-white border border-[#111f43]/10 rounded-[4px] p-8 sm:p-10 flex flex-col sm:flex-row gap-8 items-start shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#fbf6f0] rounded-bl-full opacity-50 -mr-16 -mt-16 pointer-events-none" />
      <div className="relative w-[90px] h-[90px] md:w-[120px] md:h-[120px] lg:w-[140px] lg:h-[140px] shrink-0 overflow-hidden rounded-full border-2 border-[#d7c2a3] bg-[#111f43] shadow-[0_10px_30px_rgba(17,31,67,0.10)] z-10 flex items-center justify-center">
        <Image
          src="/editorial-logo-v3.jpg"
          alt="Apex Editorial Team"
          fill
          className="object-cover translate-x-[6px] md:translate-x-[8px] lg:translate-x-[10px]"
          sizes="(max-width: 768px) 90px, (max-width: 1024px) 120px, 140px"
        />
      </div>

      <div className="flex-1 text-center sm:text-left z-10">
        <h3 className="font-cormorant font-bold text-[32px] text-[#111f43] tracking-tight leading-none mb-2">
          {author.name}
        </h3>
        <p className="font-poppins text-[13px] font-bold text-[#d7c2a3] mb-4 uppercase tracking-[0.18em]">
          {author.designation}
        </p>
        <p className="font-poppins text-[#555555] text-[16px] leading-[1.85] mb-6">
          {author.bio}
        </p>

        <div className="flex items-center justify-center sm:justify-start gap-4">
          <a
            href="https://www.facebook.com/theapexgroupofficial"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-[#d7c2a3] hover:text-[#111f43] transition-colors duration-300 cursor-pointer"
          >
            <FaFacebookF className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/the_apexgroup/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-[#d7c2a3] hover:text-[#111f43] transition-colors duration-300 cursor-pointer"
          >
            <FaInstagram className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/company/theapexgroupin/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#d7c2a3] hover:text-[#111f43] transition-colors duration-300 cursor-pointer"
          >
            <FaLinkedinIn className="w-5 h-5" />
          </a>
          <a
            href="https://www.youtube.com/channel/UC8d5Q5P8BMATTf6cRwc1Q6w"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="text-[#d7c2a3] hover:text-[#111f43] transition-colors duration-300 cursor-pointer"
          >
            <FaYoutube className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
