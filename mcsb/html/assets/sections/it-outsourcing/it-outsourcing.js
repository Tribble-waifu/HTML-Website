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

    // Observe all slides
    document.querySelectorAll('.slide').forEach(slide => {
        observer.observe(slide);
    });

    // Enable smooth scrolling
    const slider = document.querySelector('.slider');
    let isScrolling = false;
    let lastScrollTime = Date.now();
    let lastContentScrollTop = 0;

    // Wheel event handler
    slider.addEventListener('wheel', (e) => {
        const currentTime = Date.now();
        if (currentTime - lastScrollTime < 50) return;
        
        lastScrollTime = currentTime;
        
        // Get current slide
        const currentSlide = Math.round(slider.scrollTop / window.innerHeight);
        const currentSlideElement = slider.children[currentSlide];
        
        // Check if we're on content slides and in responsive mode
        if (window.innerWidth <= 768 && 
            (currentSlideElement.id === 'slide2' || 
             currentSlideElement.id === 'slide3' || 
             currentSlideElement.id === 'slide4')) {
            const contentContainer = currentSlideElement.querySelector(
                '.services-container, .support-grid, .strategies-grid'
            );
            
            if (contentContainer) {
                const isAtTop = contentContainer.scrollTop <= 1;
                const isAtBottom = Math.abs(
                    contentContainer.scrollHeight - contentContainer.scrollTop - contentContainer.clientHeight
                ) <= 1;

                // Store last scroll position
                lastContentScrollTop = contentContainer.scrollTop;
                
                // Allow slide change only at boundaries
                if ((e.deltaY > 0 && isAtBottom) || (e.deltaY < 0 && isAtTop)) {
                    const nextSlide = currentSlide + Math.sign(e.deltaY);
                    if (nextSlide >= 0 && nextSlide < slider.children.length) {
                        slider.scrollTo({
                            top: nextSlide * window.innerHeight,
                            behavior: 'smooth'
                        });
                    }
                } else {
                    // Scroll within container
                    contentContainer.scrollTop += e.deltaY;
                    e.preventDefault();
                }
                return;
            }
        }
        
        // Handle regular slide change
        const delta = Math.sign(e.deltaY);
        const nextSlide = currentSlide + delta;
        
        if (nextSlide >= 0 && nextSlide < slider.children.length) {
            slider.scrollTo({
                top: nextSlide * window.innerHeight,
                behavior: 'smooth'
            });
        }
    });

    // Touch events for mobile
    let touchStartY = 0;
    let touchStartTime = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
        isScrolling = false;
    });

    slider.addEventListener('touchmove', (e) => {
        if (isScrolling) return;
        
        const currentY = e.touches[0].clientY;
        const deltaY = touchStartY - currentY;
        const currentSlide = Math.round(slider.scrollTop / window.innerHeight);
        const currentSlideElement = slider.children[currentSlide];
        
        if (window.innerWidth <= 768 && 
            (currentSlideElement.id === 'slide2' || 
             currentSlideElement.id === 'slide3' || 
             currentSlideElement.id === 'slide4')) {
            const contentContainer = currentSlideElement.querySelector(
                '.services-container, .support-grid, .strategies-grid'
            );
            
            if (contentContainer) {
                const isAtTop = contentContainer.scrollTop <= 1;
                const isAtBottom = Math.abs(
                    contentContainer.scrollHeight - contentContainer.scrollTop - contentContainer.clientHeight
                ) <= 1;

                // Handle boundaries for touch scroll
                if ((deltaY > 50 && isAtBottom) || (deltaY < -50 && isAtTop)) {
                    const nextSlide = currentSlide + (deltaY > 0 ? 1 : -1);
                    if (nextSlide >= 0 && nextSlide < slider.children.length) {
                        isScrolling = true;
                        slider.scrollTo({
                            top: nextSlide * window.innerHeight,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        }
    });

    slider.addEventListener('touchend', () => {
        isScrolling = false;
    });

    // Menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Handle dropdowns
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
            menuToggle.classList.remove('active');
        }
    });
});
