document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    html.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Mobile Menu
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    mobileMenuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuToggle.innerHTML = nav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Chat Panel
    const chatToggle = document.querySelector('.chat-toggle');
    const chatPanel = document.querySelector('.chat-panel');
    const closeChat = document.querySelector('.close-chat');
    
    chatToggle.addEventListener('click', () => {
        chatPanel.classList.toggle('active');
        document.querySelector('.notification-badge').style.display = 'none';
    });
    
    closeChat.addEventListener('click', () => {
        chatPanel.classList.remove('active');
    });

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input');
            const message = input.value.trim();
            
            if (message) {
                addMessageToChat(message, 'sent');
                
                setTimeout(() => {
                    const responses = [
                        "Thanks for your message! I'll get back to you soon.",
                        "Your message has been received. Thank you!"
                    ];
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    addMessageToChat(randomResponse, 'received');
                }, 1500);
                
                input.value = '';
            }
        });
    }
    
    function addMessageToChat(message, type) {
        const chatMessages = document.querySelector('.chat-messages');
        const messageTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}`;
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
            <div class="message-time">${messageTime}</div>
        `;
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        if (!chatPanel.classList.contains('active') && type === 'received') {
            document.querySelector('.notification-badge').style.display = 'block';
        }
    }

    // ===== REAL PRODUCT DATA WITH PAYMENT METHODS =====
    const products = [
        {
            id: 1,
            title: "Neon Glow UI Kit",
            category: "ui-kit",
            price: "$29.99",
            description: "150+ futuristic components with customizable glow effects for dark mode applications. Perfect for gaming and tech products.",
            image: "https://i.postimg.cc/8z5ZJQK7/neon-ui.jpg",
            previews: [
                "https://i.postimg.cc/8z5ZJQK7/neon-ui.jpg",
                "https://i.postimg.cc/XJ0nLQYF/neon-preview1.jpg",
                "https://i.postimg.cc/4y8W3y0Z/neon-preview2.jpg"
            ],
            details: {
                "File Types": "Figma, XD, PNG",
                "Components": "Buttons, Cards, Forms, Navigation",
                "License": "Extended Commercial"
            },
            paymentMethods: ["card", "paypal", "crypto"],
            popular: true
        },
        {
            id: 2,
            title: "Pixel Perfect Icons PRO",
            category: "icon",
            price: "$24.99",
            description: "2000+ ultra-crisp pixel-perfect icons in 24px, 32px, and 48px sizes. Perfect for developers needing sharp icons.",
            image: "https://i.postimg.cc/8C3n2YkZ/pixel-icons.jpg",
            previews: [
                "https://i.postimg.cc/8C3n2YkZ/pixel-icons.jpg",
                "https://i.postimg.cc/9FhKJjJZ/pixel-preview1.jpg",
                "https://i.postimg.cc/SNbT1J5k/pixel-preview2.jpg"
            ],
            details: {
                "File Types": "SVG, PNG, WebFont",
                "Icons": "2000+ across 25 categories",
                "License": "Lifetime Updates"
            },
            paymentMethods: ["card", "paypal"],
            popular: true
        },
        {
            id: 3,
            title: "Notion Ultimate Workspace",
            category: "template",
            price: "$34.99",
            description: "Complete Notion system with CRM, content calendar, and project management templates. Works on all devices.",
            image: "https://i.postimg.cc/3RJQ4y0H/notion-template.jpg",
            previews: [
                "https://i.postimg.cc/3RJQ4y0H/notion-template.jpg",
                "https://i.postimg.cc/8P4YqZ0X/notion-preview1.jpg",
                "https://i.postimg.cc/YqV6TkH2/notion-preview2.jpg"
            ],
            details: {
                "Templates": "35+ customizable pages",
                "Includes": "Dashboard, Task Manager, Wiki",
                "License": "Team Commercial"
            },
            paymentMethods: ["card", "paypal", "bank-transfer"]
        }
    ];

    // ===== PROFILE DATA =====
    const profileData = {
        name: "Sohail Khan",
        role: "Digital Product Designer & Developer",
        bio: "5+ years creating premium resources for designers and developers. Focused on building tools that enhance creative workflows.",
        image: "https://i.postimg.cc/cCwqXXhq/IMG-20250119-072901-954.jpg",
        skills: ["UI/UX Design", "Frontend Development", "3D Modeling", "Product Strategy"],
        contact: {
            email: "hello@sohailkhan.design",
            social: {
                dribbble: "#",
                behance: "#",
                github: "#"
            }
        }
    };

    // Render Profile
    function renderProfile() {
        const aboutImage = document.querySelector('.profile-img');
        const aboutContent = document.querySelector('.about-content');
        
        aboutImage.src = profileData.image;
        aboutImage.alt = profileData.name;
        
        aboutContent.innerHTML = `
            <h2 class="section-title">About <span>${profileData.name}</span></h2>
            <h3>${profileData.role}</h3>
            <p class="about-text">${profileData.bio}</p>
            
            <div class="about-skills">
                ${profileData.skills.map(skill => `<div class="skill-tag">${skill}</div>`).join('')}
            </div>
            
            <div class="about-contact">
                <a href="mailto:${profileData.contact.email}" class="contact-link">
                    <i class="fas fa-envelope"></i> ${profileData.contact.email}
                </a>
                <div class="social-links">
                    <a href="${profileData.contact.social.dribbble}"><i class="fab fa-dribbble"></i></a>
                    <a href="${profileData.contact.social.behance}"><i class="fab fa-behance"></i></a>
                    <a href="${profileData.contact.social.github}"><i class="fab fa-github"></i></a>
                </div>
            </div>
        `;
    }

    // Product Modal with Payment
    const productModal = document.querySelector('.product-modal');
    const closeModal = document.querySelector('.close-modal');
    
    function openProductModal(productId) {
        const product = products.find(p => p.id == productId);
        if (!product) return;
        
        const modalView = document.querySelector('.modal-product-view');
        modalView.innerHTML = `
            <div class="modal-product-image-container">
                <img src="${product.image}" alt="${product.title}" class="modal-product-image">
                <div class="product-previews">
                    ${product.previews.map((preview, index) => `
                        <img src="${preview}" class="${index === 0 ? 'active' : ''}" 
                             onclick="changePreview(this, '${preview}')">
                    `).join('')}
                </div>
            </div>
            
            <div class="modal-product-info">
                <h3 class="modal-product-title">${product.title}</h3>
                <div class="modal-product-price">${product.price}</div>
                <p class="modal-product-description">${product.description}</p>
                
                <div class="modal-product-details">
                    ${Object.entries(product.details).map(([key, value]) => `
                        <div class="detail-item">
                            <span class="detail-label">${key}:</span>
                            <span class="detail-value">${value}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="payment-methods">
                    <h4>Payment Options:</h4>
                    <div class="payment-options">
                        ${product.paymentMethods.map(method => `
                            <div class="payment-method ${method}">
                                <i class="fab fa-${method === 'card' ? 'cc-visa' : method === 'crypto' ? 'bitcoin' : method}"></i>
                                ${method.replace('-', ' ').toUpperCase()}
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="modal-product-actions">
                    <button class="btn btn-primary buy-now">Buy Now</button>
                    <button class="btn btn-outline add-to-cart">Add to Cart</button>
                </div>
            </div>
        `;
        
        // Payment method selection
        document.querySelectorAll('.payment-method').forEach(method => {
            method.addEventListener('click', function() {
                document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        productModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal.addEventListener('click', () => {
        productModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Render Products
    function renderProducts(filter = 'all') {
        const filteredProducts = filter === 'all' ? 
            products : 
            products.filter(product => product.category === filter);
        
        const productsGrid = document.querySelector('.shop-section .products-grid');
        productsGrid.innerHTML = '';
        
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-footer">
                        <span class="product-price">${product.price}</span>
                        <button class="btn btn-primary view-product" data-id="${product.id}">View Details</button>
                    </div>
                </div>
                ${product.popular ? '<div class="product-badge">POPULAR</div>' : ''}
            `;
            productsGrid.appendChild(productCard);
        });
        
        document.querySelectorAll('.view-product').forEach(button => {
            button.addEventListener('click', () => openProductModal(button.dataset.id));
        });
    }

    // Initialize
    function init() {
        renderProfile();
        renderProducts();
        document.getElementById('year').textContent = new Date().getFullYear();
    }

    init();
});

// Global function for preview images
function changePreview(element, newSrc) {
    document.querySelectorAll('.product-previews img').forEach(img => {
        img.classList.remove('active');
    });
    element.classList.add('active');
    document.querySelector('.modal-product-image').src = newSrc;
}
