// 1. TOGGLE RULES FUNCTION
window.toggleRules = function(id) {
    const ruleBox = document.getElementById(id);
    if(ruleBox) {
        ruleBox.style.display = (ruleBox.style.display === "block") ? "none" : "block";
    }
};

// 2. MOBILE MENU
window.toggleMenu = function() {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.toggle('active');
};

// 3. ANIMATIONS LOAD
document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') AOS.init({ duration: 1000, once: true, offset: 100 });
    
    // Stats Counter
    const counters = document.querySelectorAll('.counter');
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
            if(entries[0].isIntersecting) {
                updateCounter();
                observer.unobserve(counter);
            }
        });
        observer.observe(counter);
    });
});

// 4. CONFETTI
window.addEventListener('load', function() {
    if (typeof confetti === "function") {
        var duration = 2 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        function randomInRange(min, max) { return Math.random() * (max - min) + min; }
        var interval = setInterval(function() {
            var timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);
            var particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount: 50, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#00f2ff', '#7000ff', '#ff0055', '#ffffff'] }));
            confetti(Object.assign({}, defaults, { particleCount: 50, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#00f2ff', '#7000ff', '#ff0055', '#ffffff'] }));
        }, 250);
    }
});