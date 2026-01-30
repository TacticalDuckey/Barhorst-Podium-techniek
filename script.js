// Theater Lights Interactive Effect
document.addEventListener('DOMContentLoaded', () => {
    // Laad contactgegevens uit config.js (als beschikbaar)
    if (typeof CONFIG !== 'undefined') {
        const emailEl = document.getElementById('contact-email');
        const phoneEl = document.getElementById('contact-phone');
        const locationEl = document.getElementById('contact-location');
        
        if (emailEl) emailEl.textContent = CONFIG.email;
        if (phoneEl) phoneEl.textContent = CONFIG.phone;
        if (locationEl) locationEl.textContent = CONFIG.location;
    }
    
    // Create ambient side lights
    createAmbientLights();
    
    const lights = document.querySelectorAll('.light');
    
    // Voeg extra barn doors toe aan elke lamp
    lights.forEach(light => {
        const rightBarnDoor = document.createElement('div');
        rightBarnDoor.className = 'barn-door-right';
        const bottomBarnDoor = document.createElement('div');
        bottomBarnDoor.className = 'barn-door-bottom';
        const focusKnob = document.createElement('div');
        focusKnob.className = 'focus-knob';
        
        light.appendChild(rightBarnDoor);
        light.appendChild(bottomBarnDoor);
        light.appendChild(focusKnob);
    });
    
    // Add mousemove effect for lights
    document.addEventListener('mousemove', (e) => {
        lights.forEach((light) => {
            const rect = light.getBoundingClientRect();
            const lightCenterX = rect.left + rect.width / 2;
            const lightCenterY = rect.top + rect.height / 2;
            
            // Calculate distance from mouse to light
            const distance = Math.sqrt(
                Math.pow(e.clientX - lightCenterX, 2) + 
                Math.pow(e.clientY - lightCenterY, 2)
            );
            
            // If mouse is close to light (within 200px), make it warm white
            if (distance < 200) {
                light.classList.add('active');
            } else {
                light.classList.remove('active');
            }
        });
    });
    
    // Random subtle pulsing for lights when not hovered
    setInterval(() => {
        lights.forEach((light, index) => {
            if (!light.matches(':hover') && !light.classList.contains('active')) {
                setTimeout(() => {
                    const lens = light.querySelector('.light-lens');
                    if (lens) {
                        const randomIntensity = 0.6 + Math.random() * 0.4;
                        lens.style.opacity = randomIntensity;
                    }
                }, index * 200);
            }
        });
    }, 3000);
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 200; // Account for fixed navbar and lights
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple form validation and feedback
            const formData = new FormData(contactForm);
            
            // Show success message (in a real application, this would send data to a server)
            alert('Bedankt voor je bericht! We nemen zo spoedig mogelijk contact met je op.');
            contactForm.reset();
        });
    }
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe service cards and portfolio items
    document.querySelectorAll('.service-card, .portfolio-item').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
    // Glitch effect for title (subtle)
    const glitchTitle = document.querySelector('.glitch');
    if (glitchTitle) {
        setInterval(() => {
            glitchTitle.style.textShadow = `
                ${Math.random() * 2 - 1}px ${Math.random() * 2 - 1}px 0 var(--primary-green),
                ${Math.random() * 2 - 1}px ${Math.random() * 2 - 1}px 0 var(--pure-white)
            `;
            
            setTimeout(() => {
                glitchTitle.style.textShadow = '2px 2px 0 var(--primary-green)';
            }, 50);
        }, 5000);
    }
    
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // Add sparkle effect to lights on click
    lights.forEach(light => {
        light.addEventListener('click', () => {
            createSparkle(light);
        });
    });
    
    function createSparkle(element) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'absolute';
        sparkle.style.width = '5px';
        sparkle.style.height = '5px';
        sparkle.style.background = 'var(--warm-white)';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.boxShadow = '0 0 10px var(--warm-white)';
        
        const rect = element.getBoundingClientRect();
        sparkle.style.left = rect.left + rect.width / 2 + 'px';
        sparkle.style.top = rect.top + rect.height / 2 + 'px';
        
        document.body.appendChild(sparkle);
        
        // Animate sparkle
        let angle = Math.random() * Math.PI * 2;
        let distance = 0;
        const speed = 2;
        const maxDistance = 50;
        
        const animateSparkle = () => {
            distance += speed;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            sparkle.style.transform = `translate(${x}px, ${y}px)`;
            sparkle.style.opacity = 1 - (distance / maxDistance);
            
            if (distance < maxDistance) {
                requestAnimationFrame(animateSparkle);
            } else {
                sparkle.remove();
            }
        };
        
        requestAnimationFrame(animateSparkle);
    }
    
    // Console message
    console.log('%c🎭 Barhorst Podium Techniek', 'color: #00ff88; font-size: 20px; font-weight: bold;');
    console.log('%cProfessioneel licht & geluid voor elk podium', 'color: #fff; font-size: 12px;');
});

// Create ambient side lights with pattern
function createAmbientLights() {
    const heroSection = document.getElementById('home');
    if (!heroSection) return;
    
    const container = document.createElement('div');
    container.className = 'ambient-lights';
    heroSection.style.position = 'relative';
    heroSection.appendChild(container);
    
    // Exacte posities op basis van screenshot - relatief aan hero sectie
    const positions = [
        { side: 'left', top: 20 },   // Links boven
        { side: 'right', top: 10 },   // Rechts boven  
        { side: 'left', top: 70 },    // Links onder
        { side: 'right', top: 90 }    // Rechts onder
    ];
    
    positions.forEach((pos) => {
        const light = document.createElement('div');
        light.className = 'ambient-light';
        
        if (pos.side === 'left') {
            light.style.left = '1%';
        } else {
            light.style.right = '1%';
        }
        
        light.style.top = `${pos.top}%`;
        
        container.appendChild(light);
    });
}
