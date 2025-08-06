/*  NAVBAR MENU TOGGLE */
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

//  Toggle the mobile menu when clicking the hamburger icon
menuToggle.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevents click event from bubbling to the document
    navLinks.classList.toggle("show"); // Show or hide menu
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
  const artistSection = document.querySelector(".about-artist"); // The whole "About Artist" section
  const artistPhoto = document.querySelector(".artist-photo-section"); // Left-side image
  const artistDescription = document.querySelector(".artist-description"); // Right-side description text

  let hasAnimated = false; // Prevents the animation from running multiple times

  // Intersection Observer to trigger animation only when section comes into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        // Add visible class to trigger CSS animations
        artistPhoto.classList.add("visible");
        artistDescription.classList.add("visible");
        hasAnimated = true; 
        observer.disconnect(); // Stop observing after animation runs once
      }
    });
  }, {
    threshold: 0.1 // Animation triggers when 10% of the section is visible
  });

  observer.observe(artistSection);
});


/* SCROLL PROGRESS BUTTON (BOTTOM RIGHT) */
const scrollBtn = document.getElementById('scrollProgress'); // Circular scroll button
const progressCircle = document.querySelector('.progress-circle .progress'); // Progress border circle
const arrowIcon = document.querySelector('.arrow-icon'); // Arrow icon inside the button

const radius = 26;
const circumference = 2 * Math.PI * radius; // Calculate circumference for circular progress

//  Update circular progress and arrow direction based on scroll position
function updateScrollProgress() {
  const scrollTop = window.scrollY; // Current scroll position
  const docHeight = document.documentElement.scrollHeight - window.innerHeight; // Total scrollable height
  const scrollPercent = scrollTop / docHeight; // Scroll progress in percentage
  
  const offset = circumference - scrollPercent * circumference; // Stroke offset for progress circle
  progressCircle.style.strokeDashoffset = offset;

  // Change arrow direction (down for scroll-to-bottom, up for scroll-to-top)
  if (scrollTop > docHeight / 2) {
    arrowIcon.classList.replace('fa-arrow-down', 'fa-arrow-up');
  } else {
    arrowIcon.classList.replace('fa-arrow-up', 'fa-arrow-down');
  }
}

// Scroll smoothly to top or bottom based on arrow direction
function scrollToTarget() {
  if (arrowIcon.classList.contains('fa-arrow-down')) {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); // Scroll to bottom
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
  }
}

// Event listeners for scroll and button click
scrollBtn.addEventListener('click', scrollToTarget);
window.addEventListener('scroll', updateScrollProgress);

// Initialize progress circle on page load
updateScrollProgress();
