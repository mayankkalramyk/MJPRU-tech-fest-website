/* ==========================================
   MAIN UI LOGIC - MENUS, MODALS, SCROLL
   ========================================== */

// 1. MOBILE MENU
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.toggle('active');
}

// 2. MODAL LOGIC
function openAccommodation() {
    const modal = document.getElementById('accModal');
    if (modal) { modal.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
}
function closeAccommodation() {
    const modal = document.getElementById('accModal');
    if (modal) { modal.style.display = 'none'; document.body.style.overflow = 'auto'; }
}
function openForm(url) {
    closeAccommodation(); 
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
function openContact() {
    const modal = document.getElementById('contactModal');
    if(modal) { modal.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
}
function closeContact() {
    const modal = document.getElementById('contactModal');
    if(modal) { modal.style.display = 'none'; document.body.style.overflow = 'auto'; }
}

// --- ADVISORY MODAL FUNCTIONS (Deans/Professors) ---
function openAdvisory() {
    // Safety: Close organizing modal if open
    closeOrganizing();
    
    const modal = document.getElementById('advisoryModal');
    if(modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}
function closeAdvisory() {
    const modal = document.getElementById('advisoryModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// --- ORGANIZING MODAL FUNCTIONS (Registration/Food) ---
function openOrganizing() {
    // Safety: Close advisory modal if open
    closeAdvisory();

    const modal = document.getElementById('organizingModal');
    if(modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}
function closeOrganizing() {
    const modal = document.getElementById('organizingModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close on clicking outside
window.onclick = function(event) {
    const formModal = document.getElementById('formModal');
    const contactModal = document.getElementById('contactModal');
    const accModal = document.getElementById('accModal');
    const advisoryModal = document.getElementById('advisoryModal');
    const organizingModal = document.getElementById('organizingModal');

    if (event.target == formModal) closeForm();
    if (event.target == contactModal) closeContact();
    if (event.target == accModal) closeAccommodation();
    if (event.target == advisoryModal) closeAdvisory();
    if (event.target == organizingModal) closeOrganizing();
}

// 3. COUNTDOWN TIMER LOGIC (UPDATED DATE)
// Date changed to March 12, 2026
const festDate = new Date('Mar 12, 2026 09:00:00').getTime();

const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = festDate - now;

    if (distance < 0) {
        clearInterval(countdownInterval);
        const container = document.querySelector('.countdown-container');
        if (container) container.innerHTML = "<h3 style='color:white'>The Fest Has Begun!</h3>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const dEl = document.getElementById('days');
    const hEl = document.getElementById('hours');
    const mEl = document.getElementById('minutes');
    const sEl = document.getElementById('seconds');

    if (dEl) dEl.innerText = days < 10 ? '0' + days : days;
    if (hEl) hEl.innerText = hours < 10 ? '0' + hours : hours;
    if (mEl) mEl.innerText = minutes < 10 ? '0' + minutes : minutes;
    if (sEl) sEl.innerText = seconds < 10 ? '0' + seconds : seconds;
}, 1000);

// 4. FAQ ACCORDION LOGIC
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

// 5. BACK TO TOP BUTTON
const backToTopBtn = document.getElementById("backToTop");
// Use passive listener for performance
window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
}, { passive: true });

function topFunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 6. ANIMATIONS & CONFETTI
window.addEventListener('load', function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true, offset: 100 });
    }
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
});