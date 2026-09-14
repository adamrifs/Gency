/* =========================================================
   Mobile Menu Toggle
   ========================================================= */
(function () {
  "use strict";

  function initMobileMenu() {
    const toggler = document.querySelector(".mobile-nav-toggler");
    const close = document.querySelector(".mobile-menu .close-btn");
    const backdrop = document.querySelector(".mobile-menu .menu-backdrop");
    const links = document.querySelectorAll(".mobile-menu a");
    const open = () => document.body.classList.add("mobile-menu-visible");
    const shut = () => document.body.classList.remove("mobile-menu-visible");

    toggler?.addEventListener("click", open);
    toggler?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") open();
    });
    close?.addEventListener("click", shut);
    backdrop?.addEventListener("click", shut);
    links.forEach((a) => a.addEventListener("click", shut));
  }

  initMobileMenu();
})();

/* =========================================================
   GSAP Scroll Animations + ScrollSmoother
   ========================================================= */
(function ($) {
  "use strict";

  function initGencyoAnimations() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined")
      return;

    /* Smooth scroller */
    if (
      document.querySelector("#smooth-wrapper") &&
      document.querySelector("#smooth-content") &&
      typeof ScrollSmoother !== "undefined"
    ) {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
      gsap.config({ nullTargetWarn: false });

      if (!window.gencyoSmoother) {
        window.gencyoSmoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 2,
          effects: true,
          smoothTouch: 0.1,
          normalizeScroll: false,
          ignoreMobileResize: true,
          onUpdate: function (self) {
            // ScrollSmoother moves content via transform, so window.scrollTop()
            // always returns 0. We patch it here so headerStyle() in main.js works.
            var scrollY = self.scrollTop();
            var siteHeader = document.querySelector(".header-style-one");
            var stickyHeader = document.querySelector(".main-header .sticky-header");
            var scrollToTop = document.querySelector(".scroll-to-top");

            if (!stickyHeader) return;

            if (scrollY > 100) {
              stickyHeader.classList.add("fixed-header", "animated", "slideInDown");
              if (scrollToTop) scrollToTop.style.display = "inline-flex";
            } else {
              stickyHeader.classList.remove("fixed-header", "animated", "slideInDown");
              if (scrollToTop) scrollToTop.style.display = "none";
            }

            if (siteHeader) {
              if (scrollY > 1) {
                siteHeader.classList.add("fixed-header");
              } else {
                siteHeader.classList.remove("fixed-header");
              }
            }
          },
        });
      }
    }

    /* .tz-sub-tilte / .tz-itm-title split text animations */
    if (typeof SplitText !== "undefined") {
      gsap.registerPlugin(ScrollTrigger, SplitText);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1200px)", function () {
        const splits = [];

        document.querySelectorAll(".tz-sub-tilte").forEach(function (el) {
          const split = new SplitText(el, {
            type: "lines,words,chars",
            linesClass: "split-line",
          });
          splits.push(split);
          gsap.set(split.chars, { opacity: 0, x: 7 });
          gsap.to(split.chars, {
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 60%",
              scrub: 1,
            },
            x: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.2,
          });
        });

        document.querySelectorAll(".tz-itm-title").forEach(function (el) {
          const split = new SplitText(el, {
            type: "lines,words,chars",
            linesClass: "split-line",
          });
          splits.push(split);
          gsap.set(split.chars, { opacity: 0.3, x: -7 });
          gsap.to(split.chars, {
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              end: "top 60%",
              scrub: 1,
            },
            x: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.2,
          });
        });

        return function () {
          splits.forEach(function (split) {
            split.revert();
          });
        };
      });
    }

    /* .char-animation: split into characters and reveal */
    if (typeof SplitText !== "undefined") {
      gsap.registerPlugin(ScrollTrigger, SplitText);

      document.querySelectorAll(".char-animation").forEach(function (el) {
        if (el.dataset.gencyoSplit === "1") return;
        el.dataset.gencyoSplit = "1";

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "bottom 60%",
            scrub: false,
            markers: false,
            toggleActions: "play none none none",
          },
        });

        const itemSplitted = new SplitText(el, { type: "chars, words" });
        gsap.set(el, { perspective: 300 });
        itemSplitted.split({ type: "chars, words" });

        tl.from(itemSplitted.chars, {
          duration: 1,
          delay: 0.5,
          x: 100,
          autoAlpha: 0,
          stagger: 0.05,
        });
      });
    }

    /* .tm-gsap-animate-circle rotation */
    gsap.utils.toArray(".tm-gsap-animate-circle").forEach(function (el) {
      if (el.dataset.gencyoCircle === "1") return;
      el.dataset.gencyoCircle = "1";

      const arspin = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          scrub: 1,
          start: "top 100%",
          end: "top -50%",
          toggleActions: "play none none reverse",
          markers: false,
        },
      });

      arspin
        .set(el, { transformOrigin: "center center" })
        .fromTo(
          el,
          { rotate: 0 },
          { rotate: 180, duration: 2, immediateRender: false }
        );
    });

    ScrollTrigger.refresh();
  }

  initGencyoAnimations();

  /* WOW fallback using IntersectionObserver */
  function initWowFallback() {
    if (typeof WOW !== "undefined") return;
    const items = document.querySelectorAll(".wow");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("animated");
      });
      return;
    }
    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const delay = el.getAttribute("data-wow-delay");
          if (delay) el.style.animationDelay = delay;
          el.classList.add("animated");
          obs.unobserve(el);
        });
      },
      { threshold: 0.12 }
    );
    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  initWowFallback();
})(window.jQuery);

