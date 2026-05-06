document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const closeSidebar = document.querySelector('.close-sidebar');

    if (menuToggle && mainNav) {
        // Create overlay element if it doesn't exist
        let overlay = document.querySelector('.menu-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'menu-overlay';
            document.body.appendChild(overlay);
        }

        const openMenu = () => {
            mainNav.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeMenu = () => {
            mainNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        menuToggle.addEventListener('click', openMenu);
        if (closeSidebar) closeSidebar.addEventListener('click', closeMenu);
        overlay.addEventListener('click', closeMenu);

        // Close menu when clicking a link
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', closeMenu);
        });

        // Sidebar Accordion Logic
        const accordionHeaders = document.querySelectorAll('.sidebar-info-section h3, .sidebar-card .card-top');
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const parent = header.parentElement;
                parent.classList.toggle('active');
                
                // Optional: Close other accordions when one opens
                accordionHeaders.forEach(otherHeader => {
                    if (otherHeader !== header) {
                        otherHeader.parentElement.classList.remove('active');
                    }
                });
            });
        });
    }

    // Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Optional: stop observing once animated
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
});
