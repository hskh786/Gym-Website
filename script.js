// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navbar functionality
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link
    updateActiveNavLink();
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        // Trigger animation when element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

// Call counter animation
animateCounters();

// BMI Calculator
function calculateBMI() {
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const resultDiv = document.getElementById('bmiResult');

    if (!height || !weight) {
        resultDiv.textContent = 'Please enter both height and weight';
        resultDiv.classList.add('show');
        return;
    }

    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    let category = '';
    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi < 25) {
        category = 'Normal Weight';
    } else if (bmi < 30) {
        category = 'Overweight';
    } else {
        category = 'Obese';
    }

    resultDiv.innerHTML = `
        <strong>Your BMI: ${bmi}</strong><br>
        Category: ${category}<br>
        <small>Schedule a consultation with our trainers to create a personalized plan</small>
    `;
    resultDiv.classList.add('show');
}

// Trainer Booking Form
document.getElementById('trainerBookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const trainer = this.querySelector('select').value;
    const date = this.querySelector('input[type="date"]').value;
    const time = this.querySelector('input[type="time"]').value;
    const messageDiv = document.getElementById('bookingMessage');

    if (!trainer || !date || !time) {
        messageDiv.textContent = 'Please fill in all fields';
        messageDiv.classList.add('show');
        return;
    }

    messageDiv.innerHTML = `
        <strong>✓ Booking Confirmed!</strong><br>
        Trainer: ${trainer}<br>
        Date: ${new Date(date).toLocaleDateString()}<br>
        Time: ${time}<br>
        <small>Check your email for confirmation</small>
    `;
    messageDiv.classList.add('show');

    // Reset form after 3 seconds
    setTimeout(() => {
        this.reset();
        messageDiv.classList.remove('show');
    }, 3000);
});

// Contact Form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const messageDiv = document.getElementById('formMessage');
    
    messageDiv.textContent = 'Sending your message...';
    messageDiv.classList.add('show');

    setTimeout(() => {
        messageDiv.innerHTML = '✓ Thank you! We\'ll get back to you within 24 hours.';
        messageDiv.classList.add('show');

        // Reset form
        this.reset();

        // Hide message after 5 seconds
        setTimeout(() => {
            messageDiv.classList.remove('show');
        }, 5000);
    }, 1500);
});

// Smooth scroll for buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-join').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.classList.contains('btn-join') || this.textContent.includes('Start Today')) {
            e.preventDefault();
            document.getElementById('membership').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Book Trainer buttons
document.querySelectorAll('.btn-book-trainer').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('tools').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            document.getElementById('trainerBookingForm').scrollIntoView({ behavior: 'smooth' });
        }, 500);
    });
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple to buttons
document.querySelectorAll('.btn, .nav-link').forEach(element => {
    element.addEventListener('click', createRipple);
});

// Add ripple effect styling
const style = document.createElement('style');
style.textContent = `
    .btn, .nav-link, .btn-book-trainer {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .nav-link.active {
        color: #00E5A8;
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition < window.innerHeight) {
        hero.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// Program cards hover effect
const programCards = document.querySelectorAll('.program-card');
programCards.forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
        programCards.forEach((c, i) => {
            if (i !== index) {
                c.style.opacity = '0.7';
            }
        });
    });

    card.addEventListener('mouseleave', function() {
        programCards.forEach(c => {
            c.style.opacity = '1';
        });
    });
});

// Trainer cards hover effect
const trainerCards = document.querySelectorAll('.trainer-card');
trainerCards.forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
        trainerCards.forEach((c, i) => {
            if (i !== index) {
                c.style.opacity = '0.7';
            }
        });
    });

    card.addEventListener('mouseleave', function() {
        trainerCards.forEach(c => {
            c.style.opacity = '1';
        });
    });
});

// Membership plan hover effect
const membershipCards = document.querySelectorAll('.membership-card');
membershipCards.forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
        membershipCards.forEach((c, i) => {
            if (i !== index && !c.classList.contains('featured')) {
                c.style.opacity = '0.7';
            }
        });
    });

    card.addEventListener('mouseleave', function() {
        membershipCards.forEach(c => {
            c.style.opacity = '1';
        });
    });
});

// Form input focus effects
const inputs = document.querySelectorAll('input, select, textarea');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Prevent body scroll when mobile menu is open
const htmlElement = document.documentElement;
navToggle.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
        htmlElement.style.overflow = 'hidden';
    } else {
        htmlElement.style.overflow = 'auto';
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const isClickOnMenu = navMenu.contains(e.target);
    const isClickOnToggle = navToggle.contains(e.target);

    if (!isClickOnMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        htmlElement.style.overflow = 'auto';
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll event listener
window.addEventListener('scroll', debounce(() => {
    updateActiveNavLink();
}, 10));

// Add loading animation
const pageLoadAnimation = () => {
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 50}ms`;
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', pageLoadAnimation);
} else {
    pageLoadAnimation();
}

// More efficient schedule button handler
const scheduleButtons = document.querySelectorAll('.btn-small');
scheduleButtons.forEach(btn => {
    if (btn.textContent.includes('View Full Schedule')) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Full Class Schedule:\n\nMONDAY-FRIDAY:\n6:00 AM - Morning Strength Training\n9:00 AM - HIIT Bootcamp\n12:00 PM - Lunch Cardio Blast\n6:00 PM - Evening Strength\n7:30 PM - CrossFit WOD\n\nSATURDAY-SUNDAY:\n9:00 AM - Yoga Flow\n11:00 AM - Group Training\n5:00 PM - Evening Sessions\n\nFor more details, contact us!');
        });
    }
});

// Console welcome message
console.log('%c💪 Welcome to IronPulse Fitness 💪', 'color: #00E5A8; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px rgba(0, 229, 168, 0.5);');
console.log('%cTransform Your Body. Elevate Your Life.', 'color: #00E5A8; font-size: 12px;');
console.log('%cJoin our fitness community today!', 'color: #D1D5DB; font-size: 12px; font-weight: bold;');

// Utility function for future feature expansion
window.IronPulseUtils = {
    bmi: function(height, weight) {
        return (weight / (height * height)).toFixed(1);
    },
    
    bookTrainer: function(trainerName) {
        document.querySelector('select').value = trainerName;
        document.getElementById('tools').scrollIntoView({ behavior: 'smooth' });
    },

    contactUs: function() {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    },

    viewMembership: function() {
        document.getElementById('membership').scrollIntoView({ behavior: 'smooth' });
    }
};
