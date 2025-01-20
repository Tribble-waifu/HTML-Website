document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let isScrolling = false;
    let isMobileMenuOpen = false;

    // Toggle mobile menu
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        isMobileMenuOpen = !isMobileMenuOpen;
    });

    // Handle dropdown menus
    dropdowns.forEach(dropdown => {
        const dropdownTrigger = dropdown.querySelector('.dropdown-trigger');
        
        dropdownTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('active');
            
            // Close other dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {  // Only for mobile
            if (!e.target.closest('.nav-links') && !e.target.closest('.menu-toggle')) {
                navLinks.classList.remove('active');
                isMobileMenuOpen = false;
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });

    function scrollToSlide(index) {
        if (index >= 0 && index < slides.length && !isMobileMenuOpen) {
            slides[index].scrollIntoView({ behavior: 'smooth' });
            currentSlide = index;
        }
    }

    // Slide control with mousewheel
    slider.addEventListener('wheel', (e) => {
        if (isMobileMenuOpen) {
            return;
        }
        
        e.preventDefault();
        if (!isScrolling) {
            isScrolling = true;
            
            if (e.deltaY > 0) {
                scrollToSlide(currentSlide + 1);
            } else {
                scrollToSlide(currentSlide - 1);
            }

            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }
    }, { passive: false });

    // Touch support for mobile
    let touchStartY = 0;
    
    slider.addEventListener('touchstart', (e) => {
        if (!isMobileMenuOpen) {
            touchStartY = e.touches[0].clientY;
        }
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
        if (isMobileMenuOpen) {
            return;
        }

        if (!isScrolling) {
            const touchEndY = e.touches[0].clientY;
            const diff = touchStartY - touchEndY;

            if (Math.abs(diff) > 50) {
                isScrolling = true;
                
                if (diff > 0) {
                    scrollToSlide(currentSlide + 1);
                } else {
                    scrollToSlide(currentSlide - 1);
                }

                setTimeout(() => {
                    isScrolling = false;
                }, 1000);
            }
        }
        e.preventDefault();
    }, { passive: false });
});
