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
    if (file === "login.html" || file === "register.html") {
      menuLinks.forEach(function (link) {
        link.classList.remove("active");
      });
      return;
    }

    if (file === "events.html" || file === "event-details.html" || file === "booking.html") {
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

  // EventEase Login / Logout functionality
  const token = localStorage.getItem("eventeaseToken");
  const userData = localStorage.getItem("eventeaseUser");

  const loginLink = document.getElementById("loginLink");
  const registerLink = document.getElementById("registerLink");
  const welcomeUser = document.getElementById("welcomeUser");
  const logoutBtn = document.getElementById("logoutBtn");
  const profileLink = document.getElementById("profileLink");
  const myBookingsLink = document.getElementById("myBookingsLink");
  const adminDashboardLink = document.getElementById("adminDashboardLink");

  if (token && userData) {
    const user = JSON.parse(userData);
    if (adminDashboardLink && user.role === "admin") {
    adminDashboardLink.style.display = "inline";
}

    if (loginLink) loginLink.style.display = "none";
    if (registerLink) registerLink.style.display = "none";
    if (profileLink) profileLink.style.display = "inline";
    if (myBookingsLink) {
    myBookingsLink.style.display = "inline";
}

    if (welcomeUser) {
      welcomeUser.textContent = "Welcome, " + user.full_name;
      welcomeUser.style.display = "inline";
    }

    if (logoutBtn) {
      logoutBtn.style.display = "inline-block";

      logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("eventeaseToken");
        localStorage.removeItem("eventeaseUser");
        window.location.reload();
      });
    }
  }

})();

