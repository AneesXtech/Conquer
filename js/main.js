    // 0. Dynamic Header Scroll Controller (Transparent at top -> Black floating card with radius on scroll)
    const headerEl = document.getElementById('header');
    if (headerEl) {
      const handleHeaderScroll = () => {
        if (window.scrollY > 20) {
          headerEl.classList.add('scrolled');
        } else {
          headerEl.classList.remove('scrolled');
        }
      };
      window.addEventListener('scroll', handleHeaderScroll, { passive: true });
      handleHeaderScroll();
    }

    // 1. Mobile Menu Drawer Toggle
    const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileToggleBtn && mobileMenu) {
      mobileToggleBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
      });
      document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('open');
        });
      });
    }

    // 2. Industries We Support Tab Switcher
    const industryData = [
      {
        tag: "DOMAIN 01 — MOBILE SOLUTIONS",
        title: "Smart Event Parking & Navigation",
        desc: "Developing location-aware mobile tools to reduce parking friction, discover alternative spots, and simplify crowd mobility during major public and private events."
      },
      {
        tag: "DOMAIN 02 — FINTECH & REMINDERS",
        title: "Payment & Contract Due-Date Intelligence",
        desc: "Engineering automated reminder algorithms helping consumers and enterprise teams stay ahead of payments, business renewals, and critical contractual milestones."
      },
      {
        tag: "DOMAIN 03 — CLOUDY R&D LABS",
        title: "Next-Generation Practical Cloud Ecosystems",
        desc: "Building experimental cloud-connected utilities designed to simplify daily organizational workflows and automate repetitive operational friction points."
      },
      {
        tag: "DOMAIN 04 — PHYSICAL INVENTIONS",
        title: "Consumer Product Hardware & Prototyping",
        desc: "Designing and prototyping physical hardware inventions that solve real-world physical friction in home, workshop, and urban transportation environments."
      },
      {
        tag: "DOMAIN 05 — ENTERPRISE ECOSYSTEMS",
        title: "Strategic Partnerships & Cross-Sector R&D",
        desc: "Collaborating with technology partners, financial institutions, legal experts, and educational bodies to transform validated concepts into commercial reality."
      }
    ];

    function switchIndustry(index) {
      const btns = document.querySelectorAll('.industry-tab-btn');
      btns.forEach((b, i) => b.classList.toggle('active', i === index));

      const data = industryData[index];
      document.getElementById('ind-tag').textContent = data.tag;
      document.getElementById('ind-title').textContent = data.title;
      document.getElementById('ind-desc').textContent = data.desc;
    }

    // 3. Innovations Slideshow — hover image swap
    let innovDefaultActive = 1;
    let innovResetTimer = null;

    function switchInnovBg(num, el) {
      clearTimeout(innovResetTimer);

      // Update background layers
      document.querySelectorAll('.innov-bg-layer').forEach((layer, i) => {
        layer.classList.toggle('active', (i + 1) === num);
      });

      // Update item opacity/active state
      document.querySelectorAll('.innov-item').forEach((item, i) => {
        item.classList.toggle('active', (i + 1) === num);
      });

      // Keep arrow visible for hovered item
      const arrow = el.querySelector('.innov-arrow');
      if (arrow) arrow.style.opacity = '1';
    }

    function resetInnovBg() {
      // Small delay before reverting to default
      innovResetTimer = setTimeout(() => {
        document.querySelectorAll('.innov-bg-layer').forEach((layer, i) => {
          layer.classList.toggle('active', (i + 1) === innovDefaultActive);
        });
        document.querySelectorAll('.innov-item').forEach((item, i) => {
          item.classList.toggle('active', (i + 1) === innovDefaultActive);
        });
      }, 200);
    }

    // 4. Back to Top Button Controller
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 350) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      });
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // 5. Smooth Scroll for All Anchor Links with Header Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#' || targetId === '#top') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          if (mobileMenu && mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
          }
          return;
        }

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerEl = document.getElementById('header');
          const headerHeight = headerEl ? headerEl.offsetHeight : 72;
          const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          if (mobileMenu && mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
          }
        }
      });
    });

    // 6. Global Interactive Dot & Follower Custom Cursor
    (function initConquerCursor() {
      if (typeof window === 'undefined') return;
      // Do not run on touch/mobile devices
      if (window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

      const dot = document.createElement('div');
      dot.className = 'conquer-cursor-dot';
      const follower = document.createElement('div');
      follower.className = 'conquer-cursor-follower';

      const attachCursor = () => {
        if (!document.body.contains(dot)) document.body.appendChild(dot);
        if (!document.body.contains(follower)) document.body.appendChild(follower);
      };

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachCursor);
      } else {
        attachCursor();
      }

      let mouseX = -100, mouseY = -100;
      let followerX = -100, followerY = -100;
      let isVisible = false;

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!isVisible) {
          isVisible = true;
          dot.style.opacity = '1';
          follower.style.opacity = '1';
        }
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }, { passive: true });

      window.addEventListener('mousedown', () => {
        follower.classList.add('clicking');
      });

      window.addEventListener('mouseup', () => {
        follower.classList.remove('clicking');
      });

      document.addEventListener('mouseleave', () => {
        isVisible = false;
        dot.style.opacity = '0';
        follower.style.opacity = '0';
      });

      document.addEventListener('mouseenter', () => {
        isVisible = true;
        dot.style.opacity = '1';
        follower.style.opacity = '1';
      });

      // Smooth 60fps lerp loop for follower
      function renderFollower() {
        followerX += (mouseX - followerX) * 0.18;
        followerY += (mouseY - followerY) * 0.18;
        follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
        requestAnimationFrame(renderFollower);
      }
      requestAnimationFrame(renderFollower);

      // Interactive element hover scale
      const interactiveSelector = 'a, button, input, textarea, select, [role="button"], .choose-box, .value-arrow-btn, .industry-tab-btn, .mobile-toggle-btn, .blob-btn';

      document.addEventListener('mouseover', (e) => {
        if (e.target && e.target.closest && e.target.closest(interactiveSelector)) {
          follower.classList.add('hovering');
          dot.classList.add('hovering');
        }
      });

      document.addEventListener('mouseout', (e) => {
        if (e.target && e.target.closest && e.target.closest(interactiveSelector)) {
          follower.classList.remove('hovering');
          dot.classList.remove('hovering');
        }
      });
    })();

    // 7. Global Scroll Progress Indicator
    (function initScrollProgress() {
      if (typeof window === 'undefined') return;
      const progressBar = document.createElement('div');
      progressBar.className = 'scroll-progress-bar';
      progressBar.setAttribute('aria-hidden', 'true');

      const attachBar = () => {
        if (!document.body.contains(progressBar)) document.body.prepend(progressBar);
      };
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachBar);
      } else {
        attachBar();
      }

      function updateProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
      }
      window.addEventListener('scroll', updateProgress, { passive: true });
      updateProgress();
    })();

    // 8. Global Scroll Reveal Observer (IntersectionObserver)
    (function initScrollReveal() {
      if (typeof window === 'undefined') return;

      const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      };

      const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      });

      function observeElements() {
        const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
        targets.forEach(el => revealObserver.observe(el));
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', observeElements);
      } else {
        observeElements();
      }
    })();

    // 9. Subtle Scroll Parallax on Featured Images
    (function initScrollParallax() {
      if (typeof window === 'undefined') return;

      function updateParallax() {
        const parallaxImgs = document.querySelectorAll('.parallax-image, .intro-image-frame img, .rd-image-frame img');
        if (!parallaxImgs.length) return;

        const windowHeight = window.innerHeight;
        parallaxImgs.forEach(img => {
          const rect = img.parentElement ? img.parentElement.getBoundingClientRect() : img.getBoundingClientRect();
          if (rect.bottom > 0 && rect.top < windowHeight) {
            const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
            const movement = (progress - 0.5) * 32;
            img.style.transform = `translate3d(0, ${movement}px, 0)`;
          }
        });
      }

      window.addEventListener('scroll', updateParallax, { passive: true });
      window.addEventListener('resize', updateParallax, { passive: true });
    })();


