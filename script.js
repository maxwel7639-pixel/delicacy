(function(){
  "use strict";

  // Header background on scroll
  var header = document.getElementById('siteHeader');
  function onScroll(){
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile nav toggle
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  toggle.addEventListener('click', function(){
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  nav.querySelectorAll('a').forEach(function(link){
    link.addEventListener('click', function(){
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Scroll reveal — only animate elements that start below the fold,
  // so content is never stuck invisible (no-JS, slow JS, or anchor-jump loads).
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var allTargets = document.querySelectorAll(
    '.servico-card, .pro-spread, .resultado-card, .depoimento-card, .section-head, .cta-final-info, .cta-final-map, .equipe-index'
  );

  if (reduceMotion || !('IntersectionObserver' in window)) {
    // leave elements in their default (visible) state
  } else {
    var viewportH = window.innerHeight;
    var toAnimate = [];
    allTargets.forEach(function(el){
      var rect = el.getBoundingClientRect();
      if (rect.top > viewportH * 0.92) {
        el.classList.add('reveal');
        toAnimate.push(el);
      }
    });
    if (toAnimate.length) {
      var observer = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
      toAnimate.forEach(function(el){ observer.observe(el); });
    }
  }
})();
