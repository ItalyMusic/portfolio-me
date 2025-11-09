// MGN STUDIO - Enhanced JavaScript File
// Advanced glassmorphism effects and professional interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initScrollAnimations();
    initTypedText();
    initSkillBars();
    initSkillsChart();
    initPortfolioFilter();
    initProjectModals();
    initContactForm();
    initParticles();
    initTextSplitting();
    initFAQ();
    initSkillHoverEffects();
    
    // Smooth scrolling for anchor links
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
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Animate menu items
            if (!mobileMenu.classList.contains('hidden')) {
                const menuItems = mobileMenu.querySelectorAll('a');
                anime({
                    targets: menuItems,
                    translateX: [50, 0],
                    opacity: [0, 1],
                    delay: anime.stagger(100),
                    duration: 400,
                    easing: 'easeOutQuart'
                });
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Animate skill bars when they come into view
                if (entry.target.classList.contains('skill-item')) {
                    animateSkillBar(entry.target);
                }
                
                // Animate stats numbers
                if (entry.target.querySelector('.stats-number')) {
                    animateStatsNumber(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all elements with reveal class
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

// Typed Text Animation
function initTypedText() {
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        const typed = new Typed('#typed-text', {
            strings: [
                'Crafting premium glassmorphism experiences',
                'Designing architectural digital interfaces',
                'Creating sophisticated visual narratives',
                'Building bridges between art and technology',
                'Transforming visions into glass reality'
            ],
            typeSpeed: 60,
            backSpeed: 35,
            backDelay: 2500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            autoInsertCss: true
        });
    }
}

// Text Splitting Animation
function initTextSplitting() {
    // Initialize Splitting.js for text animations
    if (typeof Splitting !== 'undefined') {
        Splitting();
        
        // Animate split text on homepage
        const heroTitle = document.querySelector('.hero-text[data-splitting]');
        if (heroTitle) {
            anime({
                targets: '.hero-text .char',
                translateY: [120, 0],
                opacity: [0, 1],
                rotateZ: [10, 0],
                easing: 'easeOutExpo',
                duration: 1600,
                delay: (el, i) => 50 * i
            });
        }
    }
}

// Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        if (width) {
            bar.style.width = '0%';
        }
    });
}

function animateSkillBar(skillItem) {
    const skillBar = skillItem.querySelector('.skill-progress');
    const skillIcon = skillItem.querySelector('.skill-icon');
    
    if (skillBar && !skillBar.classList.contains('animated')) {
        const targetWidth = skillBar.style.width || '0%';
        
        // Animate skill icon first
        if (skillIcon) {
            anime({
                targets: skillIcon,
                scale: [0.8, 1],
                rotate: [0, 5, 0],
                duration: 800,
                easing: 'easeOutElastic(1, .8)'
            });
        }
        
        // Then animate the progress bar
        setTimeout(() => {
            anime({
                targets: skillBar,
                width: targetWidth,
                duration: 2000,
                easing: 'easeOutQuart',
                complete: () => {
                    skillBar.classList.add('animated');
                    // Add glow effect
                    skillBar.style.boxShadow = '0 0 20px rgba(79, 172, 254, 0.8)';
                }
            });
        }, 300);
    }
}

function animateStatsNumber(container) {
    const numberElement = container.querySelector('.stats-number');
    if (numberElement && !numberElement.classList.contains('animated')) {
        const finalValue = parseInt(numberElement.textContent.replace(/\D/g, ''));
        const suffix = numberElement.textContent.replace(/[\d,]/g, '');
        
        anime({
            targets: { value: 0 },
            value: finalValue,
            duration: 2000,
            easing: 'easeOutQuart',
            update: function(anim) {
                numberElement.textContent = Math.round(anim.animatables[0].target.value) + suffix;
            },
            complete: () => {
                numberElement.classList.add('animated');
            }
        });
    }
}

