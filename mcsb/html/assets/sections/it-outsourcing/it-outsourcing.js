document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.swiper', {
        // Enable smooth transitions
        speed: 800,
        
        // Enable mousewheel control
        mousewheel: {
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
            type: 'bullets',
        },
        
        // Smooth transition effect
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        
        // Prevent white flash
        on: {
            beforeInit: function () {
                document.querySelector('.swiper').style.background = '#f5f5dc';
            },
            slideChange: function() {
                const prevSlide = this.slides[this.previousIndex];
                const currentSlide = this.slides[this.activeIndex];
                const isForward = this.activeIndex > this.previousIndex;
                
                // Handle all slides (1-7)
                if (prevSlide && prevSlide.querySelector('.service-info')) {
                    const prevText = prevSlide.querySelector('.service-info');
                    const prevImage = prevSlide.querySelector('.image-section');
                    
                    // Exit animations
                    prevText.classList.add('slide-exit-left');
                    prevImage.classList.add('slide-exit-right');
                }
                
                // Handle entrance animations for all slides except first
                if (currentSlide && currentSlide.querySelector('.service-info')) {
                    const currentText = currentSlide.querySelector('.service-info');
                    const currentImage = currentSlide.querySelector('.image-section');
                    
                    if (isForward) {
                        currentText.classList.add('slide-from-right');
                        currentImage.classList.add('slide-from-left');
                    } else {
                        currentText.classList.add('slide-from-left');
                        currentImage.classList.add('slide-from-right');
                    }
                }
            },
            slideChangeTransitionEnd: function() {
                // Reset animations after they complete
                document.querySelectorAll('.service-info, .image-section').forEach(el => {
                    el.classList.remove(
                        'slide-from-left', 
                        'slide-from-right', 
                        'slide-exit-left', 
                        'slide-exit-right'
                    );
                });
            }
        }
    });

    // Initialize nested swiper for services
    const servicesSwiper = new Swiper('.services-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: '.services-swiper-button-next',
            prevEl: '.services-swiper-button-prev',
        },
        pagination: {
            el: '.services-swiper-pagination',
            clickable: true,
        },
    });

    const benefitItems = document.querySelectorAll('.benefit-item');
    const floatingContainer = document.querySelector('.floating-info-container');
    const floatingText = floatingContainer.querySelector('p');

    benefitItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const info = this.getAttribute('data-info');
            floatingText.textContent = info;
            floatingContainer.classList.add('visible');
        });

        item.addEventListener('mouseleave', function() {
            floatingContainer.classList.remove('visible');
        });
    });
});