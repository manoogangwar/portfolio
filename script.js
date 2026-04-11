const hamburgerBtn = document.getElementById("hamburger-btn");
const closeMenuBtn = document.getElementById("close-menu-btn");
const modalMenu = document.getElementById("modal-menu");
const menuOverlay = document.getElementById("menu-overlay");
const modalNavLinks = [...document.querySelectorAll(".modal-nav a[href^='#']")];
const modalHireBtn = document.querySelector(".modal-hire-btn");

const sectionTargets = modalNavLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const openMenu = () => {
  modalMenu.classList.add("active");
  menuOverlay.classList.add("active");
  modalMenu.setAttribute("aria-hidden", "false");
  if (hamburgerBtn) hamburgerBtn.setAttribute("aria-expanded", "true");
};

const closeMenu = () => {
  modalMenu.classList.remove("active");
  menuOverlay.classList.remove("active");
  modalMenu.setAttribute("aria-hidden", "true");
  if (hamburgerBtn) hamburgerBtn.setAttribute("aria-expanded", "false");
};

if (hamburgerBtn && closeMenuBtn && modalMenu && menuOverlay) {
  hamburgerBtn.addEventListener("click", openMenu);
  closeMenuBtn.addEventListener("click", closeMenu);
  
  menuOverlay.addEventListener("click", (e) => {
    if (e.target === menuOverlay) {
      closeMenu();
    }
  });

  modalNavLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
  
  if (modalHireBtn) {
    modalHireBtn.addEventListener("click", closeMenu);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuOverlay.classList.contains("active")) {
      closeMenu();
      hamburgerBtn.focus();
    }
  });
}

if (modalNavLinks.length && sectionTargets.length) {
  const setActiveLink = (id) => {
    modalNavLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("active", isActive);
      link.setAttribute("aria-current", isActive ? "page" : "false");
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visibleEntry?.target?.id) {
        setActiveLink(visibleEntry.target.id);
      }
    },
    {
      rootMargin: "-30% 0px -45% 0px",
      threshold: [0.2, 0.45, 0.7],
    }
  );

  sectionTargets.forEach((section) => observer.observe(section));
}

// Animation Observer
const animationElements = document.querySelectorAll(".reveal-up, .reveal-fade, .text-reveal");

const animationObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Optional: uncomment below to stop observing once it has appeared
        // observer.unobserve(entry.target);
      }
    });
  },
  {
    rootMargin: "0px 0px -10% 0px",
    threshold: 0,
  }
);

animationElements.forEach((el) => animationObserver.observe(el));
