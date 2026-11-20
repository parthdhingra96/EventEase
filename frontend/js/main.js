(function () {
  "use strict";

  const header = document.querySelector(".ee-navbar");
  const navCollapse = document.getElementById("eeNav");
  const navLinks = document.querySelectorAll('a[href^="#"]');
  const menuLinks = document.querySelectorAll(".ee-nav .nav-link");

  const sectionForNav = {
    home: "home",
    explore: "explore",
    services: "services",
    "how-it-works": "about",
    about: "about",
    account: ""
  };

  function updateHeaderState() {
    if (!header) {
      return;
    }
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  function closeMobileMenu() {
    if (!navCollapse || !window.bootstrap) {
      return;
    }
    const instance = window.bootstrap.Collapse.getInstance(navCollapse);
    if (instance && navCollapse.classList.contains("show")) {
      instance.hide();
    }
  }

  function smoothScrollTo(hash) {
    const target = document.querySelector(hash);
    if (!target) {
      return;
    }
    const offset = header ? header.offsetHeight + 8 : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const href = link.getAttribute("href");
      if (!href || href.charAt(0) !== "#" || href.length < 2) {
        return;
      }
      const target = document.querySelector(href);
      if (!target) {
        return;
      }
      event.preventDefault();
      smoothScrollTo(href);
      closeMobileMenu();
    });
  });

  function pageFileName() {
    const path = window.location.pathname.split("/").pop();
    return path || "index.html";
  }

  function setActiveLink() {
    const file = pageFileName();
    if (file === "events.html" || file === "event-details.html") {
      menuLinks.forEach(function (link) {
        link.classList.toggle("active", link.getAttribute("href") === "events.html");
      });
      return;
    }

    if (!document.getElementById("home")) {
      return;
    }

    const probe = window.scrollY + (header ? header.offsetHeight + 48 : 96);
    const sections = document.querySelectorAll("main section[id]");
    let current = "home";

    sections.forEach(function (section) {
      if (section.offsetTop <= probe) {
        current = section.id;
      }
    });

    const activeHref = "#" + (sectionForNav[current] || "");

    menuLinks.forEach(function (link) {
      const href = link.getAttribute("href");
      link.classList.toggle("active", activeHref !== "#" && href === activeHref);
    });
  }

  window.addEventListener("scroll", function () {
    updateHeaderState();
    setActiveLink();
  });

  updateHeaderState();
  setActiveLink();
})();
