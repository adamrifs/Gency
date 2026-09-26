/* =========================================================
   Mobile Menu Toggle
   ========================================================= */
(function () {
  "use strict";

  function initMobileMenu() {
    const toggler = document.querySelector(".mobile-nav-toggler");
    const close = document.querySelector(".mobile-menu .close-btn");
    const backdrop = document.querySelector(".mobile-menu .menu-backdrop");
    const open = () => document.body.classList.add("mobile-menu-visible");
    const shut = () => document.body.classList.remove("mobile-menu-visible");

    toggler?.addEventListener("click", open);
    toggler?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") open();
    });
    close?.addEventListener("click", shut);
    backdrop?.addEventListener("click", shut);

    // --- Mobile Dropdown Submenus ---
    // Find all dropdown items inside the mobile menu and inject a toggle button
    const mobileDropdowns = document.querySelectorAll(
      ".mobile-menu li.dropdown"
    );

    mobileDropdowns.forEach((li) => {
      const submenu = li.querySelector(":scope > ul");
      if (!submenu) return;

      // Set up for CSS transition
      submenu.style.display = "block";
      submenu.style.overflow = "hidden";
      submenu.style.height = "0px";
      submenu.style.transition = "height 0.3s ease-out";

      // Create the toggle button
      const btn = document.createElement("span");
      btn.className = "mobile-dropdown-toggle";
      btn.setAttribute("aria-label", "Toggle submenu");
      btn.innerHTML = "&#43;"; // "+" sign
      btn.style.cssText =
        "position:absolute;right:0;top:0;width:44px;height:44px;display:flex;align-items:center;justify-content:center;font-size:20px;color:#fff;cursor:pointer;z-index:10;border-left:1px solid rgba(255,255,255,0.1);";

      li.style.position = "relative";
      li.appendChild(btn);

      function toggleSubmenu() {
        const isOpen = btn.classList.contains("active");
        if (isOpen) {
          btn.classList.remove("active");
          btn.innerHTML = "&#43;"; // "+"
          submenu.style.height = "0px";
        } else {
          btn.classList.add("active");
          btn.innerHTML = "&#8722;"; // "−"
          submenu.style.height = submenu.scrollHeight + "px";
        }
      }

      // Toggle on button click
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSubmenu();
      });

      // Also toggle when tapping the Services link itself (prevent navigation)
      const link = li.querySelector(":scope > a");
      if (link) {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleSubmenu();
        });
      }
    });

    // Close menu when clicking a non-dropdown link
    const allLinks = document.querySelectorAll(".mobile-menu a");
    allLinks.forEach((a) => {
      const parentLi = a.parentElement;
      const hasSub = a.nextElementSibling && a.nextElementSibling.tagName === "UL";
      if (!hasSub) {
        a.addEventListener("click", shut);
      }
    });
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

        /* ── Anchor-link intercept ─────────────────────────────────────────
           Native hash navigation (href="#section") moves window.scrollY
           directly, bypassing ScrollSmoother's internal transform state.
           The result: the smoother thinks it's at position 0 while the
           content is visually mid-page — scroll gets locked.
           Fix: intercept every same-page hash link and drive scroll through
           the smoother so its state and the visual position stay in sync.  */
        document.addEventListener("click", function (e) {
          var link = e.target.closest("a[href]");
          if (!link) return;

          var href = link.getAttribute("href");

          // Only handle same-page hash links (e.g. "#contact", "#about")
          if (!href || !href.startsWith("#") || href === "#") return;

          var targetId = href.slice(1);
          var targetEl = document.getElementById(targetId);
          if (!targetEl) return;

          e.preventDefault();

          // Close mobile menu if open
          document.body.classList.remove("mobile-menu-visible");

          // Use ScrollSmoother's API — keeps the smoother's state in sync
          window.gencyoSmoother.scrollTo(targetEl, true, "top top");
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
          duration: 0.7,
          delay: 0.5,
          x: 100,
          autoAlpha: 0,
          stagger: 0.03,
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

  function slideDown(el, duration) {
    el.style.display = "block";
    el.style.overflow = "hidden";
    el.style.maxHeight = "0";
    el.style.transition = "max-height " + duration + "ms ease, opacity " + duration + "ms ease";
    el.style.opacity = "0";
    requestAnimationFrame(function () {
      el.style.maxHeight = el.scrollHeight + "px";
      el.style.opacity = "1";
    });
    setTimeout(function () {
      el.style.maxHeight = "";
      el.style.overflow = "";
      el.style.transition = "";
      el.classList.add("show");
    }, duration);
  }

  function slideUp(el, duration) {
    el.style.overflow = "hidden";
    el.style.maxHeight = el.scrollHeight + "px";
    el.style.opacity = "1";
    el.style.transition = "max-height " + duration + "ms ease, opacity " + duration + "ms ease";
    el.classList.remove("show");
    requestAnimationFrame(function () {
      el.style.maxHeight = "0";
      el.style.opacity = "0";
    });
    setTimeout(function () {
      el.style.display = "none";
      el.style.maxHeight = "";
      el.style.overflow = "";
      el.style.transition = "";
      el.style.opacity = "";
    }, duration);
  }

  function initFaqAccordion() {
    const faqSelectors = ".faq-block-one, .faq-block-two";
    const titleSelectors = ".faq-block-one .title-box, .faq-block-two .title-box";

    // Set initial state: hide all non-active content-boxes
    document.querySelectorAll(faqSelectors).forEach(function (block) {
      var box = block.querySelector(".content-box");
      var icon = block.querySelector(".icon i");
      if (!box) return;
      if (!block.classList.contains("active")) {
        box.style.display = "none";
        if (icon) {
          icon.classList.remove("fa-minus");
          icon.classList.add("fa-plus");
        }
      } else {
        if (icon) {
          icon.classList.remove("fa-plus");
          icon.classList.add("fa-minus");
        }
      }
    });

    document
      .querySelectorAll(titleSelectors)
      .forEach(function (titleBox) {
        if (titleBox.dataset.faqBound === "1") return;
        titleBox.dataset.faqBound = "1";

        function toggleFaq() {
          var block = titleBox.closest(faqSelectors);
          var isActive = block.classList.contains("active");
          var container = block.closest(".row") || document;

          // Close all open items in the same container
          container
            .querySelectorAll(faqSelectors)
            .forEach(function (item) {
              if (item.classList.contains("active")) {
                item.classList.remove("active");
                var box = item.querySelector(".content-box");
                var title = item.querySelector(".title-box");
                var icon = item.querySelector(".icon i");
                if (box) slideUp(box, 500);
                if (title) title.setAttribute("aria-expanded", "false");
                if (icon) {
                  icon.classList.remove("fa-minus");
                  icon.classList.add("fa-plus");
                }
              }
            });

          // If it wasn't active, open it
          if (!isActive) {
            block.classList.add("active");
            var contentBox = block.querySelector(".content-box");
            var titleIcon = block.querySelector(".icon i");
            if (contentBox) slideDown(contentBox, 500);
            titleBox.setAttribute("aria-expanded", "true");
            if (titleIcon) {
              titleIcon.classList.remove("fa-plus");
              titleIcon.classList.add("fa-minus");
            }
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

/* =========================================================
   Count-Up Animation (standalone – no jquery.appear needed)
   ========================================================= */
(function () {
  "use strict";

  function initCountUp() {
    var $ = window.jQuery;
    if (!$) return;

    var boxes = document.querySelectorAll(".count-box");
    if (!boxes.length) return;

    // Skip if already initialized by main.js
    var alreadyCounted = true;
    boxes.forEach(function (box) {
      if (!box.classList.contains("counted")) alreadyCounted = false;
    });
    if (alreadyCounted) return;

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = $(entry.target);
          if (el.hasClass("counted")) return;
          el.addClass("counted");

          var countSpan = el.find(".count-text");
          var target = parseFloat(countSpan.attr("data-stop"));
          var speed =
            parseInt(countSpan.attr("data-speed"), 10) || 2000;

          $({ num: 0 }).animate(
            { num: target },
            {
              duration: speed,
              easing: "linear",
              step: function () {
                countSpan.text(Math.floor(this.num));
              },
              complete: function () {
                countSpan.text(target);
              },
            }
          );
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    boxes.forEach(function (box) {
      observer.observe(box);
    });
  }

  // Run after a short delay to ensure jQuery is ready
  setTimeout(initCountUp, 500);
})();

/* =========================================================
   Web3Forms AJAX Submission (No Redirect)
   Uses event delegation so it works with dynamically-loaded forms.
   ========================================================= */
(function () {
  "use strict";

  function showSuccessModal() {
    let modalOverlay = document.querySelector('.gencyo-success-modal-overlay');
    if (!modalOverlay) {
      modalOverlay = document.createElement('div');
      modalOverlay.className = 'gencyo-success-modal-overlay';
      modalOverlay.innerHTML = `
        <div class="gencyo-success-modal">
          <div class="icon"><i class="fa-solid fa-check"></i></div>
          <h3>Received Successfully!</h3>
          <p>Thank you for reaching out. We have received your message and will contact you shortly.</p>
          <button class="close-modal-btn">Awesome</button>
        </div>
      `;
      document.body.appendChild(modalOverlay);
      
      const closeBtn = modalOverlay.querySelector('.close-modal-btn');
      closeBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
      });
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
          modalOverlay.classList.remove('active');
        }
      });
    }
    
    // Slight delay to allow CSS transition to trigger
    setTimeout(() => {
      modalOverlay.classList.add('active');
    }, 10);
  }

  function handleWeb3FormSubmit(e) {
    const form = e.target.closest('form[action^="https://api.web3forms.com/submit"]');
    if (!form) return;

    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"], input[type="submit"], button.circle-btn, button.subscribe-btn');
    const originalButtonHtml = submitButton ? submitButton.innerHTML : '';

    if (submitButton) {
      if (submitButton.classList.contains('circle-btn')) {
        submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
      } else if (submitButton.querySelector('.btn-title')) {
        submitButton.querySelector('.btn-title').innerText = 'Sending...';
      } else {
        submitButton.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin" style="margin-left: 8px;"></i>';
      }
      submitButton.disabled = true;
      submitButton.style.opacity = "0.7";
    }

    fetch(form.getAttribute("action"), {
      method: "POST",
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => response.json())
    .then(json => {
      const existingMsg = form.querySelector('.web3forms-msg');
      if (existingMsg) existingMsg.remove();

      if (json.success) {
        form.reset();
        showSuccessModal();
      } else {
        const msgDiv = document.createElement("div");
        msgDiv.className = "web3forms-msg";
        msgDiv.style.cssText = "padding: 10px 15px; border-radius: 5px; margin-top: 15px; text-align: center; font-weight: 500; font-size: 15px; background-color: rgba(255, 51, 51, 0.2); color: #ff3333; border: 1px solid #ff3333;";
        msgDiv.innerText = json.message || "Something went wrong!";
        form.appendChild(msgDiv);
        setTimeout(() => { if (msgDiv.parentNode) msgDiv.remove(); }, 6000);
      }
    })
    .catch(() => {
      const existingMsg = form.querySelector('.web3forms-msg');
      if (existingMsg) existingMsg.remove();

      const msgDiv = document.createElement("div");
      msgDiv.className = "web3forms-msg";
      msgDiv.style.cssText = "background-color: rgba(255, 51, 51, 0.2); color: #ff3333; border: 1px solid #ff3333; padding: 10px 15px; border-radius: 5px; margin-top: 15px; text-align: center; font-weight: 500; font-size: 15px;";
      msgDiv.innerText = "Something went wrong! Please try again later.";
      form.appendChild(msgDiv);
    })
    .finally(() => {
      if (submitButton) {
        submitButton.innerHTML = originalButtonHtml;
        submitButton.disabled = false;
        submitButton.style.opacity = "1";
      }
    });
  }

  // Use capturing phase on document to catch submits from dynamically injected forms
  document.addEventListener("submit", handleWeb3FormSubmit, true);
})();