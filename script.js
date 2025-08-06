// ===== Global Variables =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentTheme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// ===== Product Data =====
const products = [
    {
        id: 1,
        name: "Minimal UI Kit",
        price: 29.99,
        description: "A clean and modern UI kit with 50+ components for your next project. Includes buttons, cards, forms, and more. Perfect for web and mobile applications.",
        images: [
            "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
            "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
            "https://images.unsplash.com/photo-1541462608143-67571c6738dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        ],
        features: [
            "50+ customizable components",
            "Figma, Sketch, and XD files included",
            "Fully responsive designs",
            "Dark & light mode variants",
            "Free updates for 1 year",
            "Well-organized layers",
            "Modular structure"
        ],
        category: "ui-kits",
        downloadLink: "https://yourwebsite.com/downloads/ui-kit-minimal.zip",
        license: "standard"
    },
    {
        id: 2,
        name: "Icon Pack Pro",
        price: 14.99,
        description: "1000+ premium icons in multiple styles (filled, outlined, duotone). Perfect for apps, websites, and presentations. All icons are vector-based and fully scalable.",
        images: [
            "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1585771724684-38269d6639fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
        ],
        features: [
            "1000+ high-quality icons",
            "SVG, PNG, and Figma formats",
            "Multiple styles included",
            "Regularly updated collection",
            "Commercial license included",
            "Pixel-perfect at all sizes",
            "Easy to customize"
        ],
        category: "icons",
        downloadLink: "https://yourwebsite.com/downloads/icon-pack-pro.zip",
        license: "extended"
    },
    {
        id: 3,
        name: "E-commerce Template",
        price: 49.99,
        description: "Complete e-commerce template with product pages, cart, checkout, and dashboard. Built with HTML, CSS, and JavaScript. Fully responsive and ready to deploy.",
        images: [
            "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1468&q=80"
        ],
        features: [
            "10+ ready-to-use pages",
            "Fully responsive design",
            "Clean, commented code",
            "Easy to customize",
            "Lifetime updates",
            "Product variants support",
            "Secure checkout flow"
        ],
        category: "templates",
        downloadLink: "https://yourwebsite.com/downloads/ecommerce-template.zip",
        license: "standard"
    },
    {
        id: 4,
        name: "React Dashboard",
        price: 39.99,
        description: "Modern React dashboard with charts, tables, and widgets. Includes authentication and dark mode support. Perfect for admin panels and analytics applications.",
        images: [
            "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
        ],
        features: [
            "Built with React.js",
            "10+ customizable widgets",
            "Dark/light mode toggle",
            "API integration examples",
            "Detailed documentation",
            "Modular component structure",
            "Responsive layout"
        ],
        category: "code",
        downloadLink: "https://yourwebsite.com/downloads/react-dashboard.zip",
        license: "extended"
    },
    {
        id: 5,
        name: "Illustration Pack",
        price: 19.99,
        description: "Collection of 50+ modern illustrations for websites, apps, and presentations. Multiple styles and categories included. All illustrations are fully editable.",
        images: [
            "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1468&q=80",
            "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1580894732930-0babd100d356?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        ],
        features: [
            "50+ high-resolution illustrations",
            "SVG and PNG formats",
            "Multiple color variants",
            "Regularly updated collection",
            "Commercial license included",
            "Fully editable vectors",
            "Organized by categories"
        ],
        category: "illustrations",
        downloadLink: "https://yourwebsite.com/downloads/illustration-pack.zip",
        license: "standard"
    },
    {
        id: 6,
        name: "JavaScript Utilities",
        price: 24.99,
        description: "Collection of reusable JavaScript utilities for common tasks like form validation, animations, and API calls. Works with any framework or vanilla JS.",
        images: [
            "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
            "https://images.unsplash.com/photo-1542903660-eedba2cda473?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        ],
        features: [
            "30+ utility functions",
            "Vanilla JS (no dependencies)",
            "Detailed documentation",
            "TypeScript support",
            "MIT license",
            "Fully tested",
            "Modular imports"
        ],
        category: "code",
        downloadLink: "https://yourwebsite.com/downloads/js-utilities.zip",
        license: "extended"
    }
];

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "UI Designer",
        company: "Creative Studio",
        content: "The UI Kit saved me countless hours of work. The components are well-organized and easy to customize. Highly recommended!",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Frontend Developer",
        company: "Tech Solutions Inc.",
        content: "The React Dashboard template was exactly what we needed for our admin panel. Clean code and great documentation made implementation a breeze.",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        id: 3,
        name: "Emma Rodriguez",
        role: "Product Manager",
        company: "StartUp Ventures",
        content: "The illustration pack helped us create a consistent visual style across our marketing materials. The quality is outstanding!",
        avatar: "https://randomuser.me/api/portraits/women/63.jpg"
    }
];

// ===== DOM Elements =====
const loadingOverlay = document.querySelector('.loading-overlay');
const themeToggleBtn = document.querySelector('.theme-toggle');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');
const cartIcon = document.querySelector('.cart-icon-container');
const cartModal = document.querySelector('.cart-modal');
const closeCartBtn = document.querySelector('.close-cart');
const productModal = document.querySelector('.product-modal');
const closeModalBtn = document.querySelector('.close-modal');
const productsGrid = document.querySelector('.products-grid');
const testimonialsGrid = document.querySelector('.testimonials-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const toastNotification = document.querySelector('.toast-notification');
const paypalButtonContainer = document.getElementById('paypal-button-container');
const whatsappCheckoutBtn = document.querySelector('.whatsapp-checkout-btn');

// ===== Initialize App =====
function initApp() {
    // Set initial theme
    setTheme(currentTheme);
    
    // Load products
    displayProducts();
    
    // Load testimonials
    displayTestimonials();
    
    // Update cart count
    updateCartCount();
    
    // Hide loading overlay
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
    }, 1000);
}

