// Modern JavaScript for Souptik's Portfolio

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    initializeWebsite();
});

function initializeWebsite() {
    setupNavigation();
    setupGreeting();
    setupScrollAnimations();
    setupContactForm();
    loadProjects();
    setupParticles();
}

// Navigation functionality
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Dynamic greeting based on time
function setupGreeting() {
    const greetingElement = document.querySelector('.greeting');
    if (!greetingElement) return;

    const hour = new Date().getHours();
    let greeting;

    if (hour < 12) {
        greeting = "Good Morning! ☀️";
    } else if (hour < 18) {
        greeting = "Good Afternoon! 🌤️";
    } else {
        greeting = "Good Evening! 🌙";
    }

    // Typewriter effect for greeting
    let i = 0;
    const typeWriter = () => {
        if (i < greeting.length) {
            greetingElement.textContent += greeting.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    greetingElement.textContent = '';
    typeWriter();
}

// Scroll animations
function setupScrollAnimations() {
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

    // Observe all sections and project cards
    document.querySelectorAll('.section, .project-card, .skill-category').forEach(el => {
        observer.observe(el);
    });
}

// Enhanced contact form functionality
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    // Add real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField.call(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            showNotification('Please fix the errors in the form.', 'error');
            return;
        }
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.btn-submit');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission with more realistic delay
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            // Get form data for personalized message
            const name = formData.get('name');
            const subject = formData.get('subject');
            
            // Show success message
            showNotification(`Thank you ${name}! Your message about "${subject}" has been sent. I'll respond within 24 hours.`, 'success');
            contactForm.reset();
            
            // Add confetti effect
            createConfetti();
            
        } catch (error) {
            showNotification('Failed to send message. Please try again or contact me directly at hello@souptik.me', 'error');
        } finally {
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
}

function validateField() {
    const field = this;
    const value = field.value.trim();
    
    // Remove existing error
    clearError.call(field);
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    if (field.name === 'name' && value && value.length < 2) {
        showFieldError(field, 'Name must be at least 2 characters');
        return false;
    }
    
    if (field.name === 'message' && value && value.length < 10) {
        showFieldError(field, 'Message must be at least 10 characters');
        return false;
    }
    
    return true;
}

function clearError() {
    const field = this;
    const errorEl = field.parentNode.querySelector('.field-error');
    if (errorEl) {
        errorEl.remove();
    }
    field.style.borderColor = 'var(--border)';
}

function showFieldError(field, message) {
    field.style.borderColor = '#ef4444';
    
    const errorEl = document.createElement('div');
    errorEl.className = 'field-error';
    errorEl.textContent = message;
    errorEl.style.cssText = `
        color: #ef4444;
        font-size: 0.8rem;
        margin-top: 0.25rem;
        display: flex;
        align-items: center;
        gap: 0.25rem;
    `;
    
    field.parentNode.appendChild(errorEl);
}

// Confetti effect for successful form submission
function createConfetti() {
    const colors = ['#6366f1', '#14b8a6', '#fbbf24', '#8b5cf6'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -10px;
                left: ${Math.random() * 100}vw;
                z-index: 10000;
                border-radius: 50%;
                animation: confettiFall 3s ease-out forwards;
                pointer-events: none;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }, i * 50);
    }
}

// Load and display projects
let allProjects = [];
let displayedProjects = 0;
const projectsPerPage = 6;

async function loadProjects() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;

    try {
        projectsContainer.innerHTML = '<div class="loading">Loading projects...</div>';
        
        // First try to fetch, if it fails, use embedded data
        let projects;
        try {
            const response = await fetch('./data.json');
            if (!response.ok) throw new Error('Fetch failed');
            projects = await response.json();
        } catch (fetchError) {
            console.log('Fetch failed, using embedded data');
            // Fallback to embedded project data
            projects = getEmbeddedProjects();
        }
        
        allProjects = projects;
        
        // Sort projects - featured first, then by project number
        allProjects.sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return a.projectNumber - b.projectNumber;
        });
        
        // Update project stats
        updateProjectStats();
        
        projectsContainer.innerHTML = '';
        displayInitialProjects();
        
    } catch (error) {
        console.error('Error loading projects:', error);
        // Use embedded data as final fallback
        allProjects = getEmbeddedProjects();
        updateProjectStats();
        projectsContainer.innerHTML = '';
        displayInitialProjects();
    }
}

