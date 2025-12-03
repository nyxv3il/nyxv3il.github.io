window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loadingScreen");
  setTimeout(() => {
    loadingScreen.classList.add("hidden");
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }, 1500);
});

let menu = document.getElementById("navContainer");
let menuIcon = document.getElementById("menuIcon");

menuIcon.addEventListener("click", (e) => {
  e.preventDefault();
  menu.classList.toggle("toggled");
});

document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && menu.classList.contains("toggled")) {
    menu.classList.remove("toggled");
  }
});

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const elements = document.querySelectorAll(".encrypted");

function generate(len) {
  let out = "";
  for (let i = 0; i < len; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

function loop() {
  elements.forEach((el) => {
    const length = parseInt(el.getAttribute("data-length")) || 10;
    el.textContent = generate(length);
  });
  requestAnimationFrame(loop);
}

loop();

let lastScrollY = window.scrollY;
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY && window.scrollY > 100) {
    nav.style.transform = "translateY(-100%)";
  } else {
    nav.style.transform = "translateY(0)";
  }
  lastScrollY = window.scrollY;
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".skillCard, .projectCard").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

// Add smooth scrolling for footer navigation links
document.querySelectorAll(".footer-nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
