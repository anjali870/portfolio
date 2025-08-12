// Enhanced Portfolio JavaScript with Modern Animations

// Waves Animation
(function() {
    const canvas = document.getElementById('waves-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = 0, height = 0;
    let mouseX = 0, mouseY = 0;
    let lastMouseX = 0, lastMouseY = 0;
    let mouseSpeed = 0;
    
    function resize() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    }
    
    window.addEventListener('resize', resize);
    resize();

    // Mouse movement tracking
    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        
        const dx = mouseX - lastMouseX;
        const dy = mouseY - lastMouseY;
        mouseSpeed = Math.min(Math.sqrt(dx * dx + dy * dy), 100);
        
        lastMouseX = mouseX;
        lastMouseY = mouseY;
    });

    function draw(time) {
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = "rgba(22, 0, 0, 0.15)";
        ctx.lineWidth = 1;

        const xGap = 10;
        const yGap = 32;
        const totalLines = Math.ceil(width / xGap) + 1;
        const totalPoints = Math.ceil(height / yGap) + 1;

        for (let i = 0; i < totalLines; i++) {
            const x = i * xGap;
            ctx.beginPath();
            
            for (let j = 0; j < totalPoints; j++) {
                const y = j * yGap;
                
                // Base wave movement
                const offsetX = Math.sin((x + time * 0.0125) * 0.02) * 32;
                const offsetY = Math.cos((y + time * 0.005) * 0.01) * 16;
                
                // Mouse interaction
                let mouseEffect = 0;
                const dx = x - mouseX;
                const dy = y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const strength = (1 - dist / 150) * mouseSpeed * 0.5;
                    mouseEffect = Math.sin(dist * 0.05) * strength;
                }
                
                const finalY = y + offsetY + mouseEffect;
                
                if (j === 0) {
                    ctx.moveTo(x + offsetX, finalY);
                } else {
                    ctx.lineTo(x + offsetX, finalY);
                }
            }
            ctx.stroke();
        }
        requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
})();

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initCounters();
    initParticles();
    initFormHandling();
    initSmoothScrolling();
    initMobileMenu();
    initScrollEffects();
});

// Navigation functionality
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect on navigation
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveSection() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// Smooth scrolling functionality
function initSmoothScrolling() {
    const exploreBtn = document.getElementById('explore-btn');
    const contactBtn = document.getElementById('contact-btn');
    const navLinks = document.querySelectorAll('.nav-link');

    // Explore button scrolls to about section
    exploreBtn.addEventListener('click', () => {
        document.getElementById('about').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

    // Contact button scrolls to contact section
    contactBtn.addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

    // Navigation links smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Trigger counter animation if it's a stat item
                if (entry.target.classList.contains('stat-item')) {
                    const counter = entry.target.querySelector('.stat-number');
                    if (counter && !counter.classList.contains('animated')) {
                        animateCounter(counter);
                        counter.classList.add('animated');
                    }
                }
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animatedElements = [
        '.about-content',
        '.highlight-item',
        '.timeline-item',
        '.skill-category',
        '.cert-card',
        '.edu-item',
        '.contact-item',
        '.stat-item'
    ];

    animatedElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    });

    // Special animations for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.classList.add('slide-in-left');
        item.style.transitionDelay = `${index * 0.2}s`;
    });

    const eduItems = document.querySelectorAll('.edu-item');
    eduItems.forEach((item, index) => {
        item.classList.add('slide-in-right');
        item.style.transitionDelay = `${index * 0.15}s`;
    });
}

// Counter animations
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        counter.innerText = '0';
    });
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.innerText = target + (target === 100 ? '' : '+');
            clearInterval(timer);
        } else {
            counter.innerText = Math.ceil(current) + (target === 100 ? '' : '+');
        }
    }, 16);
}

// Particle effects
function initParticles() {
    createFloatingParticles();
    addHoverEffects();
}

function createFloatingParticles() {
    const particleContainer = document.querySelector('.particles-bg');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(50, 184, 198, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 20 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particleContainer.appendChild(particle);
    }
}

function addHoverEffects() {
    // Add particle effects to buttons
    const primaryBtns = document.querySelectorAll('.btn-primary');
    
    primaryBtns.forEach(btn => {
        btn.addEventListener('mouseenter', createButtonParticles);
        btn.addEventListener('mouseleave', removeButtonParticles);
    });
}

