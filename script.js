
/* =========================================================
   LOGIN COMPUTER — MAIN SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =====================================================
     MOBILE HAMBURGER MENU
     ===================================================== */

  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuBtn && mobileMenu) {

    function openMenu() {
      mobileMenu.classList.add("active");
      mobileMenu.classList.remove("hidden");

      menuBtn.classList.add("open");
      menuBtn.setAttribute("aria-expanded", "true");
      menuBtn.setAttribute("aria-label", "Close menu");

      // Hamburger → X
      menuBtn.innerHTML = "✕";
    }

    function closeMenu() {
      mobileMenu.classList.remove("active");
      mobileMenu.classList.add("hidden");

      menuBtn.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Open menu");

      // X → Hamburger
      menuBtn.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
      `;
    }

    function toggleMenu() {
      if (mobileMenu.classList.contains("active")) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    // Hamburger click
    menuBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    });

    // Mobile menu links
    mobileMenu.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", function () {
        closeMenu();
      });

    });

    // Outside click
    document.addEventListener("click", function (e) {

      if (
        mobileMenu.classList.contains("active") &&
        !mobileMenu.contains(e.target) &&
        !menuBtn.contains(e.target)
      ) {
        closeMenu();
      }

    });

    // Escape key
    document.addEventListener("keydown", function (e) {

      if (e.key === "Escape") {
        closeMenu();
      }

    });

    // Resize protection
    window.addEventListener("resize", function () {

      if (window.innerWidth > 900) {
        closeMenu();
      }

    });

    // Initial state
    closeMenu();
  }


  /* =====================================================
     HERO SLIDER
     ===================================================== */

  const slider = document.getElementById("heroSlider");
  const dots = document.querySelectorAll(".dot");

  let currentSlide = 0;
  let slideInterval = null;

  const totalSlides = slider
    ? slider.children.length
    : 0;

  function updateSlider() {

    if (!slider || totalSlides === 0) return;

    slider.style.transform =
      `translateX(-${currentSlide * 100}%)`;

    dots.forEach(function (dot, index) {

      dot.classList.toggle(
        "active",
        index === currentSlide
      );

    });
  }

  function nextSlide() {

    if (totalSlides <= 1) return;

    currentSlide =
      (currentSlide + 1) % totalSlides;

    updateSlider();
  }

  function startSlider() {

    if (totalSlides <= 1) return;

    clearInterval(slideInterval);

    slideInterval =
      setInterval(nextSlide, 4500);
  }

  function resetSlider() {

    clearInterval(slideInterval);
    startSlider();
  }

  dots.forEach(function (dot, index) {

    dot.addEventListener("click", function () {

      currentSlide = index;

      updateSlider();
      resetSlider();

    });

  });

  if (totalSlides > 0) {

    updateSlider();
    startSlider();

  }


  /* =====================================================
     SMOOTH SCROLL
     ===================================================== */

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (e) {

      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      const target =
        document.querySelector(href);

      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      // Close mobile menu
      if (mobileMenu) {

        mobileMenu.classList.remove("active");
        mobileMenu.classList.add("hidden");

      }

      if (menuBtn) {

        menuBtn.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    });

  });


  /* =====================================================
     COUNTER ANIMATION
     ===================================================== */

  const counters =
    document.querySelectorAll(".counter");

  if ("IntersectionObserver" in window) {

    const counterObserver =
      new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

          if (!entry.isIntersecting) return;

          const counter = entry.target;

          if (counter.dataset.animated) return;

          const target =
            Number(counter.dataset.target);

          if (!target) return;

          counter.dataset.animated = "true";

          let count = 0;

          const speed =
            Math.max(
              1,
              Math.ceil(target / 80)
            );

          function updateCounter() {

            count += speed;

            if (count >= target) {

              counter.textContent =
                target + "+";

            } else {

              counter.textContent =
                count + "+";

              requestAnimationFrame(
                updateCounter
              );

            }

          }

          updateCounter();

          counterObserver.unobserve(counter);

        });

      },
      {
        threshold: 0.3
      });

    counters.forEach(function (counter) {

      counterObserver.observe(counter);

    });

  }


  /* =====================================================
     SCROLL REVEAL
     ===================================================== */

  const revealElements =
    document.querySelectorAll(
      ".glass, .card-hover, .thesis-card, .service-card, .product-card, .review-card, .stat-card, .contact-card, .info-box, .why-card"
    );

  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

          if (!entry.isIntersecting) return;

          entry.target.style.opacity = "1";
          entry.target.style.transform =
            "translateY(0)";

          revealObserver.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.12
      });

    revealElements.forEach(function (el) {

      el.style.opacity = "0";

      el.style.transform =
        "translateY(32px)";

      el.style.transition =
        "opacity 0.65s ease, transform 0.65s ease";

      revealObserver.observe(el);

    });

  }


  /* =====================================================
     NAVBAR SCROLL EFFECT
     ===================================================== */

  const navbar =
    document.getElementById("navbar") ||
    document.querySelector(".site-header");

  function updateNavbar() {

    if (!navbar) return;

    if (window.scrollY > 40) {

      navbar.classList.add("scrolled");

    } else {

      navbar.classList.remove("scrolled");

    }

  }

  window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
  );

  updateNavbar();


  /* =====================================================
     ACTIVE NAVIGATION
     ===================================================== */

  const sections =
    document.querySelectorAll(
      "section[id]"
    );

  const navLinks =
    document.querySelectorAll(
      ".desktop-nav a, .mobile-menu a"
    );

  function setActiveLink() {

    let current = "";

    sections.forEach(function (section) {

      const top =
        section.offsetTop - 150;

      if (window.scrollY >= top) {

        current =
          section.getAttribute("id");

      }

    });

    navLinks.forEach(function (link) {

      link.classList.remove("active");

      const href =
        link.getAttribute("href");

      if (href === "#" + current) {

        link.classList.add("active");

      }

    });

  }

  window.addEventListener(
    "scroll",
    setActiveLink,
    { passive: true }
  );

  setActiveLink();


  /* =====================================================
     POPUP
     ===================================================== */

  const popupToggle =
    document.getElementById("popupToggle");

  if (popupToggle) {

    setTimeout(function () {

      popupToggle.checked = false;

    }, 10000);

  }


  /* =====================================================
     BACK TO TOP
     ===================================================== */

  const backTop =
    document.getElementById("backTop");

  if (backTop) {

    window.addEventListener(
      "scroll",
      function () {

        backTop.classList.toggle(
          "visible",
          window.scrollY > 400
        );

      },
      { passive: true }
    );

    backTop.addEventListener(
      "click",
      function () {

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );

  }


  /* =====================================================
     CURRENT YEAR
     ===================================================== */

  const year =
    document.getElementById("year");

  if (year) {

    year.textContent =
      new Date().getFullYear();

  }


  /* =====================================================
     BUTTON RIPPLE
     ===================================================== */

  document
    .querySelectorAll(".btn, .buy-btn")
    .forEach(function (btn) {

      btn.style.position = "relative";
      btn.style.overflow = "hidden";

      btn.addEventListener(
        "click",
        function (e) {

          if (this.disabled) return;

          const rect =
            this.getBoundingClientRect();

          const size =
            Math.max(
              rect.width,
              rect.height
            );

          const ripple =
            document.createElement("span");

          ripple.className = "ripple";

          ripple.style.width =
            size + "px";

          ripple.style.height =
            size + "px";

          ripple.style.left =
            (e.clientX -
              rect.left -
              size / 2) + "px";

          ripple.style.top =
            (e.clientY -
              rect.top -
              size / 2) + "px";

          this.appendChild(ripple);

          setTimeout(function () {

            ripple.remove();

          }, 600);

        }
      );

    });


  /* =====================================================
     PREVENT IMAGE DRAG
     ===================================================== */

  document
    .querySelectorAll("img")
    .forEach(function (img) {

      img.setAttribute(
        "draggable",
        "false"
      );

    });


  /* =====================================================
     PARALLAX BACKGROUND
     ===================================================== */

  document.addEventListener(
    "mousemove",
    function (e) {

      const x =
        (e.clientX /
          window.innerWidth) -
        0.5;

      const y =
        (e.clientY /
          window.innerHeight) -
        0.5;

      document
        .querySelectorAll(".bg-blur")
        .forEach(function (blob) {

          blob.style.transform =
            `translate(${x * 60}px, ${y * 60}px)`;

        });

    }
  );


  console.log(
    "Login Computer — Website Loaded ✓"
  );

});
