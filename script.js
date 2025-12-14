tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#f0fdfa", // Very light teal
          100: "#ccfbf1", // Light teal
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6", // Primary Teal
          600: "#0d9488",
        },
        accent: {
          50: "#f0f9ff", // Very light blue
          100: "#e0f2fe",
          400: "#38bdf8", // Sky blue
          500: "#0ea5e9",
          600: "#0284c7",
        },
        cta: {
          500: "#f97316", // Orange-500
          600: "#ea580c", // Orange-600
        },
      },
    },
  },
};

document.addEventListener("DOMContentLoaded", () => {
  // Hero Slider

  const slides = document.querySelectorAll(".slide-img");
  const indicators = document.querySelectorAll(".indicator");
  let currentSlide = 0;
  const totalSlides = slides.length;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("opacity-100");
      slide.classList.add("opacity-0");

      if (indicators[i]) {
        indicators[i].classList.remove("opacity-100");
        indicators[i].classList.add("opacity-50");
      }
    });

    if (slides[index]) {
      slides[index].classList.remove("opacity-0");
      slides[index].classList.add("opacity-100");
    }

    if (indicators[index]) {
      indicators[index].classList.remove("opacity-50");
      indicators[index].classList.add("opacity-100");
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  // Auto play Hero Slider
  let slideInterval = setInterval(nextSlide, 5000);

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      clearInterval(slideInterval);
      currentSlide = index;
      showSlide(currentSlide);
      slideInterval = setInterval(nextSlide, 5000);
    });
  });

  // Services Carousel
  const serviceTrack = document.getElementById("services-slider-track");
  if (serviceTrack) {
    const serviceCards = serviceTrack.children;
    const totalServiceSlides = serviceCards.length;
    let currentServiceIndex = 0;

    function moveServiceSlider() {
      // Determine visible slides based on screen width
      let slidesPerView = 1;
      if (window.matchMedia("(min-width: 1024px)").matches) {
        slidesPerView = 4;
      } else if (window.matchMedia("(min-width: 768px)").matches) {
        slidesPerView = 2;
      }

      const maxIndex = totalServiceSlides - slidesPerView;

      // Increment index
      currentServiceIndex++;
      if (currentServiceIndex > maxIndex) {
        currentServiceIndex = 0;
      }

      // Calculate translation in pixels for perfect alignment
      // We measure the distance between the starts of the first two cards.
      // This effectively gives us (CardWidth + Gap).
      let slidePitch = 0;
      if (totalServiceSlides > 1) {
        slidePitch = serviceCards[1].offsetLeft - serviceCards[0].offsetLeft;
      } else {
        // Fallback for single item (rare case in this context)
        slidePitch = serviceCards[0].offsetWidth;
      }

      const translatePx = slidePitch * currentServiceIndex;

      serviceTrack.style.transform = `translateX(-${translatePx}px)`;
    }

    // Auto swipe every 4 seconds
    setInterval(moveServiceSlider, 4000);
  }

  // Testimonials Slider
  (function () {
    const track = document.getElementById("testimonials-slider-track");
    if (!track) return; // Guard clause

    const cards = document.querySelectorAll(".testimonial-card");
    const dots = document.querySelectorAll(".testimonial-dot");
    let currentIndex = 0;
    let autoSlideInterval;

    function getVisibleCards() {
      if (window.innerWidth >= 1024) return 3; // lg
      if (window.innerWidth >= 768) return 2; // md
      return 1; // mobile
    }

    function getCardWidth() {
      if (!cards[0]) return 0;
      const card = cards[0];
      const width = card.offsetWidth;
      const gap = 32; // gap-8 = 2rem = 32px
      return width + gap;
    }

    function updateSlider() {
      const cardWidth = getCardWidth();
      const offset = currentIndex * cardWidth;
      track.style.transform = `translateX(-${offset}px)`;

      // Update dots
      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.remove("bg-brand-200");
          dot.classList.add("bg-brand-500");
        } else {
          dot.classList.remove("bg-brand-500");
          dot.classList.add("bg-brand-200");
        }
      });
    }

    function nextSlide() {
      const visibleCards = getVisibleCards();
      const maxIndex = Math.max(0, cards.length - visibleCards);
      currentIndex = currentIndex + 1 > maxIndex ? 0 : currentIndex + 1;
      updateSlider();
    }

    function goToSlide(index) {
      const visibleCards = getVisibleCards();
      const maxIndex = Math.max(0, cards.length - visibleCards);
      currentIndex = Math.min(index, maxIndex);
      updateSlider();
    }

    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    // Dot click handlers
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        stopAutoSlide();
        goToSlide(index);
        startAutoSlide();
      });
    });

    // Pause on hover
    track.addEventListener("mouseenter", stopAutoSlide);
    track.addEventListener("mouseleave", startAutoSlide);

    // Handle resize
    window.addEventListener("resize", () => {
      const visibleCards = getVisibleCards();
      const maxIndex = Math.max(0, cards.length - visibleCards);
      if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
      }
      updateSlider();
    });

    // Initialize
    setTimeout(() => {
      updateSlider();
    }, 100); // Small delay to ensure layout is ready
    startAutoSlide();
  })();

  // Initialize AOS (if available)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: "ease-out-cubic",
    });
  }

  // Mobile Menu Toggle
  const btn = document.getElementById("mobile-menu-button");
  const menu = document.getElementById("mobile-menu");
  const hamburgerTop = document.getElementById("hamburger-top");
  const hamburgerMiddle = document.getElementById("hamburger-middle");
  const hamburgerBottom = document.getElementById("hamburger-bottom");

  if (btn && menu) {
    btn.addEventListener("click", () => {
      const isOpen = !menu.classList.contains("hidden");
      
      if (isOpen) {
        // Close menu
        menu.classList.add("hidden");
        // Reset hamburger icon
        if (hamburgerTop) {
          hamburgerTop.classList.remove("rotate-45", "translate-y-2");
        }
        if (hamburgerMiddle) {
          hamburgerMiddle.classList.remove("opacity-0");
        }
        if (hamburgerBottom) {
          hamburgerBottom.classList.remove("-rotate-45", "-translate-y-2");
        }
      } else {
        // Open menu
        menu.classList.remove("hidden");
        // Animate to X icon
        if (hamburgerTop) {
          hamburgerTop.classList.add("rotate-45", "translate-y-2");
        }
        if (hamburgerMiddle) {
          hamburgerMiddle.classList.add("opacity-0");
        }
        if (hamburgerBottom) {
          hamburgerBottom.classList.add("-rotate-45", "-translate-y-2");
        }
      }
    });
  }

  // Mobile Dropdown Toggles
  const mobileDropdownBtns = document.querySelectorAll(".mobile-dropdown-btn");
  mobileDropdownBtns.forEach((dropdownBtn) => {
    dropdownBtn.addEventListener("click", () => {
      const content = dropdownBtn.nextElementSibling;
      const icon = dropdownBtn.querySelector("svg");
      
      if (content) {
        content.classList.toggle("hidden");
      }
      if (icon) {
        icon.classList.toggle("rotate-180");
      }
    });
  });

  // Close mobile menu when clicking on a link (except dropdown buttons)
  const mobileMenuLinks = menu ? menu.querySelectorAll("a") : [];
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (menu && btn) {
        menu.classList.add("hidden");
        // Reset hamburger icon
        if (hamburgerTop) {
          hamburgerTop.classList.remove("rotate-45", "translate-y-2");
        }
        if (hamburgerMiddle) {
          hamburgerMiddle.classList.remove("opacity-0");
        }
        if (hamburgerBottom) {
          hamburgerBottom.classList.remove("-rotate-45", "-translate-y-2");
        }
      }
    });
  });
});
