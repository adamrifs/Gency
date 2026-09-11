# Gencyo Homepage — HTML/CSS/JS

This version is a plain HTML/CSS/JavaScript recreation of the Gencyo Digital Agency homepage.

## Structure

```text
gencyo-website/
├── index.html
├── .htaccess
├── README.md
├── css/
│   ├── bootstrap.min.css
│   ├── animate.css
│   ├── style.css                 # supplied original Gencyo stylesheet
│   ├── tm-utility-classes.css    # local utility classes used by the original markup
│   └── custom.css                # only page-specific wiring/styles
├── js/
│   ├── jquery.min.js
│   ├── bootstrap.min.js
│   ├── gsap.min.js
│   ├── ScrollTrigger.min.js
│   ├── ScrollSmoother.min.js
│   ├── SplitText.min.js
│   ├── ScrollToPlugin.min.js
│   ├── parallaxie.js
│   └── main.js
└── images/
    ├── banner/
    │   ├── hero-bg-1-1.jpg
    │   └── circle1-1.png
    ├── icons/
    │   ├── hero-object-1-1.png
    │   ├── hero-object-1-2.png
    │   ├── icon-1-1.png
    │   ├── icon-1-2.png
    │   ├── icon-1-3.png
    │   ├── right-arrow-1-1.png
    │   └── right-arrow-1-2.png
    └── resource/
        ├── feature-shape-1-1.png
        └── feature-shape-1-2.png
```

## Feature section

The `feature-section-2` markup and the corresponding styles are based directly on the supplied original Gencyo HTML and `style.css`. The original three-column Bootstrap row is preserved, including `g-5 g-xl-4`, `feature-block`, `inner-block`, `content-box`, and the divider lines.

## Hero animation

The hero `.char-animation` uses the original SplitText/GSAP behavior:
- `start: top 90%`
- `end: bottom 60%`
- `scrub: false`
- `toggleActions: play none none none`
- characters start at `x: 100`, `autoAlpha: 0`
- `duration: 1`, `delay: 0.5`, `stagger: 0.05`

The hero decorative `.tm-gsap-animate-circle` elements use the original scroll rotation with `scrub: 1`, `top 100%` → `top -50%`, and `0` → `180deg` rotation.

ScrollSmoother uses the original settings: `smooth: 2`, `effects: true`, `smoothTouch: 0.1`, `normalizeScroll: false`, `ignoreMobileResize: true`.

## Images

Put your supplied image files into the exact folders/names above. The HTML already references these local paths. The screenshots you supplied show the files, but screenshots themselves do not contain the original binary asset files, so the package cannot manufacture the source PNG/JPG files from the screenshots.
### Service section assets
Place these files in `images/service/`:
- `service-bg-1-1.jpg`
- `service-icon-1-1.png` through `service-icon-1-6.png`

### Project section assets
Place these files in `images/project/`:
- `ellipse1-1.png`
- `project1-1.jpg`
- `project1-2.jpg`
- `project1-3.jpg`

The section uses `images/icons/star.png` for the Case Study star icon.

### Marquee section assets
Place these files in `images/marquee-area/`:
- `star1-1.svg`
- `star1-2.svg`

Existing `images/icons/star.png` references retain the current 18px × 18px inline styling.

### Work Process section asset
Place the supplied image at:
`images/work-section/work-process-shape1-1.png`

### Video section assets
Place these files in `images/video-section/`:
- `video-1-1.jpg`
- `video-shape-1-1.png`

### Choose Us section assets
Place these files in `images/choose-us-section/`:
- `ball.png`
- `choose-us-1-1.jpg`
- `choose-us-icon1-1.png`
- `choose-us-icon1-2.png`
- `client-1-1.jpg`
- `client-1-2.jpg`
- `client-1-3.jpg`
- `client-1-4.jpg`

### Testimonial section assets
Place these files in `images/testimonial/`:
- `capterra-1-1.png`
- `client1-1.jpg`
- `google-1-1.png`
- `quote-icon-1-1.png`
- `testi-bg-shape.png`
- `testi-light-shape-1-1.png`
- `testi-shape-1-1.png`
- `text-circle1-1.png`

### FAQ section assets
Place these files in `images/faq-section/`:
- `faq-light-1-1.png`
- `faq-shape-1-1.png`

### Feature section assets
Place these files in `images/feature-section/`:
- `feature-frame1-1.png`
- `feature-frame1-1 (1).png`
- `feature-light-1-1.png`
- `feature-shape-1-1.png`
- `object.png`
- `object3.png`

### Team section assets
Place these files in `images/team-section/`:
- `team-1-1.jpg`
- `team-1-2.jpg`
- `team-1-3.jpg`
- `team-bg-1-1.jpg`
- `team-light-1-1.png`
- `team-shape-1-1.png`

### Brand section assets
Place these files in `images/brand-section/`:
- `brand1-1.png`
- `brand1-2.png`
- `brand1-3.png`
- `brand1-4.png`
- `brand1-5.png`

### Award section assets
Place these files in `images/award-section/`:
- `award-1-1.png`
- `award-1-2.png`
- `award-1-3.png`
- `award-light-1-1.png`
- `award-shape-1-1.png`
- `award-shape-1-2.png`
- `award-shape-1-3.png`
### Contact section assets
Place these files in `images/contact-section/`:
- `contact-1-1.jpg`
- `contact-shape-1-1.png`
- `contact-shape-1-2.png`
- `email.svg`
- `location.svg`

- `images/news-section/`: `news-1-1.jpg`, `news-1-2.jpg`, `news-1-3.jpg` (copy the supplied binaries here).

- Footer assets: place `footer-line1-1.png` and `footer-shape-1-1.png` in `images/footer/`.
