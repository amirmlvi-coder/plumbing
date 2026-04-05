/* ============================================================
   SCRIPTS — Ash Plumbing Services
   Navbar scroll, mobile menu, scroll reveal
   ============================================================ */

(function () {
  'use strict';

  /* ----- NAVBAR ----- */
  var navbar  = document.getElementById('navbar');
  var burger  = document.getElementById('navBurger');
  var mobile  = document.getElementById('navMobile');
  var mobileLinks = document.querySelectorAll('.navbar__mobile-link');

  // Scroll: add .scrolled class
  function handleScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Burger toggle
  if (burger && mobile) {
    burger.addEventListener('click', function () {
      var open = burger.classList.toggle('is-open');
      mobile.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      mobile.setAttribute('aria-hidden', open ? 'false' : 'true');
    });

    // Close on link click
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        burger.classList.remove('is-open');
        mobile.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        mobile.setAttribute('aria-hidden', 'true');
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navbar.contains(e.target)) {
        burger.classList.remove('is-open');
        mobile.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        mobile.setAttribute('aria-hidden', 'true');
      }
    });
  }

  /* ----- SCROLL REVEAL ----- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: show all immediately
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ----- SMOOTH SCROLL for anchor links ----- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      var navH = navbar ? navbar.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ----- ACTIVE NAV link on scroll ----- */
  var sections = document.querySelectorAll('section[id], footer[id]');
  var navLinks = document.querySelectorAll('.navbar__link');

  function setActiveLink() {
    var scrollY = window.scrollY;
    var navH = navbar ? navbar.offsetHeight : 0;
    var current = '';

    sections.forEach(function (section) {
      var top = section.offsetTop - navH - 80;
      if (scrollY >= top) current = section.getAttribute('id');
    });

    navLinks.forEach(function (link) {
      link.classList.remove('is-active');
      var href = link.getAttribute('href');
      if (href === '#' + current) link.classList.add('is-active');
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });

})();
