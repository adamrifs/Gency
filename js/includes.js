document.addEventListener("DOMContentLoaded", function () {
  // Determine depth to correctly reference assets
  const depth = window.location.pathname
    .split("/")
    .filter((p) => p.length > 0 && p !== "index.html").length;
  // Assuming root is gencyo-website, depth is usually 1 (gencyo-website) or 2 (gencyo-website/about)
  // A safer way is to check if we are in a subdirectory like about, services, etc.
  const isSubDir = window.location.pathname.match(
    /\/(about|services|contact|projects|seo|blog|blog-details)\/?(index\.html)?$/,
  );
  const basePath = isSubDir ? "../" : "./";

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
      if (isSubDir) {
        headerData = headerData.replace(
          /src="(?!\.\.\/)images\//g,
          'src="../images/',
        );
        footerData = footerData.replace(
          /src="(?!\.\.\/)images\//g,
          'src="../images/',
        );

        headerData = headerData.replace(
          /url\((&quot;|['"])?(?!\.\.\/)images\//g,
          "url($1../images/",
        );
        footerData = footerData.replace(
          /url\((&quot;|['"])?(?!\.\.\/)images\//g,
          "url($1../images/",
        );

        headerData = headerData.replace(/href="\.\/"/g, 'href="../"');
        footerData = footerData.replace(/href="\.\/"/g, 'href="../"');

        headerData = headerData.replace(
          /href="(about|services|contact|projects|seo|blog|blog-details)\//g,
          'href="../$1/',
        );
        footerData = footerData.replace(
          /href="(about|services|contact|projects|seo|blog|blog-details)\//g,
          'href="../$1/',
        );
      }

      document.getElementById("header").innerHTML = headerData;
      document.getElementById("footer").innerHTML = footerData;

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

        if (normalizedUrl === normalizedLinkUrl) {
          link.parentElement.classList.add("current");
        }
      });

      // Load all the required scripts sequentially after HTML is injected
      const scripts = [
        "https://code.jquery.com/jquery-3.7.1.min.js",
        basePath + "js/bootstrap.min.js",
        basePath + "js/gsap.min.js",
        basePath + "js/ScrollTrigger.min.js",
        basePath + "js/ScrollSmoother.min.js",
        basePath + "js/SplitText.min.js",
        basePath + "js/ScrollToPlugin.min.js",
        basePath + "js/parallaxie.js",
        basePath + "js/main.js?v=11",
        basePath + "js/page-scripts.js?v=11",
      ];

      function loadScript(index) {
        if (index >= scripts.length) {
          // Dispatch event when all scripts are loaded
          document.dispatchEvent(new Event("includesLoaded"));
          window.dispatchEvent(new Event("load"));
          if (window.jQuery) {
            jQuery(window).trigger("load");
          }
          return;
        }
        const script = document.createElement("script");
        script.src = scripts[index];
        script.onload = () => loadScript(index + 1);
        document.body.appendChild(script);
      }

      loadScript(0);
    })
    .catch((err) => console.error("Error loading partials:", err));
});

// Prevent content copying and inspecting
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', event => {
  // Prevent Ctrl+C, Ctrl+X, Ctrl+U, Ctrl+P, Ctrl+S
  if (event.ctrlKey && ['c', 'x', 'u', 'p', 's'].includes(event.key.toLowerCase())) {
    event.preventDefault();
  }
  // Prevent F12
  if (event.key === 'F12') {
    event.preventDefault();
  }
  // Prevent Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
  if (event.ctrlKey && event.shiftKey && ['i', 'j', 'c'].includes(event.key.toLowerCase())) {
    event.preventDefault();
  }
});
