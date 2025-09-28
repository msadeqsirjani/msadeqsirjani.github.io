// DOM Elements
const navbar = document.querySelector('.navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const contactForm = document.getElementById('contact-form');

// Theme Management
let currentTheme = localStorage.getItem('theme') || 'system';
initializeTheme();

function initializeTheme() {
    if (currentTheme === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
    } else {
        document.documentElement.setAttribute('data-theme', currentTheme);
    }
    updateThemeIcon();
}

function toggleTheme() {
    if (currentTheme === 'system') {
        currentTheme = 'light';
    } else if (currentTheme === 'light') {
        currentTheme = 'dark';
    } else {
        currentTheme = 'system';
    }
    
    localStorage.setItem('theme', currentTheme);
    initializeTheme();
}

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (currentTheme === 'system') {
        icon.className = 'fas fa-desktop';
    } else if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}


// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (currentTheme === 'system') {
        initializeTheme();
    }
});

// Mobile Navigation
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
}

// Instant scrolling for Navigation Links
function scrollToTarget(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'auto'
        });
    }
}

// Analytics Helper Function
function trackEvent(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
}

// Contact Form Handling with Analytics
function handleContactForm(event) {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Track form submission attempt
    trackEvent('contact_form_submit', {
        'event_category': 'engagement',
        'event_label': 'contact_form'
    });

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Track successful form submission
            trackEvent('contact_form_success', {
                'event_category': 'engagement',
                'event_label': 'contact_form_completed'
            });

            alert('Message sent successfully! I\'ll get back to you soon.');
            contactForm.reset();
        } else {
            // Track form submission error
            trackEvent('contact_form_error', {
                'event_category': 'engagement',
                'event_label': 'contact_form_failed'
            });
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        // Track form submission error
        trackEvent('contact_form_error', {
            'event_category': 'engagement',
            'event_label': 'contact_form_network_error'
        });

        alert('Sorry, there was an error sending your message. Please try again.');
        console.error('Error:', error);
    })
    .finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

// Dropdown functionality
function setupDropdown() {
    const dropdown = document.querySelector('.nav-dropdown');
    if (dropdown) {
        const toggleBtn = dropdown.querySelector('.nav-dropdown-toggle');
        
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdown.classList.toggle('open');
        });
        
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('open');
            }
        });
    }
}

// Initialize all functionality
function init() {
    // Event Listeners
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            toggleTheme();

            // Track theme changes
            trackEvent('theme_toggle', {
                'event_category': 'user_preference',
                'event_label': currentTheme
            });
        });
    }

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            toggleMobileMenu();

            // Track mobile menu usage
            trackEvent('mobile_menu_toggle', {
                'event_category': 'navigation',
                'event_label': 'mobile_menu'
            });
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const sectionName = targetId.replace('#', '');

            // Track navigation clicks
            trackEvent('navigation_click', {
                'event_category': 'navigation',
                'event_label': sectionName
            });

            scrollToTarget(targetId);
            closeMobileMenu();
        });
    });

    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Track CV downloads
    const cvButton = document.querySelector('a[href*="cv"]');
    if (cvButton) {
        cvButton.addEventListener('click', () => {
            trackEvent('cv_download', {
                'event_category': 'engagement',
                'event_label': 'cv_pdf_download'
            });
        });
    }

    // Track social media clicks
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', () => {
            const href = link.getAttribute('href');
            let platform = 'unknown';

            if (href.includes('linkedin')) platform = 'linkedin';
            else if (href.includes('github')) platform = 'github';
            else if (href.includes('scholar.google')) platform = 'google_scholar';
            else if (href.includes('orcid')) platform = 'orcid';
            else if (href.includes('twitter')) platform = 'twitter';
            else if (href.includes('mailto')) platform = 'email';

            trackEvent('social_media_click', {
                'event_category': 'engagement',
                'event_label': platform
            });
        });
    });

    // Track publication link clicks
    const publicationLinks = document.querySelectorAll('.publication-btn, .publication-item a');
    publicationLinks.forEach(link => {
        link.addEventListener('click', () => {
            const href = link.getAttribute('href');
            let linkType = 'unknown';

            if (href && href.includes('doi.org')) linkType = 'doi_link';
            else if (href && href.includes('ieee')) linkType = 'ieee_link';
            else if (href && href.includes('springer')) linkType = 'springer_link';
            else if (href && href.includes('acm')) linkType = 'acm_link';
            else if (href && href.includes('.pdf')) linkType = 'pdf_download';

            trackEvent('publication_click', {
                'event_category': 'research_engagement',
                'event_label': linkType
            });
        });
    });

    // Initialize dropdown
    setupDropdown();

    // Track page engagement time
    let startTime = Date.now();
    let maxScroll = 0;

    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        maxScroll = Math.max(maxScroll, scrollPercent);
    });

    // Track engagement when user leaves
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);

        trackEvent('page_engagement', {
            'event_category': 'engagement',
            'time_spent_seconds': timeSpent,
            'max_scroll_percent': maxScroll
        });
    });
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', init);