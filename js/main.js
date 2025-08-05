document.addEventListener('DOMContentLoaded', function() {
    // ... (keep all existing code until the products array)

    // ===== UPDATED PRODUCT DATA WITH PAYMENT METHODS =====
    const products = [
        {
            id: 1,
            title: "Neon Glow UI Kit",
            category: "ui-kit",
            price: "$29.99",
            description: "150+ futuristic components with customizable glow effects for dark mode applications.",
            image: "https://i.postimg.cc/8z5ZJQK7/neon-ui.jpg",
            previews: [
                "https://i.postimg.cc/8z5ZJQK7/neon-ui.jpg",
                "https://i.postimg.cc/XJ0nLQYF/neon-preview1.jpg",
                "https://i.postimg.cc/4y8W3y0Z/neon-preview2.jpg"
            ],
            details: {
                "File Types": "Figma, XD, PNG",
                "Components": "Buttons, Cards, Forms",
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
            description: "2000+ ultra-sharp icons with pixel-perfect alignment at all sizes.",
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
            description: "Complete Notion system with CRM, content calendar, and project management templates.",
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

    // ===== UPDATED PROFILE SECTION =====
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

    // Render Profile (add to your init functions)
    function renderProfile() {
        const aboutImage = document.querySelector('.about-image .profile-img');
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

    // ===== ENHANCED PRODUCT MODAL WITH PAYMENT =====
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
        
        // Add payment method selection
        document.querySelectorAll('.payment-method').forEach(method => {
            method.addEventListener('click', function() {
                document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        productModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Initialize everything
    function init() {
        renderProfile();
        renderProducts();
        document.getElementById('year').textContent = new Date().getFullYear();
    }

    init();
});

// Preview changer function (add to global scope)
function changePreview(element, newSrc) {
    document.querySelectorAll('.product-previews img').forEach(img => {
        img.classList.remove('active');
    });
    element.classList.add('active');
    document.querySelector('.modal-product-image').src = newSrc;
}
