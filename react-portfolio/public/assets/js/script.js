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

// Theme Management - Initialize based on system preference
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
let currentTheme = localStorage.getItem('theme') || (systemPrefersDark ? 'dark' : 'light');
initializeTheme();

function initializeTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    initializeTheme();
}

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
        themeToggle.setAttribute('data-tooltip', 'Light mode');
    } else {
        icon.className = 'fas fa-moon';
        themeToggle.setAttribute('data-tooltip', 'Dark mode');
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

// Publication Show More/Less
function initShowMore() {
    const publicationItems = document.querySelectorAll('.publication-item');
    const showMoreBtn = document.getElementById('showMoreBtn');
    const INITIAL_SHOW_COUNT = 3; // Show first 3 publications initially
    const MIN_COUNT_FOR_BUTTON = 6; // Only show button if there are more than 6 publications

    if (!showMoreBtn || publicationItems.length <= MIN_COUNT_FOR_BUTTON) return;

    let isExpanded = false;

    // Initially hide publications beyond the first 3
    publicationItems.forEach((item, index) => {
        if (index >= INITIAL_SHOW_COUNT) {
            item.classList.add('collapsed');
        }
    });

    // Show the button
    showMoreBtn.style.display = 'inline-flex';

    showMoreBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;

        publicationItems.forEach((item, index) => {
            if (index >= INITIAL_SHOW_COUNT && !item.classList.contains('hidden')) {
                if (isExpanded) {
                    item.classList.remove('collapsed');
                } else {
                    item.classList.add('collapsed');
                }
            }
        });

        // Update button text and icon
        const textSpan = showMoreBtn.querySelector('.show-more-text');
        textSpan.textContent = isExpanded ? 'Show Less' : 'Show More';
        showMoreBtn.classList.toggle('expanded', isExpanded);

        // Scroll to publications section if collapsing
        if (!isExpanded) {
            const publicationsSection = document.getElementById('publications');
            if (publicationsSection) {
                const offsetTop = publicationsSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
}

// Publication Search and Filter
function initPublicationFilters() {
    const searchInput = document.getElementById('publicationSearch');
    const clearSearchBtn = document.getElementById('clearSearch');
    const statusFilter = document.getElementById('statusFilter');
    const yearFilter = document.getElementById('yearFilter');
    const resetBtn = document.getElementById('resetFilters');
    const publicationItems = document.querySelectorAll('.publication-item');
    const showMoreBtn = document.getElementById('showMoreBtn');

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

        // Show/hide the "Show More" button based on visible items
        if (showMoreBtn) {
            if (visibleCount > 6) {
                showMoreBtn.style.display = 'inline-flex';
            } else {
                showMoreBtn.style.display = 'none';
            }
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

    // Initial filter
    filterPublications();
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

// Pull-to-Refresh for Mobile
function initPullToRefresh() {
    // Only enable on mobile devices
    if (window.innerWidth > 768) return;

    const pullToRefresh = document.getElementById('pullToRefresh');
    if (!pullToRefresh) return;

    let startY = 0;
    let currentY = 0;
    let pulling = false;
    const threshold = 80; // Distance to pull before refresh triggers

    document.addEventListener('touchstart', (e) => {
        // Only trigger if at top of page
        if (window.scrollY === 0) {
            startY = e.touches[0].pageY;
            pulling = true;
        }
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (!pulling) return;

        currentY = e.touches[0].pageY;
        const distance = currentY - startY;

        // Only pull down (positive distance) when at top
        if (distance > 0 && window.scrollY === 0) {
            e.preventDefault();

            pullToRefresh.classList.add('pulling');

            // Update circular progress
            const progressCircle = pullToRefresh.querySelector('.pull-to-refresh-progress circle');
            const progress = Math.min(distance / threshold, 1);
            const circumference = 138.2;
            const offset = circumference - (progress * circumference);
            progressCircle.style.strokeDashoffset = offset;

            // Change state when past threshold
            if (distance > threshold) {
                pullToRefresh.classList.add('ready');
            } else {
                pullToRefresh.classList.remove('ready');
            }
        }
    }, { passive: false });

    document.addEventListener('touchend', async () => {
        if (!pulling) return;

        const distance = currentY - startY;
        pulling = false;

        if (distance > threshold) {
            // Trigger refresh
            pullToRefresh.classList.add('refreshing');
            pullToRefresh.classList.remove('pulling', 'ready');

            // Perform refresh action
            await performRefresh();

            // Hide refresh indicator
            setTimeout(() => {
                pullToRefresh.classList.remove('refreshing');
            }, 500);
        } else {
            // Cancel pull
            pullToRefresh.classList.remove('pulling', 'ready');
        }

        startY = 0;
        currentY = 0;
    }, { passive: true });
}

// Perform refresh action
async function performRefresh() {
    // Reload the page content or fetch new data
    // For now, just reload the page
    return new Promise((resolve) => {
        setTimeout(() => {
            window.location.reload();
            resolve();
        }, 1000);
    });
}

// Initialize all functionality
function init() {
    // Load BibTeX data
    loadBibtexData();

    // Initialize show more/less for publications
    initShowMore();

    // Initialize publication filters
    initPublicationFilters();

    // Initialize section progress tracking
    initSectionProgress();

    // Initialize pull-to-refresh for mobile
    initPullToRefresh();

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

// ============================================
// Enhanced Citation Copy System with BibTeX Data
// ============================================

class CitationManager {
    constructor() {
        this.bibtexData = {};
        this.loadBibtexData();
    }

    async loadBibtexData() {
        try {
            const response = await fetch('assets/data/bibtex.json');
            this.bibtexData = await response.json();
            this.initializeCitationButtons();
        } catch (error) {
            console.error('Failed to load BibTeX data:', error);
            this.initializeCitationButtons();
        }
    }

    // Parse BibTeX entry to extract structured data
    parseBibtex(bibtexString) {
        const data = {
            authors: [],
            title: '',
            year: '',
            venue: '',
            volume: '',
            number: '',
            pages: '',
            doi: '',
            url: '',
            publisher: '',
            journal: '',
            booktitle: ''
        };

        if (!bibtexString) return data;

        // Extract author
        const authorMatch = bibtexString.match(/author\s*=\s*\{([^}]+)\}/i);
        if (authorMatch) {
            const authorStr = authorMatch[1];
            // Split by 'and' to get individual authors
            const authorList = authorStr.split(' and ').map(a => a.trim());
            data.authors = authorList.map(author => {
                // Handle "Last, First" or "First Last" format
                if (author.includes(',')) {
                    const parts = author.split(',').map(p => p.trim());
                    return { last: parts[0], first: parts[1] || '' };
                } else {
                    const parts = author.split(' ');
                    return {
                        first: parts.slice(0, -1).join(' '),
                        last: parts[parts.length - 1]
                    };
                }
            });
        }

        // Extract title
        const titleMatch = bibtexString.match(/title\s*=\s*\{([^}]+)\}/i);
        if (titleMatch) data.title = titleMatch[1].trim();

        // Extract year
        const yearMatch = bibtexString.match(/year\s*=\s*\{([^}]+)\}/i);
        if (yearMatch) data.year = yearMatch[1].trim();

        // Extract journal
        const journalMatch = bibtexString.match(/journal\s*=\s*\{([^}]+)\}/i);
        if (journalMatch) data.journal = journalMatch[1].trim();

        // Extract booktitle
        const booktitleMatch = bibtexString.match(/booktitle\s*=\s*\{([^}]+)\}/i);
        if (booktitleMatch) data.booktitle = booktitleMatch[1].trim();

        // Extract volume
        const volumeMatch = bibtexString.match(/volume\s*=\s*\{([^}]+)\}/i);
        if (volumeMatch) data.volume = volumeMatch[1].trim();

        // Extract number
        const numberMatch = bibtexString.match(/number\s*=\s*\{([^}]+)\}/i);
        if (numberMatch) data.number = numberMatch[1].trim();

        // Extract pages
        const pagesMatch = bibtexString.match(/pages\s*=\s*\{([^}]+)\}/i);
        if (pagesMatch) data.pages = pagesMatch[1].trim();

        // Extract DOI
        const doiMatch = bibtexString.match(/doi\s*=\s*\{([^}]+)\}/i);
        if (doiMatch) data.doi = doiMatch[1].trim();

        // Extract URL
        const urlMatch = bibtexString.match(/url\s*=\s*\{([^}]+)\}/i);
        if (urlMatch) data.url = urlMatch[1].trim();

        // Extract publisher
        const publisherMatch = bibtexString.match(/publisher\s*=\s*\{([^}]+)\}/i);
        if (publisherMatch) data.publisher = publisherMatch[1].trim();

        data.venue = data.journal || data.booktitle || '';

        return data;
    }

    // Format author name for APA
    formatAuthorAPA(author) {
        if (!author.last) return '';
        const firstInitial = author.first ? author.first.charAt(0) + '.' : '';
        return `${author.last}, ${firstInitial}`.trim();
    }

    // Format author name for MLA
    formatAuthorMLA(author, isFirst = false) {
        if (!author.last) return '';
        if (isFirst) {
            return `${author.last}, ${author.first}`.trim();
        }
        return `${author.first} ${author.last}`.trim();
    }

    // Format author name for Chicago
    formatAuthorChicago(author, isFirst = false) {
        if (!author.last) return '';
        if (isFirst) {
            return `${author.last}, ${author.first}`.trim();
        }
        return `${author.first} ${author.last}`.trim();
    }

    // Generate APA citation from BibTeX data
    generateAPA(pubId) {
        const bibtex = this.bibtexData[pubId]?.bibtex;
        if (!bibtex) return '';

        const data = this.parseBibtex(bibtex);
        let citation = '';

        // Authors
        if (data.authors.length > 0) {
            if (data.authors.length === 1) {
                citation += this.formatAuthorAPA(data.authors[0]);
            } else if (data.authors.length === 2) {
                citation += `${this.formatAuthorAPA(data.authors[0])}, & ${this.formatAuthorAPA(data.authors[1])}`;
            } else {
                const authorList = data.authors.slice(0, -1).map(a => this.formatAuthorAPA(a)).join(', ');
                citation += `${authorList}, & ${this.formatAuthorAPA(data.authors[data.authors.length - 1])}`;
            }
        }

        // Year
        if (data.year) {
            citation += ` (${data.year}).`;
        }

        // Title
        if (data.title) {
            citation += ` ${data.title}.`;
        }

        // Venue (journal or conference)
        if (data.venue) {
            citation += ` ${data.venue}`;
            if (data.volume) {
                citation += `, ${data.volume}`;
                if (data.number) {
                    citation += `(${data.number})`;
                }
            }
            if (data.pages) {
                citation += `, ${data.pages}`;
            }
            citation += '.';
        }

        // DOI
        if (data.doi) {
            citation += ` https://doi.org/${data.doi}`;
        }

        return citation.trim();
    }

    // Generate MLA citation from BibTeX data
    generateMLA(pubId) {
        const bibtex = this.bibtexData[pubId]?.bibtex;
        if (!bibtex) return '';

        const data = this.parseBibtex(bibtex);
        let citation = '';

        // Authors
        if (data.authors.length > 0) {
            if (data.authors.length === 1) {
                citation += this.formatAuthorMLA(data.authors[0], true);
            } else if (data.authors.length === 2) {
                citation += `${this.formatAuthorMLA(data.authors[0], true)}, and ${this.formatAuthorMLA(data.authors[1])}`;
            } else {
                citation += `${this.formatAuthorMLA(data.authors[0], true)}, et al`;
            }
            citation += '.';
        }

        // Title
        if (data.title) {
            citation += ` "${data.title}."`;
        }

        // Venue
        if (data.venue) {
            citation += ` ${data.venue}`;
        }

        // Volume and number
        if (data.volume) {
            citation += `, vol. ${data.volume}`;
            if (data.number) {
                citation += `, no. ${data.number}`;
            }
        }

        // Year
        if (data.year) {
            citation += `, ${data.year}`;
        }

        // Pages
        if (data.pages) {
            citation += `, pp. ${data.pages}`;
        }

        citation += '.';

        // DOI
        if (data.doi) {
            citation += ` https://doi.org/${data.doi}`;
        }

        return citation.trim();
    }

    // Generate Chicago citation from BibTeX data
    generateChicago(pubId) {
        const bibtex = this.bibtexData[pubId]?.bibtex;
        if (!bibtex) return '';

        const data = this.parseBibtex(bibtex);
        let citation = '';

        // Authors
        if (data.authors.length > 0) {
            if (data.authors.length === 1) {
                citation += this.formatAuthorChicago(data.authors[0], true);
            } else if (data.authors.length === 2) {
                citation += `${this.formatAuthorChicago(data.authors[0], true)}, and ${this.formatAuthorChicago(data.authors[1])}`;
            } else if (data.authors.length === 3) {
                citation += `${this.formatAuthorChicago(data.authors[0], true)}, ${this.formatAuthorChicago(data.authors[1])}, and ${this.formatAuthorChicago(data.authors[2])}`;
            } else {
                const authorList = data.authors.slice(0, -1).map((a, i) => this.formatAuthorChicago(a, i === 0)).join(', ');
                citation += `${authorList}, and ${this.formatAuthorChicago(data.authors[data.authors.length - 1])}`;
            }
            citation += '.';
        }

        // Title
        if (data.title) {
            citation += ` "${data.title}."`;
        }

        // Venue
        if (data.venue) {
            citation += ` ${data.venue}`;
        }

        // Volume and number
        if (data.volume) {
            citation += ` ${data.volume}`;
            if (data.number) {
                citation += `, no. ${data.number}`;
            }
        }

        // Year
        if (data.year) {
            citation += ` (${data.year})`;
        }

        // Pages
        if (data.pages) {
            citation += `: ${data.pages}`;
        }

        citation += '.';

        // DOI
        if (data.doi) {
            citation += ` https://doi.org/${data.doi}.`;
        }

        return citation.trim();
    }

    initializeCitationButtons() {
        const publications = document.querySelectorAll('.publication-item');

        publications.forEach(pub => {
            // Get the publication ID from the BibTeX button
            const bibtexBtn = pub.querySelector('button[onclick*="copyBibtex"]');
            if (!bibtexBtn) return;

            const onclickAttr = bibtexBtn.getAttribute('onclick');
            const pubIdMatch = onclickAttr.match(/copyBibtex\(['"]([^'"]+)['"]\)/);
            if (!pubIdMatch) return;

            const pubId = pubIdMatch[1];

            // Replace the BibTeX button with unified citation dropdown
            const citationDropdown = this.createCitationDropdown(pubId);
            if (bibtexBtn.parentElement) {
                bibtexBtn.parentElement.replaceChild(citationDropdown, bibtexBtn);
            }
        });
    }

    createCitationDropdown(pubId) {
        const container = document.createElement('div');
        container.className = 'citation-dropdown';
        container.style.position = 'relative';
        container.style.display = 'inline-block';

        const button = document.createElement('button');
        button.className = 'publication-btn citation-format-btn';
        button.setAttribute('data-tooltip', 'Copy citation');
        button.setAttribute('aria-label', 'Copy citation in different formats');
        button.innerHTML = '<i class="fas fa-quote-right" aria-hidden="true"></i>';

        const menu = document.createElement('div');
        menu.className = 'citation-format-menu';
        menu.innerHTML = `
            <button class="citation-option" data-format="bibtex">BibTeX</button>
            <button class="citation-option" data-format="apa">APA</button>
            <button class="citation-option" data-format="mla">MLA</button>
            <button class="citation-option" data-format="chicago">Chicago</button>
        `;

        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            // Close all other open menus
            document.querySelectorAll('.citation-format-menu.show').forEach(m => {
                if (m !== menu) m.classList.remove('show');
            });

            menu.classList.toggle('show');
        });

        // Handle format selection
        menu.querySelectorAll('.citation-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const format = option.getAttribute('data-format');
                this.copyCitation(pubId, format);
                menu.classList.remove('show');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!container.contains(e.target)) {
                menu.classList.remove('show');
            }
        });

        container.appendChild(button);
        container.appendChild(menu);
        return container;
    }

    copyCitation(pubId, format) {
        let citation = '';

        switch(format) {
            case 'bibtex':
                citation = this.bibtexData[pubId]?.bibtex || '';
                break;
            case 'apa':
                citation = this.generateAPA(pubId);
                break;
            case 'mla':
                citation = this.generateMLA(pubId);
                break;
            case 'chicago':
                citation = this.generateChicago(pubId);
                break;
        }

        if (!citation) {
            this.showToast('Citation not available', true);
            return;
        }

        // Copy to clipboard
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(citation).then(() => {
                this.showToast(`${format.toUpperCase()} citation copied!`);

                // Track citation copy
                if (typeof trackEvent !== 'undefined') {
                    trackEvent('copy_citation', {
                        'event_category': 'engagement',
                        'event_label': format,
                        'publication_id': pubId
                    });
                }
            }).catch(() => {
                this.showToast('Failed to copy citation', true);
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = citation;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showToast(`${format.toUpperCase()} citation copied!`);

            // Track citation copy
            if (typeof trackEvent !== 'undefined') {
                trackEvent('copy_citation', {
                    'event_category': 'engagement',
                    'event_label': format,
                    'publication_id': pubId,
                    'method': 'fallback'
                });
            }
        }
    }

    showToast(message, isError = false) {
        if (typeof Toastify !== 'undefined') {
            Toastify({
                text: message,
                duration: 3000,
                gravity: "top",
                position: "left",
                style: {
                    background: isError ? "#ef4444" : "var(--accent-color)",
                }
            }).showToast();
        }
    }
}

// Initialize citation manager
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.citationManager = new CitationManager();
    });
} else {
    window.citationManager = new CitationManager();
}

// ============================================
// QR Code Generator for Mobile Access
// ============================================

class QRCodeGenerator {
    constructor(url, containerId) {
        this.url = url;
        this.canvas = document.getElementById('qrcode');
        this.image = document.getElementById('qrcode-image');
        if (this.canvas) {
            this.generateQRCode();
        }
    }

    generateQRCode() {
        // Simple QR code generation using Google Charts API
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(this.url)}`;

        // Set the QR code image
        if (this.image) {
            this.image.src = qrUrl;
            this.image.style.maxWidth = '150px';
            this.image.style.border = '2px solid var(--border-color)';
            this.image.style.borderRadius = '8px';
            this.image.style.padding = '8px';
            this.image.style.background = 'white';
        }
    }
}

// Initialize QR code
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.qrGenerator = new QRCodeGenerator('https://msadeqsirjani.com', 'qrcode');
    });
} else {
    window.qrGenerator = new QRCodeGenerator('https://msadeqsirjani.com', 'qrcode');
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', init);