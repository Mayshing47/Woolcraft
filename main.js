// WoolCraft E-commerce JavaScript
// Main functionality for cart management, product filtering, and interactions

// Global Variables
let cart = JSON.parse(localStorage.getItem('woolcraft-cart')) || [];
let products = [];
let filteredProducts = [];

// Product Data
const productData = [
    {
        id: 1,
        name: "Merino Wool Runner",
        price: 125,
        image: "https://kimi-web-img.moonshot.cn/img/i0.wp.com/2d5db2d537d56a9e256faca789a8e11e25b14158.png",
        description: "Classic low-top design with temperature-regulating merino wool",
        colors: ["oat", "mist-grey", "charcoal"],
        sizes: [7, 8, 9, 10, 11, 12],
        style: "low-top",
        material: "merino-wool",
        rating: 5,
        features: ["Breathable", "Temperature-regulating", "Machine washable", "Odor-resistant"]
    },
    {
        id: 2,
        name: "Urban Wooler High",
        price: 145,
        image: "https://kimi-web-img.moonshot.cn/img/us.baabuk.com/d380c16dc9e8805235bbdf279778689d80ad9f9d.jpg",
        description: "High-top silhouette with premium felted wool construction",
        colors: ["charcoal", "cream"],
        sizes: [8, 9, 10, 11, 12, 13],
        style: "high-top",
        material: "merino-wool",
        rating: 5,
        features: ["Water-resistant", "Extra ankle support", "Durable construction", "Premium materials"]
    },
    {
        id: 3,
        name: "Wool Knit Slip-On",
        price: 110,
        image: "https://kimi-web-img.moonshot.cn/img/cdn.shopify.com/22a4fd11e55c02548f2d3eeb0653cfb3321e036a.jpg",
        description: "Effortless style with elastic lacing and breathable wool mesh",
        colors: ["oat", "cream", "mist-grey"],
        sizes: [6, 7, 8, 9, 10, 11],
        style: "slip-on",
        material: "merino-wool",
        rating: 4,
        features: ["Easy on/off", "Stretch knit", "Lightweight", "Flexible sole"]
    },
    {
        id: 4,
        name: "Cashmere Blend Low",
        price: 165,
        image: "https://kimi-web-img.moonshot.cn/img/cdn.prod.website-files.com/ed0eba32873cb395ad1fa692b228b6226a85b6fc.webp",
        description: "Luxurious cashmere-wool blend for ultimate comfort",
        colors: ["cream", "oat"],
        sizes: [7, 8, 9, 10, 11],
        style: "low-top",
        material: "cashmere-blend",
        rating: 5,
        features: ["Ultra-soft", "Premium cashmere", "Luxury finish", "Exceptional comfort"]
    },
    {
        id: 5,
        name: "Organic Wool Walker",
        price: 135,
        image: "https://kimi-web-img.moonshot.cn/img/neemans.com/5a91af01683e91101d13762ee9284ad8613ab10e.jpg",
        description: "Sustainable organic wool with natural rubber sole",
        colors: ["oat", "charcoal"],
        sizes: [8, 9, 10, 11, 12],
        style: "low-top",
        material: "organic-wool",
        rating: 4,
        features: ["100% organic", "Sustainable", "Natural rubber sole", "Eco-friendly"]
    },
    {
        id: 6,
        name: "Merino Dash Sport",
        price: 155,
        image: "https://kimi-web-img.moonshot.cn/img/www.rollingstone.com/f75bf8cde9c8eb3f0f146a9e71d3d667afaded3d.png",
        description: "Performance-oriented design with enhanced support",
        colors: ["charcoal", "mist-grey"],
        sizes: [7, 8, 9, 10, 11, 12, 13],
        style: "low-top",
        material: "merino-wool",
        rating: 5,
        features: ["Athletic fit", "Enhanced support", "Moisture-wicking", "Performance design"]
    },
    {
        id: 7,
        name: "Wool Comfort Slipper",
        price: 95,
        image: "https://kimi-web-img.moonshot.cn/img/yoursole.com/2617c0dcabe22ede2709d39e5e670bce86425578",
        description: "Cozy indoor comfort with outdoor capability",
        colors: ["cream", "oat"],
        sizes: [6, 7, 8, 9, 10, 11, 12],
        style: "slip-on",
        material: "merino-wool",
        rating: 4,
        features: ["Indoor/outdoor", "Cozy lining", "Non-slip sole", "Comfort fit"]
    },
    {
        id: 8,
        name: "Urban Tech High",
        price: 175,
        image: "https://kimi-web-img.moonshot.cn/img/images.halfhalftravel.com/dd1a8316bf2590d421335173cbc0271da86a2b7e.jpg",
        description: "Advanced urban design with tech-inspired details",
        colors: ["charcoal", "mist-grey"],
        sizes: [8, 9, 10, 11, 12, 13],
        style: "high-top",
        material: "merino-wool",
        rating: 5,
        features: ["Tech-inspired", "Urban design", "Advanced materials", "Street style"]
    },
    {
        id: 9,
        name: "Classic Wool Derby",
        price: 145,
        image: "https://kimi-web-img.moonshot.cn/img/www.rollingstone.com/2945b5749a49f71958f5f9086074908695cba4c4.png",
        description: "Traditional derby style with modern wool construction",
        colors: ["charcoal", "oat"],
        sizes: [7, 8, 9, 10, 11, 12],
        style: "low-top",
        material: "merino-wool",
        rating: 4,
        features: ["Classic style", "Modern construction", "Versatile wear", "Timeless design"]
    },
    {
        id: 10,
        name: "Minimalist Wool Flat",
        price: 120,
        image: "https://kimi-web-img.moonshot.cn/img/image.cnbcfm.com/d701a51b47adecfaa724cec5844265d70252d128.jpg",
        description: "Clean minimalist design with premium wool upper",
        colors: ["cream", "mist-grey"],
        sizes: [6, 7, 8, 9, 10, 11],
        style: "low-top",
        material: "merino-wool",
        rating: 4,
        features: ["Minimalist design", "Clean lines", "Premium finish", "Modern aesthetic"]
    },
    {
        id: 11,
        name: "Wool Texture High-Top",
        price: 160,
        image: "https://kimi-web-img.moonshot.cn/img/thumbs.dreamstime.com/e9dd80810212762caceab453ad429144c3e4c056.jpg",
        description: "Textured wool construction with unique pattern",
        colors: ["oat", "charcoal"],
        sizes: [7, 8, 9, 10, 11, 12, 13],
        style: "high-top",
        material: "merino-wool",
        rating: 5,
        features: ["Textured wool", "Unique pattern", "Eye-catching design", "Premium materials"]
    },
    {
        id: 12,
        name: "Sustainable Wool Runner",
        price: 130,
        image: "https://kimi-web-img.moonshot.cn/img/nwzimg.wezhan.cn/2cefa5a011771769099342db62240ea9cf258a10.jpg",
        description: "Eco-conscious design with recycled materials",
        colors: ["mist-grey", "oat"],
        sizes: [7, 8, 9, 10, 11, 12],
        style: "low-top",
        material: "organic-wool",
        rating: 4,
        features: ["Eco-friendly", "Recycled materials", "Sustainable production", "Green choice"]
    },
    {
        id: 13,
        name: "Premium Cashmere Sneaker",
        price: 185,
        image: "https://kimi-web-img.moonshot.cn/img/www.baabuk.com/3dfdaabdd9db63bd180c944a240fdf3da2e7c5d7.jpg",
        description: "Luxury cashmere construction with premium details",
        colors: ["cream", "oat"],
        sizes: [8, 9, 10, 11],
        style: "low-top",
        material: "cashmere-blend",
        rating: 5,
        features: ["Luxury cashmere", "Premium details", "Exclusive design", "High-end finish"]
    },
    {
        id: 14,
        name: "All-Weather Wool Boot",
        price: 170,
        image: "https://kimi-web-img.moonshot.cn/img/nwzimg.wezhan.cn/287f525612d8dd741768317b08ad06fdd042566d.jpg",
        description: "Weather-resistant design for all conditions",
        colors: ["charcoal", "mist-grey"],
        sizes: [7, 8, 9, 10, 11, 12, 13, 14],
        style: "high-top",
        material: "merino-wool",
        rating: 5,
        features: ["Weather-resistant", "All-conditions", "Durable build", "Reliable performance"]
    },
    {
        id: 15,
        name: "Lightweight Wool Slip-On",
        price: 115,
        image: "https://kimi-web-img.moonshot.cn/img/i0.wp.com/44427a4f22d39d172877d28c81a0bcd8e5808c53.png",
        description: "Ultra-lightweight design for everyday comfort",
        colors: ["oat", "cream", "mist-grey"],
        sizes: [6, 7, 8, 9, 10, 11, 12],
        style: "slip-on",
        material: "merino-wool",
        rating: 4,
        features: ["Ultra-lightweight", "Everyday comfort", "Easy wear", "Casual style"]
    },
    {
        id: 16,
        name: "Wool Performance Trainer",
        price: 150,
        image: "https://kimi-web-img.moonshot.cn/img/i0.wp.com/2d5db2d537d56a9e256faca789a8e11e25b14158.png",
        description: "Athletic performance meets wool comfort",
        colors: ["charcoal", "mist-grey", "oat"],
        sizes: [7, 8, 9, 10, 11, 12, 13],
        style: "low-top",
        material: "merino-wool",
        rating: 5,
        features: ["Performance focused", "Athletic fit", "Training ready", "Sport comfort"]
    }
];

