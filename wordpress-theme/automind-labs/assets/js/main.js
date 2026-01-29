/**
 * Automind Labs - Main JavaScript
 * jQuery-based interactions and animations
 *
 * @package Automind_Labs
 */

(function($) {
    'use strict';

    // ============================================
    // DOCUMENT READY
    // ============================================
    $(document).ready(function() {
        initMobileNav();
        initTypingAnimation();
        initScrollReveal();
        initFAQAccordion();
        initCounterAnimation();
        initSmoothScroll();
        initContactForm();
    });

    // ============================================
    // MOBILE NAVIGATION
    // ============================================
    function initMobileNav() {
        var $toggle = $('#mobile-menu-toggle');
        var $nav = $('#mobile-nav');
        var $body = $('body');

        $toggle.on('click', function() {
            $toggle.toggleClass('active');
            $nav.toggleClass('active');
            $body.toggleClass('nav-open');
        });

        // Close nav when clicking a link
        $nav.find('a').on('click', function() {
            $toggle.removeClass('active');
            $nav.removeClass('active');
            $body.removeClass('nav-open');
        });

        // Close nav on escape key
        $(document).on('keydown', function(e) {
            if (e.key === 'Escape' && $nav.hasClass('active')) {
                $toggle.removeClass('active');
                $nav.removeClass('active');
                $body.removeClass('nav-open');
            }
        });
    }

    // ============================================
    // TYPING ANIMATION
    // ============================================
    function initTypingAnimation() {
        var $typingText = $('#typing-text');
        if (!$typingText.length) return;

        var phrases = [
            'AI Automations',
            'Smart Workflows',
            'Intelligent Chatbots',
            'Custom Integrations',
            'Data Pipelines'
        ];
        
        var currentIndex = 0;
        var currentChar = 0;
        var isDeleting = false;
        var typingSpeed = 100;
        var deletingSpeed = 50;
        var pauseTime = 2000;

        function type() {
            var currentPhrase = phrases[currentIndex];
            
            if (isDeleting) {
                currentChar--;
                $typingText.text(currentPhrase.substring(0, currentChar));
                
                if (currentChar === 0) {
                    isDeleting = false;
                    currentIndex = (currentIndex + 1) % phrases.length;
                    setTimeout(type, 500);
                } else {
                    setTimeout(type, deletingSpeed);
                }
            } else {
                currentChar++;
                $typingText.text(currentPhrase.substring(0, currentChar));
                
                if (currentChar === currentPhrase.length) {
                    isDeleting = true;
                    setTimeout(type, pauseTime);
                } else {
                    setTimeout(type, typingSpeed);
                }
            }
        }

        // Add cursor class and start typing
        $typingText.addClass('typing-cursor');
        setTimeout(type, 1000);
    }

    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================
    function initScrollReveal() {
        var $reveals = $('.reveal, .reveal-left, .reveal-right, .reveal-scale');
        
        if (!$reveals.length) return;

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    $(entry.target).addClass('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        $reveals.each(function() {
            observer.observe(this);
        });
    }

    // ============================================
    // FAQ ACCORDION
    // ============================================
    function initFAQAccordion() {
        var $faqItems = $('.faq-item');
        
        if (!$faqItems.length) return;

        $faqItems.find('.faq-question').on('click', function() {
            var $item = $(this).closest('.faq-item');
            var isActive = $item.hasClass('active');
            
            // Close all other items
            $faqItems.removeClass('active');
            
            // Toggle current item
            if (!isActive) {
                $item.addClass('active');
            }
        });
    }

    // ============================================
    // COUNTER ANIMATION
    // ============================================
    function initCounterAnimation() {
        var $counters = $('.stat-value[data-count]');
        
        if (!$counters.length) return;

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var $counter = $(entry.target);
                    var target = parseInt($counter.data('count'), 10);
                    animateCounter($counter, target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        $counters.each(function() {
            observer.observe(this);
        });
    }

    function animateCounter($element, target) {
        var duration = 2000;
        var start = 0;
        var startTime = null;

        function easeOutQuart(t) {
            return 1 - Math.pow(1 - t, 4);
        }

        function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            var elapsed = currentTime - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var easedProgress = easeOutQuart(progress);
            var current = Math.floor(easedProgress * target);
            
            $element.text(current.toLocaleString() + '+');
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                $element.text(target.toLocaleString() + '+');
            }
        }

        requestAnimationFrame(animate);
    }

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    function initSmoothScroll() {
        $('a[href^="#"]').on('click', function(e) {
            var target = $(this.getAttribute('href'));
            
            if (target.length) {
                e.preventDefault();
                
                var offset = 100; // Account for fixed header
                
                $('html, body').animate({
                    scrollTop: target.offset().top - offset
                }, 800, 'swing');
            }
        });
    }

    // ============================================
    // CONTACT FORM (AJAX)
    // ============================================
    function initContactForm() {
        var $form = $('#contact-form');
        
        if (!$form.length) return;

        $form.on('submit', function(e) {
            e.preventDefault();
            
            var $submitBtn = $form.find('button[type="submit"]');
            var originalText = $submitBtn.text();
            var $message = $form.find('.form-message');
            
            // Disable button and show loading
            $submitBtn.prop('disabled', true).text('Sending...');
            $message.removeClass('success error').hide();
            
            $.ajax({
                url: automindLabs.ajaxUrl,
                type: 'POST',
                data: {
                    action: 'automind_contact_form',
                    nonce: automindLabs.nonce,
                    name: $form.find('[name="name"]').val(),
                    email: $form.find('[name="email"]').val(),
                    message: $form.find('[name="message"]').val()
                },
                success: function(response) {
                    if (response.success) {
                        $message.addClass('success').text(response.data.message).fadeIn();
                        $form[0].reset();
                    } else {
                        $message.addClass('error').text(response.data.message).fadeIn();
                    }
                },
                error: function() {
                    $message.addClass('error').text('An error occurred. Please try again.').fadeIn();
                },
                complete: function() {
                    $submitBtn.prop('disabled', false).text(originalText);
                }
            });
        });
    }

    // ============================================
    // VIDEO CAROUSEL ANIMATIONS
    // ============================================
    function initVideoCarousels() {
        // Instagram 3D Carousel
        var $instagramCarousel = $('.instagram-carousel');
        if ($instagramCarousel.length) {
            // Pause on hover
            $instagramCarousel.on('mouseenter', function() {
                $(this).css('animation-play-state', 'paused');
            }).on('mouseleave', function() {
                $(this).css('animation-play-state', 'running');
            });
        }

        // YouTube Marquee
        var $youtubeCarousel = $('.youtube-carousel');
        if ($youtubeCarousel.length) {
            $youtubeCarousel.on('mouseenter', function() {
                $(this).css('animation-play-state', 'paused');
            }).on('mouseleave', function() {
                $(this).css('animation-play-state', 'running');
            });
        }
    }

    // ============================================
    // LAZY LOADING VIDEOS
    // ============================================
    function initLazyVideos() {
        var $videos = $('video[data-src]');
        
        if (!$videos.length) return;

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var $video = $(entry.target);
                    $video.attr('src', $video.data('src'));
                    $video.removeAttr('data-src');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '100px'
        });

        $videos.each(function() {
            observer.observe(this);
        });
    }

    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    $(window).on('scroll', function() {
        var $header = $('.header');
        
        if ($(window).scrollTop() > 50) {
            $header.addClass('scrolled');
        } else {
            $header.removeClass('scrolled');
        }
    });

    // ============================================
    // REVIEWS MARQUEE PAUSE ON HOVER
    // ============================================
    $(document).on('mouseenter', '.reviews-track', function() {
        $(this).css('animation-play-state', 'paused');
    }).on('mouseleave', '.reviews-track', function() {
        $(this).css('animation-play-state', 'running');
    });

    // ============================================
    // PRELOADER (optional)
    // ============================================
    $(window).on('load', function() {
        var $preloader = $('.preloader');
        if ($preloader.length) {
            $preloader.fadeOut(500, function() {
                $(this).remove();
            });
        }

        // Initialize video carousels after load
        initVideoCarousels();
        initLazyVideos();
    });

})(jQuery);
