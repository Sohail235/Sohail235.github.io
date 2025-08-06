// Digital Store Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // ===== STORE CONFIGURATION =====
    const CONFIG = {
        owner: {
            name: "Sohail Khan",
            email: "sohailkhangurmanibaloch1134@gmail.com",
            whatsapp: "48699541013",
            profileImage: "https://i.postimg.cc/cCwqXXhq/IMG-20250119-072901-954.jpg"
        },
        currency: "USD"
    };

    // ===== REAL PRODUCT DATABASE =====
    const PRODUCTS = [
        {
            id: 1,
            title: "Neon Glow UI Kit",
            category: "ui-kit",
            price: 29.99,
            description: "150+ futuristic components with customizable glow effects for dark interfaces.",
            image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&auto=format&fit=crop",
            previews: [
                "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop"
            ],
            details: {
                "File Types": "Figma, XD, PNG",
                "Components": "Buttons, Cards, Forms",
                "License": "Extended Commercial"
            },
            paymentMethods: ["paypal", "whatsapp"],
            popular: true
        },
        {
            id: 2,
            title: "Pixel Perfect Icons",
            category: "icons",
            price: 24.99,
            description: "2000+ ultra-crisp pixel-perfect icons in multiple sizes.",
            image: "https://images.unsplash.com/photo-1613166714574-0a8b63a9ac2a?w=800&auto=format&fit=crop",
            previews: [
                "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop"
            ],
            details: {
                "File Types": "SVG, PNG, WebFont",
                "Icons": "2000+",
                "License": "Lifetime Updates"
            },
            paymentMethods: ["paypal", "whatsapp"],
            popular: true
        },
        {
            id: 3,
            title: "Notion Ultimate Workspace",
            category: "template",
            price: 34.99,
            description: "Complete Notion system with CRM and project management templates.",
            image: "https://images.unsplash.com/photo-1655720827862-1a0f7a9e9c1f?w=800&auto=format&fit=crop",
            previews: [
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop"
            ],
            details: {
                "Templates": "35+ pages",
                "Includes": "Dashboard, CRM",
                "License": "Team Commercial"
            },
            paymentMethods: ["paypal", "whatsapp"]
        }
    ];

    // ===== CART SYSTEM =====
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Initialize store
    function initStore() {
        renderProfile();
        renderProducts();
        setupEventListeners();
        updateCartCount();
        renderWhatsAppButton();
    }

    // Render profile section
    function renderProfile() {
        const profileSection = document.querySelector('.about-content');
        profileSection.innerHTML = `
            <h2 class="section-title">About <span>${CONFIG.owner.name}</span></h2>
            <p class="about-text">${CONFIG.owner.bio || 'Professional digital product creator'}</p>
            <div class="about-contact">
                <a href="mailto:${CONFIG.owner.email}" class="contact-link">
                    <i class="fas fa-envelope"></i> ${CONFIG.owner.email}
                </a>
            </div>
        `;
        document.querySelector('.profile-img').src = CONFIG.owner.profileImage;
    }

    // Render products
    function renderProducts(filter = 'all') {
        const productsGrid = document.querySelector('.products-grid');
        productsGrid.innerHTML = PRODUCTS
            .filter(product => filter === 'all' || product.category === filter)
            .map(product => `
                <div class="product-card">
                    ${product.popular ? '<div class="product-badge">POPULAR</div>' : ''}
                    <img src="${product.image}" alt="${product.title}" class="product-image">
                    <div class="product-info">
                        <h3 class="product-title">${product.title}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-footer">
                            <span class="product-price">${formatCurrency(product.price)}</span>
                            <button class="btn btn-primary view-product" data-id="${product.id}">View</button>
                        </div>
                    </div>
                </div>
            `).join('');
    }

    // Format currency
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: CONFIG.currency
        }).format(amount);
    }

    // Add to cart
    function addToCart(productId) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return;

        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        saveCart();
        updateCartCount();
        showToast(`${product.title} added to cart`);
    }

    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Update cart count
    function updateCartCount() {
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? 'flex' : 'none';
        });
    }

    // Show toast notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }, 100);
    }

    // Render WhatsApp button
    function renderWhatsAppButton() {
        const whatsappBtn = `
            <a href="https://wa.me/${CONFIG.owner.whatsapp}" class="whatsapp-float" target="_blank">
                <i class="fab fa-whatsapp"></i>
            </a>
        `;
        document.body.insertAdjacentHTML('beforeend', whatsappBtn);
    }

    // Open product modal
    function openProductModal(productId) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return;

        const modal = document.querySelector('.product-modal');
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-modal">&times;</button>
                <div class="modal-product-view">
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
                                        <i class="${method === 'paypal' ? 'fab fa-paypal' : 'fab fa-whatsapp'}"></i>
                                        ${method.charAt(0).toUpperCase() + method.slice(1)}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="modal-product-actions">
                            <button class="btn btn-primary buy-now" data-id="${product.id}">
                                <i class="fas fa-bolt"></i> Buy Now
                            </button>
                            <button class="btn btn-outline add-to-cart" data-id="${product.id}">
                                <i class="fas fa-cart-plus"></i> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Process payment
    function processPayment(method, productId = null) {
        const items = productId 
            ? [PRODUCTS.find(p => p.id === productId)] 
            : cart;
        
        if (items.length === 0) {
            showToast('Your cart is empty');
            return;
        }

        if (method === 'paypal') {
            processPaypal(items);
        } else if (method === 'whatsapp') {
            processWhatsApp(items);
        }
    }

    function processPaypal(items) {
        const total = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
        const itemNames = items.map(item => `${item.title} (${item.quantity || 1}x)`).join(', ');
        
        const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${CONFIG.owner.email}&item_name=${encodeURIComponent(itemNames)}&amount=${total}&currency_code=${CONFIG.currency}`;
        window.open(paypalUrl, '_blank');
        
        if (!cart.length) clearCart();
    }

    function processWhatsApp(items) {
        const message = `Hello ${CONFIG.owner.name},%0A%0AI want to purchase:%0A${
            items.map(item => `- ${item.title} (${item.quantity || 1}x) - ${formatCurrency(item.price)}`).join('%0A')
        }%0A%0ATotal: ${formatCurrency(items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0))}%0A%0APlease provide payment details.`;
        
        const whatsappUrl = `https://wa.me/${CONFIG.owner.whatsapp}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    }

    // Clear cart
    function clearCart() {
        cart = [];
        saveCart();
        updateCartCount();
    }

    // Setup event listeners
    function setupEventListeners() {
        // Product clicks
        document.addEventListener('click', function(e) {
            // View product
            if (e.target.closest('.view-product')) {
                const productId = parseInt(e.target.closest('.view-product').dataset.id);
                openProductModal(productId);
            }
            
            // Add to cart
            if (e.target.closest('.add-to-cart')) {
                const productId = parseInt(e.target.closest('.add-to-cart').dataset.id);
                addToCart(productId);
            }
            
            // Buy now
            if (e.target.closest('.buy-now')) {
                const productId = parseInt(e.target.closest('.buy-now').dataset.id);
                const selectedMethod = document.querySelector('.payment-method.active');
                
                if (selectedMethod) {
                    processPayment(selectedMethod.dataset.method, productId);
                } else {
                    showToast('Please select a payment method');
                }
            }
            
            // Payment method selection
            if (e.target.closest('.payment-method')) {
                document.querySelectorAll('.payment-method').forEach(el => el.classList.remove('active'));
                e.target.closest('.payment-method').classList.add('active');
            }
            
            // Close modal
            if (e.target.closest('.close-modal')) {
                document.querySelector('.product-modal').classList.remove('active');
                document.body.style.overflow = 'auto';
            }
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