// Initialize products
products = [...productData];
filteredProducts = [...products];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    updateCartUI();
    
    // Initialize page-specific functionality
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'index':
            initializeHomePage();
            break;
        case 'products':
            initializeProductsPage();
            break;
        case 'cart':
            initializeCartPage();
            break;
    }
    
    // Initialize common functionality
    initializeCartSidebar();
    initializeScrollAnimations();
}

function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('products.html')) return 'products';
    if (path.includes('cart.html')) return 'cart';
    return 'index';
}

// Home Page Initialization
function initializeHomePage() {
    initializeTypewriter();
    initializeFeaturedCarousel();
    initializeTimelineAnimations();
    initializeSustainabilityChart();
}

// Typewriter Effect
function initializeTypewriter() {
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        new Typed('#typed-text', {
            strings: ['Natural Comfort', 'Urban Style', 'Sustainable Fashion'],
            typeSpeed: 80,
            backSpeed: 60,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// Featured Products Carousel
function initializeFeaturedCarousel() {
    const carousel = document.getElementById('featured-carousel');
    if (carousel) {
        new Splide('#featured-carousel', {
            type: 'loop',
            perPage: 3,
            perMove: 1,
            gap: '2rem',
            autoplay: true,
            interval: 4000,
            pauseOnHover: true,
            breakpoints: {
                1024: { perPage: 2 },
                640: { perPage: 1 }
            }
        }).mount();
    }
}

// Timeline Animations
function initializeTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => observer.observe(item));
}

// Sustainability Chart
function initializeSustainabilityChart() {
    const chartElement = document.getElementById('sustainability-chart');
    if (chartElement && typeof echarts !== 'undefined') {
        const chart = echarts.init(chartElement);
        
        const option = {
            tooltip: { trigger: 'item' },
            series: [{
                name: 'Sustainability Metrics',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
                label: { show: false, position: 'center' },
                emphasis: {
                    label: { show: true, fontSize: '18', fontWeight: 'bold' }
                },
                labelLine: { show: false },
                data: [
                    { value: 35, name: 'Renewable Materials', itemStyle: { color: '#A8B5A0' } },
                    { value: 25, name: 'Carbon Neutral', itemStyle: { color: '#B8B5AE' } },
                    { value: 20, name: 'Ethical Sourcing', itemStyle: { color: '#E8DCC0' } },
                    { value: 20, name: 'Waste Reduction', itemStyle: { color: '#F5F2E8' } }
                ]
            }]
        };
        
        chart.setOption(option);
        
        // Responsive chart
        window.addEventListener('resize', () => chart.resize());
    }
}

// Products Page Initialization
function initializeProductsPage() {
    renderProducts();
    initializeFilters();
    initializeSorting();
    initializePriceSlider();
    initializeQuickView();
}

function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        grid.appendChild(productCard);
    });
    
    updateProductCount();
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'card-hover bg-white rounded-3xl p-6 shadow-lg';
    card.dataset.productId = product.id;
    
    const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
    
    card.innerHTML = `
        <div class="aspect-square mb-4 rounded-2xl overflow-hidden cursor-pointer quick-view-trigger" data-product-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
        </div>
        <div class="text-center">
            <h3 class="text-lg font-bold mb-2">${product.name}</h3>
            <p class="text-gray-600 text-sm mb-3">${product.description}</p>
            <div class="flex items-center justify-center mb-3">
                <div class="text-yellow-400 text-sm mr-2">${stars}</div>
                <span class="text-gray-500 text-sm">(${product.rating}/5)</span>
            </div>
            <div class="flex items-center justify-between mb-4">
                <span class="text-2xl font-bold">$${product.price}</span>
                <div class="flex gap-1">
                    ${product.colors.slice(0, 3).map(color => `
                        <div class="w-4 h-4 rounded-full border border-gray-300 ${getColorClass(color)}"></div>
                    `).join('')}
                </div>
            </div>
            <button class="btn-primary w-full py-3 rounded-full font-semibold add-to-cart" 
                    data-product-id="${product.id}" data-product="${product.name}" data-price="${product.price}">
                Add to Cart
            </button>
        </div>
    `;
    
    return card;
}

