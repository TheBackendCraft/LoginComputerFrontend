/* marketplace.js */
document.addEventListener("DOMContentLoaded", () => {
    // Structural Global Inits
    const pageLoader = document.getElementById("pageLoader");
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const searchInput = document.getElementById("searchInput");
    const filterBtns = document.querySelectorAll(".filter-btn");
    const products = document.querySelectorAll(".product-card");
    const productCounter = document.getElementById("productCounter");
    const backTop = document.getElementById("backTop");
    const priceFilter = document.getElementById("priceFilter");
    const sortSelect = document.getElementById("sortSelect");

    let activeFilter = "all";

    // Stop Loader Transition
    if (pageLoader) {
        setTimeout(() => {
            pageLoader.style.opacity = "0";
            setTimeout(() => pageLoader.remove(), 500);
        }, 300);
    }

    // Toggle Navigation Context
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            const expanded = menuBtn.getAttribute("aria-expanded") === "true";
            menuBtn.setAttribute("aria-expanded", !expanded);
            mobileMenu.classList.toggle("hidden");
        });
    }

    // Scroll Control Engine
    if (backTop) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                backTop.classList.remove("hidden");
                backTop.classList.add("flex");
            } else {
                backTop.classList.add("hidden");
                backTop.classList.remove("flex");
            }
        });

        backTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Advanced Filtering and Logic Matching Architecture Definitions
    function processEcosystemFilters() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
        const targetPriceRange = priceFilter ? priceFilter.value : "all";
        let displayCount = 0;

        products.forEach(card => {
            const name = card.getAttribute("data-name") ? card.getAttribute("data-name").toLowerCase() : "";
            const category = card.getAttribute("data-category") || "";
            const price = parseFloat(card.getAttribute("data-price") || "0");

            const matchSearch = !query || name.includes(query);
            const matchFilter = activeFilter === "all" || category === activeFilter;
            
            let matchPrice = true;
            if (targetPriceRange === "under-500") matchPrice = price < 500;
            else if (targetPriceRange === "500-1000") matchPrice = price >= 500 && price <= 1000;
            else if (targetPriceRange === "above-1000") matchPrice = price > 1000;

            if (matchSearch && matchFilter && matchPrice) {
                card.style.display = "";
                displayCount++;
            } else {
                card.style.display = "none";
            }
        });

        if (productCounter) {
            productCounter.textContent = displayCount;
        }
    }

    // Register Dynamic Listeners
    if (searchInput) searchInput.addEventListener("input", processEcosystemFilters);
    if (priceFilter) priceFilter.addEventListener("change", processEcosystemFilters);

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => {
                b.classList.remove("bg-blue-600", "text-white");
                b.classList.add("bg-slate-50", "text-slate-600", "border-slate-200/80");
            });
            btn.classList.add("bg-blue-600", "text-white");
            btn.classList.remove("bg-slate-50", "text-slate-600", "border-slate-200/80");

            activeFilter = btn.getAttribute("data-filter") || "all";
            processEcosystemFilters();
        });
    });

    // Populate UI counter on load
    processEcosystemFilters();
});