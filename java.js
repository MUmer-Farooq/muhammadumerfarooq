// Mobile menu toggle + header background animation
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const header = document.getElementById("main-header");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuToggle.innerHTML = navLinks.classList.contains("active") 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });
  }

  // Header color animation
  const colors = ["#141726", "#0b0c13", "#1e2233", "#202040", "#141726"];
  let i = 0;

  function changeHeaderColor() {
    if (header) {
      header.style.background = colors[i];
      i = (i + 1) % colors.length;
    }
  }

  // run every 3s
  setInterval(changeHeaderColor, 3000);
});

// ===== Testimonial Slider Script =====
(function () {
  function initSlider(slider) {
    const track = slider.querySelector('.ts-track');
    const slides = Array.from(track.children);
    const prev = slider.querySelector('.ts-prev');
    const next = slider.querySelector('.ts-next');
    const dotsWrap = slider.querySelector('.ts-dots');

    // Build dots dynamically
    dotsWrap.innerHTML = slides.map((_, i) =>
      `<button class="ts-dot${i===0?' active':''}" aria-label="Go to slide ${i+1}"></button>`
    ).join('');
    const dots = Array.from(dotsWrap.children);

    let i = 0, timer = null, delay = parseInt(slider.dataset.autoplay || '0', 10);

    function go(idx) {
      i = (idx + slides.length) % slides.length;
      track.style.transform = `translateX(-${i * 100}%)`;
      dots.forEach((d, k) => d.classList.toggle('active', k === i));
    }

    prev.addEventListener('click', () => go(i - 1));
    next.addEventListener('click', () => go(i + 1));
    dots.forEach((d, k) => d.addEventListener('click', () => go(k)));

    function start() {
      if (!delay) return;
      stop();
      timer = setInterval(() => go(i + 1), delay);
    }
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    window.addEventListener('visibilitychange', () => document.hidden ? stop() : start());

    go(0);
    start();
  }

  // Initialize sliders on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.ts-slider').forEach(initSlider);
  });
})();


function openFullscreen(img) {
  document.getElementById("fullscreen-img").src = img.src;
  document.getElementById("fullscreen-view").style.display = "flex";
}

function closeFullscreen() {
  document.getElementById("fullscreen-view").style.display = "none";
}

// Reset form after successful submit
  document.getElementById("contactForm").addEventListener("submit", function () {
    setTimeout(() => this.reset(), 200);
  });

  // Extra: reset form whenever page is shown (fix for mobile bfcache)
  window.addEventListener("pageshow", function() {
    document.getElementById("contactForm").reset();
  });
