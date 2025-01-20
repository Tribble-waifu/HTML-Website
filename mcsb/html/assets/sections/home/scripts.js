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
            
            // Close all other dropdowns first
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                    otherDropdown.classList.remove('active');
                }
            });
            
            // Toggle the clicked dropdown
            dropdown.classList.toggle('active');
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
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
});
