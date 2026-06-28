/* =========================================
   Login Computer — script.js
   Hero slider · Mobile menu · Popup · UX
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

  // ==========================
  // MOBILE MENU
  // ==========================
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

 // Toggle Navigation Context
 if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            const expanded = menuBtn.getAttribute("aria-expanded") === "true";
            menuBtn.setAttribute("aria-expanded", !expanded);
            mobileMenu.classList.toggle("hidden");

    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        menuBtn.setAttribute("aria-expanded", "false");
      });

  // ==========================
  // HERO SLIDER
  // ==========================
  const slider = document.getElementById("heroSlider");
  const dots = document.querySelectorAll(".dot");
  let currentSlide = 0;
  let slideInterval;

  const totalSlides = slider ? slider.children.length : 0;

  function updateSlider() {
    if (!slider || totalSlides === 0) return;

    slider.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }

  function startSlider() {
    if (totalSlides <= 1) return;
    slideInterval = setInterval(nextSlide, 4500);
  }

  function resetSlider() {
    clearInterval(slideInterval);
    startSlider();
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      updateSlider();
      resetSlider();
    });
  });

  if (totalSlides > 0) {
    updateSlider();
    startSlider();
  }

  // ==========================
  // SMOOTH SCROLL
  // ==========================
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });

      if (mobileMenu) {
        mobileMenu.classList.add("hidden");
        if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  });

  // ==========================
  // COUNTER ANIMATION
  // ==========================
  const counters = document.querySelectorAll(".counter");

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = +counter.getAttribute("data-target");
      if (!target || counter.dataset.animated) return;

      counter.dataset.animated = "true";
      let count = 0;
      const speed = Math.max(1, Math.ceil(target / 80));

      function updateCounter() {
        count += speed;
        if (count >= target) {
          counter.textContent = target + "+";
        } else {
          counter.textContent = count + "+";
          requestAnimationFrame(updateCounter);
        }
      }

      updateCounter();
      counterObserver.unobserve(counter);
    });
  }, { threshold: 0.3 });

  counters.forEach(counter => counterObserver.observe(counter));

  // ==========================
  // SCROLL REVEAL
  // ==========================
  const revealElements = document.querySelectorAll(
    ".glass, .card-hover, .thesis-card, .service-card, .product-card, .review-card, .stat-card, .contact-card"
  );

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(32px)";
    el.style.transition = "opacity 0.65s ease, transform 0.65s ease, box-shadow 0.35s ease";
    revealObserver.observe(el);
  });

  // ==========================
  // NAVBAR SCROLL EFFECT
  // ==========================
  const header = document.querySelector(".site-header");

  window.addEventListener("scroll", () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 40);
  });

  // ==========================
  // ACTIVE MENU LINK
  // ==========================
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".desktop-nav a, .mobile-menu a");

  function setActiveLink() {
    let current = "";

    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href === "#" + current) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveLink);
  setActiveLink();

  // ==========================
  // POPUP AUTO CLOSE
  // ==========================
  const popupToggle = document.getElementById("popupToggle");

  if (popupToggle) {
    setTimeout(() => {
      popupToggle.checked = false;
    }, 10000);
  }

  // ==========================
  // BACK TO TOP
  // ==========================
  const backTop = document.getElementById("backTop");

  if (backTop) {
    window.addEventListener("scroll", () => {
      backTop.classList.toggle("visible", window.scrollY > 400);
    });

    backTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ==========================
  // CURRENT YEAR
  // ==========================
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // ==========================
  // BUTTON RIPPLE
  // ==========================
  document.querySelectorAll(".btn, .buy-btn").forEach(btn => {
    btn.style.position = "relative";
    btn.style.overflow = "hidden";

    btn.addEventListener("click", function (e) {
      if (this.disabled) return;

      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);

      ripple.style.width = size + "px";
      ripple.style.height = size + "px";
      ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
      ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
      ripple.className = "ripple";

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ==========================
  // PREVENT IMAGE DRAG
  // ==========================
  document.querySelectorAll("img").forEach(img => {
    img.setAttribute("draggable", "false");
  });

  console.log(
    "%cLogin Computer — Premium Light Theme Loaded ✓",
    "color:#16a34a;font-size:14px;font-weight:bold;"
  );
});
// ===============================
// Premium Navbar
// ===============================

const navbar=document.getElementById("navbar");

window.addEventListener("scroll",()=>{

if(window.scrollY>40){

navbar.classList.add("scrolled");

}else{

navbar.classList.remove("scrolled");

}

});



// ===============================
// Mobile Menu
// ===============================

const menuBtn=document.getElementById("menuBtn");

const mobileMenu=document.getElementById("mobileMenu");

menuBtn.addEventListener("click",()=>{

mobileMenu.classList.toggle("active");

});



// Close after click

document.querySelectorAll("#mobileMenu a").forEach(link=>{

link.addEventListener("click",()=>{

mobileMenu.classList.remove("active");

});

});

/*==========================
SCROLL REVEAL
==========================*/

const reveal=document.querySelectorAll(

'.service-card,.product-card,.review-card,.contact-card,.thesis-card,.stat-card,.why-card'

);

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity=1;

entry.target.style.transform="translateY(0px)";

}

});

},{threshold:.15});

reveal.forEach(el=>{

el.style.opacity=0;

el.style.transform="translateY(60px)";

el.style.transition="1s";

observer.observe(el);

});


/*==========================
PARALLAX
==========================*/

document.addEventListener("mousemove",(e)=>{

const x=(e.clientX/window.innerWidth)-0.5;

const y=(e.clientY/window.innerHeight)-0.5;

document.querySelectorAll(".bg-blur").forEach(blob=>{

blob.style.transform=

`translate(${x*60}px,${y*60}px)`;

});

});
