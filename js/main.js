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

    // ===== REAL PRODUCT DATA =====
    const products = [
        {
            id: 1,
            title: "Neon Glow UI Kit",
            category: "ui-kit",
            price: "$29.99",
            description: "150+ futuristic components with customizable glow effects for dark mode applications.",
            image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&auto=format&fit=crop",
            details: {
                "File Types": "Figma, XD, PNG",
                "Components": "Buttons, Cards, Forms",
                "License": "Extended Commercial"
            },
            popular: true
        },
        {
            id: 2,
            title: "Pixel Perfect Icons",
            category: "icon",
            price: "$19.99",
            description: "1000+ crisp pixel-aligned icons in 24px, 32px, and 48px sizes.",
            image: "https://images.unsplash.com/photo-1613166714574-0a8b63a9ac2a?w=800&auto=format&fit=crop",
            details: {
                "File Types": "SVG, PNG, WebFont",
                "Icons": "1000+",
                "License": "Lifetime Updates"
            },
            popular: true
        },
        {
            id: 3,
            title: "React Shopping Cart",
            category: "code",
            price: "$49.99",
            description: "Complete e-commerce cart with Stripe integration and localStorage.",
            image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&auto=format&fit=crop",
            details: {
                "Framework": "React 18+",
                "Includes": "Checkout flow, Coupons",
                "License": "MIT"
            }
        },
        {
            id: 4,
            title: "Figma Auto-Layout Plugin",
            category: "tool",
            price: "$14.99",
            description: "Smart plugin that automatically organizes layers and creates responsive frames.",
            image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop",
            details: {
                "Platform": "Figma",
                "Features": "Spacing presets",
                "Updates": "1 year included"
            }
        },
        {
            id: 5,
            title: "Notion Dashboard Template",
            category: "template",
            price: "$18.99",
            description: "All-in-one productivity system with task manager and habit tracker.",
            image: "https://images.unsplash.com/photo-1655720827862-1a0f7a9e9c1f?w=800&auto=format&fit=crop",
            details: {
                "Pages": "15+ templates",
                "License": "Personal & Team"
            }
        },
        {
            id: 6,
            title: "Animated Lottie Icons",
            category: "icon",
            price: "$24.99",
            description: "500+ micro-animations for apps and websites in JSON format.",
            image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop",
            details: {
                "Format": "JSON, GIF, MP4",
                "License": "Commercial Unlimited"
            }
        }
    ];

    // Product Modal
    const productModal = document.querySelector('.product-modal');
    const closeModal = document.querySelector('.close-modal');
    
    function openProductModal(productId) {
        const product = products.find(p => p.id == productId);
        if (!product) return;
        
        const modalView = document.querySelector('.modal-product-view');
        modalView.innerHTML = `
            <div class="modal-product-image-container">
                <img src="${product.image}" alt="${product.title}" class="modal-product-image">
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
                
                <div class="modal-product-actions">
                    <button class="btn btn-primary">Buy Now</button>
                    <button class="btn btn-outline">Add to Cart</button>
                </div>
            </div>
        `;
        
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
    renderProducts();
    document.getElementById('year').textContent = new Date().getFullYear();
});
