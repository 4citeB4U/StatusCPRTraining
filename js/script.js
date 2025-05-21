// Main JavaScript file for Status CPR Training website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Simple validation
            if (!nameInput.value.trim()) {
                isValid = false;
                highlightField(nameInput, false);
            } else {
                highlightField(nameInput, true);
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                isValid = false;
                highlightField(emailInput, false);
            } else {
                highlightField(emailInput, true);
            }
            
            if (!messageInput.value.trim()) {
                isValid = false;
                highlightField(messageInput, false);
            } else {
                highlightField(messageInput, true);
            }
            
            if (isValid) {
                // In a real application, you would submit the form data to a server
                // For now, we'll just show a success message
                contactForm.reset();
                showFormMessage('Thank you for your message. We will get back to you soon!', true);
            } else {
                showFormMessage('Please fill in all required fields correctly.', false);
            }
        });
    }
    
    // Helper functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function highlightField(field, isValid) {
        if (isValid) {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        } else {
            field.classList.remove('is-valid');
            field.classList.add('is-invalid');
        }
    }
    
    function showFormMessage(message, isSuccess) {
        const formMessage = document.getElementById('form-message');
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.className = isSuccess ? 'success-message' : 'error-message';
            formMessage.style.display = 'block';
            
            // Hide the message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
});