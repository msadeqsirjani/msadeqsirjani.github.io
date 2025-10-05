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

// Smooth scrolling for Navigation Links
function scrollToTarget(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
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
function copyBibtex(pubId) {
    const bibtex = bibtexData[pubId]?.bibtex;
    if (bibtex) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(bibtex).then(() => {
                Toastify({
                    text: "BibTeX citation copied!",
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "left",
                    style: {
                        background: "var(--accent-color)",
                    }
                }).showToast();

                trackEvent('copy_bibtex', {
                    'event_category': 'engagement',
                    'event_label': pubId,
                    'copy_method': 'clipboard_api'
                });
            }).catch(err => {
                console.error('Failed to copy:', err);
                fallbackCopyBibtex(bibtex, pubId);
            });
        } else {
            fallbackCopyBibtex(bibtex, pubId);
        }
    }
}

// Fallback copy for BibTeX
function fallbackCopyBibtex(text, pubId) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        Toastify({
            text: "BibTeX citation copied!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "left",
            style: {
                background: "var(--accent-color)",
            }
        }).showToast();

        trackEvent('copy_bibtex', {
            'event_category': 'engagement',
            'event_label': pubId,
            'copy_method': 'fallback'
        });
    } catch (err) {
        console.error('Fallback copy failed:', err);
        Toastify({
            text: "Failed to copy citation. Please try again.",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "left",
            style: {
                background: "#ef4444",
            }
        }).showToast();
    }

    document.body.removeChild(textArea);
}

// Copy to clipboard functionality with toast
function copyToClipboard(text, successMessage = 'Copied to clipboard!', label = 'contact_info') {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            Toastify({
                text: successMessage,
                duration: 3000,
                close: true,
                gravity: "top",
                position: "left",
                style: {
                    background: "var(--accent-color)",
                }
            }).showToast();

            trackEvent('copy_to_clipboard', {
                'event_category': 'engagement',
                'event_label': label,
                'copied_text': text.substring(0, 50)
            });
        }).catch(err => {
            console.error('Failed to copy:', err);
            fallbackCopyToClipboard(text, successMessage, label);
        });
    } else {
        fallbackCopyToClipboard(text, successMessage, label);
    }
}

function fallbackCopyToClipboard(text, successMessage, label) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        Toastify({
            text: successMessage,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "left",
            style: {
                background: "var(--accent-color)",
            }
        }).showToast();

        trackEvent('copy_to_clipboard', {
            'event_category': 'engagement',
            'event_label': label,
            'copied_text': text.substring(0, 50),
            'method': 'fallback'
        });
    } catch (err) {
        console.error('Fallback copy failed:', err);
        Toastify({
            text: "Failed to copy. Please try again.",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "left",
            style: {
                background: "#ef4444",
            }
        }).showToast();
    }

    document.body.removeChild(textArea);
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

// Publication Search and Filter
function initPublicationFilters() {
    const searchInput = document.getElementById('publicationSearch');
    const clearSearchBtn = document.getElementById('clearSearch');
    const statusFilter = document.getElementById('statusFilter');
    const yearFilter = document.getElementById('yearFilter');
    const resetBtn = document.getElementById('resetFilters');
    const publicationItems = document.querySelectorAll('.publication-item');
    const countDisplay = document.getElementById('publicationCount');

    if (!searchInput || !statusFilter || !yearFilter) return;

    function filterPublications() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedStatus = statusFilter.value;
        const selectedYear = yearFilter.value;
        let visibleCount = 0;

        publicationItems.forEach(item => {
            const title = item.querySelector('.publication-title')?.textContent.toLowerCase() || '';
            const venue = item.querySelector('.venue')?.textContent.toLowerCase() || '';
            const year = item.dataset.year || '';
            const status = item.dataset.status || '';

            const matchesSearch = !searchTerm || title.includes(searchTerm) || venue.includes(searchTerm);
            const matchesStatus = selectedStatus === 'all' || status === selectedStatus;
            const matchesYear = selectedYear === 'all' || year === selectedYear;

            const isVisible = matchesSearch && matchesStatus && matchesYear;

            if (isVisible) {
                item.classList.remove('hidden');
                item.style.display = '';
                visibleCount++;
            } else {
                item.classList.add('hidden');
                item.style.display = 'none';
            }
        });

        // Update count display
        const totalCount = publicationItems.length;
        if (visibleCount === totalCount) {
            countDisplay.textContent = `Showing all ${totalCount} publications`;
        } else {
            countDisplay.textContent = `Showing ${visibleCount} of ${totalCount} publications`;
        }

        // Show/hide clear button
        if (clearSearchBtn) {
            clearSearchBtn.style.display = searchTerm ? 'flex' : 'none';
        }
    }

    function resetFilters() {
        searchInput.value = '';
        statusFilter.value = 'all';
        yearFilter.value = 'all';
        filterPublications();
    }

    // Event listeners
    searchInput.addEventListener('input', debounce(filterPublications, 300));
    statusFilter.addEventListener('change', filterPublications);
    yearFilter.addEventListener('change', filterPublications);
    resetBtn?.addEventListener('click', resetFilters);
    clearSearchBtn?.addEventListener('click', () => {
        searchInput.value = '';
        filterPublications();
        searchInput.focus();
    });

    // Initial count
    filterPublications();
}

