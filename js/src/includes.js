// Remove index.html from URL address bar if present
if (window.location.pathname.endsWith("index.html")) {
  const cleanPath =
    window.location.pathname.replace(/index\.html$/, "") +
    window.location.search +
    window.location.hash;
  window.history.replaceState(null, "", cleanPath);
}

document.addEventListener("DOMContentLoaded", function () {
  // Determine depth to correctly reference assets
  const isTwoLevelsDeep = window.location.pathname.match(
    /\/(service|services|blog)\/[^\/]+\/?(index\.html)?$/,
  );
  const isOneLevelDeep = window.location.pathname.match(
    /\/(about|service|services|contact|projects|blog|blog-details|seo|best-digital-marketing-course-in-kerala)\/?(index\.html)?$/,
  );
  const isSubDir = Boolean(isTwoLevelsDeep || isOneLevelDeep);
  const basePath = isTwoLevelsDeep ? "../../" : isOneLevelDeep ? "../" : "./";

  const footerFile = isSubDir
    ? "includes/footer-inner.html"
    : "includes/footer.html";
  Promise.all([
    fetch(basePath + "includes/header.html").then((response) =>
      response.text(),
    ),
    fetch(basePath + footerFile).then((response) => response.text()),
  ])
    .then(([headerData, footerData]) => {
      // Fix image paths and navigation links in header and footer if in subdirectory
      if (isTwoLevelsDeep) {
        headerData = headerData.replace(
          /src="(?:\.\.\/)*images\//g,
          'src="../../images/',
        );
        footerData = footerData.replace(
          /src="(?:\.\.\/)*images\//g,
          'src="../../images/',
        );

        headerData = headerData.replace(
          /url\((&quot;|['"])?(?:\.\.\/)*images\//g,
          "url($1../../images/",
        );
        footerData = footerData.replace(
          /url\((&quot;|['"])?(?:\.\.\/)*images\//g,
          "url($1../../images/",
        );

        headerData = headerData.replace(/href="\.\/"/g, 'href="../../"');
        footerData = footerData.replace(/href="\.\/"/g, 'href="../../"');

        headerData = headerData.replace(
          /href="(about|service|services|contact|projects|blog|blog-details|seo|best-digital-marketing-course-in-kerala)\//g,
          'href="../../$1/',
        );
        footerData = footerData.replace(
          /href="(about|service|services|contact|projects|blog|blog-details|seo|best-digital-marketing-course-in-kerala)\//g,
          'href="../../$1/',
        );
        footerData = footerData.replace(
          /href="(service|services)\/(seo|best-digital-marketing-course-in-kerala)\/"/g,
          'href="../../$1/$2/',
        );
        footerData = footerData.replace(/href="\.\.\/#/g, 'href="../../#');
      } else if (isOneLevelDeep) {
        headerData = headerData.replace(
          /src="(?:\.\.\/)*images\//g,
          'src="../images/',
        );
        footerData = footerData.replace(
          /src="(?:\.\.\/)*images\//g,
          'src="../images/',
        );

        headerData = headerData.replace(
          /url\((&quot;|['"])?(?:\.\.\/)*images\//g,
          "url($1../images/",
        );
        footerData = footerData.replace(
          /url\((&quot;|['"])?(?:\.\.\/)*images\//g,
          "url($1../images/",
        );

        headerData = headerData.replace(/href="\.\/"/g, 'href="../"');
        footerData = footerData.replace(/href="\.\/"/g, 'href="../"');

        headerData = headerData.replace(
          /href="(about|service|services|contact|projects|blog|blog-details|seo|best-digital-marketing-course-in-kerala)\//g,
          'href="../$1/',
        );
        footerData = footerData.replace(
          /href="(about|service|services|contact|projects|blog|blog-details|seo|best-digital-marketing-course-in-kerala)\//g,
          'href="../$1/',
        );
        footerData = footerData.replace(
          /href="(service|services)\/(seo|best-digital-marketing-course-in-kerala)\/"/g,
          'href="../$1/$2/',
        );
      }

      document.getElementById("header").innerHTML = headerData;
      document.getElementById("footer").innerHTML = footerData;

      // Ensure floating WhatsApp button is present across all pages
      if (!document.querySelector(".whatsapp-float")) {
        const waBtn = document.createElement("a");
        waBtn.href = "https://wa.me/919746616242";
        waBtn.className = "whatsapp-float";
        waBtn.target = "_blank";
        waBtn.rel = "noopener noreferrer";
        waBtn.setAttribute("aria-label", "Chat on WhatsApp");
        waBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" aria-hidden="true"><path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
          <span class="whatsapp-tooltip">Chat with me</span>
        `;
        document.body.appendChild(waBtn);
      }

      // Ensure floating Call button is present across all pages
      if (!document.querySelector(".call-float")) {
        const callBtn = document.createElement("a");
        callBtn.href = "tel:+919746616242";
        callBtn.className = "call-float";
        callBtn.setAttribute("aria-label", "Call Now");
        callBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true"><path fill="currentColor" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>
          <span class="call-tooltip">Call: +91 97466 16242</span>
        `;
        document.body.appendChild(callBtn);
      }

      // On Home page, hide floating buttons on hero section and show from second section onwards
      function initHomeFloatingToggle() {
        const isHomePage =
          document.body.classList.contains("home-page") ||
          !!document.getElementById("home");
        if (!isHomePage) return;

        const targetSection =
          document.querySelector(".feature-section-2") ||
          document.querySelector("#about");
        if (!targetSection) return;

        const floatingBtns = document.querySelectorAll(
          ".whatsapp-float, .call-float",
        );
        if (!floatingBtns.length) return;

        function updateFloating() {
          const rect = targetSection.getBoundingClientRect();
          // Show when the second section reaches the viewport
          const shouldShow = rect.top <= window.innerHeight * 0.85;

          floatingBtns.forEach((btn) => {
            if (shouldShow) {
              btn.classList.add("floating-visible");
            } else {
              btn.classList.remove("floating-visible");
            }
          });
        }

        window.updateHomeFloatingVisibility = updateFloating;
        updateFloating();

        window.addEventListener("scroll", updateFloating, { passive: true });
        window.addEventListener("resize", updateFloating, { passive: true });

        if ("IntersectionObserver" in window) {
          const observer = new IntersectionObserver(
            () => {
              updateFloating();
            },
            {
              root: null,
              threshold: [0, 0.1, 0.5, 1],
            },
          );
          observer.observe(targetSection);
        }
      }

      initHomeFloatingToggle();

      // Automatically set active menu item based on current URL
      const currentUrl = window.location.href.split("?")[0].split("#")[0];
      const normalizedUrl = currentUrl.endsWith("index.html")
        ? currentUrl.replace("index.html", "")
        : currentUrl;

      document
        .querySelectorAll(".navigation > li")
        .forEach((li) => li.classList.remove("current"));

      document.querySelectorAll(".navigation > li > a").forEach((link) => {
        const linkUrl = link.href.split("?")[0].split("#")[0];
        const normalizedLinkUrl = linkUrl.endsWith("index.html")
          ? linkUrl.replace("index.html", "")
          : linkUrl;

        if (
          normalizedUrl === normalizedLinkUrl ||
          ((normalizedLinkUrl.endsWith("/service/") ||
            normalizedLinkUrl.endsWith("/services/")) &&
            (normalizedUrl.includes("/service/") ||
              normalizedUrl.includes("/services/"))) ||
          (normalizedLinkUrl.endsWith("/blog/") &&
            normalizedUrl.includes("/blog/"))
        ) {
          link.parentElement.classList.add("current");
        }
      });

      // Load all the required scripts sequentially after HTML is injected
      const scripts = [
        basePath + "js/jquery.min.js",
        basePath + "js/bootstrap.min.js",
        basePath + "js/gsap.min.js",
        basePath + "js/ScrollTrigger.min.js",
        basePath + "js/ScrollSmoother.min.js",
        basePath + "js/SplitText.min.js",
        basePath + "js/ScrollToPlugin.min.js",
        basePath + "js/main.js?v=14",
        basePath + "js/page-scripts.js?v=14",
      ];

      let loadedCount = 0;
      const totalScripts = scripts.length;

      function onScriptComplete() {
        loadedCount++;
        if (loadedCount === totalScripts) {
          document.dispatchEvent(new Event("includesLoaded"));
          window.dispatchEvent(new Event("load"));
          if (window.jQuery) {
            jQuery(window).trigger("load");
          }
        }
      }

      scripts.forEach(function (src) {
        const script = document.createElement("script");
        script.src = src;
        script.async = false;
        script.onload = onScriptComplete;
        script.onerror = onScriptComplete;
        document.body.appendChild(script);
      });
    })
    .catch((err) => console.error("Error loading partials:", err));
});

// Prevent content copying and inspecting
document.addEventListener("contextmenu", (event) => event.preventDefault());
document.addEventListener("keydown", (event) => {
  // Prevent Ctrl+C, Ctrl+X, Ctrl+U, Ctrl+P, Ctrl+S
  if (
    event.ctrlKey &&
    ["c", "x", "u", "p", "s"].includes(event.key.toLowerCase())
  ) {
    event.preventDefault();
  }
  // Prevent F12
  if (event.key === "F12") {
    event.preventDefault();
  }
  // Prevent Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
  if (
    event.ctrlKey &&
    event.shiftKey &&
    ["i", "j", "c"].includes(event.key.toLowerCase())
  ) {
    event.preventDefault();
  }
});
