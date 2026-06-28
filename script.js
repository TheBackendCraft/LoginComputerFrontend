/* =========================================
   LOGIN COMPUTER
   SCRIPT.JS
   PART 1
========================================= */

// ==========================
// MOBILE MENU
// ==========================

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if(menuBtn && mobileMenu){

menuBtn.addEventListener("click",()=>{

mobileMenu.classList.toggle("hidden");

});

}

// ==========================
// HERO SLIDER
// ==========================

const slider=document.getElementById("heroSlider");
const dots=document.querySelectorAll(".dot");

let currentSlide=0;

const totalSlides=3;

function updateSlider(){

if(!slider) return;

slider.style.transform=
`translateX(-${currentSlide*100}%)`;

dots.forEach((dot,index)=>{

dot.classList.remove("active");

if(index===currentSlide){

dot.classList.add("active");

}

});

}

dots.forEach((dot,index)=>{

dot.addEventListener("click",()=>{

currentSlide=index;

updateSlider();

});

});

setInterval(()=>{

currentSlide++;

if(currentSlide>=totalSlides){

currentSlide=0;

}

updateSlider();

},4000);

// ==========================
// SMOOTH SCROLL
// ==========================

document.querySelectorAll('a[href^="#"]').forEach(link=>{

link.addEventListener("click",(e)=>{

e.preventDefault();

const target=document.querySelector(link.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

if(mobileMenu){

mobileMenu.classList.add("hidden");

}

});

});
/* =========================================
   PART 2
   COUNTER + SCROLL + NAVBAR
========================================= */

// ==========================
// COUNTER ANIMATION
// ==========================

const counters=document.querySelectorAll(".counter");

const counterObserver=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(!entry.isIntersecting) return;

const counter=entry.target;

const target=+counter.getAttribute("data-target");

let count=0;

const speed=Math.ceil(target/100);

function updateCounter(){

count+=speed;

if(count>=target){

counter.innerText=target+"+";

}else{

counter.innerText=count+"+";

requestAnimationFrame(updateCounter);

}

}

updateCounter();

counterObserver.unobserve(counter);

});

});

counters.forEach(counter=>{

counterObserver.observe(counter);

});

// ==========================
// SCROLL REVEAL
// ==========================

const revealElements=document.querySelectorAll(

".glass,.card-hover,.thesis-card,.service-card,.product-card,.review-card"

);

const revealObserver=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

},{
threshold:.15
});

revealElements.forEach(el=>{

el.style.opacity="0";

el.style.transform="translateY(40px)";

el.style.transition="all .7s ease";

revealObserver.observe(el);

});

// ==========================
// NAVBAR SCROLL EFFECT
// ==========================

const header=document.querySelector("header");

window.addEventListener("scroll",()=>{

if(window.scrollY>40){

header.style.background="rgba(255,255,255,.95)";
header.style.boxShadow="0 10px 30px rgba(0,0,0,.08)";

}else{

header.style.background="rgba(255,255,255,.85)";
header.style.boxShadow="none";

}

});

// ==========================
// ACTIVE MENU LINK
// ==========================

const sections=document.querySelectorAll("section");
const navLinks=document.querySelectorAll("nav a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=section.offsetTop-120;

if(pageYOffset>=top){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("text-cyan-500");

if(link.getAttribute("href")==="#"+current){

link.classList.add("text-cyan-500");

}

});

});
/* =========================================
   PART 3
   FLOATING BUTTONS + POPUP + TOAST
========================================= */

// ==========================
// FLOATING WHATSAPP BUTTON
// ==========================

const whatsappBtn=document.querySelector(".whatsapp-btn");

if(whatsappBtn){

whatsappBtn.addEventListener("click",()=>{

window.open(
"https://wa.me/918444566223",
"_blank"
);

});

}

// ==========================
// FLOATING LOCATION BUTTON
// ==========================

const locationBtn=document.querySelector(".location-btn");

if(locationBtn){

locationBtn.addEventListener("click",()=>{

window.open(
"https://maps.google.com/?q=Login+Computer+Opp+Milan+Garden+Near+AHP+Inter+College+Chhutmalpur",
"_blank"
);

});

}

// ==========================
// POPUP AUTO CLOSE
// ==========================

const popupToggle=document.getElementById("popupToggle");

if(popupToggle){

setTimeout(()=>{

popupToggle.checked=false;

},10000);

}

// ==========================
// TOAST MESSAGE
// ==========================