function getColorClass(color) {
    const colorMap = {
        'oat': 'bg-yellow-200',
        'mist-grey': 'bg-gray-400',
        'charcoal': 'bg-gray-800',
        'cream': 'bg-yellow-100'
    };
    return colorMap[color] || 'bg-gray-300';
}

// Product Filtering
function initializeFilters() {
    // Size filters
    document.querySelectorAll('.size-filter').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('filter-active');
            applyFilters();
        });
    });
    
    // Color filters
    document.querySelectorAll('.color-filter').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    // Style filters
    document.querySelectorAll('.style-filter').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('filter-active');
            applyFilters();
        });
    });
    
    // Material filters
    document.querySelectorAll('.material-filter').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('filter-active');
            applyFilters();
        });
    });
    
    // Clear filters
    const clearBtn = document.getElementById('clear-filters');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearAllFilters);
    }
}

function applyFilters() {
    const activeSizes = Array.from(document.querySelectorAll('.size-filter.filter-active')).map(btn => parseInt(btn.dataset.size));
    const activeColors = Array.from(document.querySelectorAll('.color-filter:checked')).map(cb => cb.dataset.color);
    const activeStyles = Array.from(document.querySelectorAll('.style-filter.filter-active')).map(btn => btn.dataset.style);
    const activeMaterials = Array.from(document.querySelectorAll('.material-filter.filter-active')).map(btn => btn.dataset.material);
    const maxPrice = parseInt(document.getElementById('price-slider')?.value || 200);
    
    filteredProducts = products.filter(product => {
        const sizeMatch = activeSizes.length === 0 || product.sizes.some(size => activeSizes.includes(size));
        const colorMatch = activeColors.length === 0 || product.colors.some(color => activeColors.includes(color));
        const styleMatch = activeStyles.length === 0 || activeStyles.includes(product.style);
        const materialMatch = activeMaterials.length === 0 || activeMaterials.includes(product.material);
        const priceMatch = product.price <= maxPrice;
        
        return sizeMatch && colorMatch && styleMatch && materialMatch && priceMatch;
    });
    
    renderProducts();
}

