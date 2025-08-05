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
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    html.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    mobileMenuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuToggle.innerHTML = nav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Chat Panel Toggle
    const chatToggle = document.querySelector('.chat-toggle');
    const chatPanel = document.querySelector('.chat-panel');
    const closeChat = document.querySelector('.close-chat');
    const openChatLinks = document.querySelectorAll('.open-chat');
    
    chatToggle.addEventListener('click', () => {
        chatPanel.classList.toggle('active');
        document.querySelector('.notification-badge').style.display = 'none';
    });
    
    closeChat.addEventListener('click', () => {
        chatPanel.classList.remove('active');
    });
    
    openChatLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            chatPanel.classList.add('active');
            document.querySelector('.notification-badge').style.display = 'none';
        });
    });

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input');
            const message = input.value.trim();
            
            if (message) {
                // Add user message to chat
                addMessageToChat(message, 'sent');
                
                // Simulate admin response after delay
                setTimeout(() => {
                    const responses = [
                        "Thanks for your message! I'll get back to you soon.",
                        "I appreciate your inquiry. I'll respond as quickly as possible.",
                        "Your message has been received. Thank you for reaching out!",
                        "Thanks for contacting us! We'll be in touch shortly."
                    ];
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    addMessageToChat(randomResponse, 'received');
                }, 1500);
                
                // Clear input
                input.value = '';
                
                // Here you would typically send the message to your backend
                // For GitHub Pages, you might need to use a third-party service
                // or implement a solution with GitHub Issues as a backend
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
        
        // Show notification badge if chat is closed
        if (!chatPanel.classList.contains('active') && type === 'received') {
            document.querySelector('.notification-badge').style.display = 'block';
        }
    }

    // Product Modal
    const productCards = document.querySelectorAll('.product-card');
    const productModal = document.querySelector('.product-modal');
    const closeModal = document.querySelector('.close-modal');
    
    // Sample product data - in a real app, this would come from an API
    const products = [
        {
            id: 1,
            title: "Modern UI Kit",
            category: "ui-kit",
            price: "$29.99",
            description: "A comprehensive UI kit with 100+ components, designed for modern web applications. Perfect for designers and developers looking to speed up their workflow.",
            image: "assets/products/ui-kit.jpg",
            details: {
                "File Types": "Figma, Sketch, XD, PNG",
                "Components": "Buttons, Cards, Forms, Navigation",
                "License": "Extended Commercial",
                "Updates": "Free for 1 year"
            }
        },
        {
            id: 2,
            title: "Minimal Icons Pack",
            category: "icon",
            price: "$14.99",
            description: "500+ minimal line icons in multiple formats. Perfect for apps, websites, and presentations. All icons are fully customizable.",
            image: "assets/products/icons.jpg",
            details: {
                "File Types": "SVG, PNG, Figma, Sketch",
                "Icons": "500+",
                "License": "Extended Commercial",
                "Updates": "Free for 6 months"
            }
        },
        {
            id: 3,
            title: "React Component Library",
            category: "code",
            price: "$49.99",
            description: "A collection of reusable React components with TypeScript support. Includes documentation and example implementations.",
            image: "assets/products/react.jpg",
            details: {
                "File Types": "JSX, TSX, CSS",
                "Components": "30+",
                "License": "MIT",
                "Dependencies": "React 18+"
            }
        },
        {
            id: 4,
            title: "Design Tool Plugins",
            category: "tool",
            price: "$19.99",
            description: "Collection of time-saving plugins for Figma and Sketch. Automate repetitive tasks and enhance your design workflow.",
            image: "assets/products/plugins.jpg",
            details: {
                "File Types": "Figma, Sketch",
                "Plugins": "10+",
                "License": "Single User",
                "Updates": "Free for 1 year"
            }
        },
        {
            id: 5,
            title: "Illustration Pack",
            category: "ui-kit",
            price: "$24.99",
            description: "100+ customizable illustrations for websites and apps. Multiple styles and categories included.",
            image: "assets/products/illustrations.jpg",
            details: {
                "File Types": "SVG, PNG, AI",
                "Categories": "10+",
                "License": "Extended Commercial",
                "Customization": "Fully editable"
            }
        },
        {
            id: 6,
            title: "CSS Animation Library",
            category: "code",
            price: "$17.99",
            description: "Collection of 50+ ready-to-use CSS animations. Just add the class to your elements for instant effects.",
            image: "assets/products/css-animations.jpg",
            details: {
                "File Types": "CSS, SCSS",
                "Animations": "50+",
                "License": "MIT",
                "Browser Support": "All modern browsers"
            }
        }
    ];

    // Render products
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
                <div class="product-badge">${product.category.toUpperCase()}</div>
            `;
            productsGrid.appendChild(productCard);
        });
        
        // Add event listeners to new product buttons
        document.querySelectorAll('.view-product').forEach(button => {
            button.addEventListener('click', () => openProductModal(button.dataset.id));
        });
    }
    
    // Render featured products
    function renderFeaturedProducts() {
        const featuredGrid = document.querySelector('.featured-products .products-grid');
        featuredGrid.innerHTML = '';
        
        // Get first 4 products as featured
        const featuredProducts = products.slice(0, 4);
        
        featuredProducts.forEach(product => {
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
                <div class="product-badge">${product.category.toUpperCase()}</div>
            `;
            featuredGrid.appendChild(productCard);
        });
        
        // Add event listeners to featured product buttons
        document.querySelectorAll('.featured-products .view-product').forEach(button => {
            button.addEventListener('click', () => openProductModal(button.dataset.id));
        });
    }
    
    // Open product modal
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
    
    // Close product modal
    closeModal.addEventListener('click', () => {
        productModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Filter products
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderProducts(button.dataset.filter);
        });
    });

    // Initialize
    renderFeaturedProducts();
    renderProducts();
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Animate elements when scrolling
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.hero-visual, .featured-products, .about-image');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state
    document.querySelector('.hero-visual').style.opacity = '0';
    document.querySelector('.hero-visual').style.transform = 'translateY(50px)';
    document.querySelector('.featured-products').style.opacity = '0';
    document.querySelector('.featured-products').style.transform = 'translateY(50px)';
    document.querySelector('.about-image').style.opacity = '0';
    document.querySelector('.about-image').style.transform = 'translateY(50px)';
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on load in case elements are already in view
    animateOnScroll();
});