// Keyboard Navigation Shortcuts
function initKeyboardShortcuts() {
    const shortcuts = {
        'h': () => scrollToTarget('#hero'),
        'b': () => scrollToTarget('#biography'),
        'e': () => scrollToTarget('#education'),
        'r': () => scrollToTarget('#research'),
        'p': () => scrollToTarget('#publications'),
        't': () => scrollToTarget('#teaching'),
        'a': () => scrollToTarget('#awards'),
        'c': () => scrollToTarget('#contact'),
        '/': () => {
            const searchInput = document.getElementById('publicationSearch');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        },
        'Escape': () => {
            const searchInput = document.getElementById('publicationSearch');
            if (searchInput && document.activeElement === searchInput) {
                searchInput.blur();
            }
            closeMobileMenu();
        },
        'ArrowUp': () => {
            if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                window.scrollBy({ top: -100, behavior: 'smooth' });
            }
        },
        'ArrowDown': () => {
            if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                window.scrollBy({ top: 100, behavior: 'smooth' });
            }
        },
        'Home': () => {
            if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        },
        'End': () => {
            if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }
        },
        'd': () => toggleTheme(),
        '?': () => showKeyboardHelp()
    };

    document.addEventListener('keydown', (e) => {
        // Don't trigger shortcuts when typing in input fields (except Escape and /)
        if ((document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')
            && e.key !== 'Escape' && e.key !== '/') {
            return;
        }

        // Prevent default for specific keys
        if (e.key === '/' || e.key === '?') {
            e.preventDefault();
        }

        const handler = shortcuts[e.key];
        if (handler) {
            handler();
        }
    });
}

