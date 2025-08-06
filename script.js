// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme') || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    document.documentElement.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
});

// Real Digital Products Data
const products = [
    {
        id: 1,
        name: "Minimal UI Kit",
        price: 29.99,
        description: "A clean and modern UI kit with 50+ components for your next project. Includes buttons, cards, forms, and more.",
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
            "Free updates for 1 year"
        ],
        category: "UI Kits"
    },
    {
        id: 2,
        name: "Icon Pack Pro",
        price: 14.99,
        description: "1000+ premium icons in multiple styles (filled, outlined, duotone). Perfect for apps, websites, and presentations.",
        images: [
            "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1585771724684-38269d6639fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
        ],
        features: [
            "1000+ high-quality icons",
            "SVG, PNG, and Figma formats",
            "Multiple styles included",
            "Regularly updated",
            "Commercial license"
        ],
        category: "Icons"
    },
    {
        id: 3,
        name: "E-commerce Template",
        price: 49.99,
        description: "Complete e-commerce template with product pages, cart, checkout, and dashboard. Built with HTML, CSS, and JavaScript.",
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
            "Lifetime updates"
        ],
        category: "Templates"
    },
    {
        id: 4,
        name: "React Dashboard",
        price: 39.99,
        description: "Modern React dashboard with charts, tables, and widgets. Includes authentication and dark mode support.",
        images: [
            "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
        ],
        features: [
            "Built with React.js",
            "10+ customizable widgets",
            "Dark/light mode",
            "API integration examples",
            "Detailed documentation"
        ],
        category: "Code"
    },
    {
        id: 5,
        name: "Illustration Pack",
        price: 19.99,
        description: "Collection of 50+ modern illustrations for websites, apps, and presentations. Multiple styles and categories included.",
        images: [
            "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1468&q=80",
            "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1580894732930-0babd100d356?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        ],
        features: [
            "50+ high-resolution illustrations",
            "SVG and PNG formats",
            "Multiple color variants",
            "Regularly updated",
            "Commercial license"
        ],
        category: "Illustrations"
    },
    {
        id: 6,
        name: "JavaScript Utilities",
        price: 24.99,
        description: "Collection of reusable JavaScript utilities for common tasks like form validation, animations, and API calls.",
        images: [
            "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
            "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
        ],
        features: [
            "30+ utility functions",
            "Vanilla JS (no dependencies)",
            "Detailed documentation",
            "TypeScript support",
            "MIT license"
        ],
        category: "Code"
    }
];

// Display Products
const productGrid = document.querySelector('.product-grid');

function displayProducts() {
    productGrid.innerHTML = '';
    
    products.forEach(product => {
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
        productGrid.appendChild(productCard);
    });
}

displayProducts();

// Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

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
            quantity: 1
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
    const cartTotal = document.querySelector('.total-amount');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = '$0.00';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
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
        
        total += item.price * item.quantity;
    });
    
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Product Modal
const productModal = document.querySelector('.product-modal');
const modalContent = document.querySelector('.modal-product-details');

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    modalContent.innerHTML = `
        <div class="modal-product-gallery">
            <img src="${product.images[0]}" alt="${product.name}" class="main-image">
            <div class="thumbnail-container">
                ${product.images.map((img, index) => `
                    <img src="${img}" alt="Thumbnail ${index + 1}" class="thumbnail ${index === 0 ? 'active' : ''}">
                `).join('')}
            </div>
        </div>
        <div class="modal-product-info">
            <h3>${product.name}</h3>
            <div class="modal-product-price">$${product.price.toFixed(2)}</div>
            <p class="modal-product-description">${product.description}</p>
            <div class="modal-product-features">
                <h4>Features:</h4>
                <ul>
                    ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            <div class="modal-product-actions">
                <button class="btn add-to-cart-modal" data-id="${product.id}">Add to Cart</button>
                <button class="btn buy-now" data-id="${product.id}">Buy Now</button>
            </div>
        </div>
    `;
    
    productModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Thumbnail click event
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

// Toast Notification
function showToast(message) {
    const toast = document.querySelector('.toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    // Add to cart buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        }
        
        if (e.target.classList.contains('view-details')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            openProductModal(productId);
        }
        
        if (e.target.classList.contains('cart-icon') || e.target.closest('.cart-icon')) {
            document.querySelector('.cart-modal').style.display = 'flex';
            document.body.style.overflow = 'hidden';
            renderCartItems();
        }
        
        if (e.target.classList.contains('close-cart') || e.target === document.querySelector('.cart-modal')) {
            document.querySelector('.cart-modal').style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        if (e.target.classList.contains('close-modal') || e.target === productModal) {
            productModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        if (e.target.classList.contains('add-to-cart-modal')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
            productModal.style.display = 'none';
            document.querySelector('.cart-modal').style.display = 'flex';
            renderCartItems();
        }
        
        if (e.target.classList.contains('buy-now')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
            productModal.style.display = 'none';
            document.querySelector('.cart-modal').style.display = 'flex';
            renderCartItems();
        }
        
        if (e.target.classList.contains('minus')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const item = cart.find(item => item.id === productId);
            if (item) updateQuantity(productId, item.quantity - 1);
        }
        
        if (e.target.classList.contains('plus')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const item = cart.find(item => item.id === productId);
            if (item) updateQuantity(productId, item.quantity + 1);
        }
        
        if (e.target.classList.contains('remove-item')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(productId);
        }
        
        if (e.target.classList.contains('paypal-btn')) {
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const items = cart.map(item => `${item.name} (${item.quantity})`).join(', ');
            
            // In a real implementation, you would redirect to PayPal with these details
            alert(`Redirecting to PayPal to complete payment of $${total.toFixed(2)} for: ${items}`);
            
            // For demo purposes, we'll just clear the cart
            cart = [];
            saveCart();
            renderCartItems();
            document.querySelector('.cart-modal').style.display = 'none';
            document.body.style.overflow = 'auto';
            showToast('Payment completed successfully!');
        }
        
        if (e.target.classList.contains('whatsapp-btn')) {
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const items = cart.map(item => `${item.name} (Qty: ${item.quantity})`).join('%0A- ');
            
            // Open WhatsApp with order details
            window.open(`https://wa.me/48699541013?text=I%20would%20like%20to%20order:%0A-${items}%0ATotal:%20$${total.toFixed(2)}`, '_blank');
            
            // For demo purposes, we'll just clear the cart
            cart = [];
            saveCart();
            renderCartItems();
            document.querySelector('.cart-modal').style.display = 'none';
            document.body.style.overflow = 'auto';
            showToast('WhatsApp order initiated!');
        }
    });
    
    // Close modals when clicking outside content
    document.querySelector('.cart-modal').addEventListener('click', (e) => {
        if (e.target === document.querySelector('.cart-modal')) {
            document.querySelector('.cart-modal').style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});
