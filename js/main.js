document.addEventListener('DOMContentLoaded', function() {
    // ===== STORE CONFIGURATION =====
    const STORE_CONFIG = {
        owner: {
            name: "Sohail Khan",
            email: "sohailkhangurmanibaloch1134@gmail.com",
            whatsapp: "+48699541013",
            profileImage: "https://i.postimg.cc/cCwqXXhq/IMG-20250119-072901-954.jpg"
        },
        currency: "USD",
        paymentMethods: {
            paypal: true,
            whatsapp: true,
            bankTransfer: false
        }
    };

    // ===== REAL PRODUCT DATABASE =====
    const PRODUCTS = [
        {
            id: 1001,
            sku: "UIKIT-2024",
            title: "Neon Glow UI Kit (Figma & XD)",
            category: "ui-kit",
            price: 29.99,
            description: "Professional UI kit with 150+ glowing components for dark interfaces. Includes 30+ pre-built screens.",
            features: [
                "Dark mode variants",
                "4K resolution assets",
                "Auto-layout components"
            ],
            image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&auto=format&fit=crop",
            previews: [
                "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop"
            ],
            fileTypes: ["Figma", "Adobe XD", "PNG"],
            license: "Extended Commercial",
            delivery: "Instant Download",
            popular: true,
            tags: ["figma", "ui", "dark-mode"]
        },
        {
            id: 1002,
            sku: "ICONS-2024",
            title: "Pixel Perfect Icons (2000+)",
            category: "icons",
            price: 24.99,
            description: "Ultra-crisp pixel-perfect icons in 24px, 32px, and 48px sizes. 25+ categories included.",
            features: [
                "1x1 pixel alignment",
                "Multiple formats",
                "Lifetime updates"
            ],
            image: "https://images.unsplash.com/photo-1613166714574-0a8b63a9ac2a?w=800&auto=format&fit=crop",
            previews: [
                "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop"
            ],
            fileTypes: ["SVG", "PNG", "WebFont"],
            license: "Commercial Unlimited",
            delivery: "Instant Download",
            popular: true,
            tags: ["icons", "svg", "ui"]
        },
        {
            id: 1003,
            sku: "NOTION-2024",
            title: "Notion Ultimate Workspace",
            category: "templates",
            price: 34.99,
            description: "Complete Notion system with CRM, content calendar, and project management templates.",
            features: [
                "35+ templates",
                "Mobile optimized",
                "Tutorial included"
            ],
            image: "https://images.unsplash.com/photo-1655720827862-1a0f7a9e9c1f?w=800&auto=format&fit=crop",
            previews: [
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop"
            ],
            fileTypes: ["Notion Template"],
            license: "Team License",
            delivery: "Email Delivery",
            tags: ["notion", "productivity", "crm"]
        }
    ];

    // ===== SHOPPING CART SYSTEM =====
    let shoppingCart = JSON.parse(localStorage.getItem('cart')) || [];
    let currentView = 'grid'; // 'grid' or 'list'

    // Initialize the store
    function initStore() {
        renderProfile();
        renderProducts();
        renderCartPreview();
        setupEventListeners();
        updateCartCount();
        document.getElementById('year').textContent = new Date().getFullYear();
    }

    // Render owner profile
    function renderProfile() {
        const profileSection = document.querySelector('.about-content');
        profileSection.innerHTML = `
            <h2 class="section-title">About <span>${STORE_CONFIG.owner.name}</span></h2>
            <div class="profile-meta">
                <span class="profile-badge">Digital Product Creator</span>
                <span class="profile-exp">5+ Years Experience</span>
            </div>
            <p class="about-text">Professional designer and developer creating high-quality digital products for the community.</p>
            
            <div class="about-contact-methods">
                <a href="mailto:${STORE_CONFIG.owner.email}" class="contact-method email">
                    <i class="fas fa-envelope"></i> Email Me
                </a>
                <a href="https://wa.me/${STORE_CONFIG.owner.whatsapp}" class="contact-method whatsapp">
                    <i class="fab fa-whatsapp"></i> WhatsApp
                </a>
            </div>
            
            <div class="about-skills">
                <div class="skill-tag">UI/UX Design</div>
                <div class="skill-tag">Frontend Development</div>
                <div class="skill-tag">Digital Products</div>
            </div>
        `;
        
        document.querySelector('.profile-img').src = STORE_CONFIG.owner.profileImage;
    }

    // Render products
    function renderProducts(filter = 'all') {
        const productsGrid = document.querySelector('.products-grid');
        productsGrid.innerHTML = PRODUCTS
            .filter(product => filter === 'all' || product.category === filter)
            .map(product => `
                <div class="product-card" data-id="${product.id}">
                    <div class="product-badges">
                        ${product.popular ? '<span class="product-badge popular">Popular</span>' : ''}
                        ${product.tags.includes('new') ? '<span class="product-badge new">New</span>' : ''}
                    </div>
                    <img src="${product.image}" alt="${product.title}" class="product-image">
                    <div class="product-info">
                        <h3 class="product-title">${product.title}</h3>
                        <div class="product-price">${formatCurrency(product.price)}</div>
                        <p class="product-description">${product.description}</p>
                        <div class="product-actions">
                            <button class="btn btn-primary view-product" data-id="${product.id}">
                                <i class="fas fa-eye"></i> View
                            </button>
                            <button class="btn btn-outline add-to-cart" data-id="${product.id}">
                                <i class="fas fa-cart-plus"></i> Add
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
    }

    // Render cart preview sidebar
    function renderCartPreview() {
        const cartSidebar = document.querySelector('.cart-sidebar');
        if (!cartSidebar) return;

        cartSidebar.innerHTML = `
            <div class="cart-header">
                <h3>Your Cart</h3>
                <button class="close-cart"><i class="fas fa-times"></i></button>
            </div>
            <div class="cart-items">
                ${shoppingCart.length > 0 
                    ? shoppingCart.map(item => `
                        <div class="cart-item" data-id="${item.id}">
                            <img src="${item.image}" alt="${item.title}">
                            <div class="cart-item-info">
                                <h4>${item.title}</h4>
                                <div class="cart-item-price">${formatCurrency(item.price)}</div>
                                <div class="cart-item-actions">
                                    <button class="btn btn-sm remove-item"><i class="fas fa-trash"></i></button>
                                    <div class="quantity-control">
                                        <button class="btn btn-sm qty-decrease">-</button>
                                        <span class="qty-value">1</span>
                                        <button class="btn btn-sm qty-increase">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')
                    : '<div class="empty-cart">Your cart is empty</div>'
                }
            </div>
            <div class="cart-footer">
                <div class="cart-total">
                    <span>Total:</span>
                    <span>${formatCurrency(calculateCartTotal())}</span>
                </div>
                <div class="cart-checkout-methods">
                    ${STORE_CONFIG.paymentMethods.paypal ? `
                        <button class="btn btn-primary checkout-paypal">
                            <i class="fab fa-paypal"></i> Checkout
                        </button>
                    ` : ''}
                    ${STORE_CONFIG.paymentMethods.whatsapp ? `
                        <button class="btn btn-success checkout-whatsapp">
                            <i class="fab fa-whatsapp"></i> WhatsApp Order
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }

    // Calculate cart total
    function calculateCartTotal() {
        return shoppingCart.reduce((total, item) => total + item.price, 0);
    }

    // Format currency
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: STORE_CONFIG.currency
        }).format(amount);
    }

    // Update cart count
    function updateCartCount() {
        const cartCounters = document.querySelectorAll('.cart-count');
        cartCounters.forEach(counter => {
            counter.textContent = shoppingCart.length;
            counter.style.display = shoppingCart.length > 0 ? 'flex' : 'none';
        });
    }

    // Open product modal
    function openProductModal(productId) {
        const product = PRODUCTS.find(p => p.id == productId);
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
                <div class="modal-product-meta">
                    <span class="product-sku">SKU: ${product.sku}</span>
                    <span class="product-rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                        (42)
                    </span>
                </div>
                <div class="modal-product-price">${formatCurrency(product.price)}</div>
                <p class="modal-product-description">${product.description}</p>
                
                <div class="product-features">
                    <h4>Key Features:</h4>
                    <ul>
                        ${product.features.map(feat => `<li><i class="fas fa-check-circle"></i> ${feat}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-product-actions">
                    <button class="btn btn-primary buy-now" data-id="${product.id}">
                        <i class="fas fa-bolt"></i> Buy Now
                    </button>
                    <button class="btn btn-outline add-to-cart" data-id="${product.id}">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
                
                <div class="product-details-accordion">
                    <div class="accordion-item">
                        <button class="accordion-header">
                            <span>File Details</span>
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        <div class="accordion-content">
                            <div class="detail-item">
                                <span class="detail-label">File Types:</span>
                                <span class="detail-value">${product.fileTypes.join(', ')}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">License:</span>
                                <span class="detail-value">${product.license}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Delivery:</span>
                                <span class="detail-value">${product.delivery}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.querySelector('.product-modal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Process PayPal payment
    function processPaypalPayment(items) {
        const itemNames = items.map(item => item.title).join(', ');
        const totalAmount = calculateCartTotal();
        
        const paypalLink = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${STORE_CONFIG.owner.email}&item_name=${encodeURIComponent(itemNames)}&amount=${totalAmount}&currency_code=${STORE_CONFIG.currency}&return=thankyou.html`;
        
        window.open(paypalLink, '_blank');
        clearCart();
    }

    // Process WhatsApp order
    function processWhatsAppOrder(items) {
        const itemList = items.map(item => `- ${item.title} (${formatCurrency(item.price)})`).join('%0A');
        const totalAmount = formatCurrency(calculateCartTotal());
        
        const message = `Hello ${STORE_CONFIG.owner.name},%0A%0AI want to order:%0A${itemList}%0A%0ATotal: ${totalAmount}%0A%0APlease send me payment details.`;
        const whatsappLink = `https://wa.me/${STORE_CONFIG.owner.whatsapp}?text=${message}`;
        
        window.open(whatsappLink, '_blank');
    }

    // Add to cart
    function addToCart(productId) {
        const product = PRODUCTS.find(p => p.id == productId);
        if (!product) return;

        // Check if already in cart
        const existingItem = shoppingCart.find(item => item.id == productId);
        if (existingItem) {
            showToast(`${product.title} is already in your cart`);
            return;
        }

        shoppingCart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            sku: product.sku
        });

        saveCart();
        updateCartCount();
        showToast(`${product.title} added to cart`);
    }

    // Remove from cart
    function removeFromCart(productId) {
        shoppingCart = shoppingCart.filter(item => item.id != productId);
        saveCart();
        renderCartPreview();
        updateCartCount();
    }

    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(shoppingCart));
    }

    // Clear cart
    function clearCart() {
        shoppingCart = [];
        saveCart();
        renderCartPreview();
        updateCartCount();
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
                setTimeout(() => document.body.removeChild(toast), 300);
            }, 3000);
        }, 100);
    }

    // Toggle cart sidebar
    function toggleCartSidebar() {
        document.querySelector('.cart-sidebar').classList.toggle('active');
    }

    // Setup event listeners
    function setupEventListeners() {
        // Product clicks
        document.addEventListener('click', function(e) {
            // View product details
            if (e.target.closest('.view-product')) {
                const productId = e.target.closest('.view-product').dataset.id;
                openProductModal(productId);
            }
            
            // Add to cart
            if (e.target.closest('.add-to-cart')) {
                const productId = e.target.closest('.add-to-cart').dataset.id;
                addToCart(productId);
            }
            
            // Buy now
            if (e.target.closest('.buy-now')) {
                const productId = e.target.closest('.buy-now').dataset.id;
                addToCart(productId);
                toggleCartSidebar();
            }
            
            // Remove item from cart
            if (e.target.closest('.remove-item')) {
                const productId = e.target.closest('.cart-item').dataset.id;
                removeFromCart(productId);
            }
            
            // PayPal checkout
            if (e.target.closest('.checkout-paypal')) {
                processPaypalPayment(shoppingCart);
            }
            
            // WhatsApp checkout
            if (e.target.closest('.checkout-whatsapp')) {
                processWhatsAppOrder(shoppingCart);
            }
            
            // Toggle cart
            if (e.target.closest('.cart-toggle')) {
                toggleCartSidebar();
            }
            
            // Close cart
            if (e.target.closest('.close-cart')) {
                toggleCartSidebar();
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