// Skills Chart (ECharts)
function initSkillsChart() {
    const chartContainer = document.getElementById('skills-chart');
    if (chartContainer && typeof echarts !== 'undefined') {
        const chart = echarts.init(chartContainer);
        
        const option = {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                borderColor: 'rgba(79, 172, 254, 0.3)',
                textStyle: {
                    color: '#ffffff'
                },
                formatter: function(params) {
                    return `<strong>${params.name}</strong><br/>Mastery: ${params.value}%`;
                }
            },
            radar: {
                indicator: [
                    { name: 'UI/UX Design', max: 100 },
                    { name: 'Frontend Dev', max: 100 },
                    { name: 'Mobile Design', max: 100 },
                    { name: 'Brand Identity', max: 100 },
                    { name: 'Motion Graphics', max: 100 },
                    { name: 'Prototyping', max: 100 }
                ],
                shape: 'polygon',
                splitNumber: 5,
                axisName: {
                    color: '#ffffff',
                    fontSize: 14,
                    fontWeight: 'bold'
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(79, 172, 254, 0.2)',
                        width: 1
                    }
                },
                splitArea: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(79, 172, 254, 0.4)',
                        width: 2
                    }
                }
            },
            series: [{
                name: 'Skills',
                type: 'radar',
                data: [{
                    value: [97, 94, 92, 89, 86, 95],
                    name: 'Technical Skills',
                    areaStyle: {
                        color: 'rgba(79, 172, 254, 0.3)',
                        shadowBlur: 20,
                        shadowColor: 'rgba(79, 172, 254, 0.5)'
                    },
                    lineStyle: {
                        color: '#4facfe',
                        width: 3,
                        shadowBlur: 10,
                        shadowColor: 'rgba(79, 172, 254, 0.8)'
                    },
                    itemStyle: {
                        color: '#4facfe',
                        borderColor: '#ffffff',
                        borderWidth: 2,
                        shadowBlur: 10,
                        shadowColor: 'rgba(79, 172, 254, 0.8)'
                    }
                }],
                animationDuration: 2000,
                animationEasing: 'easeOutQuart'
            }]
        };
        
        chart.setOption(option);
        
        // Resize chart on window resize
        window.addEventListener('resize', () => {
            chart.resize();
        });
    }
}

// Portfolio Filter
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Animate button
            anime({
                targets: this,
                scale: [0.95, 1],
                duration: 200,
                easing: 'easeOutQuart'
            });
            
            // Filter projects
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    // Staggered animation in
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        scale: [0.8, 1],
                        rotate: [5, 0],
                        delay: index * 100,
                        duration: 600,
                        easing: 'easeOutQuart'
                    });
                } else {
                    // Animation out
                    anime({
                        targets: card,
                        opacity: [1, 0],
                        scale: [1, 0.8],
                        rotate: [0, -5],
                        duration: 400,
                        easing: 'easeInQuart',
                        complete: () => {
                            card.classList.add('hidden');
                        }
                    });
                }
            });
        });
    });
}

