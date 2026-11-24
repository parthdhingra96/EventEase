(function () {
  "use strict";

  var FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80";

  var EVENTS = [
    {
      id: "heritage-garden-wedding",
      title: "Heritage Garden Wedding",
      category: "wedding",
      categoryLabel: "Weddings",
      image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80",
      alt: "Couple walking through a sunlit garden after a wedding ceremony",
      summary: "A classic outdoor ceremony with lawn seating, floral arches, and a reception under soft evening light.",
      description: "Plan a timeless wedding in a heritage garden setting. EventEase helps you organise the ceremony flow, guest seating, floral styling, and a reception that moves naturally from vows to dinner and dancing.",
      highlights: ["Garden ceremony styling", "Guest seating plan", "Evening reception lighting"]
    },
    {
      id: "candlelit-palace-reception",
      title: "Candlelit Palace Reception",
      category: "wedding",
      categoryLabel: "Weddings",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",
      alt: "Long wedding reception tables with candles, glassware, and floral centrepieces",
      summary: "An indoor banquet with candlelight, long tables, and refined décor for a grand wedding evening.",
      description: "This reception is designed for couples who want a palatial indoor celebration. Coordinate catering, table design, and photography so the hall feels warm, generous, and well paced.",
      highlights: ["Banquet table design", "Fine dining coordination", "Portrait and reception photography"]
    },
    {
      id: "classic-vow-celebration",
      title: "Classic Vow Celebration",
      category: "wedding",
      categoryLabel: "Weddings",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      alt: "Bride and groom standing together during a romantic wedding celebration",
      summary: "A heartfelt ceremony and reception shaped around family traditions and a calm, elegant guest experience.",
      description: "Choose a ceremony style that honours your traditions, then build a reception with clear timings, music, and hospitality. The focus stays on the couple and the people who matter most.",
      highlights: ["Ceremony planning", "Family hospitality", "Music and timeline"]
    },
    {
      id: "coastal-destination-vows",
      title: "Coastal Destination Vows",
      category: "destination-wedding",
      categoryLabel: "Destination Weddings",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      alt: "Turquoise ocean and sandy shoreline for a coastal destination wedding",
      summary: "Seaside vows with travel-friendly guest plans, beachside décor, and a sunset reception.",
      description: "A destination wedding by the water needs more than a beautiful view. EventEase helps you think through guest travel, ceremony timing, weather cover, and a reception that feels relaxed rather than rushed.",
      highlights: ["Beach ceremony setup", "Guest travel notes", "Sunset reception styling"]
    },
    {
      id: "hillside-villa-wedding",
      title: "Hillside Villa Wedding",
      category: "destination-wedding",
      categoryLabel: "Destination Weddings",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
      alt: "Outdoor evening venue with string lights over long dining tables",
      summary: "An intimate destination celebration at a hillside villa with string lights and open-air dining.",
      description: "Villa weddings work best when the space, guest count, and dinner service are planned together. This event type is ideal for smaller destination gatherings with a long, memorable evening.",
      highlights: ["Villa venue styling", "Open-air dining", "Intimate guest list"]
    },
    {
      id: "alpine-destination-wedding",
      title: "Alpine Destination Wedding",
      category: "destination-wedding",
      categoryLabel: "Destination Weddings",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
      alt: "Mountain lake landscape suitable for an alpine destination wedding",
      summary: "A scenic mountain setting for couples who want landscape views, lodge hospitality, and a quiet ceremony.",
      description: "Plan a destination wedding around mountain weather, lodge stays, and a ceremony that uses the landscape as its backdrop. Photography and guest comfort are built into the schedule from the start.",
      highlights: ["Scenic ceremony location", "Lodge guest stays", "Landscape photography"]
    },
    {
      id: "milestone-birthday-soiree",
      title: "Milestone Birthday Soirée",
      category: "birthday",
      categoryLabel: "Birthdays",
      image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=1200&q=80",
      alt: "Layered birthday cake with candles on a decorated celebration table",
      summary: "A joyful milestone party with cake, décor, and a guest experience that feels personal rather than noisy.",
      description: "Whether it is an 18th, 30th, or 50th, this birthday plan covers venue styling, catering, and a cake moment that becomes the centre of the evening.",
      highlights: ["Theme décor", "Cake presentation", "Playlist and hosting"]
    },
    {
      id: "garden-birthday-brunch",
      title: "Garden Birthday Brunch",
      category: "birthday",
      categoryLabel: "Birthdays",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=80",
      alt: "Festive birthday dessert table with cake, sweets, and party decorations",
      summary: "A daytime birthday gathering with pastel décor, a dessert table, and easy outdoor seating.",
      description: "Brunch birthdays are ideal for families and mixed-age guest lists. Plan a short programme, generous food, and a relaxed garden atmosphere.",
      highlights: ["Daytime styling", "Dessert table", "Family seating"]
    },
    {
      id: "balloon-birthday-party",
      title: "Balloon Birthday Party",
      category: "birthday",
      categoryLabel: "Birthdays",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",
      alt: "Colourful balloons filling a bright room for a birthday party",
      summary: "A colourful indoor party with balloon styling, games, and a clear host timeline for children or adults.",
      description: "Keep the room festive without chaos. This plan organises décor, entertainment, and food so the birthday person can enjoy the celebration.",
      highlights: ["Balloon décor", "Entertainment plan", "Party timeline"]
    },
    {
      id: "silver-anniversary-dinner",
      title: "Silver Anniversary Dinner",
      category: "anniversary",
      categoryLabel: "Anniversaries",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
      alt: "Elegant restaurant table setting prepared for an anniversary dinner",
      summary: "A refined dinner for 25 years together, with intimate seating, thoughtful menus, and warm lighting.",
      description: "Anniversary dinners should feel personal. Choose a venue, menu, and toast sequence that honours the couple without turning the evening into a long programme.",
      highlights: ["Intimate table design", "Menu pairing", "Toasts and music"]
    },
    {
      id: "champagne-vow-renewal",
      title: "Champagne Vow Renewal",
      category: "anniversary",
      categoryLabel: "Anniversaries",
      image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80",
      alt: "Champagne glasses raised in a toast at an anniversary celebration",
      summary: "A vow renewal followed by a champagne toast and a small gathering of closest family and friends.",
      description: "Renew your vows, then move into a short reception with photographs, speeches, and a celebration that stays elegant and unhurried.",
      highlights: ["Vow renewal ceremony", "Champagne toast", "Family photographs"]
    },
    {
      id: "leadership-summit",
      title: "Annual Leadership Summit",
      category: "corporate",
      categoryLabel: "Corporate Events",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
      alt: "Audience seated in a conference hall during a professional summit",
      summary: "A professionally staged summit with clear sessions, hospitality, and a polished guest arrival experience.",
      description: "Corporate events succeed when the agenda, staging, and catering stay aligned. This plan covers hall layout, speaker support, and guest flow from registration to closing remarks.",
      highlights: ["Session staging", "Registration flow", "Delegate hospitality"]
    },
    {
      id: "product-launch-gala",
      title: "Product Launch Gala",
      category: "corporate",
      categoryLabel: "Corporate Events",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
      alt: "Conference venue with round banquet tables prepared for a corporate gala",
      summary: "A launch evening that combines presentation staging with a seated dinner and brand-led décor.",
      description: "Introduce a product or milestone with a gala that feels premium and organised. Lighting, AV, dining, and guest seating are planned as one experience.",
      highlights: ["Stage and AV planning", "Brand décor", "Seated dinner service"]
    },
    {
      id: "company-conference-day",
      title: "Company Conference Day",
      category: "corporate",
      categoryLabel: "Corporate Events",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
      alt: "Large crowd attending a professionally produced conference",
      summary: "A full-day conference with keynotes, networking breaks, and a consistent on-site guest experience.",
      description: "Keep a large audience comfortable and on schedule. This event type focuses on hall capacity, breakout timing, catering windows, and a clear close to the day.",
      highlights: ["Keynote production", "Networking breaks", "On-site guest support"]
    }
  ];
  // Load events added by Admin from Database
async function loadDatabaseEvents() {
    try {
        const response = await fetch("http://localhost:5000/api/events");
        const result = await response.json();

        if (!response.ok) {
            throw new Error("Unable to load database events");
        }

        const databaseEvents = result.events || [];

        databaseEvents.forEach(function (item) {

            var category = (item.category || "other").toLowerCase().trim();

var categoryMap = {
    "weddings": "wedding",
    "destination weddings": "destination-wedding",
    "birthdays": "birthday",
    "anniversaries": "anniversary",
    "corporate events": "corporate"
};

category = categoryMap[category] || category.replace(/\s+/g, "-");

            var categoryLabel = item.category || "Other Events";

            var alreadyExists = EVENTS.some(function (event) {
                return event.id === String(item.id);
            });

            if (alreadyExists) return;

            EVENTS.push({
                id: String(item.id),
                title: item.event_name,
                category: category,
                categoryLabel: categoryLabel,
                image: item.image_url || FALLBACK_IMAGE,
                alt: item.event_name,
                summary: item.description || "Plan your special event with EventEase.",
                description: item.description || "Explore this event with EventEase.",
                highlights: [
                    "Event planning",
                    "Venue coordination",
                    "Guest management"
                ]
            });
        });

    } catch (error) {
        console.error("Database events error:", error);
    }
}
  function bindImageFallback(img) {
    img.addEventListener("error", function onError() {
      img.removeEventListener("error", onError);
      img.src = FALLBACK_IMAGE;
      img.alt = "Elegant banquet hall prepared for a formal event";
    });
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderEventCards(list) {
    var grid = document.getElementById("eventsGrid");
    var empty = document.getElementById("eventsEmpty");
    if (!grid) {
      return;
    }

    grid.innerHTML = list.map(function (event) {
      return (
        '<div class="col-12 col-md-6 col-xl-4">' +
          '<article class="ee-card ee-event-card">' +
            '<div class="ee-card-img">' +
              '<img src="' + escapeHtml(event.image) + '" alt="' + escapeHtml(event.alt) + '" width="1200" height="800">' +
            "</div>" +
            '<div class="ee-card-body">' +
              '<span class="ee-badge">' + escapeHtml(event.categoryLabel) + "</span>" +
              "<h3>" + escapeHtml(event.title) + "</h3>" +
              "<p>" + escapeHtml(event.summary) + "</p>" +
              '<a class="btn ee-btn-gold btn-sm mt-auto" href="event-details.html?id=' + encodeURIComponent(event.id) + '">View Details</a>' +
            "</div>" +
          "</article>" +
        "</div>"
      );
    }).join("");

    grid.querySelectorAll("img").forEach(bindImageFallback);

    if (empty) {
      empty.classList.toggle("is-visible", list.length === 0);
    }
  }

  function initListingPage() {
    var grid = document.getElementById("eventsGrid");
    if (!grid) {
      return;
    }

    var searchInput = document.getElementById("eventSearch");
    var filterButtons = document.querySelectorAll(".ee-filter");
    var activeCategory = "all";

    function applyFilters() {
      var query = searchInput ? searchInput.value.trim().toLowerCase() : "";
      var filtered = EVENTS.filter(function (event) {
        var categoryMatch = activeCategory === "all" || event.category === activeCategory;
        var titleMatch = !query || event.title.toLowerCase().indexOf(query) !== -1;
        return categoryMatch && titleMatch;
      });
      renderEventCards(filtered);
    }

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        activeCategory = button.getAttribute("data-category") || "all";
        filterButtons.forEach(function (item) {
          item.classList.toggle("is-active", item === button);
        });
        applyFilters();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", applyFilters);
    }

    applyFilters();
  }

  function initDetailsPage() {
    var root = document.getElementById("eventDetails");
    if (!root) {
      return;
    }

    var params = new URLSearchParams(window.location.search);
    var event = EVENTS.filter(function (item) {
      return item.id === params.get("id");
    })[0];

    if (!event) {
      root.innerHTML =
        '<div class="ee-empty is-visible">' +
          "<h2>Event not found</h2>" +
          "<p>The selected event is unavailable. Return to Explore Events to choose another celebration.</p>" +
          '<a class="btn ee-btn-gold mt-3" href="events.html">Back to Explore Events</a>' +
        "</div>";
      return;
    }

    document.title = event.title + " | EventEase";

    root.innerHTML =
      '<a class="ee-back" href="events.html"><i class="bi bi-arrow-left" aria-hidden="true"></i> Back to Explore Events</a>' +
      '<div class="row g-5 align-items-start">' +
        '<div class="col-lg-6">' +
          '<div class="ee-detail-frame">' +
            '<img src="' + escapeHtml(event.image) + '" alt="' + escapeHtml(event.alt) + '" width="1200" height="800">' +
          "</div>" +
        "</div>" +
        '<div class="col-lg-6 ee-detail-copy">' +
          '<p class="ee-eyebrow">' + escapeHtml(event.categoryLabel) + "</p>" +
          "<h1>" + escapeHtml(event.title) + "</h1>" +
          "<p class=\"ee-lead mb-4\">" + escapeHtml(event.summary) + "</p>" +
          "<p>" + escapeHtml(event.description) + "</p>" +
          '<ul class="ee-points mt-4">' +
            event.highlights.map(function (item) {
              return "<li><strong>" + escapeHtml(item) + "</strong></li>";
            }).join("") +
          "</ul>" +
          '<div class="ee-book-actions">' +
            '<a class="btn ee-btn-gold ee-book-now" href="booking.html?id=' + encodeURIComponent(event.id) + "&name=" + encodeURIComponent(event.title) + "&category=" + encodeURIComponent(event.categoryLabel) + '">Book Now</a>' +
          "</div>" +
        "</div>" +
      "</div>";

    var detailImage = root.querySelector("img");
    if (detailImage) {
      bindImageFallback(detailImage);
    }
  }

  function findEvent(id) {
    return EVENTS.filter(function (item) {
      return item.id === id;
    })[0];
  }

  function todayISO() {
    var now = new Date();
    var month = String(now.getMonth() + 1).padStart(2, "0");
    var day = String(now.getDate()).padStart(2, "0");
    return now.getFullYear() + "-" + month + "-" + day;
  }

  function isFullName(value) {
    var name = value.trim();
    return name.length >= 2 && name.length <= 80 && /^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/.test(name);
  }

  function isEmail(value) {
    return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value.trim());
  }

  function isIndianMobile(value) {
    var compact = String(value).replace(/[\s-]/g, "");
    return /^(?:\+91|91|0)?[6-9]\d{9}$/.test(compact);
  }

  function isEventDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return false;
    }
    var parts = value.split("-");
    var year = Number(parts[0]);
    var month = Number(parts[1]);
    var day = Number(parts[2]);
    var selected = new Date(year, month - 1, day);
    if (selected.getFullYear() !== year || selected.getMonth() !== month - 1 || selected.getDate() !== day) {
      return false;
    }
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    return selected >= today;
  }

  function isGuestCount(value) {
    if (!/^\d+$/.test(String(value).trim())) {
      return false;
    }
    var count = Number(value);
    return count >= 1 && count <= 20000;
  }

  function formatDisplayDate(iso) {
    var parts = iso.split("-");
    var date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  function setFieldError(input, message) {
    var error = document.getElementById(input.id + "Error");
    input.classList.toggle("is-invalid", Boolean(message));
    input.setAttribute("aria-invalid", message ? "true" : "false");
    if (error) {
      error.textContent = message || "";
    }
    return !message;
  }

  function validateBookingForm(form) {
    var budgetOptions = ["Under ₹50,000", "₹50,000 – ₹1,50,000", "₹1,50,000 – ₹3,00,000", "₹3,00,000 – ₹5,00,000", "₹5,00,000 – ₹10,00,000", "Above ₹10,00,000"];
    var checks = [
      [form.fullName, isFullName(form.fullName.value) ? "" : (form.fullName.value.trim() ? "Enter a full name using letters." : "Full name is required.")],
      [form.email, isEmail(form.email.value) ? "" : (form.email.value.trim() ? "Enter a valid email address." : "Email address is required.")],
      [form.mobile, isIndianMobile(form.mobile.value) ? "" : (form.mobile.value.trim() ? "Enter a valid 10-digit Indian mobile number." : "Mobile number is required.")],
      [form.eventName, form.eventName.value.trim() ? "" : "Event name is required."],
      [form.eventCategory, form.eventCategory.value.trim() ? "" : "Event category is required."],
      [form.eventDate, isEventDate(form.eventDate.value) ? "" : (form.eventDate.value ? "Event date cannot be in the past." : "Event date is required.")],
      [form.eventLocation, form.eventLocation.value.trim().length >= 2 ? "" : (form.eventLocation.value.trim() ? "Enter a clearer event location." : "Event location is required.")],
      [form.guestCount, isGuestCount(form.guestCount.value) ? "" : (String(form.guestCount.value).trim() ? "Enter the number of guests as a whole number." : "Number of guests is required.")],
      [form.budget, budgetOptions.indexOf(form.budget.value) !== -1 ? "" : "Select an estimated budget."]
    ];

    var requirements = form.requirements.value.trim();
    var requirementsMessage = requirements.length > 1000 ? "Additional requirements must be 1000 characters or fewer." : "";
    checks.push([form.requirements, requirementsMessage]);

    var firstInvalid = null;
    checks.forEach(function (check) {
      var valid = setFieldError(check[0], check[1]);
      if (!valid && !firstInvalid) {
        firstInvalid = check[0];
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return false;
    }
    return true;
  }

  function showBookingConfirmation(form, event) {
    var confirmation = document.getElementById("bookingConfirmation");
    var intro = document.getElementById("bookingIntro");
    var summary = document.getElementById("confirmationSummary");
    var guestName = form.fullName.value.trim();
    var eventDate = form.eventDate.value;
    var location = form.eventLocation.value.trim();
    var guests = form.guestCount.value.trim();
    var budget = form.budget.value;

    form.reset();
    form.eventName.value = event.title;
    form.eventCategory.value = event.categoryLabel;
    form.hidden = true;
    if (intro) {
      intro.hidden = true;
    }

    if (summary) {
      summary.innerHTML =
        "<div><dt>Event name</dt><dd>" + escapeHtml(event.title) + "</dd></div>" +
        "<div><dt>Event category</dt><dd>" + escapeHtml(event.categoryLabel) + "</dd></div>" +
        "<div><dt>Event date</dt><dd>" + escapeHtml(formatDisplayDate(eventDate)) + "</dd></div>" +
        "<div><dt>Event location</dt><dd>" + escapeHtml(location) + "</dd></div>" +
        "<div><dt>Guests</dt><dd>" + escapeHtml(guests) + "</dd></div>" +
        "<div><dt>Estimated budget</dt><dd>" + escapeHtml(budget) + "</dd></div>";
    }

    var thanks = document.getElementById("confirmationThanks");
    if (thanks) {
      thanks.textContent = "Thank you, " + guestName + ". Your enquiry for " + event.title + " has been checked on this page.";
    }

    if (confirmation) {
      confirmation.hidden = false;
      confirmation.scrollIntoView({ behavior: "smooth", block: "start" });
      var heading = confirmation.querySelector("h2");
      if (heading) {
        heading.focus();
      }
    }
  }

  function initBookingPage() {
    var form = document.getElementById("bookingForm");
    if (!form) {
      return;
    }

    var params = new URLSearchParams(window.location.search);
    var event = findEvent(params.get("id"));
    var panel = document.getElementById("bookingPanel");
    var missing = document.getElementById("bookingMissing");

    if (!event || params.get("name") !== event.title || params.get("category") !== event.categoryLabel) {
      if (panel) {
        panel.hidden = true;
      }
      if (missing) {
        missing.hidden = false;
      }
      return;
    }

    var detailsHref = "event-details.html?id=" + encodeURIComponent(event.id);
    var backLinks = document.querySelectorAll("[data-details-link]");
    backLinks.forEach(function (link) {
      link.href = detailsHref;
    });

    form.eventName.value = event.title;
    form.eventCategory.value = event.categoryLabel;
    document.title = "Book " + event.title + " | EventEase";

    var dateInput = form.eventDate;
    dateInput.min = todayISO();

    Array.prototype.forEach.call(form.elements, function (field) {
      if (!field.id) {
        return;
      }
      field.addEventListener("input", function () {
        if (field.classList.contains("is-invalid")) {
          setFieldError(field, "");
        }
      });
    });

    form.addEventListener("submit", function (eventSubmit) {
  eventSubmit.preventDefault();

  if (!validateBookingForm(form)) {
    return;
  }

  if (typeof window.submitEventEaseBooking === "function") {
    window.submitEventEaseBooking(form, event);
  } else {
    alert("Booking system is not loaded. Please refresh the page.");
  }
});
  }

 loadDatabaseEvents().then(function () {
    initListingPage();
    initDetailsPage();
    initBookingPage();
});
})();
