document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const themeToggle = document.getElementById('theme-toggle');
    const contactForm = document.getElementById('contact-form');
    const savePrefsCheckbox = document.getElementById('save-prefs');
    const yearElement = document.getElementById('year');
    const logo = document.getElementById('logo');
    const footerLogo = document.getElementById('footer-logo');
    const serviceCards = document.querySelectorAll('.service-card');

    // Load saved preferences
    loadPreferences();

    // Set current year
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Theme Toggle
    if (themeToggle) {
        themeToggle.addEventListener('change', function () {
            document.body.classList.toggle('dark-mode', this.checked);
            localStorage.setItem('darkMode', this.checked);

            // Add pulse animation to logos
            if (logo) logo.style.animation = 'pulse 0.5s ease';
            if (footerLogo) footerLogo.style.animation = 'pulse 0.5s ease';

            setTimeout(() => {
                if (logo) logo.style.animation = '';
                if (footerLogo) footerLogo.style.animation = '';
            }, 500);
        });
    }

    // Service Card Animations
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            const service = this.getAttribute('data-service');
            const icon = this.querySelector('.service-icon');

            // Bounce animation
            if (icon) icon.style.animation = 'bounce 0.5s ease';

            // Color change
            if (service === 'web') {
                this.style.borderTop = `3px solid ${getComputedStyle(document.documentElement).getPropertyValue('--primary')}`;
            } else if (service === 'design') {
                this.style.borderTop = `3px solid ${getComputedStyle(document.documentElement).getPropertyValue('--accent')}`;
            } else {
                this.style.borderTop = `3px solid #10b981`;
            }

            // Reset icon animation
            setTimeout(() => {
                if (icon) icon.style.animation = '';
            }, 500);
        });

        card.addEventListener('mouseleave', function () {
            this.style.borderTop = '3px solid transparent';
        });
    });

    // Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name && email && message) {
                // Save preferences
                if (savePrefsCheckbox && savePrefsCheckbox.checked) {
                    const userPreferences = {
                        name,
                        email,
                        darkMode: localStorage.getItem('darkMode') === 'true'
                    };
                    localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
                }

                // Animate and reset
                this.style.animation = 'fadeOut 0.5s ease forwards';

                setTimeout(() => {
                    this.reset();
                    this.style.animation = ''; // Reset animation
                    alert('Message sent successfully!');
                }, 600);
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Preferences loader
    function loadPreferences() {
        const darkMode = localStorage.getItem('darkMode') === 'true';
        if (darkMode) {
            document.body.classList.add('dark-mode');
            if (themeToggle) themeToggle.checked = true;
        }

        const savedPrefs = localStorage.getItem('userPreferences');
        if (savedPrefs) {
            const prefs = JSON.parse(savedPrefs);
            if (document.getElementById('name')) document.getElementById('name').value = prefs.name || '';
            if (document.getElementById('email')) document.getElementById('email').value = prefs.email || '';
        }
    }
});
