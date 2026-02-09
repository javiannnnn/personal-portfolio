/* ==========================================================================
   SCRIPT.JS — Portfolio
   Minimal JavaScript. Only what's needed:
   1. Mobile menu toggle
   2. Close mobile menu on link click
   3. Close mobile menu on escape key
   No animation libraries, no scroll effects, no unnecessary complexity.
   ========================================================================== */

(function () {
  'use strict';

  // --- Mobile Menu Toggle ---
  const toggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.contains('open');

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when a link is clicked
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMenu();
        toggle.focus(); // Return focus to toggle button for accessibility
      }
    });
  }

  function openMenu() {
    mobileMenu.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    // Prevent body scroll when menu is open
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // --- Manage body scroll restoration on resize ---
  // If user resizes from mobile (menu open) to desktop, restore scroll
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 600 && mobileMenu && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });

})();
