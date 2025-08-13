document.addEventListener("DOMContentLoaded", () => {
  /*   1. NAVBAR MENU TOGGLE (Mobile) */
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    // Open/close menu when toggle is clicked
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      navLinks.classList.toggle("show");
    });

    // Close menu if a link or button is clicked
    navLinks.addEventListener("click", (e) => {
      if (["A", "BUTTON"].includes(e.target.tagName)) {
        navLinks.classList.remove("show");
      }
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove("show");
      }
    });
  }

  /*   2. SCROLL PROGRESS BUTTON */
  const scrollBtn = document.getElementById("scrollProgress");
  const progressCircle = document.querySelector(".progress-circle .progress");
  const arrowIcon = document.querySelector(".arrow-icon");
  const radius = 26;
  const circumference = 2 * Math.PI * radius;

  if (progressCircle && arrowIcon && scrollBtn) {
    progressCircle.style.strokeDasharray = circumference;

    function updateScrollProgress() {
      const scrollTop = window.scrollY;
      const docHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const percent = scrollTop / docHeight;
      progressCircle.style.strokeDashoffset =
        circumference - Math.min(Math.max(percent, 0), 1) * circumference;

      // Change arrow direction
      arrowIcon.classList.toggle("fa-arrow-up", scrollTop > docHeight / 2);
      arrowIcon.classList.toggle("fa-arrow-down", scrollTop <= docHeight / 2);
    }

    scrollBtn.addEventListener("click", () => {
      const isDown = arrowIcon.classList.contains("fa-arrow-down");
      window.scrollTo({
        top: isDown ? document.body.scrollHeight : 0,
        behavior: "smooth",
      });
    });

    window.addEventListener("scroll", updateScrollProgress);
    updateScrollProgress();
  }

  /*   3. SCROLL ANIMATION FOR BOXES */
  const animatedBoxes = document.querySelectorAll(
    ".expertise-box, .my-work-box"
  );
  if (animatedBoxes.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    animatedBoxes.forEach((box) => observer.observe(box));
  }

  /*    4. ABOUT ARTIST SECTION ANIMATION */
  (() => {
    const section = document.querySelector(".about-artist");
    const photo = document.querySelector(".artist-photo-section");
    const desc = document.querySelector(".artist-description");
    if (!section || !photo || !desc) return;

    let animated = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            photo.classList.add("visible");
            desc.classList.add("visible");
            animated = true;
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
  })();

  /*  5. TOGGLE VIEW MORE/LESS */
  function setupToggle({ boxSelector, buttonId }) {
    const btn = document.getElementById(buttonId);
    const boxes = document.querySelectorAll(boxSelector);
    if (!btn || boxes.length === 0) return;

    let expanded = false;

    function updateVisibility() {
      const w = window.innerWidth;
      expanded = false;
      boxes.forEach((box, i) => {
        box.classList.remove("hidden");
        if (w > 992) btn.style.display = "none";
        else if (w > 600) {
          btn.style.display = "inline-block";
          if (i >= 4) box.classList.add("hidden");
        } else {
          btn.style.display = "inline-block";
          if (i >= 2) box.classList.add("hidden");
        }
      });
      btn.textContent = "View More";
    }

    btn.addEventListener("click", () => {
      const w = window.innerWidth;
      expanded = !expanded;
      boxes.forEach((box, i) => {
        if (w > 600 && w <= 992 && i >= 4)
          box.classList.toggle("hidden", !expanded);
        else if (w <= 600 && i >= 2) box.classList.toggle("hidden", !expanded);
      });
      btn.textContent = expanded ? "View Less" : "View More";
    });

    window.addEventListener("resize", updateVisibility);
    updateVisibility();
  }

  setupToggle({ boxSelector: ".expertise-box", buttonId: "toggleViewBtn" });
  setupToggle({ boxSelector: ".my-work-box", buttonId: "toggleWorkViewBtn" });

  // experince section animation
  const items = document.querySelectorAll(".experience-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  items.forEach((item) => observer.observe(item));

  //testinomals
  const testimonials = document.querySelectorAll(".testimonial-card");

  const observer2 = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  testimonials.forEach((card) => observer.observe(card));

  function setupTestimonialsToggle() {
    const btn = document.getElementById("toggletestimonialReadBtn");
    const cards = document.querySelectorAll(".testimonial-card");

    function updateView() {
      const w = window.innerWidth;
      btn.textContent = "Read More";

      cards.forEach((card) => card.classList.remove("hidden"));

      if (w > 992) {
        // Laptop: show all, hide button
        btn.style.display = "none";
      } else if (w > 600) {
        // Tablet: show 4, hide 2
        btn.style.display = "inline-block";
        cards.forEach((card, i) => {
          if (i >= 4) card.classList.add("hidden");
        });
      } else {
        // Mobile: show 2, hide 4
        btn.style.display = "inline-block";
        cards.forEach((card, i) => {
          if (i >= 2) card.classList.add("hidden");
        });
      }
    }

    btn.addEventListener("click", () => {
      const hiddenCards = document.querySelectorAll(".testimonial-card.hidden");
      if (hiddenCards.length > 0) {
        hiddenCards.forEach((card) => card.classList.remove("hidden"));
        btn.textContent = "Read Less";
      } else {
        updateView();
      }
    });

    window.addEventListener("resize", updateView);
    updateView();
  }

  setupTestimonialsToggle();

  /* FAQ */
  const faqItems = document.querySelectorAll(".faq-item");

  const faqObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  faqItems.forEach((item) => observer.observe(item));

  // Book Now
  const section = document.querySelector(".book-now-section");

  const bookNowObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          section.classList.add("visible");
          observer.unobserve(section);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(section);

  /*  BOOKING MODAL  */
  const bookingModal = document.getElementById("booking-modal");
  const closeBtn = bookingModal.querySelector(".close-btn");
  const bookNowButtons = document.querySelectorAll(".book-now-btn");

  const otherEventTypeContainer = document.getElementById(
    "otherEventTypeContainer"
  );
  const otherEventTypeInput = document.getElementById("otherEventType");
  const eventTypeSelect = document.getElementById("eventType");

  const openBookingModal = () => {
    bookingModal.style.display = "flex";
    bookingModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    // Focus first input
    const firstInput = bookingModal.querySelector("input, select, textarea");
    if (firstInput) firstInput.focus();
  };

  const closeBookingModal = () => {
    bookingModal.style.display = "none";
    bookingModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  bookNowButtons.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openBookingModal();
    })
  );

  closeBtn.addEventListener("click", closeBookingModal);
  bookingModal.addEventListener("click", (e) => {
    if (e.target === bookingModal) closeBookingModal();
  });

  window.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      bookingModal.getAttribute("aria-hidden") === "false"
    ) {
      closeBookingModal();
    }
  });

  // Focus trap
  bookingModal.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const focusable = bookingModal.querySelectorAll(
      'a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    const first = focusable[0],
      last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      last.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === last) {
      first.focus();
      e.preventDefault();
    }
  });

  /*  FORM ELEMENTS  */
  const bookingForm = document.getElementById("bookingForm");
  const txtFullname = document.getElementById("fullName");
  const stateDropdown = document.getElementById("state");
  const districtDropdown = document.getElementById("district");
  const txtAddress = document.getElementById("address");
  const txtPincode = document.getElementById("pincode");
  const txtMobile = document.getElementById("mobile");
  const txtAltMobile = document.getElementById("altMobile");
  const txtEmail = document.getElementById("email");
  const eventYear = document.getElementById("eventYear");
  const eventMonth = document.getElementById("eventMonth");
  const eventDay = document.getElementById("eventDay");
  const eventTime = document.getElementById("eventTime");
  const eventSize = document.getElementById("eventSize");

  /*  STATES & DISTRICTS */
  const fetchStates = async () => {
    try {
      const res = await fetch("/api/states");
      const data = await res.json();
      const states = data.states.sort();
      stateDropdown.innerHTML = '<option value="">-- Select State --</option>';
      states.forEach((s) => {
        const opt = document.createElement("option");
        opt.value = s;
        opt.textContent = s;
        stateDropdown.appendChild(opt);
      });
    } catch (err) {
      console.error("Error fetching states:", err);
    }
  };

  const fetchDistricts = async (state) => {
    districtDropdown.innerHTML =
      '<option value="">-- Select District --</option>';
    if (!state) return;
    try {
      const res = await fetch(
        `/api/districts?state=${encodeURIComponent(state)}`
      );
      const { districts } = await res.json();
      districts.forEach((d) => {
        const opt = document.createElement("option");
        opt.value = d;
        opt.textContent = d;
        districtDropdown.appendChild(opt);
      });
    } catch (err) {
      console.error("Error fetching districts:", err);
    }
  };

  stateDropdown.addEventListener("change", () =>
    fetchDistricts(stateDropdown.value)
  );
  fetchStates();

  /*  DATE DROPDOWNS  */
  const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

  const fillYears = () => {
    const currentYear = new Date().getFullYear();
    eventYear.innerHTML = '<option value="">Year</option>';
    for (let y = currentYear; y <= currentYear + 2; y++) {
      const opt = document.createElement("option");
      opt.value = y;
      opt.textContent = y;
      eventYear.appendChild(opt);
    }
  };

  const fillMonths = () => {
    eventMonth.innerHTML = '<option value="">Month</option>';
    for (let m = 1; m <= 12; m++) {
      const opt = document.createElement("option");
      opt.value = m;
      opt.textContent = m;
      eventMonth.appendChild(opt);
    }
  };

  const fillDays = (year, month) => {
    eventDay.innerHTML = '<option value="">Day</option>';
    if (!year || !month) return;
    const totalDays = daysInMonth(month, year);
    const today = new Date();
    for (let d = 1; d <= totalDays; d++) {
      const dateObj = new Date(year, month - 1, d);
      if (dateObj < today) continue; // disable past dates
      const opt = document.createElement("option");
      opt.value = d;
      opt.textContent = d;
      eventDay.appendChild(opt);
    }
  };

  fillYears();
  fillMonths();
  fillDays(new Date().getFullYear(), new Date().getMonth() + 1);

  [eventYear, eventMonth].forEach((dd) =>
    dd.addEventListener("change", () => {
      fillDays(parseInt(eventYear.value), parseInt(eventMonth.value));
    })
  );

  /*  OTHER EVENT TYPE  */
  eventTypeSelect.addEventListener("change", () => {
    if (eventTypeSelect.value === "Other") {
      otherEventTypeContainer.style.display = "block";
      otherEventTypeInput.required = true;
    } else {
      otherEventTypeContainer.style.display = "none";
      otherEventTypeInput.value = "";
      otherEventTypeInput.required = false;
    }
  });

  /*  FORM VALIDATION */
  const showError = (input, msg) => {
    const span = document.getElementById(`${input.id}-error`);
    if (span) span.textContent = msg;
    input.classList.add("invalid");
  };

  const clearError = (input) => {
    const span = document.getElementById(`${input.id}-error`);
    if (span) span.textContent = "";
    input.classList.remove("invalid");
  };

  const validateBookingForm = () => {
    let valid = true;
    const inputs = [
      txtFullname,
      stateDropdown,
      districtDropdown,
      txtAddress,
      txtPincode,
      txtMobile,
      txtAltMobile,
      txtEmail,
      eventYear,
      eventMonth,
      eventDay,
      eventTime,
      eventTypeSelect,
      otherEventTypeInput,
      eventSize,
    ];

    inputs.forEach(clearError);

    if (!txtFullname.value.trim() || !/^[a-zA-Z\s]+$/.test(txtFullname.value)) {
      showError(txtFullname, "Enter valid name.");
      valid = false;
    }
    if (!stateDropdown.value) {
      showError(stateDropdown, "Select state.");
      valid = false;
    }
    if (!districtDropdown.value) {
      showError(districtDropdown, "Select district.");
      valid = false;
    }
    if (!txtAddress.value.trim()) {
      showError(txtAddress, "Enter address.");
      valid = false;
    }
    if (!/^\d{6}$/.test(txtPincode.value.trim())) {
      showError(txtPincode, "Enter 6-digit pincode.");
      valid = false;
    }
    if (!/^\d{10}$/.test(txtMobile.value.trim())) {
      showError(txtMobile, "Enter 10-digit mobile.");
      valid = false;
    }
    if (txtAltMobile.value && !/^\d{10}$/.test(txtAltMobile.value.trim())) {
      showError(txtAltMobile, "Enter 10-digit alternate mobile.");
      valid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(txtEmail.value.trim())) {
      showError(txtEmail, "Enter valid email.");
      valid = false;
    }
    if (!eventYear.value || !eventMonth.value || !eventDay.value) {
      showError(eventYear, "Select valid date.");
      valid = false;
    }
    if (!eventTime.value) {
      showError(eventTime, "Select event time.");
      valid = false;
    }
    if (!eventTypeSelect.value) {
      showError(eventTypeSelect, "Select event type.");
      valid = false;
    }
    if (eventTypeSelect.value === "Other") {
      const value = otherEventTypeInput.value.trim();
      if (!value) {
        showError(otherEventTypeInput, "Specify event type.");
        valid = false;
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        showError(
          otherEventTypeInput,
          "Event type should contain only letters."
        );
        valid = false;
      }
    }

    if (!eventSize.value) {
      showError(eventSize, "Select event size.");
      valid = false;
    }

    return valid;
  };

  /*  REAL-TIME VALIDATION  */
  [
    txtFullname,
    txtPincode,
    txtMobile,
    txtAltMobile,
    txtEmail,
    otherEventTypeInput,
  ].forEach((input) => {
    input.addEventListener("input", () => clearError(input));
  });

  /*  FORM SUBMISSION  */
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateBookingForm()) return;

    let successMsg = document.getElementById("bookingSuccessMessage");
    if (!successMsg) {
      successMsg = document.createElement("div");
      successMsg.id = "bookingSuccessMessage";
      successMsg.style.color = "green";
      successMsg.style.marginTop = "10px";
      bookingForm.prepend(successMsg);
    }
    successMsg.textContent = "Booking submitted successfully!";

    console.log("Form data ready to send.");

    bookingForm.reset();
    otherEventTypeContainer.style.display = "none";
  });
});
