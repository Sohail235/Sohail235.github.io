document.addEventListener('DOMContentLoaded', function() {
    // ===== CONFIGURATION =====
    const CONFIG = {
        paypalEmail: "sohailkhangurmanibaloch1134@gmail.com",
        defaultCurrency: "USD",
        profileImage: "https://i.postimg.cc/cCwqXXhq/IMG-20250119-072901-954.jpg"
    };

    // ===== REAL PRODUCT DATA =====
    const products = [
        {
            id: 1,
            title: "Neon Glow UI Kit",
            category: "ui-kit",
            price: 29.99,
            description: "Professional UI kit with 150+ glowing components for dark interfaces. Used by 5,000+ designers worldwide.",
            image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&auto=format&fit=crop",
            previews: [
                "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop"
            ],
            details: {
                "Components": "Buttons, Cards, Forms, Navigation",
                "Files": "Figma, XD, PNG (4K)",
                "License": "Extended Commercial"
            },
            paymentMethods: ["paypal", "card"],
            popular: true
        },
        {
            id: 2,
            title: "Pixel Perfect Icons Pro",
            category: "icon",
            price: 24.99,
            description: "2000+ ultra-crisp icons with perfect pixel alignment. Multiple sizes and formats included.",
            image: "https://images.unsplash.com/photo-1613166714574-0a8b63a9ac2a?w=800&auto=format&fit=crop",
            previews: [
                "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop"
            ],
            details: {
                "Count": "2000+ icons",
                "Formats": "SVG, PNG, WebFont",
                "Categories": "25+"
            },
            paymentMethods: ["paypal"],
            popular: true
        },
        {
            id: 3,
            title: "Notion Ultimate Workspace",
            category: "template",
            price: 34.99,
            description: "Complete Notion system with CRM, content calendar, and project management templates.",
            image: "https://images.unsplash.com/photo-1655720827862-1a0f7a9e9c1f?w=800&auto=format&fit=crop",
            previews: [
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop"
            ],
            details: {
                "Templates": "35+ pages",
                "Includes": "Dashboard, CRM, Wiki",
                "Devices": "Mobile & Desktop"
            },
            paymentMethods: ["paypal", "card"]
        }
    ];

    // ===== CORE FUNCTIONALITY =====
    let cart = [];
    let currentCurrency = CONFIG.defaultCurrency;

    // Initialize the store
    function initStore() {
        renderProfile();
        renderProducts();
        setupEventListeners();
        updateCartCount();
        document.getElementById('year').textContent = new Date().getFullYear();
    }

    // Render profile section
    function renderProfile() {
        const profileSection = document.querySelector('.about-content');
        profileSection.innerHTML = `
            <h2 class="section-title">About <span>Sohail Khan</span></h2>
            <h3>Digital Product Designer & Developer</h3>
            <p class="about-text">5+ years creating premium resources for designers and developers worldwide.</p>
            <div class="about-skills">
                <div class="skill-tag">UI/UX Design</div>
                <div class="skill-tag">Frontend Development</div>
                <div class="skill-tag">3D Modeling</div>
            </div>
            <div class="about-contact">
                <a href="mailto:${CONFIG.paypalEmail}" class="contact-link">
                    <i class="fas fa-envelope"></i> ${CONFIG.paypalEmail}
                </a>
                <div class="social-links">
                    <a href="#"><i class="fab fa-dribbble"></i></a>
                    <a href="#"><i class="fab fa-behance"></i></a>
                    <a href="#"><i class="fab fa-github"></i></a>
                </div>
            </div>
        `;
        
        document.querySelector('.profile-img').src = CONFIG.profileImage;
    }

    // Render products
    function renderProducts(filter = 'all') {
        const productsGrid = document.querySelector('.products-grid');
        productsGrid.innerHTML = products
            .filter(p => filter === 'all' || p.category === filter)
            .map(product => `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.title}" class="product-image">
                    <div class="product-info">
                        <h3 class="product-title">${product.title}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-footer">
                            <span class="product-price">${formatCurrency(product.price)}</span>
                            <button class="btn btn-primary view-product" data-id="${product.id}">View Details</button>
                        </div>
                    </div>
                    ${product.popular ? '<div class="product-badge">POPULAR</div>' : ''}
                </div>
            `).join('');
    }

    // Format currency
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currentCurrency
        }).format(amount);
    }

    // Open product modal
    function openProductModal(productId) {
        const product = products.find(p => p.id == productId);
        if (!product) return;

        const modalContent = document.querySelector('.modal-product-view');
        modalContent.innerHTML = `
            <div class="modal-product-image-container">
                <img src="${product.image}" alt="${product.title}" class="modal-product-image">
                <div class="product-previews">
                    ${product.previews.map((preview, i) => `
                        <img src="${preview}" class="preview-thumb ${i === 0 ? 'active' : ''}" 
                             onclick="changePreview(this, '${preview}')">
                    `).join('')}
                </div>
            </div>
            <div class="modal-product-info">
                <h3 class="modal-product-title">${product.title}</h3>
                <div class="modal-product-price">${formatCurrency(product.price)}</div>
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
                            <div class="payment-method ${method}" data-method="${method}">
                                <i class="${method === 'paypal' ? 'fab fa-paypal' : 'far fa-credit-card'}"></i>
                                ${method === 'paypal' ? 'PayPal' : 'Credit Card'}
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="modal-product-actions">
                    <button class="btn btn-primary buy-now" data-id="${product.id}">Buy Now</button>
                    <button class="btn btn-outline add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;

        document.querySelector('.product-modal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Handle PayPal payment
    function processPaypalPayment(productId) {
        const product = products.find(p => p.id == productId);
        if (!product) return;

        const paypalLink = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${CONFIG.paypalEmail}&item_name=${encodeURIComponent(product.title)}&amount=${product.price}&currency_code=${currentCurrency}&return=thankyou.html`;
        
        window.open(paypalLink, '_blank');
    }

    // Add to cart
    function addToCart(productId) {
        const product = products.find(p => p.id == productId);
        if (!product) return;

        cart.push(product);
        updateCartCount();
        showToast(`${product.title} added to cart`);
    }

    // Update cart count
    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = cart.length;
            cartCount.style.display = cart.length ? 'block' : 'none';
        }
    }

    // Show toast notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => document.body.removeChild(toast), 300);
            }, 3000);
        }, 100);
    }

    // Setup event listeners
    function setupEventListeners() {
        // Product clicks
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('view-product')) {
                openProductModal(e.target.dataset.id);
            }
            
            if (e.target.classList.contains('buy-now')) {
                const productId = e.target.dataset.id;
                const selectedMethod = document.querySelector('.payment-method.active');
                
                if (selectedMethod && selectedMethod.dataset.method === 'paypal') {
                    processPaypalPayment(productId);
                } else {
                    // Handle other payment methods
                    showToast('Please select a payment method');
                }
            }
            
            if (e.target.classList.contains('add-to-cart')) {
                addToCart(e.target.dataset.id);
            }
            
            if (e.target.classList.contains('payment-method')) {
                document.querySelectorAll('.payment-method').forEach(el => el.classList.remove('active'));
                e.target.classList.add('active');
            }
        });

        // Close modal
        document.querySelector('.close-modal').addEventListener('click', function() {
            document.querySelector('.product-modal').classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Theme toggle
        document.querySelector('.theme-toggle').addEventListener('click', function() {
            const html = document.documentElement;
            const newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Initialize the store
    initStore();
});

// Global function for preview images
function changePreview(element, newSrc) {
    document.querySelectorAll('.preview-thumb').forEach(el => el.classList.remove('active'));
    element.classList.add('active');
    document.querySelector('.modal-product-image').src = newSrc;
            }
