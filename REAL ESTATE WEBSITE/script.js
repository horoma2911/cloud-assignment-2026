/* HOROMA REAL ESTATE - JavaScript Functionality */
/* Author: Student Project */

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Animate hamburger to X
        const spans = hamburger.querySelectorAll('span');
        spans[0].classList.toggle('active');
        spans[1].classList.toggle('active');
        spans[2].classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');

if (backToTopBtn) {
    // Show button when scrolling down
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Scroll to top when clicking
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Contact Form Validation
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Clear previous errors
        clearErrors();
        
        let isValid = true;
        
        // Name validation
        if (name === '') {
            showError('name', 'Please enter your name');
            isValid = false;
        } else if (name.length < 2) {
            showError('name', 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Email validation
        if (email === '') {
            showError('email', 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Phone validation (Tanzanian format)
        if (phone === '') {
            showError('phone', 'Please enter your phone number');
            isValid = false;
        } else if (!isValidPhone(phone)) {
            showError('phone', 'Please enter a valid phone number (e.g., 0712345678)');
            isValid = false;
        }
        
        // Subject validation
        if (subject === '') {
            showError('subject', 'Please enter a subject');
            isValid = false;
        }
        
        // Message validation
        if (message === '') {
            showError('message', 'Please enter your message');
            isValid = false;
        } else if (message.length < 10) {
            showError('message', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                successMessage.textContent = 'Thank you! Your message has been sent successfully.';
                successMessage.style.display = 'block';
            }
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                if (successMessage) {
                    successMessage.style.display = 'none';
                }
            }, 5000);
        }
    });
}

// Helper functions for form validation
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (field) {
        field.style.borderColor = '#d32f2f';
    }
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearErrors() {
    const errors = document.querySelectorAll('.error');
    const fields = document.querySelectorAll('input, textarea');
    
    errors.forEach(error => {
        error.textContent = '';
    });
    
    fields.forEach(field => {
        field.style.borderColor = '#ddd';
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Accept Tanzanian phone formats: 0712345678, +255712345678, 255712345678
    const phoneRegex = /^(\+255|255|0)?[67]\d{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Property filtering (for properties page)
const locationFilter = document.getElementById('locationFilter');
const typeFilter = document.getElementById('typeFilter');
const propertyCards = document.querySelectorAll('.property-card');

if (locationFilter && typeFilter) {
    locationFilter.addEventListener('change', filterProperties);
    typeFilter.addEventListener('change', filterProperties);
}

function filterProperties() {
    const selectedLocation = locationFilter.value;
    const selectedType = typeFilter.value;
    
    propertyCards.forEach(card => {
        const cardLocation = card.getAttribute('data-location');
        const cardType = card.getAttribute('data-type');
        
        const locationMatch = selectedLocation === 'all' || cardLocation === selectedLocation;
        const typeMatch = selectedType === 'all' || cardType === selectedType;
        
        if (locationMatch && typeMatch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Set active navigation link based on current page
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.style.color = '#2e7d32';
            link.style.fontWeight = '600';
        }
    });
});