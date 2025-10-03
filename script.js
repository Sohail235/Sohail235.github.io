// Orbit tab clicks
document.querySelectorAll('.tab-item a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href !== window.location.pathname) {
            window.location.href = href;
        }
        const orbitTabs = document.querySelector('.orbit-tabs');
        if (orbitTabs) {
            orbitTabs.style.animationPlayState = 'paused';
            setTimeout(() => {
                orbitTabs.style.animationPlayState = 'running';
            }, 300);
        }
    });
});

// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navUl = document.querySelector('nav ul');
if (mobileToggle && navUl) {
    mobileToggle.addEventListener('click', () => {
        navUl.classList.toggle('active');
    });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
        if (navUl) navUl.classList.remove('active');
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .post, .mission li').forEach(el => {
    observer.observe(el);
});

// Forms
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Subscribed! Check your email for confirmation. (Integrate with your service.)');
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

// Game Modal
const modal = document.getElementById('game-modal');
const gameContent = document.getElementById('game-content');
const closeBtn = document.querySelector('.close');
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        gameContent.innerHTML = '';
    });
}

if (modal) {
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            gameContent.innerHTML = '';
        }
    });
}

const playBtns = document.querySelectorAll('.play-btn:not(.disabled)');
playBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const gameId = btn.closest('.game-card').dataset.game;
        loadGame(gameId);
        if (modal) modal.style.display = 'block';
    });
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
        case 'caesar-cipher':
            html = `
                <h3>Caesar Cipher</h3>
                <p>Shift: <input type="number" id="shift" value="3" min="1" max="25"> <br>
                Message: <input type="text" id="cipher-text" placeholder="Enter text"> <br>
                <button onclick="caesarEncrypt()">Encrypt</button>
                <button onclick="caesarDecrypt()">Decrypt</button>
                <div id="cipher-result"></div>
            `;
            break;
        case 'binary-converter':
            html = `
                <h3>Binary Converter</h3>
                <p>Text to Binary: <input type="text" id="text-to-bin" placeholder="Enter text"> <button onclick="textToBinary()">Convert</button> <br>
                Binary to Text: <input type="text" id="bin-to-text" placeholder="Enter binary"> <button onclick="binaryToText()">Convert</button>
                <div id="bin-result"></div>
            `;
            break;
        case 'phishing-quiz':
            html = `
                <h3>Spot the Phish - Quiz</h3>
                <p>Question 1: "Your account is suspended! Click here." Is this phishing? <button onclick="quizAnswer(1, true)">Yes</button> <button onclick="quizAnswer(1, false)">No</button> <br>
                <div id="quiz-result"></div>
                <p>Score: <span id="quiz-score">0</span>/5</p>
            `;
            break;
        case 'port-scanner':
            html = `
                <h3>Port Scanner Sim</h3>
                <p>Scan ports 1-1000. Enter port: <input type="number" id="port-num" min="1" max="1000"> <button onclick="scanPort()">Scan</button>
                <div id="port-result"></div>
                <p>Open ports found: <span id="open-ports">0</span></p>
            `;
            break;
        default:
            html = '<p>Game coming soon!</p>';
    }
    gameContent.innerHTML = html;
}

function checkPassword() {
    const pwd = document.getElementById('pwd-input').value;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    const result = document.getElementById('pwd-result');
    const tip = document.getElementById('pwd-tip');
    result.textContent = `Strength: ${score}/5`;
    tip.textContent = score < 3 ? 'Tip: Add uppercase, numbers, and symbols!' : 'Strong password!';
}

function caesarEncrypt() {
    const text = document.getElementById('cipher-text').value.toUpperCase();
    const shift = parseInt(document.getElementById('shift').value) % 26;
    let result = '';
    for (let char of text) {
        if (char.match(/[A-Z]/)) {
            result += String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
        } else {
            result += char;
        }
    }
    document.getElementById('cipher-result').textContent = `Encrypted: ${result}`;
}

function caesarDecrypt() {
    const text = document.getElementById('cipher-text').value.toUpperCase();
    const shift = -parseInt(document.getElementById('shift').value) % 26;
    let result = '';
    for (let char of text) {
        if (char.match(/[A-Z]/)) {
            result += String.fromCharCode(((char.charCodeAt(0) - 65 + shift + 26) % 26) + 65);
        } else {
            result += char;
        }
    }
    document.getElementById('cipher-result').textContent = `Decrypted: ${result}`;
}

function textToBinary() {
    const text = document.getElementById('text-to-bin').value;
    let bin = '';
    for (let char of text) {
        bin += char.charCodeAt(0).toString(2).padStart(8, '0') + ' ';
    }
    document.getElementById('bin-result').textContent = `Binary: ${bin}`;
}

function binaryToText() {
    const bin = document.getElementById('bin-to-text').value.replace(/\s/g, '');
    let text = '';
    for (let i = 0; i < bin.length; i += 8) {
        const byte = bin.substr(i, 8);
        if (byte) text += String.fromCharCode(parseInt(byte, 2));
    }
    document.getElementById('bin-result').textContent = `Text: ${text}`;
}

function quizAnswer(q, answer) {
    const result = document.getElementById('quiz-result');
    result.textContent = answer ? 'Correct! Phishing detected.' : 'Wrong. Always verify sender.';
    document.getElementById('quiz-score').textContent = (parseInt(document.getElementById('quiz-score').textContent) + (answer ? 1 : 0));
}

function scanPort() {
    const port = parseInt(document.getElementById('port-num').value);
    const result = document.getElementById('port-result');
    const openPorts = document.getElementById('open-ports');
    let count = parseInt(openPorts.textContent);
    if (port % 2 === 0) {
        result.innerHTML = `<p>Port ${port}: OPEN (Vulnerable!)</p>`;
        count++;
    } else {
        result.innerHTML = `<p>Port ${port}: CLOSED</p>`;
    }
    openPorts.textContent = count;
    result.innerHTML += '<p>Tip: Common open ports: 80 (HTTP), 443 (HTTPS).</p>';
}

// Global expose
window.checkPassword = checkPassword;
window.caesarEncrypt = caesarEncrypt;
window.caesarDecrypt = caesarDecrypt;
window.textToBinary = textToBinary;
window.binaryToText = binaryToText;
window.quizAnswer = quizAnswer;
window.scanPort = scanPort;
