document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.add('scrolled'); // keep it or remove based on preference, let's remove it if 0
            if(window.scrollY === 0) navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if(navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        });
    });

    // --- Promo Code Copy functionality ---
    const promoCode = document.getElementById('promo-code');
    const toast = document.getElementById('toast');

    promoCode.addEventListener('click', () => {
        const textToCopy = "PAWAN100";
        navigator.clipboard.writeText(textToCopy).then(() => {
            showToast();
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });

    function showToast() {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // --- GSAP-like simple reveal animations based on Intersection Observer ---
    const animateElements = () => {
        // Simple manual animation for hero elements on load
        setTimeout(() => {
            document.querySelector('.reveal-text').style.transition = 'opacity 1s ease, transform 1s ease';
            document.querySelector('.reveal-text').style.opacity = '1';
            document.querySelector('.reveal-text').style.transform = 'translateY(0)';
        }, 100);

        setTimeout(() => {
            document.querySelector('.fade-in').style.transition = 'opacity 1s ease, transform 1s ease';
            document.querySelector('.fade-in').style.opacity = '1';
            document.querySelector('.fade-in').style.transform = 'translateY(0)';
        }, 400);

        setTimeout(() => {
            document.querySelector('.fade-in-delayed').style.transition = 'opacity 1s ease, transform 1s ease';
            document.querySelector('.fade-in-delayed').style.opacity = '1';
            document.querySelector('.fade-in-delayed').style.transform = 'translateY(0)';
        }, 700);

        setTimeout(() => {
            document.querySelector('.fade-in-right').style.transition = 'opacity 1s ease, transform 1s ease';
            document.querySelector('.fade-in-right').style.opacity = '1';
            document.querySelector('.fade-in-right').style.transform = 'translateX(0)';
        }, 500);
    }

    // Initialize element starting positions
    document.querySelector('.reveal-text').style.transform = 'translateY(30px)';
    document.querySelector('.fade-in').style.transform = 'translateY(20px)';
    document.querySelector('.fade-in-delayed').style.transform = 'translateY(20px)';
    document.querySelector('.fade-in-right').style.transform = 'translateX(40px)';
    
    // Trigger hero animations
    animateElements();

    // Scroll Observer for other sections
    const observerOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translate(0, 0) scale(1)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Setup elements for scroll animation
    const scrollElements = [
        { selector: '.scale-up', transform: 'scale(0.9) translateY(30px)' },
        { selector: '.scale-up-delayed', transform: 'scale(0.9) translateY(30px)', delay: 200 },
        { selector: '.scale-up-more-delayed', transform: 'scale(0.9) translateY(30px)', delay: 400 },
        { selector: '.fade-in-left', transform: 'translateX(-40px)' },
        { selector: '.services-text.fade-in-right', transform: 'translateX(40px)' }
    ];

    scrollElements.forEach(item => {
        const els = document.querySelectorAll(item.selector);
        els.forEach(el => {
            el.style.transform = item.transform;
            el.style.opacity = '0';
            if (item.delay) {
                el.style.transitionDelay = `${item.delay}ms`;
            }
            observer.observe(el);
        });
    });
});
