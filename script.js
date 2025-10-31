// ============================================================================
// Smooth Scrolling for Navigation Links
// ============================================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// ============================================================================
// Scroll Animation for Cards (Intersection Observer)
// ============================================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all project and skill cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.project-card, .skill-card');
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});


// ============================================================================
// Active Navigation Link on Scroll
// ============================================================================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--primary)';
        }
    });
});


// ============================================================================
// Navbar Background Change on Scroll
// ============================================================================

window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    } else {
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});


// ============================================================================
// Dynamic Year in Footer
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('footer p');
    const currentYear = new Date().getFullYear();
    
    if (footer) {
        footer.innerHTML = `&copy; ${currentYear} Your Name. All rights reserved. Built with HTML, CSS, and ❤️`;
    }
});


// ============================================================================
// Add Typing Effect to Hero Title (Optional Enhancement)
// ============================================================================

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect on page load
// document.addEventListener('DOMContentLoaded', () => {
//     const heroTitle = document.querySelector('.hero h1');
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText, 80);
// });


// ============================================================================
// Project Card Click Analytics (Optional)
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    const projectLinks = document.querySelectorAll('.project-links a');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const projectName = link.closest('.project-card').querySelector('h3').textContent;
            const linkType = link.textContent.includes('Demo') ? 'demo' : 
                           link.textContent.includes('GitHub') ? 'github' : 'blog';
            
            console.log(`Clicked ${linkType} for project: ${projectName}`);
            
            // Add Google Analytics tracking here if needed
            // gtag('event', 'click', {
            //     event_category: 'Project Link',
            //     event_label: `${projectName} - ${linkType}`
            // });
        });
    });
});


// ============================================================================
// Mobile Menu Toggle (if you want to add hamburger menu)
// ============================================================================

function createMobileMenu() {
    const nav = document.querySelector('nav .container');
    const navList = document.querySelector('nav ul');
    
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '☰';
    hamburger.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--primary);
    `;
    
    // Add hamburger to nav
    nav.appendChild(hamburger);
    
    // Toggle menu on click
    hamburger.addEventListener('click', () => {
        navList.classList.toggle('active');
    });
    
    // Show hamburger on mobile
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    function handleMediaChange(e) {
        if (e.matches) {
            hamburger.style.display = 'block';
            navList.style.cssText = `
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: white;
                flex-direction: column;
                padding: 1rem 0;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                display: none;
            `;
        } else {
            hamburger.style.display = 'none';
            navList.style.cssText = '';
        }
    }
    
    mediaQuery.addListener(handleMediaChange);
    handleMediaChange(mediaQuery);
    
    // Add active class toggle
    const style = document.createElement('style');
    style.textContent = `
        nav ul.active {
            display: flex !important;
        }
    `;
    document.head.appendChild(style);
}

// Uncomment to enable mobile menu
// document.addEventListener('DOMContentLoaded', createMobileMenu);


// ============================================================================
// Scroll to Top Button (Optional)
// ============================================================================

function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s, transform 0.3s;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(button);
    
    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
        } else {
            button.style.opacity = '0';
        }
    });
    
    // Scroll to top on click
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
}

// Uncomment to enable scroll to top button
// document.addEventListener('DOMContentLoaded', createScrollToTopButton);


// ============================================================================
// Form Validation (if you add a contact form)
// ============================================================================

function validateContactForm() {
    const form = document.querySelector('#contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = form.querySelector('#name').value.trim();
            const email = form.querySelector('#email').value.trim();
            const message = form.querySelector('#message').value.trim();
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // If validation passes, submit form
            console.log('Form submitted:', { name, email, message });
            alert('Message sent successfully!');
            form.reset();
        });
    }
}

// Uncomment if you add a contact form
// document.addEventListener('DOMContentLoaded', validateContactForm);


// ============================================================================
// Dark Mode Toggle (Optional Enhancement)
// ============================================================================

function createDarkModeToggle() {
    const toggle = document.createElement('button');
    toggle.innerHTML = '🌙';
    toggle.className = 'dark-mode-toggle';
    toggle.style.cssText = `
        position: fixed;
        top: 5rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--card-bg);
        border: 2px solid var(--primary);
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        transition: transform 0.3s;
    `;
    
    document.body.appendChild(toggle);
    
    // Check for saved preference
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        enableDarkMode();
        toggle.innerHTML = '☀️';
    }
    
    toggle.addEventListener('click', () => {
        const darkMode = localStorage.getItem('darkMode');
        
        if (darkMode !== 'enabled') {
            enableDarkMode();
            toggle.innerHTML = '☀️';
        } else {
            disableDarkMode();
            toggle.innerHTML = '🌙';
        }
    });
    
    toggle.addEventListener('mouseenter', () => {
        toggle.style.transform = 'scale(1.1) rotate(15deg)';
    });
    
    toggle.addEventListener('mouseleave', () => {
        toggle.style.transform = 'scale(1) rotate(0deg)';
    });
}

function enableDarkMode() {
    document.documentElement.style.setProperty('--light', '#1e293b');
    document.documentElement.style.setProperty('--dark', '#f8fafc');
    document.documentElement.style.setProperty('--card-bg', '#334155');
    document.documentElement.style.setProperty('--gray', '#cbd5e1');
    document.body.style.background = '#0f172a';
    localStorage.setItem('darkMode', 'enabled');
}

function disableDarkMode() {
    document.documentElement.style.setProperty('--light', '#f8fafc');
    document.documentElement.style.setProperty('--dark', '#1e293b');
    document.documentElement.style.setProperty('--card-bg', '#ffffff');
    document.documentElement.style.setProperty('--gray', '#64748b');
    document.body.style.background = '#f8fafc';
    localStorage.setItem('darkMode', null);
}

// Uncomment to enable dark mode toggle
// document.addEventListener('DOMContentLoaded', createDarkModeToggle);


// ============================================================================
// Console Message (Easter Egg)
// ============================================================================

console.log('%c👋 Hey there!', 'font-size: 24px; font-weight: bold; color: #2563eb;');
console.log('%cInterested in how I built this portfolio?', 'font-size: 16px; color: #64748b;');
console.log('%cCheck out the code on GitHub!', 'font-size: 16px; color: #10b981;');
console.log('%c→ github.com/yourusername', 'font-size: 14px; color: #2563eb;');