document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            navLinks.classList.remove('active');
        }
    });

    // Smooth scroll for navigation links with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            let headerOffset;
            
            // Adjust offset based on which slide and screen size
            if (target.id === 'slide2') {
                headerOffset = window.innerWidth <= 480 ? 160 : 120; // Larger offset for slide2
            } else {
                headerOffset = 80; // Default offset for other slides
            }
            
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking a link
            navLinks.classList.remove('active');
        });
    });

    // Add Intersection Observer for slide1 animations
    const slide1 = document.getElementById('slide1');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove reset-animation class to play animations
                slide1.classList.remove('reset-animation');
            } else {
                // Add reset-animation class to reset animations
                slide1.classList.add('reset-animation');
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the slide is visible
    });

    observer.observe(slide1);

    // Add this to your existing script
    document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = trigger.parentElement;
                dropdown.classList.toggle('active');
            }
        });
    });
});
