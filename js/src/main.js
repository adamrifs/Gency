const THEMEMASCOT = {};
(function ($) {
  "use strict";

  /* ---------------------------------------------------------------------- */
  /* --------------------------- Start Demo Switcher  --------------------- */
  /* ---------------------------------------------------------------------- */
  //   var showSwitcher = false;
  //   var $body = $('body');
  //   var $style_switcher = $('#style-switcher');
  //   if( !$style_switcher.length && showSwitcher ) {
  //       $.ajax({
  //           url: "color-switcher/style-switcher.html",
  //           success: function (data) { $body.append(data); },
  //           dataType: 'html'
  //       });
  //   }
  /* ---------------------------------------------------------------------- */
  /* ----------------------------- En Demo Switcher  ---------------------- */
  /* ---------------------------------------------------------------------- */

  //   THEMEMASCOT.isRTL = {
  //     check: function() {
  //       if( $( "html" ).attr("dir") === "rtl" ) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }
  //   };

  //   THEMEMASCOT.isLTR = {
  //     check: function() {
  //       if( $( "html" ).attr("dir") !== "rtl" ) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }
  //   };

  // Preloader js
  $(window).on("load", function () {
    const Preloader = $(".preloader");

    function initAnimations() {
      if (typeof wowController === "function") {
        wowController();
      }
      if (typeof gsapController === "function") {
        gsapController();
      }
    }

    if (Preloader.length) {
      setTimeout(function () {
        Preloader.removeClass("is-loading").addClass("is-loaded");

        setTimeout(function () {
          Preloader.fadeOut(400);
          initAnimations();
        }, 700);
      }, 2000);
    } else {
      initAnimations();
    }
  });

  // Call headerStyle on scroll
  $(window).on("scroll", function () {
    headerStyle();
  });

  // Also call on page load to handle reload
  $(document).on("ready", function () {});

  //Update Header Style and Scroll to Top
  function headerStyle() {
    if ($(".main-header").length) {
      const windowpos = $(window).scrollTop();
      const siteHeader = $(".header-style-one");
      const scrollLink = $(".scroll-to-top");
      const sticky_header = $(".main-header .sticky-header");
      if (windowpos > 100) {
        sticky_header.addClass("fixed-header animated slideInDown");
        scrollLink.fadeIn(300);
      } else {
        sticky_header.removeClass("fixed-header animated slideInDown");
        scrollLink.fadeOut(300);
      }
      if (windowpos > 1) {
        siteHeader.addClass("fixed-header");
      } else {
        siteHeader.removeClass("fixed-header");
      }
    }
  }
  headerStyle();

  // Header Search - Use event delegation to avoid double-binding
  if ($(".search-btn").length) {
    $(document)
      .off("click", ".search-btn")
      .on("click", ".search-btn", function () {
        $(".main-header").addClass("moblie-search-active");
      });
    $(document)
      .off("click", ".close-search, .search-back-drop")
      .on("click", ".close-search, .search-back-drop", function () {
        $(".main-header").removeClass("moblie-search-active");
      });
  }



  //Submenu Dropdown Toggle
  $(".navigation li.dropdown").each(function () {
    if ($(this).children("ul").length > 0) {
      $(this).append(
        '<div class="dropdown-btn"><i class="fa fa-angle-down"></i></div>',
      );
    }
  });

  //Mobile Nav Hide Show
  if ($(".mobile-menu").length) {
    const mobileMenuContent = $(
      ".main-header .header-lower .main-menu .navigation",
    ).html();
    $(".mobile-menu .close-btn").on("click", function () {
      $("body").removeClass("mobile-menu-visible");
    });

    //Dropdown Button
    $(".mobile-menu li.dropdown .dropdown-btn").on("click", function () {
      $(this).siblings("ul").slideToggle(500);
      $(this).toggleClass("active");
    });

    // Also allow tapping the text itself to toggle the dropdown
    $(".mobile-menu li.dropdown > a").on("click", function (e) {
      if ($(this).next("ul").length > 0) {
        e.preventDefault();
        $(this).next("ul").slideToggle(500);
        $(this).siblings(".dropdown-btn").toggleClass("active");
      }
    });

    //Menu Toggle Btn
    $(".mobile-nav-toggler").on("click", function () {
      $("body").addClass("mobile-menu-visible");
    });

    //Menu Toggle Btn
    $(".mobile-menu .menu-backdrop, .mobile-menu .close-btn").on(
      "click",
      function () {
        $("body").removeClass("mobile-menu-visible");
      },
    );
  }

  //Fact Counter + Text Count
  function initCounters() {
    var boxes = document.querySelectorAll(".count-box");
    if (!boxes.length) return;

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var $t = $(entry.target);
          if ($t.hasClass("counted")) return;
          $t.addClass("counted");

          var n = parseFloat($t.find(".count-text").attr("data-stop"));
          var r =
            parseInt($t.find(".count-text").attr("data-speed"), 10) || 2000;

          $({ countNum: 0 }).animate(
            { countNum: n },
            {
              duration: r,
              easing: "linear",
              step: function () {
                $t.find(".count-text").text(Math.floor(this.countNum));
              },
              complete: function () {
                $t.find(".count-text").text(n);
              },
            },
          );
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.2 },
    );

    boxes.forEach(function (box) {
      observer.observe(box);
    });
  }
  setTimeout(initCounters, 400);



  // Image move with mouse Feature Block Resort Home Layout 3
  // if ($(".award-block-two .list-item").length) {
  //   const $items = $(".award-block-two .list-item");

  //   $items.each(function () {
  //     const $item = $(this);
  //     const $hoverImage = $item.find(".hover-image");

  //     // ===== Mouse move image follow =====
  //     if ($hoverImage.length) {
  //       $item.on("mousemove", function (e) {
  //         const offset = $item.offset();
  //         const dx = e.pageX - offset.left;
  //         const dy = e.pageY - offset.top;

  //         $hoverImage.css(
  //           "transform",
  //           `translate(${dx}px, ${dy}px) rotate(-5deg)`
  //         );
  //       });
  //     }

  //     // ===== Border control for previous item =====
  //     $item.on("mouseenter", function () {
  //       $items.removeClass("prev-no-border"); // reset
  //       $(this).prev(".list-item").addClass("prev-no-border");
  //     });

  //     $item.on("mouseleave", function () {
  //       $items.removeClass("prev-no-border"); // restore when leaving
  //     });
  //   });
  // }

  /* ================================
      Hover Active Js Start
    ================================ */

  //Service Hover image
  function initServiceHover() {
    const serviceItems = document.querySelectorAll(
      ".service-block-two .inner-box",
    );
    const imageBoxes = document.querySelectorAll(
      ".service-hover-image .image-box",
    );

    if (!serviceItems.length || !imageBoxes.length) return;

    // first active
    serviceItems[0].classList.add("active");
    imageBoxes[0].classList.add("active");

    serviceItems.forEach((item) => {
      item.addEventListener("mouseenter", function () {
        const index = this.dataset.index;

        imageBoxes.forEach((box) => box.classList.remove("active"));
        serviceItems.forEach((i) => i.classList.remove("active"));

        const activeBox = document.querySelector(
          `.service-hover-image .image-box[data-index="${index}"]`,
        );

        if (activeBox) activeBox.classList.add("active");
        this.classList.add("active");
      });
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initServiceHover);
  } else {
    initServiceHover();
  }

  $(".working-block-one .inner-block").on("mouseenter", function () {
    $(".working-block-one .inner-block").removeClass("active");
    $(this).addClass("active");
  });

  if ($(".award-block-two .list-item").length) {
    const $awardItems = $(".award-block-two .list-item");
    $awardItems.each(function () {
      const $item = $(this);
      const $hoverImage = $item.find(".hover-image");
      if ($hoverImage.length) {
        $item.on("mousemove", function (e) {
          const offset = $item.offset();
          const dx = e.pageX - offset.left;
          const dy = e.pageY - offset.top;
          $hoverImage.css("transform", `translate(${dx}px, ${dy}px) rotate(-5deg)`);
        });
      }
      $item.on("mouseenter", function () {
        $awardItems.removeClass("prev-no-border");
        $(this).prev(".list-item").addClass("prev-no-border");
      });
      $item.on("mouseleave", function () {
        $awardItems.removeClass("prev-no-border");
      });
    });
  }





  /* ================================
      Testimonial Slider Js Start
    ================================ */

  if ($(".testimonial-slider").length > 0) {
    if (typeof Swiper !== "undefined") {
      const testimonialSlider = new Swiper(".testimonial-slider", {
      spaceBetween: 30,
      speed: 1300,
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".array-next",
        prevEl: ".array-prev",
      },
    });
    }

    // Add "See More / See Less" toggle for long testimonial texts
    $(".testimonial-block-one .inner-box .text").each(function () {
      const $el = $(this);
      const el = $el[0];

      // Insert toggle AFTER the .text div, not inside it
      const $toggle = $(
        '<a href="#" class="testi-toggle" style="display:inline-block;margin-top:8px;font-size:14px;font-weight:600;color:var(--theme-color1);font-style:normal;">See More</a>',
      );
      $el.after($toggle);

      // Hide toggle if text isn't actually clamped
      setTimeout(function () {
        if (el.scrollHeight <= el.clientHeight + 2) {
          $toggle.hide();
        }
      }, 200);
    });

    $(document).on("click", ".testi-toggle", function (e) {
      e.preventDefault();
      const $text = $(this).prev(".text");
      const isExpanded = $text.hasClass("expanded");
      if (isExpanded) {
        $text.removeClass("expanded");
        $(this).text("See More");
      } else {
        $text.addClass("expanded");
        $(this).text("See Less");
      }
    });
  }



  /* ================================
      Services Accordion Js Start
    ================================ */

  function initServiceAccordion() {
    const serviceBlocks = document.querySelectorAll(
      ".service-block-four .inner-box",
    );

    serviceBlocks.forEach((block) => {
      block.addEventListener("mouseenter", function () {
        // Remove active from all
        serviceBlocks.forEach((item) => item.classList.remove("active"));

        // Add active to hovered one
        this.classList.add("active");
      });
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initServiceAccordion);
  } else {
    initServiceAccordion();
  }

  /* ================================
        Mouse Cursor Animation Js Start
    ================================ */

  if ($(".mouseCursor").length > 0) {
    function itCursor() {
      const myCursor = jQuery(".mouseCursor");
      if (myCursor.length) {
        if ($("body")) {
          const e = document.querySelector(".cursor-inner"),
            t = document.querySelector(".cursor-outer");
          let n,
            i = 0,
            o = !1;
          // Use addEventListener instead of direct window.onmousemove assignment to avoid breaking other listeners
          document.addEventListener("mousemove", function (s) {
            if (!o) {
              t.style.transform =
                "translate(" + s.clientX + "px, " + s.clientY + "px)";
            }
            e.style.transform =
              "translate(" + s.clientX + "px, " + s.clientY + "px)";
            n = s.clientY;
            i = s.clientX;
          });
          $("body").on("mouseenter", "button, a, .cursor-pointer", function () {
            e.classList.add("cursor-hover");
            t.classList.add("cursor-hover");
          });
          $("body").on("mouseleave", "button, a, .cursor-pointer", function () {
            if (
              !(
                $(this).is("a", "button") &&
                $(this).closest(".cursor-pointer").length
              )
            ) {
              e.classList.remove("cursor-hover");
              t.classList.remove("cursor-hover");
            }
          });
          e.style.visibility = "visible";
          t.style.visibility = "visible";
        }
      }
    }
    itCursor();
  }



  /* ================================
        Back To Top Button Js Start
    ================================ */
  $(window).on("scroll", function () {
    if ($(this).scrollTop() + $(this).height() >= $(document).height() - 10) {
      $("#back-top").addClass("show");
    } else {
      $("#back-top").removeClass("show");
    }
  });

  $(document).on("click", "#back-top", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 800);
  });





  // Elements Animation
  if ($(".wow").length && typeof WOW !== "undefined") {
    const wow = new WOW({
      boxClass: "wow", // animated element css class (default is wow)
      animateClass: "animated", // animation css class (default is animated)
      offset: 0, // distance to the element when triggering the animation (default is 0)
      mobile: false, // trigger animations on mobile devices (default is true)
      live: true, // act on asynchronously loaded content (default is true)
    });
    wow.init();
  }

})(window.jQuery);