// Embedded project data as fallback
function getEmbeddedProjects() {
    return [
        {
            "projectNumber": 1,
            "title": "Personal Portfolio",
            "repo": "https://github.com/souptik-samanta/souptik.me",
            "demo": "https://www.souptik.me/",
            "img": "https://cloud-jckcb4n5b-hack-club-bot.vercel.app/0image.png",
            "description": "My personal portfolio website built with HTML, CSS, and JavaScript. Features a responsive design, dark mode toggle, and interactive project gallery.",
            "featured": true,
            "tags": ["HTML", "CSS", "JavaScript", "Responsive"]
        },
        {
            "projectNumber": 2,
            "title": "Kommie-Keeb",
            "repo": "https://github.com/souptik-samanta/Kommie-keeb",
            "demo": "https://keyboard.souptik.me/",
            "img": "https://cdn.hackclubber.dev/slackcdn/73683540eab29ba12fd7827f61e20151.png",
            "description": "Kommie-keeb is an 88-key custom mechanical keyboard featuring an elegant ANSI layout, premium Cherry MX switches, and an OLED display on a custom PCB.",
            "featured": true,
            "tags": ["Hardware", "PCB Design", "Mechanical", "Custom"]
        },
        {
            "projectNumber": 3,
            "title": "Chaos Compiler",
            "repo": "https://github.com/souptik-samanta/ChaosCompiler",
            "demo": "",
            "img": "https://github.com/user-attachments/assets/dc984c80-3bb9-4fc6-a29b-69e23738e542",
            "description": "Chaos Compiler is a CoreXY-Cartesian hybrid 3D printer featuring a custom CoreXY design with a unique Z-axis. Built over 75+ hours with automatic multicolor printing support.",
            "featured": true,
            "tags": ["3D Printing", "Hardware", "CoreXY", "Engineering"]
        }
    ];
}

function displayInitialProjects() {
    const projectsContainer = document.getElementById('projects-container');
    const projectsToShow = allProjects.slice(0, projectsPerPage);
    
    projectsToShow.forEach((project, index) => {
        const projectCard = createProjectCard(project);
        projectCard.style.animationDelay = `${index * 0.1}s`;
        projectsContainer.appendChild(projectCard);
    });
    
    displayedProjects = projectsToShow.length;
    
    // Add load more button if there are more projects
    if (allProjects.length > projectsPerPage) {
        addLoadMoreButton();
    }
}

function loadMoreProjects() {
    const projectsContainer = document.getElementById('projects-container');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.textContent = 'Loading...';
        loadMoreBtn.disabled = true;
    }
    
    setTimeout(() => {
        const nextProjects = allProjects.slice(displayedProjects, displayedProjects + projectsPerPage);
        
        nextProjects.forEach((project, index) => {
            const projectCard = createProjectCard(project);
            projectCard.style.animationDelay = `${index * 0.1}s`;
            projectsContainer.insertBefore(projectCard, loadMoreBtn?.parentElement || null);
        });
        
        displayedProjects += nextProjects.length;
        
        if (loadMoreBtn) {
            if (displayedProjects >= allProjects.length) {
                loadMoreBtn.parentElement.remove();
            } else {
                loadMoreBtn.textContent = 'Load More Projects';
                loadMoreBtn.disabled = false;
            }
        }
    }, 500);
}

function addLoadMoreButton() {
    const projectsContainer = document.getElementById('projects-container');
    const loadMoreContainer = document.createElement('div');
    loadMoreContainer.className = 'load-more-container';
    loadMoreContainer.innerHTML = `
        <button onclick="loadMoreProjects()" class="btn btn-secondary load-more-btn">
            Load More Projects (${allProjects.length - displayedProjects} remaining)
        </button>
    `;
    projectsContainer.appendChild(loadMoreContainer);
}

function updateProjectStats() {
    const totalProjectsEl = document.getElementById('total-projects');
    const featuredProjectsEl = document.getElementById('featured-projects');
    const techStackEl = document.getElementById('tech-stack');
    
    if (totalProjectsEl) {
        animateNumber(totalProjectsEl, allProjects.length);
    }
    
    if (featuredProjectsEl) {
        const featuredCount = allProjects.filter(p => p.featured).length;
        animateNumber(featuredProjectsEl, featuredCount);
    }
    
    if (techStackEl) {
        // Count unique technologies from project tags
        const allTags = allProjects.flatMap(p => p.tags || []);
        const uniqueTags = [...new Set(allTags)];
        animateNumber(techStackEl, uniqueTags.length, '+');
    }
}

function animateNumber(element, targetNumber, suffix = '') {
    const startNumber = 0;
    const duration = 2000;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentNumber = Math.floor(startNumber + (targetNumber - startNumber) * progress);
        element.textContent = currentNumber + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Create project card element
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = `project-card fade-in ${project.featured ? 'featured' : ''}`;
    
    card.innerHTML = `
        ${project.featured ? '<div class="featured-badge">Featured</div>' : ''}
        ${project.img ? `<img src="${project.img}" alt="${project.title}" class="project-image" loading="lazy">` : ''}
        <div class="project-content">
            <div class="project-header">
                <h3 class="project-title">${project.title}</h3>
                <span class="project-number">#${project.projectNumber}</span>
            </div>
            <p class="project-description">${project.description || ''}</p>
            ${project.tags ? `
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            ` : ''}
            <div class="project-buttons">
                ${project.repo ? `
                    <a href="${project.repo}" target="_blank" rel="noopener noreferrer" class="project-btn btn-github">
                        <i data-lucide="github"></i>
                        <span>Code</span>
                    </a>
                ` : ''}
                ${project.demo ? `
                    <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="project-btn btn-demo">
                        <i data-lucide="external-link"></i>
                        <span>Live Demo</span>
                    </a>
                ` : ''}
            </div>
        </div>
    `;
    
    // Add error handling for images
    const img = card.querySelector('.project-image');
    if (img) {
        img.onerror = function() {
            this.src = 'https://via.placeholder.com/400x200/374151/ffffff?text=Project+Image';
        };
    }
    
    // Reinitialize Lucide icons for the new elements
    setTimeout(() => lucide.createIcons(), 0);
    
    return card;
}

