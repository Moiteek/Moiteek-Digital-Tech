// ===== CINEMATIC PORTFOLIO JAVASCRIPT =====
let isLoaded = false;
let currentTheme = 'dark';
let mouseX = 0, mouseY = 0;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => loadingScreen.style.display = 'none', 500);
        }
        isLoaded = true;
    }, 2500);

    initializeCursor();
    initializeNavigation();
    initializeTheme();
    initializeScrollEffects();
    initializeAnimations();
    initializeParticles();
    initializeCodeBackground();
    initializeSkillsChart();
    initializeContactForm();
    initializeProgress();
    initializeThreeScene();
    startHeroAnimations();
    startNumberCounters();
}

// ===== CURSOR SYSTEM =====
function initializeCursor() {
    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        const cursorInner = cursor.querySelector('.cursor-inner');
        const cursorOuter = cursor.querySelector('.cursor-outer');
        const cursorLight = cursor.querySelector('.cursor-light');
        
        cursorInner.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        cursorOuter.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        cursorLight.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        
        // Update mouse lighting
        const mouseLight = document.getElementById('mouse-light');
        if (mouseLight) {
            mouseLight.style.setProperty('--mouse-x', `${(mouseX / window.innerWidth) * 100}%`);
            mouseLight.style.setProperty('--mouse-y', `${(mouseY / window.innerHeight) * 100}%`);
            mouseLight.classList.add('active');
        }
    });

    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        element.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // Hide on mobile
    if (window.innerWidth <= 768) cursor.style.display = 'none';
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active link
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });
}

// ===== THEME TOGGLE =====
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    currentTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon();

    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
        updateThemeIcon();
    });

    function updateThemeIcon() {
        const icon = themeToggle.querySelector('i');
        if (currentTheme === 'dark') {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Parallax effect
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-visual, .floating-shapes .shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    // Scroll reveal
    function handleScrollReveal() {
        const reveals = document.querySelectorAll('[data-aos]');
        
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('aos-animate');
            }
        });
    }

    window.addEventListener('scroll', () => {
        handleParallax();
        handleScrollReveal();
    });
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // Typing effect
    const roleText = document.querySelector('.role-text');
    const roleCursor = document.querySelector('.role-cursor');
    
    if (roleText && roleCursor) {
        const roles = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function typeRole() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                roleText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                roleText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500;
            }

            setTimeout(typeRole, typeSpeed);
        }

        typeRole();
    }
}

// ===== PARTICLES =====
function initializeParticles() {
    const particleContainer = document.getElementById('particles');
    if (!particleContainer) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: linear-gradient(45deg, #4F46E5, #00F5FF, #22C55E);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${10 + Math.random() * 10}s linear infinite;
            box-shadow: 0 0 20px rgba(0, 245, 255, 0.5);
        `;
        particleContainer.appendChild(particle);
    }
}

// ===== CODE BACKGROUND =====
function initializeCodeBackground() {
    const codeBackground = document.getElementById('code-background');
    if (!codeBackground) return;

    const codeSnippets = [
        'const developer = {',
        '  name: "Mohammed Mamman",',
        '  skills: ["React", "Node.js"],',
        '  passion: "Building amazing things"',
        '};',
        'function createMagic() {',
        '  return innovation + creativity;',
        '}'
    ];

    codeSnippets.forEach((snippet, index) => {
        const codeLine = document.createElement('div');
        codeLine.className = 'code-line-bg';
        codeLine.textContent = snippet;
        codeLine.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: ${index * 100 - 100}vh;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.8rem;
            color: rgba(0, 245, 255, ${0.1 + Math.random() * 0.2});
            white-space: nowrap;
            animation: codeScroll ${15 + index * 2}s linear infinite;
            text-shadow: 0 0 10px rgba(0, 245, 255, 0.3);
        `;
        codeBackground.appendChild(codeLine);
    });
}

