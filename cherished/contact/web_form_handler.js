// contact-form.js

// Validate email format
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Sanitize input to prevent XSS
function sanitizeInput(text) {
    return text
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .replace(/\//g, "&#x2F;");
}

// Handle form submission
function handleContactFormSubmit(event) {
    event.preventDefault();

    const contactForm = event.target;

    // Collect and sanitize inputs
    const name = sanitizeInput(document.getElementById('name').value);
    const email = sanitizeInput(document.getElementById('email').value);
    const phone = sanitizeInput(document.getElementById('phone').value);
    const organisation = sanitizeInput(document.getElementById('organisation').value);
    const service = sanitizeInput(document.getElementById('service').value);
    const timeline = sanitizeInput(document.getElementById('timeline').value);
    const budget = sanitizeInput(document.getElementById('budget').value);
    const message = sanitizeInput(document.getElementById('message').value);

    // Basic validation
    if (!name || !email || !service || !message) {
        alert('Please fill in all required fields.');
        return;
    }

    if (!isValidEmail(email)) {
        alert('Email is not in valid email format. Please try again.');
        return;
    }

    const formData = {
        name,
        email,
        phone,
        organisation,
        service,
        timeline,
        budget,
        message
    };

    fetch('https://www.cherishedlawncare.co.uk/contact/form_handler.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('Thank you for your inquiry. We will get back to you soon!');
        contactForm.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred whilst submitting your inquiry. Please try again later.');
    });
}

// Initialize after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
});
