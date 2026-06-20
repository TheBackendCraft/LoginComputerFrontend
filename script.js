
document.addEventListener("DOMContentLoaded", () => {
// popup on website loading
window.onload = function() {
    setTimeout(function() {
        var popup = document.getElementById('welcomePopup');
        if (popup) {
            popup.classList.add('show');
        }
    }, 1000); // 1 सेकंड का डिले
};
    
    var closeBtn = document.getElementById('popupCloseBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function(event) {
            event.stopPropagation(); ा
            closePopup();
        });
    }

    // click anywhere on the screen
    var popup = document.getElementById('welcomePopup');
    if (popup) {
        popup.addEventListener('click', function(event) {
            if (event.target === popup) {
                closePopup();
            }
        });
    }
};

// पॉपअप बंद करने का कॉमन फंक्शन
function closePopup() {
    var popup = document.getElementById('welcomePopup');
    if (popup) {
        popup.classList.remove('show');
    }
}

    
    /* =========================
       MOBILE MENU
    ========================= */

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuBtn && mobileMenu) {

        menuBtn.addEventListener("click", () => {

            mobileMenu.classList.toggle("hidden");

            if (menuBtn.innerHTML.trim() === "☰") {
                menuBtn.innerHTML = "✕";
            } else {
                menuBtn.innerHTML = "☰";
            }

        });

    }

    /* =========================
       HERO SLIDER
    ========================= */

    const slider = document.getElementById("heroSlider");
    const dots = document.querySelectorAll(".dot");

    if (slider && dots.length > 0) {

        let currentSlide = 0;

        const totalSlides = slider.children.length;

        function showSlide(index) {

            slider.style.transform =
                `translateX(-${index * 100}%)`;

            dots.forEach(dot => {
                dot.classList.remove("bg-cyan-400");
                dot.classList.add("bg-slate-600");
            });

            if (dots[index]) {
                dots[index].classList.remove("bg-slate-600");
                dots[index].classList.add("bg-cyan-400");
            }
        }

        dots.forEach((dot, index) => {

            dot.addEventListener("click", () => {

                currentSlide = index;
                showSlide(currentSlide);

            });

        });

        setInterval(() => {

            currentSlide++;

            if (currentSlide >= totalSlides) {
                currentSlide = 0;
            }

            showSlide(currentSlide);

        }, 5000);

    }

});

const menuBtn = document.querySelector("header button");
const nav = document.querySelector("nav");

if(menuBtn){

menuBtn.addEventListener("click",()=>{

nav.classList.toggle("hidden");

if(!nav.classList.contains("mobile-active")){

nav.classList.add(
"mobile-active",
"absolute",
"top-20",
"left-4",
"right-4",
"bg-slate-900",
"p-6",
"rounded-2xl",
"flex",
"flex-col",
"gap-5",
"shadow-2xl"
);

}

});

}

// ==========================
// SMOOTH SCROLL
// ==========================

document.querySelectorAll('a[href^="#"]').forEach(link=>{

link.addEventListener("click",(e)=>{

e.preventDefault();

const target=document.querySelector(
link.getAttribute("href")
);

if(target){

target.scrollIntoView({
behavior:"smooth"
});

}

});

});

// ==========================
// COUNTER ANIMATION
// ==========================

const counters = document.querySelectorAll("h2");

const startCounter = () => {

counters.forEach(counter => {

const text = counter.innerText;

const number = parseInt(text);

if(isNaN(number)) return;

let current = 0;

const increment = Math.ceil(number / 80);

const update = () => {

current += increment;

if(current >= number){

counter.innerText = text;
return;
}

counter.innerText = current + "+";

requestAnimationFrame(update);

};

update();

});

};

const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

startCounter();

observer.disconnect();

}

});

});

const statsSection=document.querySelector("section.bg-slate-900");

if(statsSection){

observer.observe(statsSection);

}

// ==========================
// FAQ ACCORDION
// ==========================

const faqItems = document.querySelectorAll(".glass");

faqItems.forEach(item=>{

const p = item.querySelector("p");

const h3 = item.querySelector("h3");

if(!p || !h3) return;

if(
h3.parentElement.parentElement.classList.contains("space-y-5")
){

p.style.display="none";

h3.style.cursor="pointer";

h3.addEventListener("click",()=>{

if(p.style.display==="none"){

p.style.display="block";

}else{

p.style.display="none";

}

});

}

});

// ==========================
// ORDER FORM
// ==========================

const form = document.querySelector("form");

if(form){

form.addEventListener("submit",(e)=>{

e.preventDefault();

showToast(
"Order Submitted Successfully!"
);

form.reset();

});

}

// ==========================
// TRACK ORDER DEMO
// ==========================

const trackBtn = document.querySelector(
'button[class*="bg-cyan-500"]'
);

if(trackBtn){

trackBtn.addEventListener("click",()=>{

const trackingInput =
document.querySelector(
'input[placeholder="LCN-1023"]'
);

if(!trackingInput) return;

if(trackingInput.value===""){

showToast("Enter Tracking ID");

return;

}

showToast(
"Order Found: Printing In Progress"
);

});

}

// ==========================
// TOAST NOTIFICATION
// ==========================

function showToast(message){

const toast=document.createElement("div");

toast.innerText=message;

toast.className=
"fixed top-6 right-6 bg-cyan-500 text-white px-6 py-4 rounded-xl shadow-xl z-50";

document.body.appendChild(toast);

setTimeout(()=>{

toast.style.opacity="0";
toast.style.transition="0.4s";

},2500);

setTimeout(()=>{

toast.remove();

},3000);

}

// ==========================
// SCROLL REVEAL
// ==========================

const revealElements =
document.querySelectorAll(
".glass,.card-hover"
);

const revealObserver =
new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform=
"translateY(0px)";

}

});

},{
threshold:0.15
});

revealElements.forEach(el=>{

el.style.opacity="0";
el.style.transform=
"translateY(40px)";
el.style.transition=
"all .7s ease";

revealObserver.observe(el);

});

// ==========================
// HERO IMAGE FLOAT EFFECT
// ==========================

const heroImage=document.querySelector(
".floating"
);

if(heroImage){

window.addEventListener("mousemove",(e)=>{

const x=(window.innerWidth/2-e.clientX)/40;
const y=(window.innerHeight/2-e.clientY)/40;

heroImage.style.transform=
`translate(${x}px,${y}px)`;

});

}

// ==========================
// CURRENT YEAR AUTO UPDATE
// ==========================

const footerText =
document.querySelector("footer");

if(footerText){

const year=new Date().getFullYear();

footerText.innerHTML=
footerText.innerHTML.replace(
"2026",
year
);

}
