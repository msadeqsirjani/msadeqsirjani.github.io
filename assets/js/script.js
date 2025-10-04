// DOM Elements
const navbar = document.querySelector('.navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const contactForm = document.getElementById('contact-form');
const quickActionToggle = document.getElementById('quickActionToggle');
const quickActionMenu = document.getElementById('quickActionMenu');
const scrollToTopBtn = document.getElementById('scrollToTop');
const readingProgress = document.getElementById('readingProgress');

// Utility: Debounce function for performance
function debounce(func, wait = 10) {
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

// Utility: Throttle function for scroll events
function throttle(func, limit = 16) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

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
        themeToggle.setAttribute('data-tooltip', 'System theme');
    } else if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
        themeToggle.setAttribute('data-tooltip', 'Dark theme');
    } else {
        icon.className = 'fas fa-moon';
        themeToggle.setAttribute('data-tooltip', 'Light theme');
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

// Scroll Progress and Scroll-to-Top functionality
function updateScrollProgress() {
    if (!readingProgress) return;

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercent = (scrollTop / documentHeight) * 100;

    readingProgress.style.width = `${Math.min(scrollPercent, 100)}%`;
}

function toggleScrollToTop() {
    if (!scrollToTopBtn) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / documentHeight) * 100;

    if (scrollPercent >= 80) {
        scrollToTopBtn.classList.add('visible');
        scrollToTopBtn.classList.remove('hidden');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    // Track scroll to top usage
    trackEvent('scroll_to_top', {
        'event_category': 'navigation',
        'event_label': 'scroll_to_top_button'
    });
}

// Optimized scroll handler with throttle
const handleScroll = throttle(() => {
    updateScrollProgress();
    toggleScrollToTop();
}, 16);

// BibTeX data storage
let bibtexData = {};

// Load BibTeX data
async function loadBibtexData() {
    try {
        const response = await fetch('assets/data/bibtex.json');
        bibtexData = await response.json();
    } catch (error) {
        console.error('Failed to load BibTeX data:', error);
    }
}

// Copy BibTeX to clipboard
function copyBibtex(pubId, element) {
    const bibtex = bibtexData[pubId]?.bibtex;
    if (bibtex) {
        copyToClipboard(bibtex, element);
        trackEvent('copy_bibtex', {
            'event_category': 'engagement',
            'event_label': pubId
        });
    }
}

// Copy to clipboard functionality
function copyToClipboard(text, element) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showCopyFeedback(element);
            trackEvent('copy_to_clipboard', {
                'event_category': 'engagement',
                'event_label': 'contact_info'
            });
        }).catch(err => {
            console.error('Failed to copy:', err);
            fallbackCopyToClipboard(text, element);
        });
    } else {
        fallbackCopyToClipboard(text, element);
    }
}

function fallbackCopyToClipboard(text, element) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        showCopyFeedback(element);
    } catch (err) {
        console.error('Fallback copy failed:', err);
    }

    document.body.removeChild(textArea);
}

function showCopyFeedback(element) {
    const originalTooltip = element.getAttribute('data-tooltip');
    element.setAttribute('data-tooltip', 'Copied!');

    setTimeout(() => {
        element.setAttribute('data-tooltip', originalTooltip);
    }, 2000);
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

// Quick Actions functionality
function toggleQuickActions() {
    quickActionToggle.classList.toggle('active');
    quickActionMenu.classList.toggle('active');

    // Hide tooltip when menu is open
    if (quickActionToggle.classList.contains('active')) {
        quickActionToggle.removeAttribute('data-tooltip');
        // Hide scroll-to-top button when menu is open
        if (scrollToTopBtn) {
            scrollToTopBtn.classList.add('hidden');
        }
    } else {
        quickActionToggle.setAttribute('data-tooltip', 'Quick Actions');
        // Show scroll-to-top button when menu closes (if should be visible)
        if (scrollToTopBtn) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / documentHeight) * 100;
            if (scrollPercent >= 80) {
                scrollToTopBtn.classList.remove('hidden');
            }
        }
    }
}

function closeQuickActions() {
    quickActionToggle.classList.remove('active');
    quickActionMenu.classList.remove('active');
    quickActionToggle.setAttribute('data-tooltip', 'Quick Actions');
    // Show scroll-to-top button when menu closes (if should be visible)
    if (scrollToTopBtn) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        if (scrollPercent >= 80) {
            scrollToTopBtn.classList.remove('hidden');
        }
    }
}

// Lazy loading images with Intersection Observer
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Initialize all functionality
function init() {
    // Load BibTeX data
    loadBibtexData();

    // Scroll event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Scroll to top button
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', scrollToTop);
    }

    // Initialize lazy loading
    initLazyLoading();

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

    // Quick Actions event listeners
    if (quickActionToggle) {
        quickActionToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleQuickActions();

            // Track quick actions usage
            trackEvent('quick_actions_toggle', {
                'event_category': 'user_interface',
                'event_label': 'floating_buttons'
            });
        });
    }

    // Close quick actions when clicking outside
    document.addEventListener('click', (e) => {
        if (quickActionToggle && quickActionMenu &&
            !quickActionToggle.contains(e.target) &&
            !quickActionMenu.contains(e.target)) {
            closeQuickActions();
        }
    });

    // Track quick action button clicks
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const href = btn.getAttribute('href');
            let action = 'unknown';

            if (href && href.includes('mailto')) action = 'email';
            else if (href && href.includes('cv')) action = 'cv_download';
            else if (href && href.includes('calendly')) action = 'meeting_schedule';

            trackEvent('quick_action_click', {
                'event_category': 'engagement',
                'event_label': action
            });

            // Close menu after action
            setTimeout(() => closeQuickActions(), 300);
        });
    });

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