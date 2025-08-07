document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    document.querySelector('.next-slide').addEventListener('click', () => {
        goToSlide(currentSlide + 1);
    });

    document.querySelector('.prev-slide').addEventListener('click', () => {
        goToSlide(currentSlide - 1);
    });

    // Auto slide change
    let slideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);

    // Pause on hover
    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    heroSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);
    });

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialDotsContainer = document.querySelector('.testimonial-dots');
    let currentTestimonial = 0;

    // Create testimonial dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(index));
        testimonialDotsContainer.appendChild(dot);
    });

    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');

    function goToTestimonial(index) {
        testimonials[currentTestimonial].classList.remove('active');
        testimonialDots[currentTestimonial].classList.remove('active');
        currentTestimonial = (index + testimonials.length) % testimonials.length;
        testimonials[currentTestimonial].classList.add('active');
        testimonialDots[currentTestimonial].classList.add('active');
    }

    document.querySelector('.next-testimonial').addEventListener('click', () => {
        goToTestimonial(currentTestimonial + 1);
    });

    document.querySelector('.prev-testimonial').addEventListener('click', () => {
        goToTestimonial(currentTestimonial - 1);
    });

    // Auto testimonial change
    setInterval(() => {
        goToTestimonial(currentTestimonial + 1);
    }, 7000);

    // Shopping Cart
    const cartBtn = document.querySelector('.cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    const closeCart = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.total-amount');
    const cartCount = document.querySelector('.cart-count');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
        updateCartCount();
    }

    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    function renderCartItems() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
            cartTotal.textContent = '$0.00';
            return;
        }

        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="decrease-qty" data-index="${index}">-</button>
                            <input type="number" value="${item.quantity}" min="1" class="item-qty" data-index="${index}">
                            <button class="increase-qty" data-index="${index}">+</button>
                        </div>
                        <span class="remove-item" data-index="${index}">Remove</span>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        cartTotal.textContent = `$${total.toFixed(2)}`;

        // Add event listeners to quantity controls and remove buttons
        document.querySelectorAll('.decrease-qty').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                    updateCart();
                }
            });
        });

        document.querySelectorAll('.increase-qty').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                cart[index].quantity++;
                updateCart();
            });
        });

        document.querySelectorAll('.item-qty').forEach(input => {
            input.addEventListener('change', (e) => {
                const index = e.target.getAttribute('data-index');
                const newQty = parseInt(e.target.value);
                if (newQty > 0) {
                    cart[index].quantity = newQty;
                    updateCart();
                }
            });
        });

        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const productId = productCard.getAttribute('data-id') || Math.random().toString(36).substr(2, 9);
            const productName = productCard.querySelector('.product-title').textContent;
            const productPrice = parseFloat(productCard.querySelector('.current-price').textContent.replace('$', ''));
            const productImage = productCard.querySelector('img').src;

            // Check if product already in cart
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
            }

            updateCart();
            showAddedToCartMessage(productName);
        });
    });

    function showAddedToCartMessage(productName) {
        const message = document.createElement('div');
        message.classList.add('cart-message');
        message.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${productName} added to cart</span>
        `;
        document.body.appendChild(message);

        setTimeout(() => {
            message.classList.add('show');
        }, 10);

        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => {
                message.remove();
            }, 300);
        }, 3000);
    }

    // Toggle cart sidebar
    cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    cartOverlay.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Live Chat
    const chatBtn = document.querySelector('.chat-btn');
    const chatWindow = document.querySelector('.chat-window');
    const closeChat = document.querySelector('.close-chat');
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.querySelector('.chat-input input');

    chatBtn.addEventListener('click', () => {
        document.querySelector('.live-chat').classList.toggle('active');
    });

    closeChat.addEventListener('click', () => {
        document.querySelector('.live-chat').classList.remove('active');
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && chatInput.value.trim() !== '') {
            const message = chatInput.value.trim();
            addMessage(message, 'customer');
            chatInput.value = '';

            // Simulate agent response
            setTimeout(() => {
                const responses = [
                    "Thanks for your message! How can we help you?",
                    "Our team will get back to you shortly.",
                    "Is there anything else you'd like to know?",
                    "We're here to help with any questions!"
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse, 'agent');
            }, 1000);
        }
    });

    function addMessage(text, sender) {
        const now = new Date();
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const message = document.createElement('div');
        message.classList.add('message', sender);
        message.innerHTML = `
            <p>${text}</p>
            <span class="time">${time}</span>
        `;
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Quick View Modal
    const quickViewBtns = document.querySelectorAll('.quick-view');
    const quickViewModal = document.querySelector('.quick-view-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const closeModal = document.querySelector('.close-modal');
    const productQuickView = document.querySelector('.product-quick-view');

    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            const originalPrice = productCard.querySelector('.original-price')?.textContent || '';
            const productRating = productCard.querySelector('.product-rating').innerHTML;
            const productImage = productCard.querySelector('img').src;

            productQuickView.innerHTML = `
                <div class="product-quick-view-images">
                    <div class="main-image">
                        <img src="${productImage}" alt="${productName}">
                    </div>
                    <div class="thumbnail-images">
                        <img src="${productImage}" alt="${productName}" class="active">
                        <img src="https://via.placeholder.com/200x200?text=Product+2" alt="${productName}">
                        <img src="https://via.placeholder.com/200x200?text=Product+3" alt="${productName}">
                        <img src="https://via.placeholder.com/200x200?text=Product+4" alt="${productName}">
                    </div>
                </div>
                <div class="product-quick-view-details">
                    <h2>${productName}</h2>
                    <div class="product-quick-view-price">
                        ${productPrice} ${originalPrice ? `<span class="original-price">${originalPrice}</span>` : ''}
                    </div>
                    <div class="product-quick-view-rating">
                        ${productRating}
                    </div>
                    <p class="product-quick-view-description">
                        This premium product features high-quality materials and excellent craftsmanship. 
                        Designed for durability and performance, it's perfect for everyday use. 
                        Comes with a 1-year manufacturer warranty and 24/7 customer support.
                    </p>
                    <div class="product-quick-view-actions">
                        <div class="quantity-selector">
                            <button class="decrease-qty">-</button>
                            <input type="number" value="1" min="1">
                            <button class="increase-qty">+</button>
                        </div>
                        <button class="add-to-cart-modal">Add to Cart</button>
                        <button class="add-to-wishlist-modal"><i class="far fa-heart"></i></button>
                    </div>
                    <div class="product-meta">
                        <div class="meta-item">
                            <span class="meta-label">SKU:</span>
                            <span>SK-${Math.floor(1000 + Math.random() * 9000)}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Category:</span>
                            <span>Electronics</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Tags:</span>
                            <span>Premium, Quality, Popular</span>
                        </div>
                    </div>
                </div>
            `;

            // Add event listeners for thumbnail images
            const thumbnails = productQuickView.querySelectorAll('.thumbnail-images img');
            const mainImage = productQuickView.querySelector('.main-image img');

            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', () => {
                    thumbnails.forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                    mainImage.src = thumb.src;
                });
            });

            // Add to cart button in modal
            const addToCartModal = productQuickView.querySelector('.add-to-cart-modal');
            addToCartModal.addEventListener('click', () => {
                const quantity = parseInt(productQuickView.querySelector('.quantity-selector input').value);
                
                // Check if product already in cart
                const existingItem = cart.find(item => item.name === productName);
                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    cart.push({
                        id: Math.random().toString(36).substr(2, 9),
                        name: productName,
                        price: parseFloat(productPrice.replace('$', '')),
                        image: productImage,
                        quantity: quantity
                    });
                }

                updateCart();
                showAddedToCartMessage(productName);
                quickViewModal.classList.remove('active');
            });

            quickViewModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeModal.addEventListener('click', () => {
        quickViewModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    modalOverlay.addEventListener('click', () => {
        quickViewModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Initialize cart
    updateCart();

    // Form submission for fraud report
    const fraudReportForm = document.getElementById('fraud-report-form');
    if (fraudReportForm) {
        fraudReportForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your report. We take these matters seriously and will investigate promptly.');
            fraudReportForm.reset();
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.category-card, .product-card, .testimonial');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Set initial state for animated elements
    document.querySelectorAll('.category-card, .product-card, .testimonial').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});
