// GreenScape - Premium Landscaping Animations
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    
    // =====================
    // LENIS SMOOTH SCROLL
    // =====================
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
    });

    gsap.registerPlugin(ScrollTrigger);

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // =====================
    // HEADER SCROLL EFFECT
    // =====================
    const header = document.getElementById('main-header');
    const navLinks = document.querySelectorAll('.nav-link');
    const logo = header.querySelector('a');

    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        onUpdate: (self) => {
            if (self.direction === 1 && self.scroll() > 80) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.08)';
                header.style.padding = '16px 48px';
                
                navLinks.forEach(link => {
                    link.style.color = '#1a1a1a';
                });
                logo.style.color = '#0B3D2E';
            } else if (self.scroll() < 50) {
                header.style.background = 'transparent';
                header.style.boxShadow = 'none';
                header.style.padding = '24px 48px';
                
                navLinks.forEach(link => {
                    link.style.color = '#1a1a1a';
                });
                logo.style.color = '#0B3D2E';
            }
        }
    });

    // =====================
    // MOBILE MENU
    // =====================
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuSpans = menuBtn.querySelectorAll('span');
    let isMenuOpen = false;

    // Show/hide menu button based on screen size
    function updateMenuBtn() {
        if (window.innerWidth < 992) {
            menuBtn.style.display = 'block';
            document.querySelector('.desktop-nav').style.display = 'none';
        } else {
            menuBtn.style.display = 'none';
            document.querySelector('.desktop-nav').style.display = 'flex';
            mobileMenu.style.transform = 'translateX(100%)';
            isMenuOpen = false;
            resetMenuIcon();
        }
    }
    
    function resetMenuIcon() {
        gsap.to(menuSpans, {
            y: 0,
            rotation: 0,
            opacity: 1,
            duration: 0.3
        });
    }

    window.addEventListener('resize', updateMenuBtn);
    updateMenuBtn();

    menuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            gsap.to(mobileMenu, {
                x: '0%',
                duration: 0.5,
                ease: 'power3.out'
            });
            gsap.to(menuSpans[0], { y: 8, rotation: 45, duration: 0.3 });
            gsap.to(menuSpans[1], { opacity: 0, duration: 0.3 });
            gsap.to(menuSpans[2], { y: -8, rotation: -45, duration: 0.3 });
        } else {
            gsap.to(mobileMenu, {
                x: '100%',
                duration: 0.5,
                ease: 'power3.out'
            });
            resetMenuIcon();
        }
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            gsap.to(mobileMenu, {
                x: '100%',
                duration: 0.5,
                ease: 'power3.out'
            });
            resetMenuIcon();
        });
    });

    // =====================
    // HERO ANIMATION
    // =====================
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl
        .to('.hero-label', { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
        .to('.hero-title', { opacity: 1, y: 0, duration: 1 }, '-=0.5')
        .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
        .to('.hero-btn', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');

    gsap.to('.hero-bg', {
        scale: 1,
        scrollTrigger: {
            trigger: '#home',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // =====================
    // FEATURED PROJECT
    // =====================
    gsap.to('.featured-bg', {
        scale: 1,
        scrollTrigger: {
            trigger: '#featured',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    gsap.from('#featured > div > div > div:first-child > *', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        scrollTrigger: {
            trigger: '#featured',
            start: 'top 60%'
        }
    });

    gsap.from('#featured .project-item, #featured > div > div > div:last-child', {
        x: 60,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '#featured',
            start: 'top 50%'
        }
    });

    // =====================
    // ABOUT SECTION
    // =====================
    gsap.from('#about > div > div:first-child', {
        x: -80,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '#about',
            start: 'top 70%'
        }
    });

    gsap.from('#about > div > div:last-child > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '#about',
            start: 'top 60%'
        }
    });

    // =====================
    // SERVICES SECTION
    // =====================
    gsap.from('#services .text-center > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
            trigger: '#services',
            start: 'top 70%'
        }
    });

    gsap.from('.service-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        scrollTrigger: {
            trigger: '#services .grid',
            start: 'top 70%'
        }
    });

    // =====================
    // PROCESS SECTION
    // =====================
    gsap.from('#process .text-center > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '#process',
            start: 'top 70%'
        }
    });

    gsap.from('.process-step', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
            trigger: '#process .grid',
            start: 'top 70%'
        }
    });

    // =====================
    // PROJECTS GRID
    // =====================
    gsap.from('#projects .text-center > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '#projects',
            start: 'top 70%'
        }
    });

    gsap.from('.project-item', {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '#projects .grid',
            start: 'top 60%'
        }
    });

    // =====================
    // STATS COUNTER
    // =====================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statTrigger = document.querySelector('#stats') ? '#stats' : '#about';
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        
        gsap.fromTo(stat,
            { textContent: 0 },
            {
                textContent: target,
                duration: 2.5,
                ease: 'power3.out',
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: statTrigger,
                    start: 'top 70%'
                },
                onUpdate: function() {
                    const count = Math.round(this.targets()[0].textContent);
                    const suffix = stat.getAttribute('data-suffix') || '';
                    stat.textContent = count + suffix;
                }
            }
        );
    });
    
    // About Section Stats
    const aboutStats = document.querySelectorAll('.about-stat');
    
    aboutStats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        
        gsap.fromTo(stat,
            { textContent: 0 },
            {
                textContent: target,
                duration: 2.5,
                ease: 'power3.out',
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: '#about',
                    start: 'top 70%'
                },
                onUpdate: function() {
                    const count = Math.round(this.targets()[0].textContent);
                    const suffix = stat.getAttribute('data-suffix') || '';
                    stat.textContent = count + suffix;
                }
            }
        );
    });

    // =====================
    // BEFORE/AFTER
    // =====================
    gsap.from('#before-after .text-center > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '#before-after',
            start: 'top 70%'
        }
    });

    gsap.from('#before-after .grid > div', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '#before-after .grid',
            start: 'top 60%'
        }
    });

    // =====================
    // TESTIMONIALS
    // =====================
    gsap.from('#testimonials .text-center > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '#testimonials',
            start: 'top 70%'
        }
    });

    // Testimonial Slider
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
                gsap.fromTo(slide, 
                    { opacity: 0, y: 20 }, 
                    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
                );
            } else {
                slide.classList.remove('active');
            }
        });
        dots.forEach((dot, i) => {
            dot.style.background = i === index ? '#C8A96A' : 'rgba(255,255,255,0.3)';
        });
        currentSlide = index;
    }

    function nextSlide() {
        showSlide((currentSlide + 1) % slides.length);
    }

    slideInterval = setInterval(nextSlide, 5000);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            slideInterval = setInterval(nextSlide, 5000);
        });
    });
    
    // Arrow navigation
    const arrows = document.querySelectorAll('.testimonial-arrow');
    arrows.forEach(arrow => {
        arrow.addEventListener('click', () => {
            clearInterval(slideInterval);
            if (arrow.classList.contains('testimonial-arrow-left')) {
                showSlide((currentSlide - 1 + slides.length) % slides.length);
            } else {
                showSlide((currentSlide + 1) % slides.length);
            }
            slideInterval = setInterval(nextSlide, 5000);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            clearInterval(slideInterval);
            showSlide((currentSlide - 1 + slides.length) % slides.length);
            slideInterval = setInterval(nextSlide, 5000);
        } else if (e.key === 'ArrowRight') {
            clearInterval(slideInterval);
            showSlide((currentSlide + 1) % slides.length);
            slideInterval = setInterval(nextSlide, 5000);
        }
    });

    // =====================
    // CTA SECTION
    // =====================
    gsap.from('#cta .relative > *', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        scrollTrigger: {
            trigger: '#cta',
            start: 'top 70%'
        }
    });

    // =====================
    // CONTACT SECTION
    // =====================
    gsap.from('#contact .text-center > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 70%'
        }
    });

    gsap.from('form', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
            trigger: '#contact form',
            start: 'top 60%'
        }
    });

    // Form focus
    document.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                borderColor: '#C8A96A',
                boxShadow: '0 0 0 4px rgba(200, 169, 106, 0.1)',
                duration: 0.3
            });
        });
        input.addEventListener('blur', () => {
            gsap.to(input, {
                borderColor: '#ddd',
                boxShadow: 'none',
                duration: 0.3
            });
        });
    });

    // =====================
    // FOOTER
    // =====================
    gsap.from('footer > div > div', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
            trigger: 'footer',
            start: 'top 80%'
        }
    });

    // =====================
    // SMOOTH SCROLL ANCHORS
    // =====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                lenis.scrollTo(target, {
                    offset: 0,
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            }
        });
    });

    // =====================
    // PERFORMANCE
    // =====================
    ScrollTrigger.config({ limitCallbacks: true });

    if (window.innerWidth < 768) {
        ScrollTrigger.getAll().forEach(st => st.kill());
        
        gsap.from('section > *', {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1
        });
    }
});