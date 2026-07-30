"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "../../stubs/next-link.jsx";
import { Search, X, ChevronDown, Phone, MoreVertical } from "lucide-react";
import { usePathname, useRouter } from "../../stubs/next-navigation.js";
import { allArticles } from "../../data/mock-data.js";
import { useLeadModal } from "../../contexts/LeadModalContext.jsx";

function searchBlogRecommendations(query, articles) {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  const results = articles
    .map((article) => {
      let score = 0;
      const title = (article.title || "").toLowerCase();
      const category = (article.category || "").toLowerCase();
      const tags = (article.tags || []).map((t) => t.toLowerCase());
      const content = (typeof article.content === "string" ? article.content : "").toLowerCase();
      const excerpt = ('excerpt' in article && typeof article.excerpt === "string" ? article.excerpt : "").toLowerCase();

      if (title === q || title.startsWith(q)) {
        score = 100;
      } else if (title.includes(q)) {
        score = 80;
      } else if (category.includes(q) || tags.some((t) => t.includes(q))) {
        score = 60;
      } else if (excerpt.includes(q)) {
        score = 40;
      } else if (content.includes(q)) {
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
  const { openModal } = useLeadModal();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openAccordions, setOpenAccordions] = useState({});
  const pathname = usePathname();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchContainerRef = useRef(null);

  // Drawer search state
  const [drawerSearchQuery, setDrawerSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const recommendations = useMemo(() => {
    return searchBlogRecommendations(debouncedQuery, allArticles);
  }, [debouncedQuery]);

  const drawerRecommendations = useMemo(() => {
    return searchBlogRecommendations(drawerSearchQuery, allArticles);
  }, [drawerSearchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scrolling when drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleKeyDown = (e) => {
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMobileMenuOpen(false);
      setOpenAccordions({});
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  const toggleAccordion = (name) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const navLinks = [
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
    { 
      name: "Projects", 
      href: "/projects",
      submenu: [
        { name: "Apex Quebec", href: "https://www.theapexgroup.in/qubec.php", external: true },
        { name: "Apex D’Rio", href: "https://www.theapexgroup.in/drio.php", external: true },
        { name: "Apex The Kremlin", href: "https://www.theapexgroup.in/apexKremlin.php", external: true },
        { name: "Apex Alphabet", href: "https://www.theapexgroup.in/apex-alphabet.php", external: true },
      ]
    },
    { name: "Testimonials", href: "https://theapexgroup.in/#testimonials", external: true },
    { name: "Blog", href: "/" },
    { name: "Contact", href: "https://theapexgroup.in/contact-us.php", external: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 bg-[#101F43] border-b border-white/10 shadow-md">
      <div className="page-container">
        <div className="flex md:grid md:grid-cols-[auto_1fr_auto] items-center justify-between h-[90px] relative gap-4">
          
          {/* Logo */}
          <div className="flex items-center justify-start z-50 shrink-0">
            <Link 
              href="/"
              aria-label="Visit Apex Main Blog Page"
              className="flex items-center gap-2 cursor-pointer group transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
            >
              <img 
                src="/logo.png" 
                alt="Apex Logo" 
                className="h-[76px] sm:h-[80px] md:h-[76px] w-auto object-contain origin-left" 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center">
            <nav className="flex items-center gap-[36px] xl:gap-[44px] z-40">
            {navLinks.map((link) => {
              const isActive = !link.external && (pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href)));
              const className = `relative text-[16px] font-poppins font-bold tracking-wide transition-colors duration-300 py-2 ${
                isActive ? "!text-[#D6B37A]" : "!text-[#FFFFFF] hover:!text-[#D6B37A]"
              } group cursor-pointer`;
              
              const Underline = () => (
                <span className={`absolute left-0 bottom-0 h-[2px] bg-[#D6B37A] transition-all duration-300 ${
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
                        rel="noopener noreferrer"
                        className={`${className} inline-flex items-center gap-1.5`}
                      >
                        {link.name}
                        <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180 !text-[#FFFFFF] group-hover:!text-[#D6B37A]" />
                        <Underline />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className={`${className} inline-flex items-center gap-1.5`}
                      >
                        {link.name}
                        <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180 !text-[#FFFFFF] group-hover:!text-[#D6B37A]" />
                        <Underline />
                      </Link>
                    )}

                    <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out z-50">
                      <div className="bg-[#10254A] border border-[#D6B37A]/30 rounded-xl shadow-2xl py-3 px-2 min-w-[200px]">
                        {link.submenu.map((subItem) => (
                          subItem.external ? (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-2.5 text-sm font-poppins font-semibold !text-white hover:!text-[#D6B37A] hover:bg-white/10 rounded-lg transition-colors duration-200"
                            >
                              {subItem.name}
                            </a>
                          ) : (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2.5 text-sm font-poppins font-semibold !text-white hover:!text-[#D6B37A] hover:bg-white/10 rounded-lg transition-colors duration-200"
                            >
                              {subItem.name}
                            </Link>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return link.external ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {link.name}
                  <Underline />
                </a>
              ) : (
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

          {/* Desktop Right CTA Section */}
          <div className="hidden md:flex items-center justify-end gap-4 z-40 shrink-0">
            {/* Real-time Search Box */}
            <div className="relative" ref={searchContainerRef}>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                    setSelectedIndex(-1);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  onKeyDown={handleKeyDown}
                  className="w-[260px] h-[46px] px-8 text-center bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/20 focus:border-[#D6B37A] rounded-[23px] text-[16px] font-normal font-poppins text-[#FFFFFF] placeholder:text-white/60 placeholder:text-center focus:outline-none transition-all duration-200"
                />
                <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-white/70 pointer-events-none" />
              </div>

              {/* Autocomplete Dropdown */}
              {isSearchOpen && debouncedQuery.trim().length >= 2 && (
                <div className="absolute right-0 top-full mt-2 w-[360px] sm:w-[400px] bg-[#101F43] border border-[#D6B37A]/30 rounded-2xl shadow-2xl py-3 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {recommendations.length > 0 ? (
                    <div>
                      <div className="px-3 py-1.5 text-[11px] font-poppins uppercase tracking-wider text-[#D6B37A] font-semibold flex items-center justify-between border-b border-white/10 mb-1">
                        <span>Blog Matches ({recommendations.length})</span>
                        <span className="text-[10px] text-white/40">Use ↑↓ to navigate</span>
                      </div>

                      {recommendations.map((article, index) => {
                        const isSelected = index === selectedIndex;
                        return (
                          <Link
                            key={article.slug}
                            href={`/blog/${article.slug}`}
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery("");
                            }}
                            className={`flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 group/item ${
                              isSelected ? "bg-white/15 text-[#D6B37A]" : "hover:bg-white/10 text-white"
                            }`}
                          >
                            <img
                              src={article.featuredImage}
                              alt={article.title}
                              className="w-12 h-12 rounded-lg object-cover shrink-0 border border-white/10"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className={`text-xs font-poppins font-medium line-clamp-2 leading-snug transition-colors ${
                                isSelected ? "text-[#D6B37A]" : "group-hover/item:text-[#D6B37A]"
                              }`}>
                                {article.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-1 text-[10px] font-poppins text-white/50">
                                <span className="text-[#D6B37A] bg-[#D6B37A]/10 px-1.5 py-0.5 rounded border border-[#D6B37A]/20">
                                  {article.category}
                                </span>
                                <span>{article.readingTime}</span>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-xs font-poppins text-white/60">
                      No blog posts found for "{debouncedQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Book Site Visit CTA Button */}
            <button 
              onClick={() => openModal('site-visit')}
              className="bg-[#d7c2a3] hover:bg-[#D6B37A] text-[#10254A] transition-all duration-200 font-poppins text-[16px] font-semibold leading-none tracking-normal h-[46px] px-[24px] min-w-[180px] rounded-[8px] flex items-center justify-center cursor-pointer shrink-0"
            >
              Book Site Visit
            </button>

            {/* Toll Free Phone Button */}
            <a 
              href="tel:18002003676"
              style={{ color: "#FFFFFF" }}
              className="border-[1.5px] border-white/60 !text-white bg-transparent hover:bg-white/10 hover:border-white transition-all duration-200 font-poppins text-[16px] font-semibold h-[46px] px-[36px] min-w-[200px] rounded-[8px] flex items-center justify-center cursor-pointer shrink-0 text-center"
            >
              1800 200 3676
            </a>
          </div>

          {/* Mobile Three-Dot Menu Icon (⋮) */}
          <div className="flex md:hidden items-center gap-3 z-50">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-white hover:text-[#D6B37A] focus:outline-none transition-colors rounded-lg flex items-center justify-center cursor-pointer"
              aria-label="Open mobile menu"
            >
              <MoreVertical className="w-7 h-7 text-white hover:text-[#D6B37A] transition-colors" />
            </button>
          </div>

        </div>
      </div>

      {/* Full-Screen Right-Side Off-Canvas Sliding Navigation Drawer */}
      <aside 
        className={`md:hidden fixed top-0 right-0 z-[99999] w-full h-[100dvh] bg-[#0B1E59] text-white flex flex-col transition-all duration-450 ease-in-out will-change-[transform,opacity] ${
          isMobileMenuOpen 
            ? "translate-x-0 opacity-100 pointer-events-auto" 
            : "translate-x-full opacity-0 pointer-events-none"
        }`}
        style={{
          paddingTop: "env(safe-area-inset-top, 0px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
        aria-label="Mobile Navigation Drawer"
      >
        {/* Dedicated Drawer Header (Fixed Height 90px, display:flex, justify-content:space-between, align-items:center) */}
        <div className="drawer-header h-[90px] px-5 sm:px-6 border-b border-white/12 flex items-center justify-between shrink-0 bg-[#0B1E59]">
          <Link 
            href="/" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="flex items-center"
          >
            <img 
              src="/logo.png" 
              alt="Apex Logo" 
              className="h-[66px] sm:h-[72px] w-auto object-contain" 
            />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors flex items-center justify-center cursor-pointer"
            aria-label="Close Drawer"
          >
            <X className="w-7 h-7 text-white" />
          </button>
        </div>

        {/* Drawer Search Field (Immediately below header, full width, dark translucent bg, rounded, centered placeholder) */}
        <div className="drawer-search-container px-5 sm:px-6 py-5 border-b border-white/12 shrink-0 bg-[#0B1E59]">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search Articles..."
              value={drawerSearchQuery}
              onChange={(e) => setDrawerSearchQuery(e.target.value)}
              className="w-full h-[48px] px-8 text-center bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/15 focus:border-[#D6B37A] rounded-full text-[15px] font-poppins text-white placeholder:text-white/50 placeholder:text-center focus:outline-none transition-all duration-200"
            />
            <Search className="absolute right-4.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/50 pointer-events-none" />
          </div>

          {/* Real-time Drawer Search Autocomplete */}
          {drawerSearchQuery.trim().length >= 2 && (
            <div className="mt-3 bg-[#10254A] border border-[#D6B37A]/30 rounded-xl p-2 max-h-[220px] overflow-y-auto space-y-1">
              {drawerRecommendations.length > 0 ? (
                drawerRecommendations.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setDrawerSearchQuery("");
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <img src={article.featuredImage} alt={article.title} className="w-10 h-10 rounded object-cover shrink-0" />
                    <span className="text-xs font-poppins text-white line-clamp-2">{article.title}</span>
                  </Link>
                ))
              ) : (
                <div className="p-3 text-center text-xs font-poppins text-white/60">
                  No articles found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Items (Vertical layout, 56-60px row height, thin dividers) */}
        <div className="flex-1 overflow-y-auto py-2 divide-y divide-white/12">
          {navLinks.map((link) => {
            const isAccordionOpen = !!openAccordions[link.name];

            if (link.submenu) {
              return (
                <div key={link.name} className="flex flex-col border-b border-white/12">
                  <button
                    onClick={() => toggleAccordion(link.name)}
                    className="drawer-nav-item w-full h-[58px] px-5 sm:px-6 flex items-center justify-between text-left font-poppins text-[18px] font-medium text-white hover:text-[#D6B37A] hover:bg-white/5 transition-all duration-200 cursor-pointer"
                  >
                    <span>{link.name}</span>
                    <ChevronDown className={`w-5 h-5 text-[#D6B37A] transition-transform duration-300 ${isAccordionOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Accordion Content */}
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out bg-black/20 ${
                      isAccordionOpen ? "max-h-[300px] opacity-100 py-2" : "max-h-0 opacity-0 py-0"
                    }`}
                  >
                    {link.submenu.map((subItem) => (
                      subItem.external ? (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="drawer-sublink block px-9 sm:px-10 py-3 font-poppins text-[16px] text-white/80 hover:text-[#D6B37A] transition-colors"
                        >
                          {subItem.name}
                        </a>
                      ) : (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="drawer-sublink block px-9 sm:px-10 py-3 font-poppins text-[16px] text-white/80 hover:text-[#D6B37A] transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      )
                    ))}
                  </div>
                </div>
              );
            }

            return link.external ? (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="drawer-nav-item w-full h-[58px] px-5 sm:px-6 flex items-center font-poppins text-[18px] font-medium text-white hover:text-[#D6B37A] hover:bg-white/5 transition-all duration-200 border-b border-white/12"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="drawer-nav-item w-full h-[58px] px-5 sm:px-6 flex items-center font-poppins text-[18px] font-medium text-white hover:text-[#D6B37A] hover:bg-white/5 transition-all duration-200 border-b border-white/12"
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA Section Pinned to Bottom (margin-top: auto) */}
        <div className="drawer-footer-cta mt-auto p-5 sm:p-6 border-t border-white/12 space-y-3 bg-[#0B1E59] shrink-0">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              openModal("site-visit");
            }}
            className="w-full h-[54px] bg-[#D6B37A] hover:bg-[#c4a167] active:bg-[#b8955c] text-[#0B1E59] font-poppins font-semibold text-[16px] rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all duration-200 cursor-pointer"
          >
            Book Site Visit
          </button>
          
          <a
            href="tel:18002003676"
            className="w-full h-[54px] border border-white/30 hover:border-[#D6B37A] text-white hover:text-[#D6B37A] font-poppins font-semibold text-[16px] rounded-xl flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
          >
            <Phone className="w-4.5 h-4.5 text-[#D6B37A]" />
            1800 200 3676
          </a>
        </div>
      </aside>
    </header>
  );
}

