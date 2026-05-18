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

        // Mobile menu links will navigate naturally to new pages
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

    // Lightbox for Gallery/Images
    const createLightbox = () => {
        let lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        
        let lightboxImg = document.createElement('img');
        lightboxImg.className = 'lightbox-img';
        
        let closeBtn = document.createElement('div');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        
        lightbox.appendChild(lightboxImg);
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);

        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.classList.remove('active');
            }
        });

        const images = document.querySelectorAll('.service-img img, .ad-item img');
        images.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                let src = img.getAttribute('src');
                if (src) {
                    lightboxImg.src = src;
                    lightbox.classList.add('active');
                }
            });
        });
    };
    
    createLightbox();

    // Split Screen Scroll Effect (Ups n Down)
    const sidebarScroll = () => {
        const sidebar = document.querySelector('.home-right');
        const container = document.querySelector('.sidebar-scroll-container');
        
        if (!sidebar || !container || window.innerWidth <= 992) return;

        const updateSidebarScroll = () => {
            if (window.innerWidth <= 992) {
                container.style.transform = 'translateY(0)';
                return;
            }

            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
            
            const containerHeight = container.offsetHeight;
            const sidebarHeight = sidebar.offsetHeight;
            const travel = containerHeight - sidebarHeight;

            if (travel > 0) {
                container.style.transform = `translateY(-${scrollPercent * travel}px)`;
            }
        };

        window.addEventListener('scroll', updateSidebarScroll);
        window.addEventListener('resize', updateSidebarScroll);
        updateSidebarScroll();
    };
    
    sidebarScroll();
});