// Enhanced particle system with more movement
function setupParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;

    // Create floating particles
    for (let i = 0; i < 40; i++) {
        createFloatingParticle(particlesContainer);
    }
    
    // Create additional background elements
    createBackgroundShapes();
    
    // Create moving wave effect
    createWaveEffect();
    
    // Create orbiting elements
    createOrbitingElements();
}

function createBackgroundShapes() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create floating geometric shapes
    const shapes = ['circle', 'triangle', 'square', 'diamond'];
    
    for (let i = 0; i < 12; i++) {
        const shape = document.createElement('div');
        shape.className = `bg-shape bg-shape-${shapes[i % shapes.length]}`;
        
        const size = Math.random() * 80 + 30;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const rotation = Math.random() * 360;
        const duration = Math.random() * 25 + 20;
        
        shape.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            top: ${y}%;
            opacity: 0.08;
            z-index: 1;
            animation: complexFloatShape ${duration}s ease-in-out infinite;
            animation-delay: ${Math.random() * 8}s;
        `;
        
        if (shapes[i % shapes.length] === 'circle') {
            shape.style.borderRadius = '50%';
            shape.style.background = `radial-gradient(circle, var(--primary-color), transparent)`;
        } else if (shapes[i % shapes.length] === 'triangle') {
            shape.style.background = `linear-gradient(45deg, var(--secondary-color), transparent)`;
            shape.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
        } else if (shapes[i % shapes.length] === 'diamond') {
            shape.style.background = `conic-gradient(from 0deg, var(--accent), transparent, var(--accent))`;
            shape.style.transform = `rotate(45deg)`;
        } else {
            shape.style.background = `linear-gradient(90deg, var(--accent), transparent)`;
            shape.style.transform = `rotate(${rotation}deg)`;
        }
        
        hero.appendChild(shape);
    }
}

// Create wave effect
function createWaveEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const wave = document.createElement('div');
    wave.className = 'wave-effect';
    wave.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"><path d="M0,96L40,80C80,64,160,32,240,42.7C320,53,400,107,480,122.7C560,139,640,117,720,96C800,75,880,53,960,58.7C1040,64,1120,96,1160,112L1200,128V0H1160C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0H0V96Z" fill="rgba(99,102,241,0.03)"/></svg>') repeat-x;
        z-index: 2;
        animation: waveMove 20s linear infinite;
        pointer-events: none;
    `;
    
    hero.appendChild(wave);
}

// Create orbiting elements
function createOrbitingElements() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 5; i++) {
        const orbit = document.createElement('div');
        orbit.className = 'orbit-element';
        
        const size = Math.random() * 6 + 4;
        const orbitSize = Math.random() * 300 + 200;
        const duration = Math.random() * 30 + 40;
        
        orbit.style.cssText = `
            position: absolute;
            width: ${orbitSize}px;
            height: ${orbitSize}px;
            left: 50%;
            top: 50%;
            margin-left: -${orbitSize/2}px;
            margin-top: -${orbitSize/2}px;
            border: 1px solid rgba(99, 102, 241, 0.1);
            border-radius: 50%;
            z-index: 1;
            animation: orbit ${duration}s linear infinite;
            animation-delay: ${i * 8}s;
        `;
        
        // Add orbiting particle
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, var(--secondary-color), transparent);
            border-radius: 50%;
            top: -${size/2}px;
            left: 50%;
            margin-left: -${size/2}px;
        `;
        
        orbit.appendChild(particle);
        hero.appendChild(orbit);
    }
}

function createFloatingParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    
    const size = Math.random() * 4 + 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 10 + 10;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.8), transparent);
        border-radius: 50%;
        left: ${x}%;
        top: ${y}%;
        animation: floatParticle ${duration}s linear infinite;
        pointer-events: none;
    `;
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        particle.remove();
        createFloatingParticle(container);
    }, duration * 1000);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Utility functions
function throttle(func, wait) {
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

// Performance optimizations
const optimizedScrollHandler = throttle(() => {
    // Handle scroll-based animations and effects
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Add floating particle animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .navbar.scrolled {
        background: rgba(15, 15, 35, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            right: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(15, 15, 35, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: right 0.3s ease;
        }
        
        .nav-menu.active {
            right: 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(style);

// Analytics and performance monitoring (optional)
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    });
}

// Service Worker registration (for PWA functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}