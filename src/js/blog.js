import { BLOG_ARTICLES, BLOG_CATEGORIES, FEATURED_PROJECTS, EXPLORE_LOCATIONS } from './blog-data.js';

function initBlog() {
  // Global States
  let currentCategory = null;
  let searchQuery = "";
  let currentPage = 1;
  const itemsPerPage = 3;

  // Retrieve data from window or direct import fallback
  const articles = window.BLOG_ARTICLES || BLOG_ARTICLES || [];
  const categories = window.BLOG_CATEGORIES || BLOG_CATEGORIES || [];
  const projects = window.FEATURED_PROJECTS || FEATURED_PROJECTS || [];
  const locations = window.EXPLORE_LOCATIONS || EXPLORE_LOCATIONS || [];

  // Exclude featured article from the latest articles list to avoid duplicate presentation
  const featuredArticle = articles.find(a => a.isFeatured) || articles[0];

  // DOM Elements
  const searchInput = document.getElementById("search-input");
  const heroSearchInput = document.getElementById("hero-search-input");
  const latestArticlesGrid = document.getElementById("latest-articles-grid");
  const paginationContainer = document.getElementById("pagination-container");
  const categoriesGrid = document.getElementById("categories-grid");
  const projectsGrid = document.getElementById("projects-grid");
  const popularArticlesList = document.getElementById("popular-articles-list");
  const locationsList = document.getElementById("locations-list");
  const carouselTrack = document.getElementById("carousel-track");
  const carouselPrevBtn = document.getElementById("carousel-prev");
  const carouselNextBtn = document.getElementById("carousel-next");
  const newsletterForm = document.getElementById("newsletter-form");
  const newsletterSuccess = document.getElementById("newsletter-success");

  // Init Calls
  initFeaturedArticle(featuredArticle);
  renderCategoryGrid();
  renderFeaturedProjects();
  renderPopularArticles();
  renderExploreLocations();
  renderEditorsPicks();
  renderLatestArticles();

  // Search Logic
  if (heroSearchInput) {
    heroSearchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      currentPage = 1;
      // Sync search input if present
      if (searchInput) searchInput.value = e.target.value;
      renderLatestArticles();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      currentPage = 1;
      if (heroSearchInput) heroSearchInput.value = e.target.value;
      renderLatestArticles();
    });
  }

  // Populate Featured Article
  function initFeaturedArticle(article) {
    const featuredCardImg = document.getElementById("featured-card-img");
    const featuredCardTitle = document.getElementById("featured-card-title");
    const featuredCardMeta = document.getElementById("featured-card-meta");
    const featuredCardSummary = document.getElementById("featured-card-summary");
    const featuredCardLink = document.getElementById("featured-card-link");

    if (article) {
      if (featuredCardImg) featuredCardImg.src = article.featuredImage;
      if (featuredCardTitle) featuredCardTitle.textContent = article.title;
      if (featuredCardMeta) {
        featuredCardMeta.innerHTML = `By ${article.author} &nbsp;|&nbsp; ${article.date} &nbsp;|&nbsp; ${article.readingTime}`;
      }
      if (featuredCardSummary) featuredCardSummary.textContent = article.summary;
      if (featuredCardLink) {
        featuredCardLink.href = `article-detail.html?id=${article.id}`;
      }
      
      const featuredCard = document.getElementById("featured-article-card");
      if (featuredCard) {
        featuredCard.addEventListener("click", () => {
          window.location.href = `article-detail.html?id=${article.id}`;
        });
      }
    }
  }

  // Render Category Grid
  function renderCategoryGrid() {
    if (!categoriesGrid) return;
    categoriesGrid.innerHTML = "";

    categories.forEach(cat => {
      const card = document.createElement("div");
      card.className = "category-card reveal-up";
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", `Filter by ${cat.name}`);
      
      card.innerHTML = `
        <div class="category-icon-wrapper">
          <i class="${cat.icon} category-icon"></i>
        </div>
        <span class="category-name">${cat.name}</span>
      `;

      card.addEventListener("click", () => {
        toggleCategoryFilter(cat.name, card);
      });

      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleCategoryFilter(cat.name, card);
        }
      });

      categoriesGrid.appendChild(card);
    });
  }

  function toggleCategoryFilter(categoryName, cardElement) {
    const allCards = categoriesGrid.querySelectorAll(".category-card");
    
    if (currentCategory === categoryName) {
      // Deactivate
      currentCategory = null;
      cardElement.classList.remove("active");
    } else {
      // Activate
      currentCategory = categoryName;
      allCards.forEach(c => c.classList.remove("active"));
      cardElement.classList.add("active");
    }

    currentPage = 1;
    renderLatestArticles();

    // Scroll smoothly to latest articles section to show filtered results
    const latestArticlesSection = document.getElementById("latest-articles-section");
    if (latestArticlesSection) {
      latestArticlesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // Render Latest Articles (Filtered and Paginated)
  function renderLatestArticles() {
    if (!latestArticlesGrid) return;

    // Filter list
    let filtered = articles.filter(a => !a.isFeatured); // Exclude the hero featured article

    if (currentCategory) {
      filtered = filtered.filter(a => a.category === currentCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(a => {
        return (
          a.title.toLowerCase().includes(searchQuery) ||
          a.summary.toLowerCase().includes(searchQuery) ||
          a.category.toLowerCase().includes(searchQuery) ||
          a.location.toLowerCase().includes(searchQuery) ||
          a.tags.some(tag => tag.toLowerCase().includes(searchQuery))
        );
      });
    }

    // Pagination maths
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalItems === 0) {
      latestArticlesGrid.innerHTML = `
        <div class="no-results reveal-up">
          <i class="fa-regular fa-folder-open no-results-icon"></i>
          <h3>No articles found</h3>
          <p>We couldn't find any articles matching your search criteria. Try using different keywords or clearing filters.</p>
        </div>
      `;
      if (paginationContainer) paginationContainer.innerHTML = "";
      return;
    }

    // Slice for current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedArticles = filtered.slice(startIndex, endIndex);

    // Render grid items
    latestArticlesGrid.innerHTML = "";
    paginatedArticles.forEach((article, index) => {
      const card = document.createElement("article");
      card.className = "article-card reveal-up";
      card.style.transitionDelay = `${index * 80}ms`;
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", `Read article: ${article.title}`);

      card.innerHTML = `
        <div class="article-image-wrapper">
          <img src="${article.featuredImage}" alt="${article.title}" class="article-img" width="400" height="260" loading="lazy" decoding="async">
        </div>
        <div class="article-content">
          <span class="article-category-badge">${article.category}</span>
          <h3 class="article-card-title">${article.title}</h3>
          <p class="article-excerpt">${article.summary}</p>
          <div class="article-footer">
            <span class="article-read-time">${article.readingTime}</span>
          </div>
        </div>
      `;

      // Make card clickable
      const navigateToArticle = () => {
        window.location.href = `article-detail.html?id=${article.id}`;
      };
      card.addEventListener("click", navigateToArticle);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigateToArticle();
        }
      });

      latestArticlesGrid.appendChild(card);
    });

    // Render pagination
    renderPagination(totalPages);

    // Trigger reveal animation for newly added elements
    if (typeof window.IntersectionObserver !== "undefined") {
      const elements = latestArticlesGrid.querySelectorAll(".reveal-up");
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      elements.forEach(el => observer.observe(el));
    }
  }

  // Render Pagination
  function renderPagination(totalPages) {
    if (!paginationContainer) return;
    paginationContainer.innerHTML = "";

    if (totalPages <= 1) return;

    // Previous Button
    const prevBtn = document.createElement("button");
    prevBtn.className = `pagination-btn prev-btn ${currentPage === 1 ? "disabled" : ""}`;
    prevBtn.innerHTML = `<i class="fa-solid fa-chevron-left"></i> Prev`;
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderLatestArticles();
        scrollToLatestSection();
      }
    });
    paginationContainer.appendChild(prevBtn);

    // Numbered Buttons
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement("button");
      pageBtn.className = `pagination-btn page-num-btn ${currentPage === i ? "active" : ""}`;
      pageBtn.textContent = i;
      pageBtn.setAttribute("aria-label", `Go to page ${i}`);
      pageBtn.addEventListener("click", () => {
        currentPage = i;
        renderLatestArticles();
        scrollToLatestSection();
      });
      paginationContainer.appendChild(pageBtn);
    }

    // Next Button
    const nextBtn = document.createElement("button");
    nextBtn.className = `pagination-btn next-btn ${currentPage === totalPages ? "disabled" : ""}`;
    nextBtn.innerHTML = `Next <i class="fa-solid fa-chevron-right"></i>`;
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderLatestArticles();
        scrollToLatestSection();
      }
    });
    paginationContainer.appendChild(nextBtn);
  }

  function scrollToLatestSection() {
    const latestSection = document.getElementById("latest-articles-section");
    if (latestSection) {
      latestSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // Render Featured Projects
  function renderFeaturedProjects() {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = "";

    projects.slice(0, 3).forEach((proj, index) => {
      const card = document.createElement("a");
      card.href = proj.url;
      card.target = proj.url.startsWith("http") ? "_blank" : "_self";
      card.rel = proj.url.startsWith("http") ? "noopener noreferrer" : "";
      card.className = "project-card reveal-up group";
      card.style.transitionDelay = `${index * 100}ms`;

      card.innerHTML = `
        <div class="project-image-wrapper">
          <img src="${proj.image}" alt="${proj.name}" class="project-img" width="400" height="300" loading="lazy" decoding="async">
          <div class="project-hover-overlay"></div>
        </div>
        <div class="project-content">
          <div class="project-text-info">
            <h3 class="project-name">${proj.name}</h3>
            <p class="project-location"><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${proj.location}</p>
          </div>
          <div class="project-btn-wrapper">
            <span class="btn-secondary project-view-btn">View Project</span>
          </div>
        </div>
      `;

      projectsGrid.appendChild(card);
    });
  }

  // Render Popular Articles
  function renderPopularArticles() {
    if (!popularArticlesList) return;
    popularArticlesList.innerHTML = "";

    const popularArticles = articles.filter(a => a.isPopular).slice(0, 5);

    popularArticles.forEach((article, index) => {
      const item = document.createElement("li");
      item.className = "popular-article-item reveal-up";
      item.style.transitionDelay = `${index * 60}ms`;
      item.setAttribute("role", "button");
      item.setAttribute("tabindex", "0");

      item.innerHTML = `
        <div class="popular-num">${index + 1}</div>
        <div class="popular-text">
          <h4 class="popular-title">${article.title}</h4>
        </div>
        <span class="popular-read-time">${article.readingTime}</span>
      `;

      const navigateToPopular = () => {
        window.location.href = `article-detail.html?id=${article.id}`;
      };
      item.addEventListener("click", navigateToPopular);
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigateToPopular();
        }
      });

      popularArticlesList.appendChild(item);
    });
  }

  // Render Explore Locations
  function renderExploreLocations() {
    if (!locationsList) return;
    locationsList.innerHTML = "";

    locations.forEach((loc, index) => {
      const item = document.createElement("li");
      item.className = "location-item reveal-up";
      item.style.transitionDelay = `${index * 60}ms`;
      item.setAttribute("role", "button");
      item.setAttribute("tabindex", "0");
      item.setAttribute("aria-label", `Explore blogs in ${loc.name}`);

      item.innerHTML = `
        <span class="location-name"><i class="fa-solid fa-location-dot"></i> ${loc.name}</span>
        <span class="location-count">${loc.count} Articles</span>
      `;

      item.addEventListener("click", () => {
        searchQuery = loc.name.toLowerCase();
        currentPage = 1;
        if (searchInput) searchInput.value = loc.name;
        if (heroSearchInput) heroSearchInput.value = loc.name;
        renderLatestArticles();
        scrollToLatestSection();
      });

      locationsList.appendChild(item);
    });
  }

  // Render Editor's Picks Carousel
  function renderEditorsPicks() {
    if (!carouselTrack) return;
    carouselTrack.innerHTML = "";

    const editorsPicks = articles.filter(a => a.isEditorsPick);

    editorsPicks.forEach((article, index) => {
      const slide = document.createElement("div");
      slide.className = "carousel-slide";
      slide.setAttribute("role", "button");
      slide.setAttribute("tabindex", "0");
      slide.setAttribute("aria-label", `Read Editor's Pick: ${article.title}`);

      slide.innerHTML = `
        <div class="carousel-card">
          <div class="carousel-img-wrapper">
            <img src="${article.featuredImage}" alt="${article.title}" loading="lazy">
          </div>
          <div class="carousel-content">
            <h4 class="carousel-card-title">${article.title}</h4>
            <span class="carousel-card-read-time"><i class="fa-regular fa-clock"></i> ${article.readingTime}</span>
          </div>
        </div>
      `;

      const navigateToPick = () => {
        window.location.href = `article-detail.html?id=${article.id}`;
      };
      slide.addEventListener("click", navigateToPick);
      slide.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigateToPick();
        }
      });

      carouselTrack.appendChild(slide);
    });

    setupCarouselLogic();
  }

  // Carousel Logic (Scroll / Arrows / Touch swipe)
  function setupCarouselLogic() {
    if (!carouselTrack || !carouselPrevBtn || !carouselNextBtn) return;

    let scrollAmount = 0;
    const gap = 24;

    const getCardWidth = () => {
      const firstSlide = carouselTrack.querySelector('.carousel-slide');
      return firstSlide ? firstSlide.offsetWidth : 292;
    };

    const getMaxScroll = () => {
      return carouselTrack.scrollWidth - carouselTrack.clientWidth;
    };

    const updateArrowVisibility = () => {
      const maxScroll = getMaxScroll();
      carouselPrevBtn.disabled = carouselTrack.scrollLeft <= 5;
      carouselNextBtn.disabled = carouselTrack.scrollLeft >= maxScroll - 5;
    };

    carouselNextBtn.addEventListener("click", () => {
      carouselTrack.scrollBy({
        left: getCardWidth() + gap,
        behavior: "smooth"
      });
    });

    carouselPrevBtn.addEventListener("click", () => {
      carouselTrack.scrollBy({
        left: -(getCardWidth() + gap),
        behavior: "smooth"
      });
    });

    carouselTrack.addEventListener("scroll", updateArrowVisibility);
    window.addEventListener("resize", updateArrowVisibility);

    // Initial arrow check
    setTimeout(updateArrowVisibility, 300);

    // Touch Swipe Support on Mobile
    let startX;
    let scrollLeft;
    let isDown = false;

    carouselTrack.addEventListener("mousedown", (e) => {
      isDown = true;
      carouselTrack.classList.add("dragging");
      startX = e.pageX - carouselTrack.offsetLeft;
      scrollLeft = carouselTrack.scrollLeft;
    });

    carouselTrack.addEventListener("mouseleave", () => {
      isDown = false;
      carouselTrack.classList.remove("dragging");
    });

    carouselTrack.addEventListener("mouseup", () => {
      isDown = false;
      carouselTrack.classList.remove("dragging");
    });

    carouselTrack.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carouselTrack.offsetLeft;
      const walk = (x - startX) * 1.5; // scroll speed multiplier
      carouselTrack.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    carouselTrack.addEventListener("touchstart", (e) => {
      startX = e.touches[0].pageX - carouselTrack.offsetLeft;
      scrollLeft = carouselTrack.scrollLeft;
    }, { passive: true });

    carouselTrack.addEventListener("touchmove", (e) => {
      const x = e.touches[0].pageX - carouselTrack.offsetLeft;
      const walk = (x - startX) * 1.2;
      carouselTrack.scrollLeft = scrollLeft - walk;
    }, { passive: true });
  }

  // Newsletter Subscription Form validation & success animation
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const emailValue = emailInput.value.trim();
      const errorSpan = newsletterForm.querySelector(".form-error") || createErrorSpan(emailInput);

      if (!validateEmail(emailValue)) {
        emailInput.classList.add("input-error");
        errorSpan.textContent = "Please enter a valid email address.";
        errorSpan.style.display = "block";
        return;
      }

      // Valid case: Hide error, run success animation
      emailInput.classList.remove("input-error");
      errorSpan.style.display = "none";
      
      const submitBtn = newsletterForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Subscribing...`;

      // Simulate API submit delay (800ms)
      setTimeout(() => {
        newsletterForm.style.display = "none";
        newsletterSuccess.classList.add("active");
        
        // Success animation detail trigger
        const checkIcon = newsletterSuccess.querySelector(".success-check-icon");
        if (checkIcon) {
          checkIcon.classList.add("animate-check");
        }
      }, 800);
    });
  }

  function createErrorSpan(inputElement) {
    const span = document.createElement("span");
    span.className = "form-error";
    span.style.color = "#ff4d4d";
    span.style.fontSize = "12px";
    span.style.marginTop = "4px";
    span.style.display = "none";
    inputElement.parentNode.appendChild(span);
    return span;
  }

  // Header Autocomplete Search Suggestions
  const navSearchInput = document.getElementById("nav-search-input-field");
  const searchDropdown = document.getElementById("search-autocomplete-dropdown");

  if (navSearchInput && searchDropdown) {
    navSearchInput.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (q.length < 2) {
        searchDropdown.style.display = "none";
        searchDropdown.innerHTML = "";
        return;
      }

      // Filter recommendations from window.BLOG_ARTICLES
      const matches = (window.BLOG_ARTICLES || []).filter(article => {
        return (
          article.title.toLowerCase().includes(q) ||
          article.category.toLowerCase().includes(q) ||
          (article.tags && article.tags.some(t => t.toLowerCase().includes(q)))
        );
      }).slice(0, 5);

      if (matches.length > 0) {
        searchDropdown.innerHTML = matches.map(article => {
          return `
            <div class="autocomplete-suggestion-item" data-id="${article.id}">
              <div class="suggestion-thumb">
                <img src="${article.featuredImage}" alt="${article.title}">
              </div>
              <div class="suggestion-info">
                <h4 class="suggestion-title">${article.title}</h4>
                <span class="suggestion-meta">${article.category}</span>
              </div>
            </div>
          `;
        }).join("");
        
        searchDropdown.style.display = "block";
        
        // Add click events to suggestions
        const items = searchDropdown.querySelectorAll(".autocomplete-suggestion-item");
        items.forEach(item => {
          item.addEventListener("click", () => {
            const id = item.getAttribute("data-id");
            window.location.href = `article-detail.html?id=${id}`;
          });
        });
      } else {
        searchDropdown.innerHTML = `<div class="autocomplete-no-results">No related blogs found.</div>`;
        searchDropdown.style.display = "block";
      }
    });

    // Close dropdown on click outside
    document.addEventListener("click", (e) => {
      if (!navSearchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
        searchDropdown.style.display = "none";
      }
    });
  }

  // Mobile Submenu Toggle
  const submenuToggleBtn = document.getElementById("submenu-toggle");
  const mobileSubmenu = document.getElementById("mobile-submenu");
  if (submenuToggleBtn && mobileSubmenu) {
    submenuToggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = mobileSubmenu.style.display === "block";
      mobileSubmenu.style.display = isOpen ? "none" : "block";
      submenuToggleBtn.classList.toggle("active", !isOpen);
      submenuToggleBtn.innerHTML = isOpen 
        ? '<i class="fa-solid fa-chevron-down"></i>' 
        : '<i class="fa-solid fa-chevron-up"></i>';
    });
  }

  // Mobile Drawer Toggle
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const closeDrawer = document.getElementById("close-drawer");
  const mobileOverlay = document.getElementById("mobile-overlay");

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add("active");
    if (mobileOverlay) mobileOverlay.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent body scroll when menu is open
  }

  function closeDrawerMenu() {
    if (mobileDrawer) mobileDrawer.classList.remove("active");
    if (mobileOverlay) mobileOverlay.classList.remove("active");
    document.body.style.overflow = ""; // Restore body scroll
  }

  if (hamburgerMenu) {
    hamburgerMenu.addEventListener("click", openDrawer);
  }

  if (closeDrawer) {
    closeDrawer.addEventListener("click", closeDrawerMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener("click", closeDrawerMenu);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initBlog);
} else {
  initBlog();
}
