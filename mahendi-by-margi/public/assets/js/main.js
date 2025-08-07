/*  NAVBAR MENU TOGGLE */
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

//  Toggle the mobile menu when clicking the hamburger icon
menuToggle.addEventListener("click", (event) => {
    event.stopPropagation(); 
    navLinks.classList.toggle("show"); 
});

//  Close the menu when a link or button inside the menu is clicked
navLinks.addEventListener("click", (event) => {
    if (event.target.tagName === "A" || event.target.tagName === "BUTTON") {
        navLinks.classList.remove("show");
    }
});

// Close the menu if the user clicks anywhere outside the menu
document.addEventListener("click", (event) => {
    if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
        navLinks.classList.remove("show");
    }
});


/*   ABOUT ARTIST SECTION ANIMATION */
document.addEventListener("DOMContentLoaded", () => {
  const artistSection = document.querySelector(".about-artist"); 
  const artistPhoto = document.querySelector(".artist-photo-section"); 
  const artistDescription = document.querySelector(".artist-description"); 

  let hasAnimated = false; 

  // Intersection Observer to trigger animation only when section comes into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        artistPhoto.classList.add("visible");
        artistDescription.classList.add("visible");
        hasAnimated = true; 
        observer.disconnect(); 
      }
    });
  }, {
    threshold: 0.1 
  });

  observer.observe(artistSection);
});


/* SCROLL PROGRESS BUTTON (BOTTOM RIGHT) */
const scrollBtn = document.getElementById('scrollProgress'); 
const progressCircle = document.querySelector('.progress-circle .progress'); 
const arrowIcon = document.querySelector('.arrow-icon'); 

const radius = 26;
const circumference = 2 * Math.PI * radius; 

function updateScrollProgress() {
  const scrollTop = window.scrollY; 
  const docHeight = document.documentElement.scrollHeight - window.innerHeight; 
  const scrollPercent = scrollTop / docHeight; 
  
  const offset = circumference - scrollPercent * circumference; 
  progressCircle.style.strokeDashoffset = offset;

  // Change arrow direction 
  if (scrollTop > docHeight / 2) {
    arrowIcon.classList.replace('fa-arrow-down', 'fa-arrow-up');
  } else {
    arrowIcon.classList.replace('fa-arrow-up', 'fa-arrow-down');
  }
}

// Scroll smoothly to top or bottom based on arrow direction
function scrollToTarget() {
  if (arrowIcon.classList.contains('fa-arrow-down')) {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); 
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }
}

// Event listeners for scroll and button click
scrollBtn.addEventListener('click', scrollToTarget);
window.addEventListener('scroll', updateScrollProgress);


updateScrollProgress();


document.addEventListener("DOMContentLoaded", () => {
  const expertiseBoxes = document.querySelectorAll('.expertise-box');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.2 });

  expertiseBoxes.forEach(box => observer.observe(box));
});



// expertise 
document.addEventListener('DOMContentLoaded', function () {
    // ----------------------------
    // EXPERTISE SECTION TOGGLE
    // ----------------------------
    const toggleBtn = document.getElementById('toggleViewBtn');
    const expertiseBoxes = document.querySelectorAll('.expertise-box');
    let isExpanded = false;

    function updateExpertiseVisibility() {
      const screenWidth = window.innerWidth;
      isExpanded = false;

      expertiseBoxes.forEach((box, index) => {
        box.classList.remove('hidden');

        if (screenWidth > 992) {
          toggleBtn.style.display = 'none';
        } else if (screenWidth > 600 && screenWidth <= 992) {
          toggleBtn.style.display = 'inline-block';
          if (index >= 4) box.classList.add('hidden');
        } else {
          toggleBtn.style.display = 'inline-block';
          if (index >= 2) box.classList.add('hidden');
        }
      });

      toggleBtn.textContent = 'View More';
    }

    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        const screenWidth = window.innerWidth;
        isExpanded = !isExpanded;

        expertiseBoxes.forEach((box, index) => {
          if (screenWidth > 600 && screenWidth <= 992) {
            if (isExpanded) {
              box.classList.remove('hidden');
            } else {
              if (index >= 4) box.classList.add('hidden');
            }
          } else if (screenWidth <= 600) {
            if (isExpanded) {
              box.classList.remove('hidden');
            } else {
              if (index >= 2) box.classList.add('hidden');
            }
          }
        });

        toggleBtn.textContent = isExpanded ? 'View Less' : 'View More';
      });
    }

    // ----------------------------
    // MY WORK SECTION TOGGLE
    // ----------------------------
    const workToggleBtn = document.getElementById('toggleWorkViewBtn');
    const workBoxes = document.querySelectorAll('.my-work-box');
    let workExpanded = false;

    function updateWorkVisibility() {
      const screenWidth = window.innerWidth;
      workExpanded = false;

      workBoxes.forEach((box, index) => {
        box.classList.remove('hidden');

        if (screenWidth > 992) {
          workToggleBtn.style.display = 'none';
        } else if (screenWidth > 600 && screenWidth <= 992) {
          workToggleBtn.style.display = 'inline-block';
          if (index >= 4) box.classList.add('hidden');
        } else {
          workToggleBtn.style.display = 'inline-block';
          if (index >= 2) box.classList.add('hidden');
        }
      });

      workToggleBtn.textContent = 'View More';
    }

    if (workToggleBtn) {
      workToggleBtn.addEventListener('click', function () {
        const screenWidth = window.innerWidth;
        workExpanded = !workExpanded;

        workBoxes.forEach((box, index) => {
          if (screenWidth > 600 && screenWidth <= 992) {
            if (workExpanded) {
              box.classList.remove('hidden');
            } else {
              if (index >= 4) box.classList.add('hidden');
            }
          } else if (screenWidth <= 600) {
            if (workExpanded) {
              box.classList.remove('hidden');
            } else {
              if (index >= 2) box.classList.add('hidden');
            }
          }
        });

        workToggleBtn.textContent = workExpanded ? 'View Less' : 'View More';
      });
    }

    // Attach resize event to both
    window.addEventListener('resize', () => {
      updateExpertiseVisibility();
      updateWorkVisibility();
    });

    // Initial calls
    updateExpertiseVisibility();
    updateWorkVisibility();
  });