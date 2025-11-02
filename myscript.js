// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navbar.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        navbar.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Sticky header on scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    header.classList.toggle('sticky', window.scrollY > 100);
});

// Scroll to top button
const scrollTopBtn = document.createElement('a');
scrollTopBtn.href = '#';
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

// Smooth scrolling for all links
const allLinks = document.querySelectorAll('a[href^="#"]');
allLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Set active link on scroll
const sections = document.querySelectorAll('section');

function setActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
};

// Initial check for elements in viewport
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Download CV button
const downloadBtn = document.getElementById('download-resume');
if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Replace with your actual CV download link
        const downloadLink = '#'; // Add your CV download link here
        if (downloadLink !== '#') {
            window.open(downloadLink, '_blank');
        } else {
            // If no download link is provided, show a message
            alert('CV download link will be available soon!');
        }
    });
}

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Add animation classes to elements
function addAnimationClasses() {
    const elements = document.querySelectorAll('.section-title, .skill-category, .project-card, .contact-info, .contact-form');
    elements.forEach((element, index) => {
        element.classList.add('animate');
        element.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Initialize animations
window.addEventListener('load', () => {
    addAnimationClasses();
    animateOnScroll();
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.transition = 'opacity 0.5s ease';
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Add animation to skills and projects on scroll
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category, .project-card').forEach(element => {
    element.classList.add('animate');
    observer.observe(element);
});
