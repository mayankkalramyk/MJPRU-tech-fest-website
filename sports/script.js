/* ==========================================
   MAIN SCRIPT FILE - UPDATED
   ========================================== */

// ==========================================
// 1. MOBILE MENU LOGIC
// ==========================================
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

// ==========================================
// 2. TOGGLE RULES FUNCTION (NEW)
// ==========================================
window.toggleRules = function(id) {
    const ruleBox = document.getElementById(id);
    if(ruleBox) {
        // Toggle display
        ruleBox.style.display = (ruleBox.style.display === "block") ? "none" : "block";
    }
};

// ==========================================
// 3. MODAL LOGIC
// ==========================================
function openForm(url) {
    const modal = document.getElementById('formModal');
    const iframe = document.getElementById('googleFormFrame');
    
    if(modal && iframe) {
        iframe.src = url;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; 
    }
}

function closeForm() {
    const modal = document.getElementById('formModal');
    const iframe = document.getElementById('googleFormFrame');

    if(modal && iframe) {
        modal.style.display = 'none';
        iframe.src = ""; 
        document.body.style.overflow = 'auto'; 
    }
}

window.onclick = function(event) {
    const formModal = document.getElementById('formModal');
    if (event.target == formModal) {
        closeForm();
    }
}

// ==========================================
// 4. STATS COUNTER ANIMATION
// ==========================================
// Wrap in DOMContentLoaded to ensure elements exist
document.addEventListener('DOMContentLoaded', () => {
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
            const observer = new IntersectionObserver((entries) => {
                if(entries[0].isIntersecting){
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
            observer.observe(counter);
        });
    }
});

// ==========================================
// 5. ON LOAD: ANIMATIONS (AOS) & CONFETTI
// ==========================================
// Defer execution until everything is loaded
window.addEventListener('load', function() {
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    // Party Confetti
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
});