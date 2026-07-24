"use client";

import { useState } from "react";
import { Link as LinkIcon, Check } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#111f43]/10">
      <span className="text-[13px] font-bold font-poppins text-[#111f43] uppercase tracking-[0.15em]">Share this article:</span>
      <div className="flex items-center gap-2">
        <a
          href="https://www.facebook.com/theapexgroupofficial"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="text-[#d7c2a3] hover:text-[#111f43] transition-colors duration-300 cursor-pointer p-2 flex items-center justify-center"
        >
          <FaFacebookF className="w-5 h-5" />
        </a>
        <a
          href="https://www.instagram.com/the_apexgroup/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-[#d7c2a3] hover:text-[#111f43] transition-colors duration-300 cursor-pointer p-2 flex items-center justify-center"
        >
          <FaInstagram className="w-5 h-5" />
        </a>
        <a
          href="https://www.linkedin.com/company/theapexgroupin/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-[#d7c2a3] hover:text-[#111f43] transition-colors duration-300 cursor-pointer p-2 flex items-center justify-center"
        >
          <FaLinkedinIn className="w-5 h-5" />
        </a>
        <a
          href="https://www.youtube.com/channel/UC8d5Q5P8BMATTf6cRwc1Q6w"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          className="text-[#d7c2a3] hover:text-[#111f43] transition-colors duration-300 cursor-pointer p-2 flex items-center justify-center"
        >
          <FaYoutube className="w-5 h-5" />
        </a>
        <button
          onClick={handleCopy}
          aria-label="Copy link"
          className="p-2 text-[#d7c2a3] hover:text-[#111f43] transition-colors duration-300 cursor-pointer flex items-center justify-center ml-2 border-l border-[#111f43]/10 pl-4"
        >
          {copied ? <Check className="w-5 h-5 text-green-600" /> : <LinkIcon className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