function createButtonParticles(e) {
    const btn = e.target.closest('.btn-primary');
    const rect = btn.getBoundingClientRect();
    
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.className = 'btn-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(50, 184, 198, 0.8);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: btnParticleFloat 1s ease-out forwards;
        `;
        btn.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

function removeButtonParticles(e) {
    const particles = e.target.querySelectorAll('.btn-particle');
    particles.forEach(particle => particle.remove());
}

// Form handling
function initFormHandling() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        
        // Add floating label effects
        const inputs = form.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (input.value === '') {
                    input.parentElement.classList.remove('focused');
                }
            });

            // Add typing effect
            input.addEventListener('input', () => {
                if (input.value !== '') {
                    input.parentElement.classList.add('has-value');
                } else {
                    input.parentElement.classList.remove('has-value');
                }
            });
        });
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        showNotification('Message sent successfully!', 'success');
        
        // Reset form
        e.target.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Remove form focus states
        const formGroups = e.target.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('focused', 'has-value');
        });
        
    }, 2000);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Scroll effects and parallax
function initScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${rate * 0.3}px)`;
            }
        }
        
        // Floating animation for scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator && scrolled < 100) {
            scrollIndicator.style.opacity = 1 - (scrolled / 100);
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// Additional CSS animations via JavaScript
const additionalStyles = `
    @keyframes btnParticleFloat {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-20px) scale(0);
            opacity: 0;
        }
    }
    
    .notification {
        font-weight: 500;
        letter-spacing: 0.5px;
    }
    
    .form-group.focused .form-label,
    .form-group.has-value .form-label {
        color: var(--color-teal-300);
        transform: translateY(-5px);
        font-size: 0.85rem;
    }
    
    .form-label {
        transition: all 0.2s ease;
        transform-origin: left top;
    }
    
    .floating-particle {
        z-index: 1;
    }
    
    .btn-primary {
        position: relative;
        overflow: hidden;
    }
    
    /* Enhanced hover effects */
    .timeline-card:hover {
        box-shadow: 0 20px 40px rgba(50, 184, 198, 0.15);
    }
    
    .skill-category:hover {
        box-shadow: 0 20px 40px rgba(50, 184, 198, 0.1);
    }
    
    .cert-card:hover .cert-icon {
        transform: scale(1.2);
        transition: transform 0.3s ease;
    }
    
    .edu-card:hover {
        box-shadow: 0 20px 40px rgba(50, 184, 198, 0.15);
    }
    
    /* Improved mobile responsiveness */
    @media (max-width: 480px) {
        .hero-name {
            font-size: 2.5rem !important;
        }
        
        .hero-subtitle {
            font-size: 1rem !important;
        }
        
        .hero-description {
            font-size: 1rem;
        }
        
        .btn {
            padding: 0.75rem 1.5rem;
            font-size: 0.9rem;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Performance optimization: Debounce scroll events
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Preload animations
function preloadAnimations() {
    // Preload critical animations
    const criticalElements = document.querySelectorAll('.hero-content, .nav');
    criticalElements.forEach(el => {
        el.style.willChange = 'transform, opacity';
    });
    
    // Remove will-change after animations complete
    setTimeout(() => {
        criticalElements.forEach(el => {
            el.style.willChange = 'auto';
        });
    }, 3000);
}

// Initialize preload
preloadAnimations();

// Add loading screen fade out
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Initialize any remaining animations
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('loaded');
        }
    }, 100);
});

// Error handling for animations
window.addEventListener('error', (e) => {
    console.warn('Animation error caught:', e.error);
    // Graceful fallback - ensure basic functionality works
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // Enable keyboard navigation for custom elements
    if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.classList.contains('btn')) {
            e.target.click();
        }
    }
    
    // ESC to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// Touch device optimizations
function handleTouchDevice() {
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Optimize hover effects for touch
        const hoverElements = document.querySelectorAll('.timeline-card, .skill-category, .cert-card');
        hoverElements.forEach(el => {
            el.addEventListener('touchstart', () => {
                el.classList.add('touch-hover');
            });
            
            el.addEventListener('touchend', () => {
                setTimeout(() => {
                    el.classList.remove('touch-hover');
                }, 300);
            });
        });
    }
}

handleTouchDevice();