function showToast(message){

const toast=document.createElement("div");

toast.innerHTML=message;

toast.style.position="fixed";
toast.style.bottom="30px";
toast.style.left="50%";
toast.style.transform="translateX(-50%)";
toast.style.background="#06b6d4";
toast.style.color="#fff";
toast.style.padding="14px 24px";
toast.style.borderRadius="12px";
toast.style.fontWeight="600";
toast.style.zIndex="99999";
toast.style.boxShadow="0 15px 35px rgba(0,0,0,.20)";

document.body.appendChild(toast);

setTimeout(()=>{

toast.style.opacity="0";
toast.style.transition=".4s";

},2500);

setTimeout(()=>{

toast.remove();

},3000);

}

// ==========================
// IMAGE HOVER EFFECT
// ==========================

document.querySelectorAll("img").forEach(img=>{

img.addEventListener("mouseenter",()=>{

img.style.transform="scale(1.03)";

});

img.addEventListener("mouseleave",()=>{

img.style.transform="scale(1)";

});

});
/* =========================================
   PART 4 (FINAL)
   LOADER + BACK TO TOP + YEAR + PARALLAX
========================================= */

// ==========================
// PAGE LOADER
// ==========================

window.addEventListener("load",()=>{

const loader=document.querySelector(".loader");

if(loader){

loader.style.opacity="0";

setTimeout(()=>{

loader.style.display="none";

},500);

}

});

// ==========================
// BACK TO TOP BUTTON
// ==========================

const backTop=document.getElementById("backTop");

if(backTop){

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

backTop.style.opacity="1";
backTop.style.visibility="visible";

}else{

backTop.style.opacity="0";
backTop.style.visibility="hidden";

}

});

backTop.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}

// ==========================
// CURRENT YEAR
// ==========================

const year=document.getElementById("year");

if(year){

year.textContent=new Date().getFullYear();

}

// ==========================
// HERO PARALLAX
// ==========================

const hero=document.querySelector(".hero-bg");

if(hero){

window.addEventListener("mousemove",(e)=>{

const x=(window.innerWidth/2-e.clientX)/70;
const y=(window.innerHeight/2-e.clientY)/70;

hero.style.backgroundPosition=`${x}px ${y}px`;

});

}

// ==========================
// BUTTON RIPPLE EFFECT
// ==========================

document.querySelectorAll("button,a.btn").forEach(btn=>{

btn.addEventListener("click",function(e){

const ripple=document.createElement("span");

const rect=this.getBoundingClientRect();

const size=Math.max(rect.width,rect.height);

ripple.style.width=size+"px";
ripple.style.height=size+"px";

ripple.style.left=(e.clientX-rect.left-size/2)+"px";
ripple.style.top=(e.clientY-rect.top-size/2)+"px";

ripple.className="ripple";

this.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});

});

// ==========================
// PREVENT IMAGE DRAG
// ==========================

document.querySelectorAll("img").forEach(img=>{

img.setAttribute("draggable","false");

});

// ==========================
// CONSOLE MESSAGE
// ==========================

console.log("%cLogin Computer Website Loaded Successfully 🚀",
"color:#06b6d4;font-size:16px;font-weight:bold;");

// Hero slider
const slider = document.getElementById("heroSlider");
const dots = document.querySelectorAll(".dot");
if (slider && dots.length) {
  let currentSlide = 0;
  const totalSlides = dots.length;
  function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot) => {
      dot.classList.remove("bg-apple-blue");
      dot.classList.add("bg-apple-border");
    });
    dots[currentSlide].classList.remove("bg-apple-border");
    dots[currentSlide].classList.add("bg-apple-blue");
  }
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      updateSlider();
    });
  });
  setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }, 4000);
}

// =========================
// MOBILE MENU
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuBtn && mobileMenu) {

        menuBtn.addEventListener("click", () => {

            mobileMenu.classList.toggle("hidden");
            mobileMenu.classList.toggle("active");

            // Icon Change
            if (mobileMenu.classList.contains("hidden")) {
                menuBtn.innerHTML = "☰";
                menuBtn.setAttribute("aria-expanded", "false");
            } else {
                menuBtn.innerHTML = "✕";
                menuBtn.setAttribute("aria-expanded", "true");
            }

        });

        // Mobile Menu Close on Click
        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {

                mobileMenu.classList.add("hidden");
                mobileMenu.classList.remove("active");
                menuBtn.innerHTML = "☰";
                menuBtn.setAttribute("aria-expanded", "false");

            });
        });

    }
   document.addEventListener("DOMContentLoaded", function () {

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if(menuBtn && mobileMenu){

        menuBtn.addEventListener("click", function(){

            mobileMenu.classList.toggle("active");

            if(mobileMenu.classList.contains("active")){
                menuBtn.innerHTML = "✕";
            }else{
                menuBtn.innerHTML = "☰";
            }

        });

        const links = mobileMenu.querySelectorAll("a");

        links.forEach(function(link){

            link.addEventListener("click", function(){

                mobileMenu.classList.remove("active");
                menuBtn.innerHTML="☰";

            });

        });

    }

});

});
