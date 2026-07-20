/* ==========================================
   MAIN UI LOGIC - MENUS, MODALS, SCROLL (OPTIMIZED FOR PERFORMANCE)
   ========================================== */

// 1. MOBILE MENU
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.toggle('active');
}

// 2. MODAL LOGIC (Reusable Function for DRY Code)
function toggleModal(modalId, action) {
    const modal = document.getElementById(modalId);
    if (modal) {
        if (action === 'open') {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        } else {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
}

// Specific Modal Wrappers
function openAccommodation() { toggleModal('accModal', 'open'); }
function closeAccommodation() { toggleModal('accModal', 'close'); }

function openContact() { toggleModal('contactModal', 'open'); }
function closeContact() { toggleModal('contactModal', 'close'); }

function openAdvisory() {
    closeOrganizing(); // Safety close
    toggleModal('advisoryModal', 'open');
}
function closeAdvisory() { toggleModal('advisoryModal', 'close'); }

function openOrganizing() {
    closeAdvisory(); // Safety close
    toggleModal('organizingModal', 'open');
}
function closeOrganizing() { toggleModal('organizingModal', 'close'); }

function closeTimetable() { toggleModal('timetableModal', 'close'); }

// Registration Form Logic
function openRegInfo() {
    toggleModal('formModal', 'open');
    const regDetails = document.getElementById('regDetails');
    const iframeContainer = document.getElementById('iframeContainer');
    if(regDetails) regDetails.style.display = 'block';
    if(iframeContainer) iframeContainer.style.display = 'none';
}

function showGoogleForm() {
    const regDetails = document.getElementById('regDetails');
    const iframeContainer = document.getElementById('iframeContainer');
    if(regDetails) regDetails.style.display = 'none';
    if(iframeContainer) iframeContainer.style.display = 'block';
}

function closeForm() {
    toggleModal('formModal', 'close');
}

// Image Modal Logic
function openImage(src) {
    const modal = document.getElementById('imageModal');
    const fullImg = document.getElementById('fullImage');
    if(modal && fullImg) {
        modal.style.display = "flex";
        fullImg.src = src;
        document.body.style.overflow = "hidden";
    }
}

function closeImage() {
    toggleModal('imageModal', 'close');
}

// Global Click outside Modal to close
window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

/* ==========================================
   PARTICLE CANVAS ANIMATION (OPTIMIZED WITH OBSERVER)
   ========================================== */
const canvas = document.getElementById('hero-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    let animationId; // To store animation frame reference

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
        for (let i = 0; i < 60; i++) { // Reduced particle count for performance
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

    // Intersection Observer to PAUSE animation when not visible (Saves CPU)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateParticles(); // Resume
            } else {
                cancelAnimationFrame(animationId); // Pause
            }
        });
    });
    observer.observe(canvas);
    
    // Resize Event Throttling
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });
}

/* ==========================================
   COUNTDOWN TIMER
   ========================================== */
const festDate = new Date('Mar 14, 2026 09:00:00').getTime();
const dEl = document.getElementById('days');
const hEl = document.getElementById('hours');
const mEl = document.getElementById('minutes');
const sEl = document.getElementById('seconds');
const container = document.querySelector('.countdown-container');

if(dEl && hEl && mEl && sEl) {
    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = festDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            if (container) container.innerHTML = "<h3 style='color:white'>The Fest Has Begun!</h3>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        dEl.innerText = days < 10 ? '0' + days : days;
        hEl.innerText = hours < 10 ? '0' + hours : hours;
        mEl.innerText = minutes < 10 ? '0' + minutes : minutes;
        sEl.innerText = seconds < 10 ? '0' + seconds : seconds;
    }, 1000);
}

/* ==========================================
   FAQ & SCROLL BEHAVIOR
   ========================================== */
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

const backToTopBtn = document.getElementById("backToTop");
let isScrolling = false;

window.addEventListener('scroll', () => {
    if (!isScrolling && backToTopBtn) {
        window.requestAnimationFrame(() => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = "block";
            } else {
                backToTopBtn.style.display = "none";
            }
            isScrolling = false;
        });
        isScrolling = true;
    }
}, { passive: true });

function topFunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================
   INITIALIZATION & LAZY CONFETTI
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    // AOS init moved here
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true, offset: 50 }); // Optimized duration and offset
    }

    // Vanilla Tilt
    const tiltElements = document.querySelectorAll(".card");
    if(tiltElements.length > 0 && typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(tiltElements, {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2
        });
    }
});

// Delay Confetti so it doesn't block LCP on page load
window.addEventListener('load', function() {
    setTimeout(() => {
        if (typeof confetti === "function") {
            var duration = 2 * 1000;
            var animationEnd = Date.now() + duration;
            var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
            function randomInRange(min, max) { return Math.random() * (max - min) + min; }
            
            var interval = setInterval(function() {
                var timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) return clearInterval(interval);
                var particleCount = 50 * (timeLeft / duration);
                
                confetti(Object.assign({}, defaults, { 
                    particleCount, 
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                    colors: ['#00f2ff', '#7000ff', '#ff0055', '#ffffff']
                }));
                confetti(Object.assign({}, defaults, { 
                    particleCount, 
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                    colors: ['#00f2ff', '#7000ff', '#ff0055', '#ffffff']
                }));
            }, 250);
        }
    }, 1500); // Wait 1.5 seconds after load before starting confetti
});