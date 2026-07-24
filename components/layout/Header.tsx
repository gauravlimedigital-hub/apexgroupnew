"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { Search, Menu, X, ChevronDown, Mail, Phone, User, ArrowUpRight } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { allArticles } from "@/data/mock-data";
import { ArticleMeta } from "@/types";

function searchBlogRecommendations(query: string, articles: ArticleMeta[]) {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  const results = articles
    .map((article) => {
      let score = 0;
      const title = (article.title || "").toLowerCase();
      const category = (article.category || "").toLowerCase();
      const tags = (article.tags || []).map((t: string) => t.toLowerCase());
      const content = (typeof article.content === "string" ? article.content : "").toLowerCase();
      const excerpt = ((article as any).excerpt || "").toLowerCase();

      // 1. Exact or close title match
      if (title === q || title.startsWith(q)) {
        score = 100;
      }
      // 2. Title contains the searched words
      else if (title.includes(q)) {
        score = 80;
      }
      // 3. Category or tag match
      else if (category.includes(q) || tags.some((t: string) => t.includes(q))) {
        score = 60;
      }
      // 4. Excerpt match
      else if (excerpt.includes(q)) {
        score = 40;
      }
      // 5. Blog content match
      else if (content.includes(q)) {
        score = 20;
      }

      return { article, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      const dateA = new Date(a.article.publishedAt || 0).getTime();
      const dateB = new Date(b.article.publishedAt || 0).getTime();
      return dateB - dateA;
    });

  return results.slice(0, 5).map((item) => item.article);
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const recommendations = useMemo(() => {
    return searchBlogRecommendations(debouncedQuery, allArticles);
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsSearchOpen(false);
      setSelectedIndex(-1);
      e.currentTarget.blur();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (recommendations.length > 0) {
        setSelectedIndex((prev) => (prev < recommendations.length - 1 ? prev + 1 : 0));
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (recommendations.length > 0) {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : recommendations.length - 1));
      }
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < recommendations.length) {
        e.preventDefault();
        const selectedBlog = recommendations[selectedIndex];
        setIsSearchOpen(false);
        setSelectedIndex(-1);
        router.push(`/blog/${selectedBlog.slug}`);
      } else {
        setIsSearchOpen(false);
      }
    }
  };



  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileAboutOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "https://www.theapexgroup.in/", external: true },
    { 
      name: "About", 
      href: "https://theapexgroup.in/why-us.php",
      external: true,
      submenu: [
        { name: "Why Us", href: "https://theapexgroup.in/why-us.php", external: true },
        { name: "Quality Policy", href: "https://theapexgroup.in/qualityPolicy.php", external: true },
        { name: "CMD Message", href: "https://theapexgroup.in/cmdMessage.php", external: true },
        { name: "Our Team", href: "https://theapexgroup.in/ourTeam.php", external: true },
      ]
    },
    { name: "Projects", href: "/projects" },
    { name: "Testimonials", href: "https://theapexgroup.in/#testimonials", external: true },
    { name: "Contact", href: "https://theapexgroup.in/contact-us.php", external: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 bg-[#111f43] border-b border-[#526A96]">
      {/* Global Top Utility Bar */}
      <div className="bg-[#0b142c] text-[#fbf6f0] border-b border-[#526A96] py-2 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-[1440px] flex flex-col sm:flex-row items-center justify-between gap-2.5">
          {/* Left: Social Media Icons */}
          <div className="flex items-center gap-4 sm:gap-5">
            <a 
              href="https://www.facebook.com/theapexgroupofficial" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook"
              className="text-[#fbf6f0]/80 hover:text-[#d7c2a3] transition-colors duration-200"
            >
              <FaFacebookF size={14} />
            </a>
            <a 
              href="https://www.instagram.com/theapexgroupofficial/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
              className="text-[#fbf6f0]/80 hover:text-[#d7c2a3] transition-colors duration-200"
            >
              <FaInstagram size={14} />
            </a>
            <a 
              href="https://www.youtube.com/channel/UC8d5Q5P8BMATTf6cRwc1Q6w" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="YouTube"
              className="text-[#fbf6f0]/80 hover:text-[#d7c2a3] transition-colors duration-200"
            >
              <FaYoutube size={14} />
            </a>
            <a 
              href="https://www.linkedin.com/company/theapexgroupin/posts/?feedView=all" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              className="text-[#fbf6f0]/80 hover:text-[#d7c2a3] transition-colors duration-200"
            >
              <FaLinkedinIn size={14} />
            </a>
          </div>

          {/* Right: Email, Phone, Login */}
          <div className="flex items-center gap-3 sm:gap-6 text-[12px] sm:text-[13px] font-poppins tracking-wide text-[#fbf6f0]/90">
            <a 
              href="mailto:info@apexindia.in" 
              className="flex items-center gap-1.5 hover:text-[#d7c2a3] transition-colors duration-200"
            >
              <Mail size={14} className="text-[#d7c2a3]" />
              <span>info@apexindia.in</span>
            </a>
            <span className="text-[#526A96] select-none hidden sm:inline">|</span>
            <a 
              href="tel:18002003676" 
              className="flex items-center gap-1.5 hover:text-[#d7c2a3] transition-colors duration-200"
            >
              <Phone size={14} className="text-[#d7c2a3]" />
              <span>1800 200 3676</span>
            </a>
            <span className="text-[#526A96] select-none hidden sm:inline">|</span>
            <a 
              href="#" 
              className="flex items-center gap-1.5 hover:text-[#d7c2a3] transition-colors duration-200 font-medium"
            >
              <User size={14} className="text-[#d7c2a3]" />
              <span>Login</span>
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        <div className="flex md:grid md:grid-cols-[auto_1fr_auto] items-center justify-between h-[104px] md:h-[84px] relative">
          
          {/* Logo */}
          <div className="flex items-center justify-start z-50 shrink-0">
            <Link 
              href="/"
              aria-label="Visit Apex Main Blog Page"
              className="flex items-center gap-2 cursor-pointer group transition-all duration-300 hover:opacity-85 hover:scale-[1.02]"
            >
              <img 
                src="/logo.png" 
                alt="Apex Logo" 
                className="h-[84px] md:h-[56px] lg:h-[80px] w-auto object-contain scale-[1.25] md:scale-[1.4] lg:scale-[1.3] origin-center" 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center">
            <nav className="flex items-center gap-4 lg:gap-6 xl:gap-[36px] z-40">
            {navLinks.map((link) => {
              const isActive = !link.external && (pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href)));
              const className = `relative text-[18px] font-poppins font-medium transition-colors duration-300 py-2 ${
                isActive ? "text-[#d7c2a3]" : "text-[#fbf6f0] hover:text-[#d7c2a3]"
              } group cursor-pointer`;
              
              const Underline = () => (
                <span className={`absolute left-0 bottom-0 h-[2px] bg-[#d7c2a3] transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              );

              if (link.submenu) {
                return (
                  <div key={link.name} className="relative group">
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener"
                        className={`${className} flex items-center gap-1.5`}
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {link.name}
                        <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                        <Underline />
                      </a>
                    ) : (
                      <Link 
                        href={link.href} 
                        className={`${className} flex items-center gap-1.5`}
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {link.name}
                        <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                        <Underline />
                      </Link>
                    )}
                    
                    {/* Desktop Dropdown Menu */}
                    <div className="absolute left-0 top-[100%] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                      <div className="bg-white rounded-xl shadow-[0_10px_40px_rgba(17,31,67,0.1)] border border-[#d9cbc2]/30 py-2 w-[240px] flex flex-col relative overflow-hidden">
                        {link.submenu.map((subItem) => {
                          const isSubActive = pathname === subItem.href;
                          const subClassName = `block px-6 py-3 font-poppins text-[15px] font-medium transition-colors cursor-pointer w-full text-left ${
                            isSubActive 
                              ? "text-[#d7c2a3] bg-[#fbf6f0]/50" 
                              : "text-[#555555] hover:text-[#111f43] hover:bg-[#fbf6f0]"
                          }`;

                          if (subItem.external) {
                            return (
                              <a
                                key={subItem.name}
                                href={subItem.href}
                                target="_blank"
                                rel="noopener"
                                className={subClassName}
                                onClick={() => {
                                  if (document.activeElement instanceof HTMLElement) {
                                    document.activeElement.blur();
                                  }
                                }}
                              >
                                {subItem.name}
                              </a>
                            );
                          }

                          return (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={subClassName}
                            >
                              {subItem.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              if (link.external) {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener"
                    className={className}
                  >
                    {link.name}
                    <Underline />
                  </a>
                );
              }

              return (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className={className}
                >
                  {link.name}
                  <Underline />
                </Link>
              );
            })}
            </nav>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 lg:gap-4 shrink-0 min-w-0 z-50">
            {/* Search Wrapper with Autocomplete */}
            <div ref={searchContainerRef} className="relative shrink min-w-0 z-50">
              <form 
                action="/search" 
                onSubmit={(e) => {
                  if (selectedIndex >= 0 && selectedIndex < recommendations.length) {
                    e.preventDefault();
                    const selectedBlog = recommendations[selectedIndex];
                    setIsSearchOpen(false);
                    setSelectedIndex(-1);
                    router.push(`/blog/${selectedBlog.slug}`);
                  } else {
                    setIsSearchOpen(false);
                  }
                }}
                className="flex items-center gap-1.5 sm:gap-2 border border-white/12 rounded-full pl-3 pr-2 sm:pl-4 sm:pr-3 py-1.5 sm:py-2 bg-white/5 focus-within:border-[#d7c2a3] focus-within:bg-white/10 transition-colors w-[130px] sm:w-[150px] lg:w-[170px] xl:w-[200px] min-w-0"
              >
                <input 
                  type="search" 
                  name="q" 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                    setSelectedIndex(-1);
                  }}
                  onFocus={() => {
                    if (searchQuery.trim().length >= 2) {
                      setIsSearchOpen(true);
                    }
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Search..." 
                  autoComplete="off"
                  className="bg-transparent border-none outline-none text-[13px] sm:text-[14px] text-white placeholder-white/60 w-full min-w-0 font-poppins" 
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setDebouncedQuery("");
                      setIsSearchOpen(false);
                      setSelectedIndex(-1);
                    }}
                    className="text-white/60 hover:text-[#d7c2a3] transition-colors p-0.5"
                    aria-label="Clear Search"
                  >
                    <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                )}
                <button type="submit" className="text-white/60 hover:text-[#d7c2a3] transition-colors p-0.5 shrink-0">
                  <Search className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                  <span className="sr-only">Search</span>
                </button>
              </form>

              {/* Autocomplete Dropdown */}
              {isSearchOpen && searchQuery.trim().length >= 2 && (
                <div className="absolute right-0 top-full mt-2 w-[280px] sm:w-[340px] md:w-[380px] bg-white border border-[#d9cbc2]/60 rounded-[14px] shadow-[0_16px_40px_rgba(17,31,67,0.2)] overflow-hidden z-[100] font-poppins">
                  {recommendations.length > 0 ? (
                    <>
                      <div className="max-h-[360px] overflow-y-auto divide-y divide-[#d9cbc2]/30">
                        {recommendations.map((article, idx) => {
                          const isSelected = idx === selectedIndex;
                          return (
                            <div
                              key={article.slug}
                              onClick={() => {
                                setIsSearchOpen(false);
                                setSelectedIndex(-1);
                                router.push(`/blog/${article.slug}`);
                              }}
                              onMouseEnter={() => setSelectedIndex(idx)}
                              className={`p-3 sm:p-3.5 flex items-center gap-3 cursor-pointer transition-colors duration-150 ${
                                isSelected ? "bg-[#fbf6f0] border-l-2 border-[#d7c2a3]" : "hover:bg-[#fbf6f0]/60"
                              }`}
                            >
                              {/* Thumbnail */}
                              <div className="relative w-12 h-12 rounded-[8px] overflow-hidden shrink-0 bg-[#111f43]/5 border border-[#d9cbc2]/40">
                                {article.featuredImage ? (
                                  <img
                                    src={article.featuredImage}
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-[#111f43] text-[#d7c2a3] text-xs font-bold">
                                    Apex
                                  </div>
                                )}
                              </div>

                              {/* Title and Category/Date */}
                              <div className="flex-1 min-w-0 text-left">
                                <h4 className={`text-[13px] font-semibold truncate transition-colors ${
                                  isSelected ? "text-[#d7c2a3]" : "text-[#111f43]"
                                }`}>
                                  {article.title}
                                </h4>
                                <span className="text-[11px] text-[#777777] block mt-0.5 truncate font-medium">
                                  {article.category || (article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Article")}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* View all results option */}
                      <div
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSelectedIndex(-1);
                          router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                        }}
                        className="bg-[#fbf6f0]/80 hover:bg-[#fbf6f0] p-3 text-center border-t border-[#d9cbc2]/50 cursor-pointer transition-colors duration-150"
                      >
                        <span className="text-[12px] font-semibold text-[#111f43] hover:text-[#d7c2a3] transition-colors flex items-center justify-center gap-1">
                          View all results for &quot;{searchQuery.trim()}&quot;
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#d7c2a3]" />
                        </span>
                      </div>
                    </>
                  ) : (
                    /* No results state */
                    <div className="p-6 text-center text-[13px] text-[#777777] font-medium">
                      No related blogs found.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Desktop Primary CTA - Call Button */}
            <a 
              href="tel:18002003676"
              className="hidden md:flex items-center justify-center bg-[#d7c2a3] hover:bg-[#c2ab8a] text-[#111f43] font-poppins font-semibold text-sm tracking-[0.05em] h-[40px] px-6 rounded-[4px] shadow-sm transition-colors duration-500 shrink-0 focus:outline-none focus:ring-2 focus:ring-[#d7c2a3] focus:ring-offset-2"
            >
              1800 200 3676
            </a>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-[#fbf6f0] hover:text-[#d7c2a3] transition-colors p-2 -mr-2"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Slide-out Drawer */}
      <div 
        className={`fixed inset-y-0 -left-full w-full bg-[#111f43] z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-full" : "translate-x-0"
        } md:hidden flex flex-col pt-24 px-6 pb-6`}
      >
        <nav className="flex flex-col gap-6 font-poppins">
          {navLinks.map((link) => {
            const isActive = !link.external && (pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href)));
            const className = `text-[24px] font-medium transition-colors duration-300 border-b border-white/10 pb-4 ${
              isActive ? "text-[#d7c2a3]" : "text-[#fbf6f0]"
            }`;

            if (link.submenu) {
              return (
                <div key={link.name} className="flex flex-col border-b border-white/10">
                  <div className="flex items-center justify-between pb-4">
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener"
                        className={`text-[24px] font-medium transition-colors duration-300 ${
                          isActive ? "text-[#d7c2a3]" : "text-[#fbf6f0]"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link 
                        href={link.href} 
                        className={`text-[24px] font-medium transition-colors duration-300 ${
                          isActive ? "text-[#d7c2a3]" : "text-[#fbf6f0]"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    )}
                    <button
                      onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
                      className="p-1 -m-1 text-[#fbf6f0] hover:text-[#d7c2a3] transition-colors"
                      aria-expanded={isMobileAboutOpen}
                      aria-label="Toggle submenu"
                    >
                      <ChevronDown className={`w-7 h-7 transition-transform duration-300 ${isMobileAboutOpen ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                  
                  {/* Mobile Submenu */}
                  <div className={`flex flex-col overflow-hidden transition-all duration-300 ${
                    isMobileAboutOpen ? "max-h-[300px] opacity-100 mb-4" : "max-h-0 opacity-0"
                  }`}>
                    {link.submenu.map((subItem) => {
                      const isSubActive = pathname === subItem.href;
                      const subClassName = `block pl-4 py-2.5 text-[18px] font-medium transition-colors duration-300 border-l-[3px] border-white/10 ml-2 cursor-pointer w-full text-left ${
                        isSubActive ? "text-[#d7c2a3] border-[#d7c2a3]" : "text-[#fbf6f0]/70 hover:text-[#d7c2a3] hover:border-white/30"
                      }`;

                      if (subItem.external) {
                        return (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            target="_blank"
                            rel="noopener"
                            className={subClassName}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </a>
                        );
                      }

                      return (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={subClassName}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            if (link.external) {
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener"
                  className={className}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              );
            }

            return (
              <Link 
                key={link.name}
                href={link.href} 
                className={className}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="mt-auto pt-8">
          <a 
            href="tel:18002003676"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full flex items-center justify-center bg-[#d7c2a3] hover:bg-[#c2ab8a] text-[#111f43] font-poppins font-semibold text-[15px] tracking-[0.05em] h-[50px] px-6 rounded-[4px] shadow-sm transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-[#d7c2a3] focus:ring-offset-2"
          >
            1800 200 3676
          </a>
        </div>
      </div>
    </header>
  );
}
