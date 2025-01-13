document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: false,
        speed: 800,
        slidesPerView: 1,
        spaceBetween: 0,
        
        // Enable mousewheel control
        mousewheel: {
            invert: false,
            sensitivity: 1,
            thresholdDelta: 50
        },
        
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // Add slide change event
        on: {
            slideChange: function () {
                // Remove animation classes
                document.querySelectorAll('.text-section').forEach(el => {
                    el.style.animation = 'none';
                    el.offsetHeight; // Trigger reflow
                    el.style.animation = null;
                });

                // Add animation to current slide
                setTimeout(() => {
                    const activeSlide = document.querySelector('.swiper-slide-active .text-section');
                    if (activeSlide) {
                        activeSlide.style.animation = 'fadeInUp 1s ease forwards';
                    }
                }, 50);
            },
            init: function() {
                // Trigger animation for initial slide
                const firstSlide = document.querySelector('.swiper-slide-active .slide-content');
                if (firstSlide) {
                    firstSlide.style.animation = 'fadeInUp 1s ease forwards';
                }
            }
        }
    });
});

// Add mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
        }
    });
});
