/* ==========================================
   MAIN SCRIPT FILE - OPTIMIZED FOR LITERACY
   ========================================== */

// 1. MOBILE MENU LOGIC
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

// 2. TOGGLE RULES FUNCTION (Fixes Overlap by refreshing AOS and text change)
window.toggleRules = function(id, btnElement) {
    const ruleBox = document.getElementById(id);
    if(ruleBox) {
        if (ruleBox.style.display === "block") {
            ruleBox.style.display = "none";
            btnElement.innerText = "Know More";
        } else {
            ruleBox.style.display = "block";
            btnElement.innerText = "View Less";
        }
        
        // Force browser layout refresh to prevent clipping
        if (typeof AOS !== 'undefined') {
            setTimeout(() => AOS.refresh(), 50);
        }
    }
};

// 3. CANVAS ANIMATION (Optimized with Observer)
const canvas = document.getElementById('hero-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    let animationId;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < 70; i++) { // Limit particles for better performance
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => {
            p.update();
            p.draw();
        });
        animationId = requestAnimationFrame(animateParticles);
    }

    initParticles();

    // Intersection Observer to PAUSE animation when scrolled past hero
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateParticles();
            } else {
                cancelAnimationFrame(animationId);
            }
        });
    });
    observer.observe(canvas);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });
}

// 4. ON LOAD: ANIMATIONS (AOS) & STATS
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true, offset: 50 });
    }

    // Initialize Vanilla Tilt (Disable on Mobile)
    if (window.innerWidth > 768 && typeof VanillaTilt !== 'undefined') {
        const tiltElements = document.querySelectorAll(".event-card-wide");
        if(tiltElements.length > 0) {
            VanillaTilt.init(tiltElements, { max: 10, speed: 400, glare: false });
        }
    }

    // Stats Counter
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        counters.forEach(counter => {
            counter.innerText = '0';
            const updateCounter = () => {
                const target = +counter.getAttribute('data-target');
                const c = +counter.innerText;
                const increment = target / 100;

                if (c < target) {
                    counter.innerText = `${Math.ceil(c + increment)}`;
                    setTimeout(updateCounter, 30);
                } else {
                    counter.innerText = target + "+";
                }
            };
            const statObserver = new IntersectionObserver((entries) => {
                if(entries[0].isIntersecting){
                    updateCounter();
                    statObserver.unobserve(counter);
                }
            });
            statObserver.observe(counter);
        });
    }
});

// 5. PARTY CONFETTI (Delayed 1.5s to improve Lighthouse LCP)
window.addEventListener('load', function() {
    setTimeout(() => {
        if (typeof confetti === "function") {
            var duration = 2 * 1000;
            var animationEnd = Date.now() + duration;
            var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            var interval = setInterval(function() {
                var timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                var particleCount = 50 * (timeLeft / duration);
                var colors = ['#00f2ff', '#7000ff', '#ff0055', '#ffffff'];

                // Left Side
                confetti(Object.assign({}, defaults, { 
                    particleCount, 
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                    colors: colors
                }));
                
                // Right Side
                confetti(Object.assign({}, defaults, { 
                    particleCount, 
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                    colors: colors
                }));
            }, 250);
        }
    }, 1500);
});