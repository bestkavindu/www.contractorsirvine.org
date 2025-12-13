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