/* =========================================================
   Testimonial Slider
   ========================================================= */
(function () {
  "use strict";

  function initTestimonialSlider() {
    document
      .querySelectorAll(".testimonial-one .slider-box")
      .forEach(function (box) {
        if (box.dataset.testimonialSlider === "1") return;
        box.dataset.testimonialSlider = "1";

        var slider = box.querySelector(".testimonial-slider");
        var wrapper = slider && slider.querySelector(".swiper-wrapper");
        var slides = wrapper
          ? Array.from(wrapper.querySelectorAll(".swiper-slide"))
          : [];
        var prev = box.querySelector(".array-prev");
        var next = box.querySelector(".array-next");

        if (!wrapper || slides.length < 2) return;

        var index = 0;

        function render() {
          wrapper.style.transform =
            "translate3d(" + -index * 100 + "%, 0, 0)";
          slides.forEach(function (slide, i) {
            slide.setAttribute("aria-hidden", i === index ? "false" : "true");
          });
        }

        prev &&
          prev.addEventListener("click", function () {
            index = (index - 1 + slides.length) % slides.length;
            render();
          });

        next &&
          next.addEventListener("click", function () {
            index = (index + 1) % slides.length;
            render();
          });

        render();
      });
  }

  initTestimonialSlider();
})();

/* =========================================================
   FAQ Accordion
   ========================================================= */
(function () {
  "use strict";

  function initFaqAccordion() {
    document
      .querySelectorAll(".faq-block-one .title-box")
      .forEach(function (titleBox) {
        if (titleBox.dataset.faqBound === "1") return;
        titleBox.dataset.faqBound = "1";

        function toggleFaq() {
          var block = titleBox.closest(".faq-block-one");
          var isActive = block.classList.contains("active");

          document
            .querySelectorAll(".faq-section .faq-block-one")
            .forEach(function (item) {
              item.classList.remove("active");
              var box = item.querySelector(".content-box");
              var title = item.querySelector(".title-box");
              if (box) box.classList.remove("show");
              if (title) title.setAttribute("aria-expanded", "false");
            });

          if (!isActive) {
            block.classList.add("active");
            var contentBox = block.querySelector(".content-box");
            if (contentBox) contentBox.classList.add("show");
            titleBox.setAttribute("aria-expanded", "true");
          }
        }

        titleBox.addEventListener("click", toggleFaq);
        titleBox.addEventListener("keydown", function (event) {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleFaq();
          }
        });
      });
  }

  initFaqAccordion();
})();