// Project Modals
function initProjectModals() {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.getElementById('close-modal');
    const projectCards = document.querySelectorAll('.project-card');
    
    const projectData = {
        1: {
            title: 'Premium Web Interface',
            description: 'A sophisticated web design project featuring advanced glassmorphism effects, responsive layout, and premium aesthetics. This project showcases cutting-edge CSS techniques, smooth animations, and exceptional user experience design.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Anime.js', 'Tailwind CSS', 'Figma'],
            features: ['Advanced Glassmorphism', 'Responsive Design', 'Smooth Animations', 'Premium UI', 'Performance Optimized'],
            image: './resources/project-web-mgn.jpg',
            challenge: 'Creating a cohesive glassmorphism experience that works across all devices while maintaining performance.',
            solution: 'Implemented progressive enhancement with CSS backdrop-filter and optimized animations for smooth 60fps performance.'
        },
        2: {
            title: 'Luxury Brand Identity',
            description: 'Complete luxury brand identity system including logo design, business cards, letterheads, and comprehensive brand guidelines. The design embodies sophistication and modern elegance.',
            technologies: ['Adobe Illustrator', 'Adobe Photoshop', 'Brand Strategy', 'Typography Design'],
            features: ['Logo Design', 'Brand Guidelines', 'Business Cards', 'Color Palette', 'Typography System'],
            image: './resources/project-branding-mgn.jpg',
            challenge: 'Developing a brand identity that conveys luxury while remaining versatile across all applications.',
            solution: 'Created a modular design system with carefully selected typography and a refined color palette.'
        },
        3: {
            title: 'Glass Mobile Experience',
            description: 'Premium mobile application interface design with intuitive glassmorphism elements. Designed for both iOS and Android platforms with native feel and exceptional user experience.',
            technologies: ['Figma', 'Prototyping', 'User Research', 'Mobile UX', 'iOS Guidelines', 'Material Design'],
            features: ['Intuitive Navigation', 'Glass Effects', 'Cross-platform', 'Native Feel', 'Accessibility'],
            image: './resources/project-mobile-mgn.jpg',
            challenge: 'Implementing glassmorphism effects that work seamlessly across different mobile platforms.',
            solution: 'Designed adaptive glass effects that respond to platform-specific design languages.'
        },
        4: {
            title: 'E-commerce Platform',
            description: 'Modern e-commerce website design with glassmorphism elements, conversion optimization, and seamless shopping experience. Features advanced product filtering and intuitive checkout process.',
            technologies: ['UX Research', 'Conversion Optimization', 'E-commerce UX', 'Analytics'],
            features: ['Product Catalog', 'Shopping Cart', 'Payment Integration', 'Conversion Focused', 'Analytics'],
            image: './resources/project-1.jpg',
            challenge: 'Balancing aesthetic appeal with conversion optimization in a glassmorphism framework.',
            solution: 'Used glass effects strategically to highlight key actions while maintaining focus on conversion.'
        },
        5: {
            title: 'Digital Art Collection',
            description: 'Series of digital illustrations featuring abstract compositions and vibrant color palettes. Each piece explores different artistic techniques and visual storytelling methods.',
            technologies: ['Procreate', 'Adobe Photoshop', 'Digital Painting', 'Color Theory'],
            features: ['Abstract Compositions', 'Vibrant Colors', 'Artistic Techniques', 'Visual Storytelling', 'Print Ready'],
            image: './resources/project-5.jpg',
            challenge: 'Creating cohesive digital art that maintains impact across different mediums.',
            solution: 'Developed a consistent visual language while allowing each piece to have its own character.'
        },
        6: {
            title: 'Analytics Dashboard',
            description: 'Modern dashboard design with glassmorphism elements and advanced data visualization. Features real-time analytics, customizable widgets, and intuitive data exploration tools.',
            technologies: ['Data Visualization', 'Dashboard Design', 'UX Research', 'Analytics'],
            features: ['Real-time Data', 'Customizable Widgets', 'Data Exploration', 'Glass UI', 'Responsive'],
            image: './resources/project-6.jpg',
            challenge: 'Presenting complex data in an elegant glassmorphism interface without overwhelming users.',
            solution: 'Used layered transparency and strategic glass effects to create clear data hierarchy.'
        },
        7: {
            title: 'Typography Posters',
            description: 'Collection of creative posters featuring experimental typography and glass-inspired visual effects. Each poster tells a unique story through innovative text treatment and composition.',
            technologies: ['Adobe Illustrator', 'Typography', 'Print Design', 'Experimental Design'],
            features: ['Experimental Typography', 'Glass Effects', 'Visual Composition', 'Print Ready', 'Creative'],
            image: './resources/project-7.jpg',
            challenge: 'Pushing the boundaries of typography while maintaining readability and impact.',
            solution: 'Balanced experimental techniques with functional design principles for maximum effect.'
        }
    };
    
    projectCards.forEach(card => {
        const projectId = card.getAttribute('data-project');
        if (projectId) {
            card.addEventListener('click', function() {
                const project = projectData[projectId];
                if (project && modal) {
                    modalTitle.textContent = project.title;
                    modalContent.innerHTML = `
                        <div class="mb-8">
                            <img src="${project.image}" alt="${project.title}" class="w-full h-80 object-cover rounded-2xl">
                        </div>
                        
                        <div class="mb-8">
                            <h3 class="text-2xl font-semibold mb-4">Project Overview</h3>
                            <p class="text-gray-300 text-lg leading-relaxed mb-6">${project.description}</p>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <h4 class="font-semibold mb-3 text-blue-300">Challenge</h4>
                                    <p class="text-gray-300">${project.challenge}</p>
                                </div>
                                <div>
                                    <h4 class="font-semibold mb-3 text-green-300">Solution</h4>
                                    <p class="text-gray-300">${project.solution}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <h4 class="font-semibold mb-4 text-xl">Technologies Used</h4>
                                <div class="flex flex-wrap gap-3">
                                    ${project.technologies.map(tech => 
                                        `<span class="px-4 py-2 bg-blue-500 text-white text-sm rounded-full">${tech}</span>`
                                    ).join('')}
                                </div>
                            </div>
                            <div>
                                <h4 class="font-semibold mb-4 text-xl">Key Features</h4>
                                <ul class="text-gray-300 space-y-2">
                                    ${project.features.map(feature => 
                                        `<li class="flex items-center">
                                            <span class="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                                            ${feature}
                                        </li>`
                                    ).join('')}
                                </ul>
                            </div>
                        </div>
                        
                        <div class="flex gap-6">
                            <button class="glass px-8 py-4 rounded-full text-white font-semibold hover:bg-white hover:text-gray-900 transition-all">
                                View Live Project
                            </button>
                            <button class="glass px-8 py-4 rounded-full text-white font-semibold hover:bg-white hover:text-gray-900 transition-all">
                                View Case Study
                            </button>
                        </div>
                    `;
                    
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    
                    // Animate modal content
                    anime({
                        targets: modal.querySelector('.modal-content'),
                        scale: [0.8, 1],
                        rotate: [-5, 0],
                        opacity: [0, 1],
                        duration: 500,
                        easing: 'easeOutQuart'
                    });
                }
            });
        }
    });
    
    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            anime({
                targets: modal.querySelector('.modal-content'),
                scale: [1, 0.8],
                rotate: [0, 5],
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInQuart',
                complete: () => {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        });
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                anime({
                    targets: modal.querySelector('.modal-content'),
                    scale: [1, 0.8],
                    rotate: [0, 5],
                    opacity: [1, 0],
                    duration: 300,
                    easing: 'easeInQuart',
                    complete: () => {
                        modal.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    }
                });
            }
        });
    }
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const submitBtn = document.querySelector('.submit-btn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Hide previous messages
            successMessage.classList.remove('show');
            errorMessage.classList.remove('show');
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.firstName || !data.lastName || !data.email || !data.projectType || !data.message) {
                errorMessage.classList.add('show');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                errorMessage.textContent = 'Please enter a valid email address.';
                errorMessage.classList.add('show');
                return;
            }
            
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.textContent = 'Sending...';
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.textContent = 'Send Message';
                
                // Show success message
                successMessage.classList.add('show');
                
                // Reset form
                contactForm.reset();
                
                // Add celebration particles
                createCelebrationParticles();
                
                // Animate form fields
                const formFields = contactForm.querySelectorAll('.form-input');
                anime({
                    targets: formFields,
                    scale: [1, 1.02, 1],
                    duration: 300,
                    delay: anime.stagger(50),
                    easing: 'easeOutQuart'
                });
                
            }, 2500);
        });
        
        // Add focus animations to form fields
        const formFields = contactForm.querySelectorAll('.form-input');
        formFields.forEach(field => {
            field.addEventListener('focus', function() {
                anime({
                    targets: this,
                    scale: [1, 1.02],
                    duration: 200,
                    easing: 'easeOutQuart'
                });
            });
            
            field.addEventListener('blur', function() {
                anime({
                    targets: this,
                    scale: [1.02, 1],
                    duration: 200,
                    easing: 'easeOutQuart'
                });
            });
        });
    }
}

