// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navUl = document.querySelector('nav ul');

if (mobileToggle && navUl) {
    mobileToggle.addEventListener('click', () => {
        navUl.classList.toggle('active');
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
        // Close mobile menu if open
        if (navUl) navUl.classList.remove('active');
    });
});

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Subscribed! Check your email for confirmation. (Integrate with your service.)');
        this.reset();
    });
}

// Contact form
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Message sent! We\'ll reply soon.');
        this.reset();
    });
}
