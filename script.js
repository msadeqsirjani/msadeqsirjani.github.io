// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const contactForm = document.getElementById('contact-form');

// Theme Management
let currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon();

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Mobile Navigation
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
}

// Smooth Scrolling for Navigation Links
function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        const offsetTop = target.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Navbar Background on Scroll
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Intersection Observer for Animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll('.section, .interest-card, .research-item, .publication-item, .teaching-card, .news-card, .skill-item');
    elementsToAnimate.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
}

// Contact Form Handling
function handleContactForm(event) {
    event.preventDefault(); // Prevent form from submitting normally
    
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Submit to Formspree using fetch
    fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        console.error('Error:', error);
    })
    .finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => removeNotification(notification));
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        default: return 'fa-info-circle';
    }
}

// Search Functionality for Publications
function setupPublicationSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search publications...';
    searchInput.className = 'publication-search';
    searchInput.style.cssText = `
        width: 100%;
        max-width: 400px;
        padding: 12px 15px;
        border: 2px solid var(--border-color);
        border-radius: var(--border-radius);
        font-size: 1rem;
        margin-bottom: 30px;
        background: var(--white);
        color: var(--text-color);
        transition: var(--transition);
    `;
    
    const publicationsContainer = document.querySelector('.publications-container');
    if (publicationsContainer) {
        publicationsContainer.insertBefore(searchInput, publicationsContainer.firstChild);
        
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const publications = document.querySelectorAll('.publication-item');
            
            publications.forEach(pub => {
                const title = pub.querySelector('h4').textContent.toLowerCase();
                const journal = pub.querySelector('.journal, .conference')?.textContent.toLowerCase() || '';
                const status = pub.querySelector('.status')?.textContent.toLowerCase() || '';
                
                const matches = title.includes(searchTerm) || 
                              journal.includes(searchTerm) || 
                              status.includes(searchTerm);
                
                pub.style.display = matches ? 'block' : 'none';
            });
        });
    }
}

// Typing Animation for Hero Section
function setupTypingAnimation() {
    const tagline = document.querySelector('.hero-tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        tagline.style.borderRight = '2px solid var(--accent-color)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                tagline.style.borderRight = 'none';
            }
        };
        
        // Start typing animation after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Parallax Effect for Hero Section
function setupParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Download CV Functionality
function setupCVDownload() {
    const downloadBtn = document.querySelector('a[href="docs/msadeqsirjani-cv.pdf"]');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create a temporary link to trigger download
            const link = document.createElement('a');
            link.href = 'docs/msadeqsirjani-cv.pdf';
            link.download = 'Mohammad_Sadegh_Sirjani_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            showNotification('CV download started!', 'success');
        });
    }
}

// Social Links Enhancement
function setupSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Add click animation
            link.style.transform = 'scale(0.9)';
            setTimeout(() => {
                link.style.transform = '';
            }, 150);
        });
    });
}

// Research Interest Map Interaction
function setupResearchInterests() {
    const interestCards = document.querySelectorAll('.interest-card');
    interestCards.forEach(card => {
        card.addEventListener('click', () => {
            const interest = card.querySelector('span').textContent;
            showNotification(`Research Interest: ${interest}`, 'info');
        });
    });
}

// News Show More functionality
function setupNewsShowMore() {
    const newsList = document.querySelector('.news-list');
    const newsItems = newsList ? Array.from(newsList.querySelectorAll('.news-item')) : [];
    const showMoreBtn = document.getElementById('news-show-more');
    const maxVisible = 5;

    if (newsItems.length > maxVisible) {
        // Hide all but the first 5
        newsItems.forEach((item, idx) => {
            if (idx >= maxVisible) {
                item.style.display = 'none';
            }
        });
        showMoreBtn.style.display = 'inline-block';
        showMoreBtn.addEventListener('click', () => {
            newsItems.forEach(item => {
                item.style.display = '';
            });
            showMoreBtn.style.display = 'none';
        });
    } else {
        showMoreBtn.style.display = 'none';
    }
}

// Initialize all functionality
function init() {
    // Event Listeners
    themeToggle.addEventListener('click', toggleTheme);
    navToggle.addEventListener('click', toggleMobileMenu);
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            smoothScrollTo(targetId);
            closeMobileMenu();
        });
    });
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Scroll Events
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Initialize features
    setupIntersectionObserver();
    setupPublicationSearch();
    setupTypingAnimation();
    setupParallaxEffect();
    setupCVDownload();
    setupSocialLinks();
    setupResearchInterests();
    setupNewsShowMore();
    
    // Add loading class to body for initial animations
    document.body.classList.add('loaded');
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', init);

// Add CSS for additional features
const additionalStyles = `
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98) !important;
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    [data-theme="dark"] .navbar.scrolled {
        background: rgba(26, 26, 26, 0.98) !important;
    }
    
    .publication-search:focus {
        outline: none;
        border-color: var(--accent-color);
        box-shadow: 0 0 0 3px rgba(241, 90, 34, 0.1);
    }
    
    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        font-size: 14px;
        opacity: 0.7;
        transition: opacity 0.3s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
    }
    
    .interest-card {
        cursor: pointer;
    }
    
    .interest-card:active {
        transform: scale(0.95);
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .slide-in-right {
        animation: slideInRight 0.6s ease forwards;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

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

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(handleNavbarScroll, 10));

// Add smooth reveal animation for sections
function revealOnScroll() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', debounce(revealOnScroll, 10));

// Add CSS for reveal animation
const revealStyles = `
    .section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;

const revealStyleSheet = document.createElement('style');
revealStyleSheet.textContent = revealStyles;
document.head.appendChild(revealStyleSheet); 