// FAQ Interactions
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('svg');
        
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherIcon = otherItem.querySelector('svg');
                        if (otherIcon) {
                            otherIcon.style.transform = 'rotate(0deg)';
                        }
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    if (icon) {
                        icon.style.transform = 'rotate(0deg)';
                    }
                } else {
                    item.classList.add('active');
                    if (icon) {
                        icon.style.transform = 'rotate(180deg)';
                    }
                }
            });
        }
    });
}

// Skill Hover Effects
function initSkillHoverEffects() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const skillIcon = item.querySelector('.skill-icon');
        
        item.addEventListener('mouseenter', function() {
            if (skillIcon) {
                anime({
                    targets: skillIcon,
                    scale: [1, 1.1],
                    rotate: [0, 5],
                    duration: 300,
                    easing: 'easeOutQuart'
                });
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (skillIcon) {
                anime({
                    targets: skillIcon,
                    scale: [1.1, 1],
                    rotate: [5, 0],
                    duration: 300,
                    easing: 'easeOutQuart'
                });
            }
        });
    });
}

// Floating Particles
function initParticles() {
    const particlesContainer = document.getElementById('particles-container');
    if (particlesContainer) {
        // Create initial particles
        for (let i = 0; i < 25; i++) {
            createParticle(particlesContainer);
        }
        
        // Create new particles periodically
        setInterval(() => {
            if (particlesContainer.children.length < 40) {
                createParticle(particlesContainer);
            }
        }, 800);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random horizontal position
    particle.style.left = Math.random() * 100 + '%';
    
    // Random size
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random opacity
    particle.style.opacity = Math.random() * 0.8 + 0.2;
    
    // Random animation duration
    particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
    
    // Random delay
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 15000);
}

