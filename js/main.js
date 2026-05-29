/* ===== RAGA 瑞基 - Main JS ===== */
document.addEventListener('DOMContentLoaded', function() {
  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      nav.classList.toggle('open');
    });
    document.querySelectorAll('.nav a').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  // Back to top
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    });
  }

  // Set active nav based on current page
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav > a, .nav-dd > a').forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      link.classList.toggle('active', href.split('#')[0] === currentPage);
    }
  });

  // Product filter (if on products page)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  if (filterBtns.length && productCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.dataset.filter;
        productCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Page hero slideshow (inner pages only)
  (function() {
    const hero = document.querySelector('.page-hero');
    if (!hero) return;

    const bg = hero.querySelector('.page-hero-bg');
    if (!bg) return;

    // Hero images to cycle through
    const images = [
      'images/banner-cta.jpg',
      'images/banner-case.jpg',
      'images/banner-tech.jpg',
      'images/hero-industrial.jpg',
      'images/banner-about.jpg',
      'images/R-C-1.png',
      'images/52.png'
    ];

    // Remove original bg
    bg.remove();

    // Create slider container
    const slider = document.createElement('div');
    slider.className = 'page-hero-slider';

    images.forEach(function(src) {
      const slide = document.createElement('div');
      slide.className = 'page-hero-slide';
      slide.style.backgroundImage = 'url(' + src + ')';
      slider.appendChild(slide);
    });

    hero.insertBefore(slider, hero.firstChild);

    // JS-driven cycling for reliability
    var slides = slider.querySelectorAll('.page-hero-slide');
    var current = 0;
    slides[0].style.opacity = '1';

    setInterval(function() {
      slides[current].style.opacity = '0';
      current = (current + 1) % slides.length;
      slides[current].style.opacity = '1';
    }, 4000);
  })();
});