// ===== SKILLS CHART =====
function initializeSkillsChart() {
    const canvas = document.getElementById('skillsChart');
    if (!canvas || typeof Chart === 'undefined') return;

    new Chart(canvas, {
        type: 'radar',
        data: {
            labels: ['Frontend', 'Backend', 'Database', 'UI/UX', 'API', 'Problem Solving'],
            datasets: [{
                label: 'Skills',
                data: [95, 90, 85, 80, 92, 98],
                backgroundColor: 'rgba(79, 70, 229, 0.2)',
                borderColor: 'rgba(79, 70, 229, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(79, 70, 229, 1)',
                pointBorderColor: '#00F5FF',
                pointHoverBackgroundColor: '#00F5FF',
                pointRadius: 5,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { color: '#94A3B8', backdropColor: 'transparent' },
                    grid: { color: 'rgba(0, 245, 255, 0.1)' },
                    pointLabels: { color: '#E2E8F0' },
                    angleLines: { color: 'rgba(0, 245, 255, 0.1)' }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: { color: '#E2E8F0' }
                }
            },
            animation: { duration: 2000 }
        }
    });
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        
        submitBtn.querySelector('.btn-text').textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                showMessage('Message sent successfully!', 'success');
                contactForm.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            showMessage('Failed to send message. Please try again.', 'error');
        } finally {
            submitBtn.querySelector('.btn-text').textContent = originalText;
            submitBtn.disabled = false;
        }
    });

    function showMessage(text, type) {
        const message = document.createElement('div');
        message.className = `form-message ${type}`;
        message.textContent = text;
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            background: ${type === 'success' ? 'linear-gradient(45deg, #22C55E, #16A34A)' : 'linear-gradient(45deg, #EF4444, #DC2626)'};
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(message)) {
                    document.body.removeChild(message);
                }
            }, 300);
        }, 4000);
    }
}

// ===== PROGRESS BAR =====
function initializeProgress() {
    const progressBar = document.getElementById('progress-bar');
    
    function updateProgress() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (window.scrollY / scrollHeight) * 100;
        progressBar.style.width = `${scrollProgress}%`;
    }

    window.addEventListener('scroll', updateProgress);
}

// ===== THREE.JS SCENE =====
function initializeThreeScene() {
    if (typeof ThreeScene !== 'undefined') {
        ThreeScene.init();
        
        document.addEventListener('mousemove', (e) => {
            if (typeof ThreeScene.handleMouseMove === 'function') {
                ThreeScene.handleMouseMove(e);
            }
        });
    }
}

// ===== HERO ANIMATIONS =====
function startHeroAnimations() {
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, 500 + (index * 200));
    });

    const techFloats = document.querySelectorAll('.tech-float');
    techFloats.forEach((tech, index) => {
        animateFloatingElement(tech, 8 + (index * 2));
    });
}

function animateFloatingElement(element, duration) {
    let startTime = null;
    
    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = (elapsed % (duration * 1000)) / (duration * 1000);
        
        const x = Math.sin(progress * Math.PI * 2) * 20;
        const y = Math.cos(progress * Math.PI * 2) * 20;
        const rotation = progress * 360;
        
        element.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
        
        requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
}

// ===== NUMBER COUNTERS =====
function startNumberCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// ===== MAGNETIC BUTTONS =====
document.addEventListener('DOMContentLoaded', () => {
    const magneticButtons = document.querySelectorAll('.magnetic-btn');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) rotateX(${-y * 0.01}deg) rotateY(${x * 0.01}deg)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0) rotateX(0) rotateY(0)';
        });
    });
});

// ===== THREE.JS SCENE IMPLEMENTATION =====
window.ThreeScene = {
    init: function() {
        const container = document.getElementById('three-scene');
        if (!container) return;

        // Simple 3D scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
        
        camera.position.z = 5;
        
        // Add some floating cubes
        const geometries = [
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.SphereGeometry(0.5, 32, 32),
            new THREE.TetrahedronGeometry(0.7)
        ];
        
        const colors = [0x4F46E5, 0x22C55E, 0x00F5FF];
        const meshes = [];
        
        for (let i = 0; i < 5; i++) {
            const material = new THREE.MeshPhongMaterial({
                color: colors[i % colors.length],
                emissive: colors[i % colors.length],
                emissiveIntensity: 0.2,
                transparent: true,
                opacity: 0.8
            });
            
            const mesh = new THREE.Mesh(geometries[i % geometries.length], material);
            mesh.position.x = (Math.random() - 0.5) * 10;
            mesh.position.y = (Math.random() - 0.5) * 10;
            mesh.position.z = (Math.random() - 0.5) * 10;
            
            meshes.push(mesh);
            scene.add(mesh);
        }
        
        // Add lights
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        scene.add(ambientLight);
        
        const pointLight = new THREE.PointLight(0x4F46E5, 1, 100);
        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            meshes.forEach((mesh, index) => {
                mesh.rotation.x += 0.01 * (index % 2 + 1);
                mesh.rotation.y += 0.01 * (index % 3 + 1);
                mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
            });
            
            renderer.render(scene, camera);
        }
        
        animate();
        
        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    },
    
    handleMouseMove: function(event) {
        // Mouse interaction can be added here
    }
};