function clearAllFilters() {
    document.querySelectorAll('.filter-active').forEach(btn => btn.classList.remove('filter-active'));
    document.querySelectorAll('.color-filter:checked').forEach(cb => cb.checked = false);
    document.getElementById('price-slider').value = 200;
    document.getElementById('price-display').textContent = '$200';
    
    filteredProducts = [...products];
    renderProducts();
}

// Price Slider
function initializePriceSlider() {
    const slider = document.getElementById('price-slider');
    const display = document.getElementById('price-display');
    
    if (slider && display) {
        slider.addEventListener('input', function() {
            display.textContent = `$${this.value}`;
            applyFilters();
        });
    }
}

// Sorting
function initializeSorting() {
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            
            switch(sortBy) {
                case 'name':
                    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'price-low':
                    filteredProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    filteredProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'rating':
                    filteredProducts.sort((a, b) => b.rating - a.rating);
                    break;
            }
            
            renderProducts();
        });
    }
}

// Quick View Modal
function initializeQuickView() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.quick-view-trigger')) {
            const productId = parseInt(e.target.closest('.quick-view-trigger').dataset.productId);
            showQuickView(productId);
        }
    });
    
    // Close modal handlers
    document.getElementById('close-modal')?.addEventListener('click', hideQuickView);
    document.getElementById('modal-backdrop')?.addEventListener('click', hideQuickView);
}

function showQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('quick-view-modal');
    const content = document.getElementById('modal-content');
    
    const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
    
    content.innerHTML = `
        <div class="grid md:grid-cols-2 gap-8">
            <div class="aspect-square rounded-2xl overflow-hidden">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
            </div>
            <div>
                <h2 class="text-3xl font-bold mb-4">${product.name}</h2>
                <div class="flex items-center mb-4">
                    <div class="text-yellow-400 text-lg mr-3">${stars}</div>
                    <span class="text-gray-500">(${product.rating}/5)</span>
                </div>
                <p class="text-gray-600 mb-6">${product.description}</p>
                
                <div class="mb-6">
                    <h4 class="font-semibold mb-2">Available Colors:</h4>
                    <div class="flex gap-2">
                        ${product.colors.map(color => `
                            <div class="w-8 h-8 rounded-full border-2 border-gray-300 ${getColorClass(color)}"></div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="mb-6">
                    <h4 class="font-semibold mb-2">Available Sizes:</h4>
                    <div class="flex gap-2 flex-wrap">
                        ${product.sizes.map(size => `
                            <div class="px-3 py-1 border border-gray-300 rounded-lg text-sm">${size}</div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="mb-6">
                    <h4 class="font-semibold mb-2">Features:</h4>
                    <ul class="space-y-1">
                        ${product.features.map(feature => `
                            <li class="flex items-center text-gray-600">
                                <svg class="w-4 h-4 mr-2 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                ${feature}
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="flex items-center justify-between mb-6">
                    <span class="text-3xl font-bold">$${product.price}</span>
                    <div class="flex gap-2">
                        ${product.colors.map(color => `
                            <div class="w-6 h-6 rounded-full border border-gray-300 ${getColorClass(color)}"></div>
                        `).join('')}
                    </div>
                </div>
                
                <button class="btn-primary w-full py-4 rounded-full font-semibold add-to-cart" 
                        data-product-id="${product.id}" data-product="${product.name}" data-price="${product.price}">
                    Add to Cart - $${product.price}
                </button>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function hideQuickView() {
    const modal = document.getElementById('quick-view-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function updateProductCount() {
    const countElement = document.getElementById('product-count');
    if (countElement) {
        countElement.textContent = `Showing ${filteredProducts.length} products`;
    }
}

// Cart Page Initialization
function initializeCartPage() {
    renderCartItems();
    updateCartSummary();
    initializeCheckout();
}

function renderCartItems() {
    const container = document.getElementById('cart-items-list');
    const emptyCart = document.getElementById('empty-cart');
    
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = '';
        emptyCart?.classList.remove('hidden');
        return;
    }
    
    emptyCart?.classList.add('hidden');
    container.innerHTML = '';
    
    cart.forEach((item, index) => {
        const cartItem = createCartItem(item, index);
        container.appendChild(cartItem);
    });
}

function createCartItem(item, index) {
    const div = document.createElement('div');
    div.className = 'flex items-center gap-4 p-4 border border-gray-200 rounded-2xl';
    
    div.innerHTML = `
        <div class="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
            <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
        </div>
        <div class="flex-1">
            <h3 class="text-lg font-semibold mb-1">${item.name}</h3>
            <p class="text-gray-600 text-sm mb-2">${item.description}</p>
            <div class="flex items-center gap-4">
                <div class="flex items-center border border-gray-300 rounded-lg">
                    <button class="quantity-btn rounded-l-lg" onclick="updateQuantity(${index}, -1)">-</button>
                    <span class="px-4 py-2 text-center min-w-12">${item.quantity}</span>
                    <button class="quantity-btn rounded-r-lg" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <span class="text-lg font-bold">$${item.price * item.quantity}</span>
            </div>
        </div>
        <button class="p-2 text-red-500 hover:bg-red-50 rounded-full" onclick="removeFromCart(${index})">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
        </button>
    `;
    
    return div;
}

function updateQuantity(index, change) {
    if (cart[index]) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        
        saveCart();
        renderCartItems();
        updateCartSummary();
        updateCartUI();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCartItems();
    updateCartSummary();
    updateCartUI();
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;
    
    // Update cart page summary
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    
    // Update checkout modal total
    document.getElementById('modal-total').textContent = `$${total.toFixed(2)}`;
    
    // Update checkout button state
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.disabled = cart.length === 0;
    }
}

// Checkout Functionality
function initializeCheckout() {
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const cancelBtn = document.getElementById('cancel-checkout');
    const checkoutForm = document.getElementById('checkout-form');
    const successModal = document.getElementById('success-modal');
    const continueShoppingBtn = document.getElementById('continue-shopping');
    
    checkoutBtn?.addEventListener('click', showCheckoutModal);
    cancelBtn?.addEventListener('click', hideCheckoutModal);
    checkoutForm?.addEventListener('submit', handleCheckout);
    continueShoppingBtn?.addEventListener('click', handleSuccessContinue);
    
    // Modal backdrop click
    document.getElementById('checkout-backdrop')?.addEventListener('click', hideCheckoutModal);
    
    // Card number formatting
    const cardInput = checkoutForm?.querySelector('input[placeholder*="1234"]');
    cardInput?.addEventListener('input', formatCardNumber);
    
    // Expiry date formatting
    const expiryInput = checkoutForm?.querySelector('input[placeholder*="MM/YY"]');
    expiryInput?.addEventListener('input', formatExpiryDate);
}

function showCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    const summary = document.getElementById('modal-order-summary');
    
    // Populate order summary
    summary.innerHTML = cart.map(item => `
        <div class="flex justify-between text-sm">
            <span>${item.name} × ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function hideCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function handleCheckout(e) {
    e.preventDefault();
    
    // Simulate processing
    setTimeout(() => {
        hideCheckoutModal();
        showSuccessModal();
        
        // Clear cart
        cart = [];
        saveCart();
        updateCartUI();
        
        // Update cart page if we're on it
        if (getCurrentPage() === 'cart') {
            renderCartItems();
            updateCartSummary();
        }
    }, 1500);
}

function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function handleSuccessContinue() {
    const modal = document.getElementById('success-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    
    // Redirect to products page
    if (getCurrentPage() !== 'products') {
        window.location.href = 'products.html';
    }
}

function formatCardNumber(e) {
    let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formattedValue;
}

function formatExpiryDate(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
}

// Cart Management
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description,
            quantity: quantity
        });
    }
    
    saveCart();
    updateCartUI();
    showCartSidebar();
}

function saveCart() {
    localStorage.setItem('woolcraft-cart', JSON.stringify(cart));
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cartCount) {
        if (totalItems > 0) {
            cartCount.textContent = totalItems;
            cartCount.classList.remove('hidden');
        } else {
            cartCount.classList.add('hidden');
        }
    }
}

// Cart Sidebar
function initializeCartSidebar() {
    const cartBtn = document.getElementById('cart-btn');
    const closeBtn = document.getElementById('close-cart');
    const sidebar = document.getElementById('cart-sidebar');
    
    cartBtn?.addEventListener('click', toggleCartSidebar);
    closeBtn?.addEventListener('click', hideCartSidebar);
    
    // Close on backdrop click
    sidebar?.addEventListener('click', function(e) {
        if (e.target === this) {
            hideCartSidebar();
        }
    });
}

function toggleCartSidebar() {
    const sidebar = document.getElementById('cart-sidebar');
    const isOpen = !sidebar.classList.contains('translate-x-full');
    
    if (isOpen) {
        hideCartSidebar();
    } else {
        showCartSidebar();
    }
}

function showCartSidebar() {
    const sidebar = document.getElementById('cart-sidebar');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center text-gray-500 py-12">
                <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0V19a2 2 0 002 2h7a2 2 0 002-2v-4"></path>
                </svg>
                <p>Your cart is empty</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="flex items-center gap-3 p-3 border-b border-gray-100">
                <div class="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
                </div>
                <div class="flex-1 min-w-0">
                    <h4 class="font-semibold text-sm truncate">${item.name}</h4>
                    <p class="text-gray-600 text-xs">Qty: ${item.quantity}</p>
                </div>
                <div class="text-right">
                    <div class="font-bold text-sm">$${item.price * item.quantity}</div>
                </div>
            </div>
        `).join('');
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
    
    sidebar.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden';
}

