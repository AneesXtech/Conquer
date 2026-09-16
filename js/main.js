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

