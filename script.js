const topbar = document.querySelector(".topbar");
const menuButton = document.querySelector(".menu-btn");
const nav = document.querySelector("#site-nav");
const navLinks = nav ? [...nav.querySelectorAll('a[href^="#"]')] : [];
const sectionTargets = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (topbar && menuButton && nav) {
  const mobileMedia = window.matchMedia("(max-width: 991.98px)");

  const closeMenu = () => {
    topbar.classList.remove("nav-open");
    menuButton.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    topbar.classList.add("nav-open");
    menuButton.setAttribute("aria-expanded", "true");
  };

  const syncMenuState = () => {
    if (!mobileMedia.matches) {
      closeMenu();
    }
  };

  menuButton.addEventListener("click", () => {
    const isOpen = topbar.classList.contains("nav-open");
    if (isOpen) {
      closeMenu();
      return;
    }

    openMenu();
  });

  document.addEventListener("click", (event) => {
    if (!mobileMedia.matches) {
      return;
    }

    if (!topbar.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuButton.focus();
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMedia.matches) {
        closeMenu();
      }
    });
  });

  mobileMedia.addEventListener("change", syncMenuState);
  syncMenuState();
}

if (navLinks.length && sectionTargets.length) {
  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
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