// ===== Theme Management =====
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.classList.toggle('dark-mode', theme === 'dark');
    localStorage.setItem('theme', theme);
}

// ===== Product Display =====
function displayProducts(filter = 'all') {
    productsGrid.innerHTML = '';
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(product => product.category === filter);
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.images[0]}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <p class="product-description">${product.description.substring(0, 100)}...</p>
                <div class="product-actions">
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    <button class="view-details" data-id="${product.id}">View Details</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// ===== Testimonials Display =====
function displayTestimonials() {
    testimonialsGrid.innerHTML = '';
    
    testimonials.forEach(testimonial => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card';
        testimonialCard.innerHTML = `
            <div class="testimonial-content">
                <p>"${testimonial.content}"</p>
            </div>
            <div class="testimonial-author">
                <img src="${testimonial.avatar}" alt="${testimonial.name}" class="author-avatar">
                <div class="author-info">
                    <h4>${testimonial.name}</h4>
                    <p>${testimonial.role}, ${testimonial.company}</p>
                </div>
            </div>
        `;
        testimonialsGrid.appendChild(testimonialCard);
    });
}

// ===== Product Modal =====
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = `
        <div class="product-details">
            <div class="product-gallery">
                <img src="${product.images[0]}" alt="${product.name}" class="main-image">
                <div class="thumbnail-container">
                    ${product.images.map((img, index) => `
                        <img src="${img}" alt="Thumbnail ${index + 1}" class="thumbnail ${index === 0 ? 'active' : ''}">
                    `).join('')}
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <p class="product-description">${product.description}</p>
                <div class="product-features">
                    <h4>Features:</h4>
                    <ul>
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="modal-actions">
                    <button class="btn btn-primary add-to-cart-modal" data-id="${product.id}">Add to Cart</button>
                    <button class="btn btn-outline buy-now" data-id="${product.id}">Buy Now</button>
                </div>
            </div>
        </div>
    `;
    
    productModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Thumbnail click handler
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            mainImage.src = thumb.src;
        });
    });
}

// ===== Cart Management =====
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: 1,
            downloadLink: product.downloadLink,
            license: product.license
        });
    }
    
    saveCart();
    showToast(`${product.name} added to cart`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCartItems();
    showToast('Item removed from cart');
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        if (newQuantity < 1) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            saveCart();
            renderCartItems();
        }
    }
}

function renderCartItems() {
    const cartItems = document.querySelector('.cart-items');
    const subtotalAmount = document.querySelector('.subtotal-amount');
    const taxAmount = document.querySelector('.tax-amount');
    const totalAmount = document.querySelector('.total-amount');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        subtotalAmount.textContent = '$0.00';
        taxAmount.textContent = '$0.00';
        totalAmount.textContent = '$0.00';
        paypalButtonContainer.innerHTML = '';
        return;
    }
    
    cartItems.innerHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
            </div>
            <div class="cart-item-actions">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
        
        subtotal += item.price * item.quantity;
    });
    
    const tax = 0; // Assuming 0% tax for digital products
    const total = subtotal + tax;
    
    subtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
    taxAmount.textContent = `$${tax.toFixed(2)}`;
    totalAmount.textContent = `$${total.toFixed(2)}`;
    
    // Initialize PayPal button
    initPayPalButton(total);
}

function initPayPalButton(total) {
    paypalButtonContainer.innerHTML = '';
    
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: total.toFixed(2),
                        currency_code: "USD"
                    },
                    items: cart.map(item => ({
                        name: item.name,
                        unit_amount: {
                            currency_code: "USD",
                            value: item.price.toFixed(2)
                        },
                        quantity: item.quantity.toString(),
                        category: "DIGITAL_GOODS"
                    })),
                    payee: {
                        email_address: "sohailkhangurmanibaloch1134@gmail.com"
                    },
                    description: "Digital products purchase",
                    custom_id: generateOrderId()
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                // Process successful payment
                processSuccessfulPayment(details);
                
                // Clear cart
                cart = [];
                saveCart();
                renderCartItems();
                
                // Close cart modal
                cartModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                
                // Show success message
                showToast('Payment successful! Download links sent to your email.');
            });
        },
        onError: function(err) {
            console.error('PayPal error:', err);
            showToast('Payment failed. Please try again.', 'error');
        }
    }).render('#paypal-button-container');
}

function generateOrderId() {
    return 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}

function processSuccessfulPayment(details) {
    // In a real implementation, you would:
    // 1. Send the order details to your backend
    // 2. Generate download links
    // 3. Send email to customer with links
    
    const orderData = {
    
