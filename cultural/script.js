/* ==========================================
   MAIN SCRIPT FILE - OPTIMIZED FOR CULTURAL PAGE
   ========================================== */

// 1. MOBILE MENU LOGIC
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const icon = document.querySelector('.hamburger i');
    
    if (menu) {
        menu.classList.toggle('active');
        
        // Icon change: Bars to X
        if(menu.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    }
}

// Menu ke bahar click karne par band karne ke liye (Optional)
document.addEventListener('click', (e) => {
    const menu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    if (menu.classList.contains('active') && !menu.contains(e.target) && !hamburger.contains(e.target)) {
        toggleMenu();
    }
});

// 2. CANVAS ANIMATION (Optimized with Observer)
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

    function init() {
        particlesArray = [];
        for (let i = 0; i < 70; i++) { // Slightly reduced for performance
            particlesArray.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => {
            p.update();
            p.draw();
        });
        animationId = requestAnimationFrame(animate);
    }

    init();

    // Pause animation when user scrolls past header
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate();
            } else {
                cancelAnimationFrame(animationId);
            }
        });
    });
    observer.observe(canvas);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });
}

// ==========================================
// 3. TOGGLE RULES FUNCTION (WITH BUTTON TEXT CHANGE)
// ==========================================
window.toggleRules = function(id, btnElement) {
    const ruleBox = document.getElementById(id);
    if(ruleBox) {
        // Toggle display
        if (ruleBox.style.display === "block") {
            ruleBox.style.display = "none";
            btnElement.innerText = "Know More";
        } else {
            ruleBox.style.display = "block";
            btnElement.innerText = "View Less";
        }
    }
};

// ==========================================
// 4. ON LOAD: ANIMATIONS (AOS) & CONFETTI
// ==========================================
window.addEventListener('load', function() {
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50
        });
    }

    // Initialize Vanilla Tilt
    const tiltElements = document.querySelectorAll(".card");
    if(tiltElements.length > 0 && typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(tiltElements, {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2
        });
    }

    // Party Confetti (Delayed to save LCP)
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

                confetti(Object.assign({}, defaults, { 
                    particleCount, 
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                    colors: colors
                }));
                
                confetti(Object.assign({}, defaults, { 
                    particleCount, 
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                    colors: colors
                }));
            }, 250);
        }
    }, 1500);
});