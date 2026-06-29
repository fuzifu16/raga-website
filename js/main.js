/* ===== RAGA 瑞基 - Main JS ===== */
document.addEventListener('DOMContentLoaded', function() {
  // Scroll-triggered reveal — sections animate in when scrolled into view
  (function() {
    var targets = document.querySelectorAll(
      '.hero-content, .page-hero-content, .section, .products-section, .cert-gallery, .cta-banner-content, ' +
      '.tech-grid > *, .case-grid > *, .contact-grid > *, ' +
      '.product-detail, .download-list, .machining-gallery > *, ' +
      '.production-gallery > *'
    );
    if (!targets.length) return;

    // Add ready state (hidden)
    targets.forEach(function(el) {
      el.classList.add('reveal-ready');
    });

    // Observe and reveal on scroll
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-up');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px 100px 0px' });

    targets.forEach(function(el) { observer.observe(el); });

    // Timeline special: reveal items one by one when timeline enters view
    var timeline = document.querySelector('.timeline');
    if (timeline) {
      var items = timeline.querySelectorAll('.timeline-item');
      items.forEach(function(item) { item.classList.add('reveal-ready'); });

      var tlObserver = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
          items.forEach(function(item, i) {
            setTimeout(function() {
              item.classList.add('reveal-up');
            }, i * 800);
          });
          tlObserver.unobserve(timeline);
        }
      }, { threshold: 0.1 });
      tlObserver.observe(timeline);
    }

    // Product cards: reveal one by one when grid enters view
    var productGrids = document.querySelectorAll('.products-grid');
    if (productGrids.length) {
      productGrids.forEach(function(grid) {
        var cards = grid.querySelectorAll('.product-card');
        cards.forEach(function(card) { card.classList.add('reveal-ready'); });

        var pgObserver = new IntersectionObserver(function(entries) {
          if (entries[0].isIntersecting) {
            cards.forEach(function(card, i) {
              setTimeout(function() {
                card.classList.add('reveal-up');
              }, i * 180);
            });
            pgObserver.unobserve(grid);
          }
        }, { threshold: 0.05 });
        pgObserver.observe(grid);
      });
    }

    // Production grid: reveal items one by one
    var prodGrid = document.querySelector('.production-grid');
    if (prodGrid) {
      var pItems = prodGrid.querySelectorAll('.production-item');
      pItems.forEach(function(p) { p.classList.add('reveal-ready'); });
      var pObserver = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
          pItems.forEach(function(p, i) {
            setTimeout(function() {
              p.classList.add('reveal-up');
            }, i * 600);
          });
          pObserver.unobserve(prodGrid);
        }
      }, { threshold: 0.1 });
      pObserver.observe(prodGrid);
    }

    // News grid: reveal cards one by one
    var newsGrid = document.querySelector('.news-grid');
    if (newsGrid) {
      var nCards = newsGrid.querySelectorAll('.news-card');
      nCards.forEach(function(n) { n.classList.add('reveal-ready'); });
      var nObserver = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
          nCards.forEach(function(n, i) {
            setTimeout(function() {
              n.classList.add('reveal-up');
            }, i * 600);
          });
          nObserver.unobserve(newsGrid);
        }
      }, { threshold: 0.1 });
      nObserver.observe(newsGrid);
    }

    // About grid: reveal in groups — image → names → text → stats
    var aboutGrid = document.querySelector('.about-grid');
    if (aboutGrid) {
      var aImg   = aboutGrid.querySelector('.about-image');
      var aH3    = aboutGrid.querySelector('.about-text > h3');
      var aSub   = aboutGrid.querySelector('.about-text > .about-subtitle');
      var aParas = aboutGrid.querySelectorAll('.about-text > p:not(.about-subtitle)');
      var aStats = aboutGrid.querySelector('.about-stats');

      var groups = [];
      if (aImg) groups.push([aImg]);
      if (aH3) {
        var g2 = [aH3];
        if (aSub) g2.push(aSub);
        groups.push(g2);
      }
      if (aParas.length) groups.push([].slice.call(aParas));
      if (aStats) groups.push([aStats]);

      groups.forEach(function(g) {
        g.forEach(function(el) { el.classList.add('reveal-ready'); });
      });

      var aObserver = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
          var delay = 0;
          groups.forEach(function(g) {
            g.forEach(function(el) {
              (function(d) {
                setTimeout(function() { el.classList.add('reveal-up'); }, d);
              })(delay);
            });
            delay += 700;
          });
          aObserver.unobserve(aboutGrid);
        }
      }, { threshold: 0.1 });
      aObserver.observe(aboutGrid);
    }
  })();

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

  // Set active nav based on current page (handle URLs with/without .html)
  function getPageName() {
    var path = location.pathname;
    if (path === '/' || path === '') return 'index';
    return path.split('/').pop().replace(/\.html$/, '');
  }
  var currentPage = getPageName();
  document.querySelectorAll('.nav > a, .nav-dd > a').forEach(function(link) {
    var href = link.getAttribute('href');
    if (href) {
      var hrefPage = href.split('#')[0].replace(/\.html$/, '');
      link.classList.toggle('active', hrefPage === currentPage);
    }
  });

  // Product scroll marquee - duplicate track for seamless loop
  (function() {
    var track = document.getElementById('productScrollTrack');
    if (track) {
      track.innerHTML = track.innerHTML + track.innerHTML;
    }
  })();

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

  // Email copy on click (mailto doesn't work without email client)
  document.querySelectorAll('a[href^="mailto:"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var email = this.getAttribute('href').replace('mailto:', '');
      var copiedText = (typeof i18nData !== 'undefined' && i18nData[I18N.currentLang] && i18nData[I18N.currentLang]['contact.email_copied']) ? i18nData[I18N.currentLang]['contact.email_copied'] : '邮箱已复制：';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function() {
          showToast(copiedText + email);
        });
      } else {
        var ta = document.createElement('textarea');
        ta.value = email;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast(copiedText + email);
      }
    });
  });

  function showToast(msg) {
    var t = document.createElement('div');
    t.className = 'copy-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function() { t.classList.add('show'); }, 10);
    setTimeout(function() {
      t.classList.remove('show');
      setTimeout(function() { t.remove(); }, 300);
    }, 2000);
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
      'images/3.jpeg',
      'images/hero-industrial.jpg',
      'images/R-C-1.png',
      'images/52.png',
      'images/banner-6.jpeg',
      'images/134.jpg',
      'images/12.jpg'
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
      slide.style.backgroundSize = '100% auto';
      if (src.indexOf('52.png') !== -1) {
        slide.style.backgroundPosition = 'top center';
      }
      if (src.indexOf('134.jpg') !== -1) {
        slide.style.backgroundPosition = 'bottom center';
      }
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
