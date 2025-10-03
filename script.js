// Orbit tab clicks
document.querySelectorAll('.tab-item a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href !== window.location.pathname) {
            window.location.href = href;
        }
        const orbitTabs = document.querySelector('.orbit-tabs');
        orbitTabs.style.animationPlayState = 'paused';
        setTimeout(() => {
            orbitTabs.style.animationPlayState = 'running';
        }, 300);
    });
});

// Mobile fallback (if needed - add hamburger)
const mobileToggle = document.querySelector('.mobile-toggle');
if (mobileToggle) {
    // Add if using fallback nav
}

// Scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .post').forEach(card => {
    observer.observe(card);
});

// Forms
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Subscribed! Check your email for confirmation.');
        this.reset();
    });
}

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Message sent! We\'ll reply soon.');
        this.reset();
    });
}

// Games (from previous)
const modal = document.getElementById('game-modal');
const gameContent = document.getElementById('game-content');
const closeBtn = document.querySelector('.close');
const playBtns = document.querySelectorAll('.play-btn:not(.disabled)');

playBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const gameId = btn.closest('.game-card').dataset.game;
        loadGame(gameId);
        modal.style.display = 'block';
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    gameContent.innerHTML = '';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        gameContent.innerHTML = '';
    }
});

function loadGame(gameId) {
    let html = '';
    switch (gameId) {
        case 'password-strength':
            html = `
                <h3>Password Strength Analyzer</h3>
                <p>Enter a password to check its strength.</p>
                <input type="password" id="pwd-input" placeholder="Enter password" maxlength="20">
                <button onclick="checkPassword()">Analyze</button>
                <div id="pwd-result" class="game-score"></div>
                <p id="pwd-tip"></p>
            `;
            break;
        // Add other cases as before...
        default:
            html = '<p>Game coming soon!</p>';
    }
    gameContent.innerHTML = html;
}

// Game functions as before (checkPassword, etc.) - copy from last version

// Expose to global
window.checkPassword = checkPassword;
window.caesarEncrypt = caesarEncrypt;
// ... etc.
