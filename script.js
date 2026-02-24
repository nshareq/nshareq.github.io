// ============================================
// UTILITY FUNCTIONS
// ============================================

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// ============================================
// NAVIGATION
// ============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Active navigation link on scroll & navbar background
const sections = document.querySelectorAll('section[id]');

const handleScroll = debounce(() => {
    const scrollY = window.pageYOffset;

    // Navbar background
    if (scrollY > 50) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }

    // Active nav link
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 120;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink?.classList.add('active');
        }
    });
}, 10);

window.addEventListener('scroll', handleScroll);

// ============================================
// SCROLL PROGRESS BAR
// ============================================

const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// ============================================
// BACK TO TOP BUTTON
// ============================================

const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTop?.classList.add('visible');
    } else {
        backToTop?.classList.remove('visible');
    }
});

backToTop?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// TYPING ANIMATION
// ============================================

const typingElement = document.getElementById('typingText');
const typingTexts = [
    'MSc Student in Industrial Mathematics & Data Analysis',
    'Data Analyst',
    'Mathematics Researcher',
    'Python Developer'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    if (!typingElement) return;

    const currentText = typingTexts[textIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typingSpeed = 500; // Pause before typing next
    }

    setTimeout(typeText, typingSpeed);
}

// Start typing animation after initial page load
setTimeout(typeText, 1000);

// ============================================
// COUNTER ANIMATION
// ============================================

const counters = document.querySelectorAll('.stat-number');
let countersAnimated = false;

function animateCounters() {
    if (countersAnimated) return;

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };

        updateCounter();
    });

    countersAnimated = true;
}

// ============================================
// SKILL BARS ANIMATION
// ============================================

const skillBars = document.querySelectorAll('.skill-fill');
let skillsAnimated = false;

function animateSkills() {
    if (skillsAnimated) return;

    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.setProperty('--skill-width', width + '%');
        setTimeout(() => {
            bar.classList.add('animated');
        }, 200);
    });

    skillsAnimated = true;
}

// ============================================
// SECTION REVEAL ANIMATION
// ============================================

const revealSections = document.querySelectorAll('.reveal-section');
const revealElements = document.querySelectorAll('.reveal-element');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');

            // Trigger counter animation when hero section is visible
            if (entry.target.classList.contains('hero') && !countersAnimated) {
                setTimeout(animateCounters, 500);
            }

            // Trigger skill bars animation when skills section is visible
            if (entry.target.id === 'skills' && !skillsAnimated) {
                setTimeout(animateSkills, 300);
            }
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealSections.forEach(section => revealObserver.observe(section));

const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, index * 100);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(element => elementObserver.observe(element));

// ============================================
// COPY TO CLIPBOARD
// ============================================

const copyButtons = document.querySelectorAll('.copy-btn');

copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
        e.stopPropagation();

        const contactItem = btn.closest('.contact-item');
        const textToCopy = contactItem?.getAttribute('data-copy');

        if (textToCopy) {
            try {
                await navigator.clipboard.writeText(textToCopy);
                btn.classList.add('copied');
                btn.innerHTML = '<i class="fas fa-check"></i>';

                setTimeout(() => {
                    btn.classList.remove('copied');
                    btn.innerHTML = '<i class="far fa-copy"></i>';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        }
    });
});

// ============================================
// PARALLAX EFFECT
// ============================================

window.addEventListener('scroll', debounce(() => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroParticles = document.querySelectorAll('.hero-particle');

    if (heroContent && scrolled < window.innerHeight) {
        const parallaxSpeed = 0.3;
        heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }

    // Parallax for particles
    heroParticles.forEach((particle, index) => {
        const speed = 0.1 + (index * 0.05);
        particle.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 10));

// ============================================
// DYNAMIC YEAR
// ============================================

const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// ============================================
// PAGE LOAD ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 50);

    // Trigger initial animations after page load
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }, 300);
});

// ============================================
// EASTER EGG: KONAMI CODE
// ============================================

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 3000);
    }
});

// ============================================
// PERFORMANCE: LAZY LOADING (for future images)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// CURSOR TRAIL EFFECT (SUBTLE)
// ============================================

let mouseTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    mouseTrail.push({ x: e.clientX, y: e.clientY, age: 0 });

    if (mouseTrail.length > maxTrailLength) {
        mouseTrail.shift();
    }

    // Animate trail
    mouseTrail = mouseTrail.map(point => ({
        ...point,
        age: point.age + 1
    })).filter(point => point.age < 30);
});

// ============================================
// PREFETCH LINKS ON HOVER
// ============================================

const prefetchLinks = document.querySelectorAll('a[href^="http"]');

prefetchLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = link.href;
        document.head.appendChild(prefetchLink);
    });
});

// ============================================
// HANDLE RESIZE
// ============================================

// ============================================
// CONTACT FORM SUBMISSION
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('.btn-submit');
        const originalContent = submitBtn.innerHTML;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';

        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Submit to Formspree
        fetch('https://formspree.io/f/mojnydrg', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Form submission failed');
        })
        .then(data => {
            // Success
            submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
            submitBtn.style.background = '#10b981';

            // Reset form
            setTimeout(() => {
                this.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalContent;
                submitBtn.style.background = '';
            }, 3000);

            // Show success message
            alert('Thank you for your message! I\'ll get back to you within 24-48 hours.');
        })
        .catch(error => {
            // Error
            console.error('Error:', error);
            submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> <span>Try Again</span>';
            submitBtn.style.background = '#ef4444';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalContent;
                submitBtn.style.background = '';
            }, 3000);

            alert('Sorry, there was an error sending your message. Please try again or email me directly at naimshareq@gmail.com');
        });
    });
}

// ============================================
// HANDLE RESIZE
// ============================================

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculate positions if needed
        handleScroll();
    }, 250);
});

console.log('🚀 Portfolio loaded successfully!');
console.log('📊 Built by Naim Shareq');
console.log('💡 Tip: Try the Konami code for a surprise!');
