document.addEventListener("DOMContentLoaded", function () {
    // Determine depth to correctly reference assets
    const depth = window.location.pathname.split('/').filter(p => p.length > 0 && p !== 'index.html').length;
    // Assuming root is gencyo-website, depth is usually 1 (gencyo-website) or 2 (gencyo-website/about)
    // A safer way is to check if we are in a subdirectory like about, services, etc.
    const isSubDir = window.location.pathname.match(/\/(about|services|projects|contact)\/?(index\.html)?$/);
    const basePath = isSubDir ? "../" : "./";

    Promise.all([
        fetch(basePath + "includes/header.html").then(response => response.text()),
        fetch(basePath + "includes/footer.html").then(response => response.text())
    ]).then(([headerData, footerData]) => {
        
        // Fix image paths in header and footer if in subdirectory
        if (isSubDir) {
            headerData = headerData.replace(/src="images\//g, 'src="../images/');
            footerData = footerData.replace(/src="images\//g, 'src="../images/');
        }

        document.getElementById("header").innerHTML = headerData;
        document.getElementById("footer").innerHTML = footerData;

        // Load all the required scripts sequentially after HTML is injected
        const scripts = [
            basePath + "js/jquery.min.js",
            basePath + "js/bootstrap.min.js",
            basePath + "js/gsap.min.js",
            basePath + "js/ScrollTrigger.min.js",
            basePath + "js/ScrollSmoother.min.js",
            basePath + "js/SplitText.min.js",
            basePath + "js/ScrollToPlugin.min.js",
            basePath + "js/parallaxie.js",
            basePath + "js/main.js",
            basePath + "js/page-scripts.js"
        ];
        
        function loadScript(index) {
            if (index >= scripts.length) {
                // Dispatch event when all scripts are loaded
                document.dispatchEvent(new Event("includesLoaded"));
                window.dispatchEvent(new Event("load"));
                if (window.jQuery) {
                    jQuery(window).trigger("load");

                    // Re-run mobile nav population after all scripts load.
                    // main.js clones the desktop nav into the mobile menu, but
                    // it may have run before the dynamically-fetched header was
                    // fully parsed. We force it here to guarantee the list shows.
                    const $ = window.jQuery;
                    const mobileNav = $(".mobile-menu .navigation");
                    if (mobileNav.length && mobileNav.children().length === 0) {
                        const desktopNavHtml = $(".main-header .main-menu .navigation").html();
                        if (desktopNavHtml) {
                            mobileNav.html(desktopNavHtml);
                            // Re-attach dropdown toggle for mobile
                            $(".mobile-menu li.dropdown .dropdown-btn").on("click", function () {
                                $(this).prev("ul").slideToggle(500);
                                $(this).toggleClass("active");
                            });
                        }
                    }
                }
                return;
            }
            const script = document.createElement("script");
            script.src = scripts[index];
            script.onload = () => loadScript(index + 1);
            document.body.appendChild(script);
        }
        
        loadScript(0);
    }).catch(err => console.error("Error loading partials:", err));
});