// Show keyboard shortcuts help overlay
function showKeyboardHelp() {
    const existingOverlay = document.getElementById('keyboardHelpOverlay');
    if (existingOverlay) {
        existingOverlay.remove();
        return;
    }

    const overlay = document.createElement('div');
    overlay.id = 'keyboardHelpOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(4px);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        animation: fadeIn 0.2s ease;
    `;

    const helpBox = document.createElement('div');
    helpBox.style.cssText = `
        background: var(--white);
        border-radius: 12px;
        padding: 2rem;
        max-width: 600px;
        width: 100%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.3s ease;
    `;

    helpBox.innerHTML = `
        <h2 style="margin: 0 0 1.5rem 0; color: var(--text-color); font-size: 1.5rem;">Keyboard Shortcuts</h2>
        <div style="display: grid; gap: 0.75rem; color: var(--text-color);">
            <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: var(--gray-light); border-radius: 6px;">
                <span><kbd>H</kbd> Home</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: var(--gray-light); border-radius: 6px;">
                <span><kbd>B</kbd> Biography</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: var(--gray-light); border-radius: 6px;">
                <span><kbd>E</kbd> Education</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: var(--gray-light); border-radius: 6px;">
                <span><kbd>R</kbd> Research</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: var(--gray-light); border-radius: 6px;">
                <span><kbd>P</kbd> Publications</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: var(--gray-light); border-radius: 6px;">
                <span><kbd>T</kbd> Teaching</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: var(--gray-light); border-radius: 6px;">
                <span><kbd>A</kbd> Awards</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: var(--gray-light); border-radius: 6px;">
                <span><kbd>C</kbd> Contact</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: var(--gray-light); border-radius: 6px;">
                <span><kbd>/</kbd> Search publications</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: var(--gray-light); border-radius: 6px;">
                <span><kbd>D</kbd> Toggle dark mode</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: var(--gray-light); border-radius: 6px;">
                <span><kbd>↑/↓</kbd> Scroll up/down</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: var(--gray-light); border-radius: 6px;">
                <span><kbd>Home/End</kbd> Top/Bottom</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: var(--gray-light); border-radius: 6px;">
                <span><kbd>Esc</kbd> Close</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: var(--gray-light); border-radius: 6px;">
                <span><kbd>?</kbd> Show this help</span>
            </div>
        </div>
        <button id="closeHelp" style="
            margin-top: 1.5rem;
            width: 100%;
            padding: 0.75rem;
            background: var(--accent-color);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
        ">Close (Esc)</button>
    `;

    overlay.appendChild(helpBox);
    document.body.appendChild(overlay);

    // Close handlers
    const closeBtn = helpBox.querySelector('#closeHelp');
    closeBtn.addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === '?') {
            overlay.remove();
        }
    }, { once: true });

    // Hover effect for close button
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'var(--accent-hover)';
    });
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'var(--accent-color)';
    });
}

// Section Reading Progress Tracking
function initSectionProgress() {
    const sections = document.querySelectorAll('.section');
    const sectionProgress = new Map();

    sections.forEach(section => {
        sectionProgress.set(section.id, {
            viewed: false,
            scrolledPercentage: 0,
            timeSpent: 0,
            entryTime: null
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: Array.from({ length: 101 }, (_, i) => i / 100) // 0% to 100% in 1% increments
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const sectionId = entry.target.id;
            if (!sectionId || !sectionProgress.has(sectionId)) return;

            const progress = sectionProgress.get(sectionId);

            if (entry.isIntersecting) {
                // Section entered viewport
                if (!progress.entryTime) {
                    progress.entryTime = Date.now();
                }
                progress.viewed = true;

                // Update scroll percentage based on intersection ratio
                const newPercentage = Math.round(entry.intersectionRatio * 100);
                if (newPercentage > progress.scrolledPercentage) {
                    progress.scrolledPercentage = newPercentage;
                }
            } else {
                // Section left viewport - calculate time spent
                if (progress.entryTime) {
                    const timeInSection = Date.now() - progress.entryTime;
                    progress.timeSpent += timeInSection;
                    progress.entryTime = null;
                }
            }

            sectionProgress.set(sectionId, progress);
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // Store progress data periodically and on page unload
    window.addEventListener('beforeunload', () => {
        // Calculate final time for any active sections
        sectionProgress.forEach((progress, sectionId) => {
            if (progress.entryTime) {
                progress.timeSpent += Date.now() - progress.entryTime;
            }

            // Track section engagement
            if (progress.viewed) {
                trackEvent('section_view', {
                    'event_category': 'engagement',
                    'section_id': sectionId,
                    'scrolled_percentage': progress.scrolledPercentage,
                    'time_spent_seconds': Math.round(progress.timeSpent / 1000)
                });
            }
        });
    });

    // Make progress data accessible globally for debugging
    window.getSectionProgress = () => {
        const progressData = {};
        sectionProgress.forEach((progress, sectionId) => {
            progressData[sectionId] = {
                ...progress,
                timeSpentSeconds: Math.round(progress.timeSpent / 1000)
            };
        });
        console.table(progressData);
        return progressData;
    };
}

// Initialize all functionality
function init() {
    // Load BibTeX data
    loadBibtexData();

    // Initialize publication filters
    initPublicationFilters();

    // Initialize keyboard shortcuts
    initKeyboardShortcuts();

    // Initialize section progress tracking
    initSectionProgress();

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

    // Track CV downloads with enhanced metadata
    const cvLinks = document.querySelectorAll('a[href*="cv"]');
    cvLinks.forEach(link => {
        link.addEventListener('click', () => {
            const linkText = link.textContent.trim();
            const linkLocation = link.closest('section')?.id || 'unknown_section';
            const isQuickAction = link.closest('.quick-action-menu') !== null;

            trackEvent('cv_download', {
                'event_category': 'engagement',
                'event_label': 'cv_pdf_download',
                'download_source': linkLocation,
                'is_quick_action': isQuickAction,
                'button_text': linkText,
                'timestamp': new Date().toISOString()
            });

            // Track file download event
            trackEvent('file_download', {
                'event_category': 'downloads',
                'event_label': 'CV',
                'file_type': 'PDF',
                'file_name': 'msadeqsirjani-cv.pdf'
            });
        });
    });

    // Track social media clicks with enhanced metadata
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', () => {
            const href = link.getAttribute('href');
            const linkLocation = link.closest('section')?.id || 'hero';
            let platform = 'unknown';
            let category = 'social_media';

            if (href.includes('linkedin')) {
                platform = 'linkedin';
                category = 'professional_network';
            } else if (href.includes('github')) {
                platform = 'github';
                category = 'code_repository';
            } else if (href.includes('scholar.google')) {
                platform = 'google_scholar';
                category = 'academic_profile';
            } else if (href.includes('orcid')) {
                platform = 'orcid';
                category = 'academic_profile';
            } else if (href.includes('researchgate')) {
                platform = 'researchgate';
                category = 'academic_profile';
            } else if (href.includes('twitter')) {
                platform = 'twitter';
                category = 'social_media';
            } else if (href.includes('mailto')) {
                platform = 'email';
                category = 'contact';
            }

            trackEvent('social_media_click', {
                'event_category': 'engagement',
                'event_label': platform,
                'platform_category': category,
                'link_location': linkLocation,
                'destination_url': href
            });

            // Track academic profile visits separately
            if (category === 'academic_profile') {
                trackEvent('academic_profile_visit', {
                    'event_category': 'academic_engagement',
                    'event_label': platform,
                    'profile_type': platform
                });
            }
        });
    });

    // Track publication link clicks with detailed metadata
    const publicationLinks = document.querySelectorAll('.publication-btn, .publication-item a');
    publicationLinks.forEach(link => {
        link.addEventListener('click', () => {
            const href = link.getAttribute('href');
            const publicationItem = link.closest('.publication-item');
            const publicationTitle = publicationItem?.querySelector('.publication-title')?.textContent?.trim() || 'unknown';
            const publicationVenue = publicationItem?.querySelector('.publication-venue')?.textContent?.trim() || 'unknown';
            const publicationCategory = publicationItem?.closest('.publication-category')?.querySelector('h3')?.textContent?.trim() || 'unknown';

            let linkType = 'external_link';
            let publisher = 'unknown';

            if (href && href.includes('doi.org')) {
                linkType = 'doi_link';
                publisher = 'DOI';
            } else if (href && href.includes('ieee')) {
                linkType = 'ieee_link';
                publisher = 'IEEE';
            } else if (href && href.includes('springer')) {
                linkType = 'springer_link';
                publisher = 'Springer';
            } else if (href && href.includes('acm')) {
                linkType = 'acm_link';
                publisher = 'ACM';
            } else if (href && href.includes('arxiv')) {
                linkType = 'arxiv_link';
                publisher = 'arXiv';
            } else if (href && href.includes('.pdf')) {
                linkType = 'pdf_download';
                publisher = 'Direct PDF';
            } else if (href && href.includes('scholar.google')) {
                linkType = 'google_scholar';
                publisher = 'Google Scholar';
            }

            trackEvent('publication_click', {
                'event_category': 'research_engagement',
                'event_label': linkType,
                'publication_title': publicationTitle.substring(0, 100),
                'publication_venue': publicationVenue.substring(0, 50),
                'publication_type': publicationCategory,
                'publisher': publisher,
                'link_url': href
            });

            // Track specific publication view
            trackEvent('publication_view', {
                'event_category': 'publications',
                'event_label': publicationTitle.substring(0, 100),
                'venue': publicationVenue.substring(0, 50),
                'type': publicationCategory
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