function hideCartSidebar() {
    const sidebar = document.getElementById('cart-sidebar');
    sidebar.classList.add('translate-x-full');
    document.body.style.overflow = 'auto';
}

// Scroll Animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animation = entry.target.dataset.animate;
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Event Delegation for Dynamic Elements
document.addEventListener('click', function(e) {
    // Add to cart buttons
    if (e.target.closest('.add-to-cart')) {
        e.preventDefault();
        const btn = e.target.closest('.add-to-cart');
        const productId = parseInt(btn.dataset.productId);
        const productName = btn.dataset.product;
        const price = parseFloat(btn.dataset.price);
        
        addToCart(productId);
        
        // Visual feedback
        const originalText = btn.textContent;
        btn.textContent = 'Added!';
        btn.style.background = '#A8B5A0';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 1500);
    }
    
    // Story button on home page
    if (e.target.id === 'story-btn') {
        e.preventDefault();
        document.getElementById('story').scrollIntoView({ behavior: 'smooth' });
    }
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Authentication integration
function initializeAuth() {
    // Update auth button based on authentication state
    const authBtn = document.getElementById('auth-btn');
    if (authBtn && window.auth) {
        if (window.auth.isAuthenticated()) {
            authBtn.textContent = 'My Account';
            authBtn.addEventListener('click', () => {
                window.location.href = 'auth.html';
            });
        } else {
            authBtn.addEventListener('click', () => {
                window.location.href = 'auth.html';
            });
        }
    }
    
    // Protect certain routes
    const currentPage = getCurrentPage();
    if (currentPage === 'cart' && window.auth) {
        // Cart page requires authentication
        if (!window.auth.requireAuth()) {
            return false;
        }
    }
    
    return true;
}

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (initializeAuth()) {
            initializeApp();
        }
    });
} else {
    if (initializeAuth()) {
        initializeApp();
    }
}