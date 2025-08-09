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

  const observer2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  testimonials.forEach(card => observer.observe(card));

  function setupTestimonialsToggle() {
  const btn = document.getElementById("toggletestimonialReadBtn");
  const cards = document.querySelectorAll(".testimonial-card");

  function updateView() {
    const w = window.innerWidth;
    btn.textContent = "Read More";

    cards.forEach(card => card.classList.remove("hidden"));

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
      hiddenCards.forEach(card => card.classList.remove("hidden"));
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

  const observer3 = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  faqItems.forEach(item => observer.observe(item));

// Book Now
const section = document.querySelector(".book-now-section");

  const bookNowObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add("visible");
        observer.unobserve(section);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(section);





});

 
 