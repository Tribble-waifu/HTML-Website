document.addEventListener('DOMContentLoaded', function() {
    // Initial animation for slide 1
    const slide1 = document.getElementById('slide1');
    slide1.classList.add('animate');

    // Create Intersection Observer for slide animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.3
    });

    // Observe slides for animations
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => observer.observe(slide));

    // Enable smooth scrolling
    const slider = document.querySelector('.slider');
    let isScrolling = false;
    let lastScrollTime = Date.now();
    let touchStartY = 0;

    // Wheel event handler
    slider.addEventListener('wheel', (e) => {
        const currentTime = Date.now();
        if (currentTime - lastScrollTime < 50) return;
        
        lastScrollTime = currentTime;
        
        // Get current slide
        const currentSlide = Math.round(slider.scrollTop / window.innerHeight);
        const delta = Math.sign(e.deltaY);
        const nextSlide = currentSlide + delta;
        
        // Check if we're on slide 4 or 5 and in responsive mode
        const currentSlideElement = slider.children[currentSlide];
        const isResponsiveMode = window.innerWidth <= 768;
        const isSlide4or5 = currentSlideElement.id === 'slide4' || currentSlideElement.id === 'slide5';
        
        if (isResponsiveMode && isSlide4or5) {
            // Check if we've reached the top or bottom of the current slide
            const isAtTop = currentSlideElement.scrollTop === 0;
            const isAtBottom = currentSlideElement.scrollTop + currentSlideElement.clientHeight >= currentSlideElement.scrollHeight;
            
            if ((delta < 0 && isAtTop) || (delta > 0 && isAtBottom)) {
                // Proceed to next/previous slide
                if (nextSlide >= 0 && nextSlide < slider.children.length) {
                    slider.scrollTo({
                        top: nextSlide * window.innerHeight,
                        behavior: 'smooth'
                    });
                }
            }
            // Otherwise let the natural scroll happen
            return;
        }
        
        // Normal slide navigation for other cases
        if (nextSlide >= 0 && nextSlide < slider.children.length) {
            slider.scrollTo({
                top: nextSlide * window.innerHeight,
                behavior: 'smooth'
            });
        }
    });

    // Touch events for mobile
    slider.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });

    slider.addEventListener('touchmove', (e) => {
        if (isScrolling) return;
        
        const touchEndY = e.touches[0].clientY;
        const delta = touchStartY - touchEndY;
        
        const currentSlide = Math.round(slider.scrollTop / window.innerHeight);
        const currentSlideElement = slider.children[currentSlide];
        const isResponsiveMode = window.innerWidth <= 768;
        const isSlide4or5 = currentSlideElement.id === 'slide4' || currentSlideElement.id === 'slide5';
        
        if (isResponsiveMode && isSlide4or5) {
            // Allow natural scroll in responsive mode for slides 4 and 5
            return;
        }
        
        if (Math.abs(delta) > 50) {
            isScrolling = true;
            const nextSlide = currentSlide + (delta > 0 ? 1 : -1);
            
            if (nextSlide >= 0 && nextSlide < slider.children.length) {
                slider.scrollTo({
                    top: nextSlide * window.innerHeight,
                    behavior: 'smooth'
                });
            }
            
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }
    });

    // Menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Handle dropdowns in mobile view
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = trigger.parentElement;
                
                // Close other dropdowns
                dropdownTriggers.forEach(otherTrigger => {
                    const otherDropdown = otherTrigger.parentElement;
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                dropdown.classList.toggle('active');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            const dropdowns = document.querySelectorAll('.dropdown');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });
});
