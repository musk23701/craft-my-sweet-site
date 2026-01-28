/* ============================================
   AUTOMIND LABS - STATIC THEME JAVASCRIPT
   For WordPress/Elementor Conversion
   ============================================ */

(function($) {
  'use strict';

  // ============ DOM READY ============
  $(document).ready(function() {
    initMobileNav();
    initTypingEffect();
    initScrollReveal();
    initFAQAccordion();
    initCarousels();
    initMarquee();
    initCounterAnimation();
    initSmoothScroll();
    initParallaxEffects();
  });

  // ============ MOBILE NAVIGATION ============
  function initMobileNav() {
    const $hamburger = $('.hamburger');
    const $mobileMenu = $('.mobile-menu');
    const $overlay = $('.mobile-overlay');
    const $closeBtn = $('.mobile-menu-close');
    const $menuItems = $('.mobile-menu-item');

    function openMenu() {
      $hamburger.addClass('active');
      $mobileMenu.addClass('open');
      $overlay.addClass('open');
      $('body').css('overflow', 'hidden');
    }

    function closeMenu() {
      $hamburger.removeClass('active');
      $mobileMenu.removeClass('open');
      $overlay.removeClass('open');
      $('body').css('overflow', '');
    }

    $hamburger.on('click', function() {
      if ($mobileMenu.hasClass('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    $closeBtn.on('click', closeMenu);
    $overlay.on('click', closeMenu);
    $menuItems.on('click', closeMenu);
  }

  // ============ TYPING EFFECT ============
  function initTypingEffect() {
    $('.typing-text').each(function() {
      const $element = $(this);
      const text = $element.data('text') || $element.text();
      const speed = $element.data('speed') || 25;
      const delay = $element.data('delay') || 600;

      $element.text('');
      $element.addClass('typing-cursor');

      setTimeout(function() {
        let index = 0;
        const interval = setInterval(function() {
          if (index < text.length) {
            $element.text(text.slice(0, index + 1));
            index++;
          } else {
            clearInterval(interval);
            $element.removeClass('typing-cursor');
          }
        }, speed);
      }, delay);
    });
  }

  // ============ SCROLL REVEAL ANIMATIONS ============
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    function checkReveal() {
      const windowHeight = window.innerHeight;
      const revealPoint = 100;

      revealElements.forEach(function(element) {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - revealPoint) {
          element.classList.add('active');
        }
      });
    }

    // Initial check
    checkReveal();

    // Check on scroll
    $(window).on('scroll', throttle(checkReveal, 100));
  }

  // ============ FAQ ACCORDION ============
  function initFAQAccordion() {
    $('.faq-trigger').on('click', function() {
      const $item = $(this).closest('.faq-item');
      const $content = $item.find('.faq-content');
      const isOpen = $item.hasClass('open');

      // Close all other items
      $('.faq-item').not($item).removeClass('open');
      $('.faq-content').not($content).css('max-height', 0);

      // Toggle current item
      if (isOpen) {
        $item.removeClass('open');
        $content.css('max-height', 0);
      } else {
        $item.addClass('open');
        $content.css('max-height', $content[0].scrollHeight + 'px');
      }
    });
  }

  // ============ CAROUSELS ============
  function initCarousels() {
    // Blogs/Podcasts Carousel
    initSimpleCarousel('.blogs-carousel', {
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: true
    });

    // Featured Wins Carousel
    initSimpleCarousel('.wins-carousel', {
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: true
    });
  }

  function initSimpleCarousel(selector, options) {
    const $carousel = $(selector);
    if (!$carousel.length) return;

    const $track = $carousel.find('.carousel-track');
    const $slides = $carousel.find('.carousel-slide');
    const $dots = $carousel.find('.carousel-dot');
    const $prevBtn = $carousel.find('.carousel-nav.prev');
    const $nextBtn = $carousel.find('.carousel-nav.next');

    let currentIndex = 0;
    let isAutoPlaying = options.autoplay;
    let autoplayInterval;

    function goToSlide(index) {
      currentIndex = index;
      if (currentIndex >= $slides.length) currentIndex = 0;
      if (currentIndex < 0) currentIndex = $slides.length - 1;

      $track.css('transform', 'translateX(-' + (currentIndex * 100) + '%)');

      // Update dots
      $dots.removeClass('active');
      $dots.eq(currentIndex).addClass('active');
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function startAutoplay() {
      if (options.autoplay) {
        autoplayInterval = setInterval(nextSlide, options.autoplaySpeed);
      }
    }

    function stopAutoplay() {
      clearInterval(autoplayInterval);
    }

    function handleManualNav() {
      stopAutoplay();
      if (options.pauseOnHover) {
        setTimeout(startAutoplay, 5000);
      }
    }

    // Event listeners
    $nextBtn.on('click', function() {
      nextSlide();
      handleManualNav();
    });

    $prevBtn.on('click', function() {
      prevSlide();
      handleManualNav();
    });

    $dots.on('click', function() {
      const index = $(this).index();
      goToSlide(index);
      handleManualNav();
    });

    // Pause on hover
    if (options.pauseOnHover) {
      $carousel.on('mouseenter', stopAutoplay);
      $carousel.on('mouseleave', startAutoplay);
    }

    // Start autoplay
    startAutoplay();
  }

  // ============ MARQUEE ============
  function initMarquee() {
    // Marquee is handled by CSS animation, but we can add pause on hover
    $('.marquee-track').on('mouseenter', function() {
      $(this).css('animation-play-state', 'paused');
    }).on('mouseleave', function() {
      $(this).css('animation-play-state', 'running');
    });

    // Instagram 3D Carousel pause on hover
    $('.instagram-carousel').on('mouseenter', function() {
      $(this).css('animation-play-state', 'paused');
    }).on('mouseleave', function() {
      $(this).css('animation-play-state', 'running');
    });

    // YouTube marquee pause on hover
    $('.youtube-marquee').on('mouseenter', function() {
      $(this).css('animation-play-state', 'paused');
    }).on('mouseleave', function() {
      $(this).css('animation-play-state', 'running');
    });
  }

  // ============ COUNTER ANIMATION ============
  function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');

    function animateCounter(element) {
      const target = parseInt(element.dataset.target) || 0;
      const duration = parseInt(element.dataset.duration) || 2000;
      const suffix = element.dataset.suffix || '';
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out quart
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(easeProgress * target);

        element.textContent = currentValue.toLocaleString() + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          element.textContent = target.toLocaleString() + suffix;
        }
      }

      requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function(counter) {
      observer.observe(counter);
    });
  }

  // ============ SMOOTH SCROLL ============
  function initSmoothScroll() {
    $('a[href^="#"]').on('click', function(e) {
      const target = $(this.getAttribute('href'));

      if (target.length) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - 80
        }, 800, 'easeInOutQuart');
      }
    });
  }

  // ============ PARALLAX EFFECTS ============
  function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');

    function updateParallax() {
      const scrolled = window.pageYOffset;

      parallaxElements.forEach(function(element) {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = 'translateY(' + yPos + 'px)';
      });
    }

    $(window).on('scroll', throttle(updateParallax, 16));
  }

  // ============ UTILITY FUNCTIONS ============
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(function() {
          inThrottle = false;
        }, limit);
      }
    };
  }

  // jQuery easing
  $.easing.easeInOutQuart = function(x) {
    return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
  };

  // ============ FORM HANDLING ============
  window.handleContactForm = function(formElement) {
    const formData = new FormData(formElement);
    const data = {};

    formData.forEach(function(value, key) {
      data[key] = value;
    });

    // Add timestamp
    data.timestamp = new Date().toISOString();
    data.source = 'automind-contact-form';

    // Submit to webhook (replace with your webhook URL)
    fetch('https://hook.eu1.make.com/m7e77kai1bcj7p6i4ck25fii4mfh4t2i', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      mode: 'no-cors',
      body: new URLSearchParams(data).toString(),
    }).then(function() {
      alert('Message sent successfully! We\'ll get back to you within 24 hours.');
      formElement.reset();
    }).catch(function(error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    });

    return false;
  };

  // ============ LAZY LOADING VIDEOS ============
  function initLazyVideos() {
    const videos = document.querySelectorAll('video[data-src]');

    const videoObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const video = entry.target;
          video.src = video.dataset.src;
          video.load();
          video.play().catch(function() {});
          videoObserver.unobserve(video);
        }
      });
    }, { rootMargin: '200px', threshold: 0.1 });

    videos.forEach(function(video) {
      videoObserver.observe(video);
    });
  }

  // Initialize lazy videos
  $(document).ready(initLazyVideos);

  // ============ INTERSECTION OBSERVER ANIMATIONS ============
  function initIntersectionAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');

    const animationObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const element = entry.target;
          const animation = element.dataset.animate;
          const delay = element.dataset.delay || 0;

          setTimeout(function() {
            element.classList.add('animated', animation);
          }, delay);

          animationObserver.unobserve(element);
        }
      });
    }, { threshold: 0.2 });

    animatedElements.forEach(function(element) {
      animationObserver.observe(element);
    });
  }

  $(document).ready(initIntersectionAnimations);

  // ============ HEADER SCROLL EFFECT ============
  $(window).on('scroll', function() {
    const scrollTop = $(window).scrollTop();

    if (scrollTop > 50) {
      $('.mobile-header').addClass('scrolled');
    } else {
      $('.mobile-header').removeClass('scrolled');
    }
  });

  // ============ ACTIVE NAV LINK ============
  function setActiveNavLink() {
    const currentPath = window.location.pathname;

    $('.sidebar-link, .mobile-menu-item').each(function() {
      const href = $(this).attr('href');
      if (href === currentPath || (currentPath === '/' && href === 'index.html')) {
        $(this).addClass('active');
        $(this).find('.mobile-menu-icon').addClass('active');
      } else {
        $(this).removeClass('active');
        $(this).find('.mobile-menu-icon').removeClass('active');
      }
    });
  }

  $(document).ready(setActiveNavLink);

})(jQuery);