// Enhanced Celebration Particles
function createCelebrationParticles() {
    const colors = ['#4facfe', '#00f2fe', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.width = Math.random() * 8 + 4 + 'px';
            particle.style.height = particle.style.width;
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            particle.style.boxShadow = `0 0 ${Math.random() * 20 + 10}px ${particle.style.backgroundColor}`;
            
            document.body.appendChild(particle);
            
            // Random direction
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 400 + 200;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            // Animate particle
            anime({
                targets: particle,
                translateX: x,
                translateY: y,
                scale: [1, 0],
                opacity: [1, 0],
                duration: Math.random() * 2000 + 1000,
                easing: 'easeOutQuart',
                complete: () => {
                    if (particle.parentNode) {
                        document.body.removeChild(particle);
                    }
                }
            });
        }, i * 20);
    }
}

// Utility Functions
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

// Smooth scroll performance optimization
window.addEventListener('scroll', debounce(() => {
    // Add any scroll-based animations here
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-bg');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 16));

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.querySelectorAll('.particle').forEach(particle => {
            particle.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when page becomes visible
        document.querySelectorAll('.particle').forEach(particle => {
            particle.style.animationPlayState = 'running';
        });
    }
});

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition-premium', 'none');
    document.querySelectorAll('.particle').forEach(particle => {
        particle.style.display = 'none';
    });
    
    // Disable other animations
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`MGN STUDIO: Page loaded in ${loadTime}ms`);
    });
}

console.log('🎨 MGN STUDIO - All systems initialized successfully!');
console.log('✨ Advanced glassmorphism effects loaded');
console.log('🚀 Professional animations ready');
console.log('💎 Premium user experience activated');