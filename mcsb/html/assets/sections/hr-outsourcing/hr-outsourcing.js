document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Toggle mobile menu
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
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

    // Wheel event handler
    slider.addEventListener('wheel', (e) => {
        const currentTime = Date.now();
        if (currentTime - lastScrollTime < 50) return;
        
        lastScrollTime = currentTime;
        
        // Get current slide
        const currentSlide = Math.round(slider.scrollTop / window.innerHeight);
        const currentSlideElement = slider.children[currentSlide];
        
        // Check if we're on slide 2 and in responsive mode
        if (window.innerWidth <= 768 && currentSlideElement.id === 'slide2') {
            const reasonsContainer = currentSlideElement.querySelector('.reasons-container');
            const isAtTop = reasonsContainer.scrollTop === 0;
            const isAtBottom = reasonsContainer.scrollTop + reasonsContainer.clientHeight >= reasonsContainer.scrollHeight;
            
            // Allow natural scroll within slide 2 unless at boundaries
            if ((e.deltaY > 0 && !isAtBottom) || (e.deltaY < 0 && !isAtTop)) {
                e.stopPropagation();
                return;
            }
        }
        
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
    let touchStartScrollTop = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        const currentSlide = Math.round(slider.scrollTop / window.innerHeight);
        const reasonsContainer = slider.children[currentSlide].querySelector('.reasons-container');
        if (reasonsContainer) {
            touchStartScrollTop = reasonsContainer.scrollTop;
        }
    });

    slider.addEventListener('touchmove', (e) => {
        if (isScrolling) return;
        
        const touchEndY = e.touches[0].clientY;
        const delta = touchStartY - touchEndY;
        const currentSlide = Math.round(slider.scrollTop / window.innerHeight);
        const currentSlideElement = slider.children[currentSlide];
        
        // Handle slide 2 touch scrolling in responsive mode
        if (window.innerWidth <= 768 && currentSlideElement.id === 'slide2') {
            const reasonsContainer = currentSlideElement.querySelector('.reasons-container');
            const isAtTop = reasonsContainer.scrollTop === 0;
            const isAtBottom = reasonsContainer.scrollTop + reasonsContainer.clientHeight >= reasonsContainer.scrollHeight;
            
            if ((!isAtBottom && delta > 0) || (!isAtTop && delta < 0)) {
                e.stopPropagation();
                return;
            }
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
});
