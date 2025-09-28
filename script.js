// E-commerce Site JavaScript
// ============================================

// Constants and Configuration
const ANIMATION_DURATION = 300;
const TOAST_DURATION = 3000;

// Sample product data with enhanced details
const products = [
    {
        id: 1,
        name: "朝採れ新鮮野菜セット",
        category: "food",
        price: 1200,
        description: "地元農家で朝採れした新鮮な季節野菜の詰め合わせです。栄養価が高く、自然の甘みを楽しめます。",
        emoji: "🥬",
        inStock: true,
        rating: 4.8,
        tags: ["有機栽培", "朝採れ", "季節野菜"]
    },
    {
        id: 2,
        name: "手作り木製カトラリーセット",
        category: "handmade",
        price: 2800,
        description: "地元の木材を使用した手作りのスプーンとフォークのセットです。温かみのある手触りが特徴です。",
        emoji: "🥄",
        inStock: true,
        rating: 4.9,
        tags: ["手作り", "木製", "カトラリー"]
    },
    {
        id: 3,
        name: "地元産はちみつ",
        category: "food",
        price: 1800,
        description: "地域の花々から採取された純粋な天然はちみつです。濃厚で上品な甘みが自慢です。",
        emoji: "🍯",
        inStock: true,
        rating: 4.7,
        tags: ["天然", "純粋", "地元産"]
    },
    {
        id: 4,
        name: "手編みニットマフラー",
        category: "handmade",
        price: 3500,
        description: "天然素材の毛糸を使用した温かい手編みマフラーです。一つ一つ丁寧に編み上げています。",
        emoji: "🧣",
        inStock: true,
        rating: 4.6,
        tags: ["手編み", "天然素材", "防寒"]
    },
    {
        id: 5,
        name: "自家製ジャムセット",
        category: "food",
        price: 2200,
        description: "地元産の果物で作った無添加ジャム3種セットです。イチゴ、ブルーベリー、リンゴの3種類。",
        emoji: "🍓",
        inStock: true,
        rating: 4.8,
        tags: ["無添加", "自家製", "3種セット"]
    },
    {
        id: 6,
        name: "陶器の手作り湯呑み",
        category: "handmade",
        price: 1500,
        description: "地元の土を使用した手作りの陶器湯呑みです。お茶の時間をより豊かにします。",
        emoji: "🫖",
        inStock: true,
        rating: 4.5,
        tags: ["陶器", "手作り", "湯呑み"]
    },
    {
        id: 7,
        name: "有機玄米",
        category: "food",
        price: 1600,
        description: "農薬を使わずに育てた栄養豊富な有機玄米です。プチプチとした食感と香ばしい味わい。",
        emoji: "🌾",
        inStock: true,
        rating: 4.4,
        tags: ["有機栽培", "無農薬", "玄米"]
    },
    {
        id: 8,
        name: "レザークラフト財布",
        category: "handmade",
        price: 4200,
        description: "本革を使用した手作りの長財布です。使うほどに味が出る、職人の技が光る逸品。",
        emoji: "👛",
        inStock: true,
        rating: 4.9,
        tags: ["本革", "手作り", "長財布"]
    },
    {
        id: 9,
        name: "季節の花束",
        category: "other",
        price: 2500,
        description: "地元で育った季節の花を使った美しい花束です。特別な日の贈り物に最適。",
        emoji: "💐",
        inStock: true,
        rating: 4.7,
        tags: ["季節限定", "花束", "ギフト"]
    },
    {
        id: 10,
        name: "手作り石鹸セット",
        category: "other",
        price: 1900,
        description: "天然成分のみを使用した優しい手作り石鹸のセットです。お肌に優しく香りも良好。",
        emoji: "🧼",
        inStock: true,
        rating: 4.6,
        tags: ["天然成分", "手作り", "石鹸"]
    }
];

// Global state
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let currentCategory = 'all';
let isCartOpen = false;

// Utility Functions
// ================

function formatPrice(price) {
    return `¥${price.toLocaleString()}`;
}

function getCategoryName(category) {
    const categoryNames = {
        'food': '食品',
        'handmade': 'ハンドメイド',
        'other': 'その他'
    };
    return categoryNames[category] || category;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function showToast(message, type = 'success') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">${type === 'success' ? '✓' : '⚠'}</span>
            <span class="toast-message">${message}</span>
        </div>
    `;

    // Add styles if not already present
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .toast {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.12);
                z-index: 10000;
                transform: translateX(400px);
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                border-left: 4px solid var(--primary-color);
            }
            .toast.toast-success {
                border-left-color: #4caf50;
            }
            .toast.toast-error {
                border-left-color: #f44336;
            }
            .toast.show {
                transform: translateX(0);
            }
            .toast-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            .toast-icon {
                font-weight: bold;
                color: #4caf50;
            }
            .toast-error .toast-icon {
                color: #f44336;
            }
            .toast-message {
                font-weight: 500;
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(toast);
    
    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Remove toast after duration
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, TOAST_DURATION);
}

// Product Display Functions
// ========================

function displayProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    const filteredProducts = currentCategory === 'all' 
        ? products 
        : products.filter(product => product.category === currentCategory);

    // Add fade out animation
    grid.style.opacity = '0.5';
    
    setTimeout(() => {
        grid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
        // Add fade in animation
        grid.style.opacity = '1';
        
        // Add staggered animation to cards
        const cards = grid.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 200);
}

function createProductCard(product) {
    const ratingStars = '★'.repeat(Math.floor(product.rating)) + 
                       (product.rating % 1 ? '☆' : '') + 
                       '☆'.repeat(5 - Math.ceil(product.rating));
    
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-title">${product.name}</div>
                <div class="product-category">${getCategoryName(product.category)}</div>
                <div class="product-rating">
                    <span class="stars">${ratingStars}</span>
                    <span class="rating-value">${product.rating}</span>
                </div>
                <div class="product-description">${product.description}</div>
                <div class="product-tags">
                    ${product.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="product-price">${formatPrice(product.price)}</div>
                <button class="add-to-cart ${!product.inStock ? 'disabled' : ''}" 
                        onclick="addToCart(${product.id})" 
                        ${!product.inStock ? 'disabled' : ''}>
                    ${product.inStock ? 'カートに追加' : '在庫切れ'}
                </button>
            </div>
        </div>
    `;
}

// Category Management
// ==================

function setupCategoryButtons() {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active state
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update current category and display
            currentCategory = button.dataset.category;
            displayProducts();
            
            // Add bounce effect
            button.classList.add('bounce');
            setTimeout(() => button.classList.remove('bounce'), 600);
        });
    });
}

// Cart Management Functions
// ========================

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.inStock) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    updateCartDisplay();
    showAddToCartFeedback(product);
    showToast(`${product.name} をカートに追加しました`);
}

function showAddToCartFeedback(product) {
    const cartIcon = document.querySelector('.cart-icon');
    if (!cartIcon) return;

    // Bounce animation for cart icon
    cartIcon.classList.add('bounce');
    setTimeout(() => cartIcon.classList.remove('bounce'), 600);

    // Find the product card and add feedback
    const productCard = document.querySelector(`[data-product-id="${product.id}"]`);
    if (productCard) {
        const addButton = productCard.querySelector('.add-to-cart');
        const originalText = addButton.textContent;
        
        addButton.textContent = '追加済み ✓';
        addButton.style.background = '#4caf50';
        
        setTimeout(() => {
            addButton.textContent = originalText;
            addButton.style.background = '';
        }, 1500);
    }
}

function updateCartDisplay() {
    updateCartCount();
    updateCartItems();
    updateCartTotal();
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (!cartCount) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Add bounce animation if items increased
    if (totalItems > 0) {
        cartCount.classList.add('bounce');
        setTimeout(() => cartCount.classList.remove('bounce'), 600);
    }
}

function updateCartItems() {
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>カートは空です</p>
                <p class="empty-cart-subtitle">お気に入りの商品を追加してください</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => createCartItem(item)).join('');
    }
}

function createCartItem(item) {
    return `
        <div class="cart-item" data-item-id="${item.id}">
            <div class="cart-item-image">${item.emoji}</div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
                <div class="cart-item-category">${getCategoryName(item.category)}</div>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)">−</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="remove-item-btn" onclick="removeFromCart(${item.id})" title="商品を削除">
                ×
            </button>
        </div>
    `;
}

function updateCartTotal() {
    const totalPrice = document.getElementById('totalPrice');
    if (!totalPrice) return;

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPrice.textContent = `合計: ${formatPrice(total)}`;
}

function changeQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    const newQuantity = item.quantity + change;
    
    if (newQuantity <= 0) {
        removeFromCart(productId);
    } else {
        item.quantity = newQuantity;
        saveCart();
        updateCartDisplay();
    }
}

function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex === -1) return;

    const item = cart[itemIndex];
    cart.splice(itemIndex, 1);
    
    saveCart();
    updateCartDisplay();
    showToast(`${item.name} をカートから削除しました`, 'error');

    // Add removal animation
    const cartItem = document.querySelector(`[data-item-id="${productId}"]`);
    if (cartItem) {
        cartItem.style.transform = 'translateX(100%)';
        cartItem.style.opacity = '0';
        setTimeout(() => {
            updateCartItems();
        }, 300);
    }
}

// Cart Modal Functions
// ===================

function toggleCart() {
    const modal = document.getElementById('cartModal');
    if (!modal) return;

    isCartOpen = !isCartOpen;
    
    if (isCartOpen) {
        modal.style.display = 'block';
        updateCartDisplay();
        document.body.style.overflow = 'hidden'; // Prevent background scroll
        
        // Add animation class
        requestAnimationFrame(() => {
            modal.classList.add('show');
        });
    } else {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            modal.style.display = 'none';
        }, ANIMATION_DURATION);
    }
}

function closeCart() {
    if (isCartOpen) {
        toggleCart();
    }
}

// Checkout Functions
// =================

function checkout() {
    if (cart.length === 0) {
        showToast('カートが空です。商品を追加してください。', 'error');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Create detailed order summary
    const orderSummary = cart.map(item => 
        `${item.name} × ${item.quantity}個 - ${formatPrice(item.price * item.quantity)}`
    ).join('\n');
    
    const confirmMessage = `
※この注文はデモ用であり、実際には処理されません

【商品数】${itemCount}点
【注文内容】
${orderSummary}

【合計金額】${formatPrice(total)}

この内容で注文を確定しますか？
    `.trim();

    if (confirm(confirmMessage)) {
        // Simulate order processing
        showToast('注文を処理中です...', 'success');
        
        setTimeout(() => {
            // Clear cart and close modal
            cart = [];
            saveCart();
            updateCartDisplay();
            closeCart();
            
            showToast('ご注文ありがとうございました！', 'success');
            
            // Show success message
            setTimeout(() => {
                alert(`ご注文が完了しました！\n\n注文番号: ${generateOrderNumber()}。\nこの注文は実際には処理されません。`);
            }, 1000);
        }, 2000);
    }
}

function generateOrderNumber() {
    const now = new Date();
    const timestamp = now.getTime().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `LC${timestamp}${random}`;
}

// Scroll to Products Function
// ===========================

function scrollToProducts() {
    const productsSection = document.querySelector('.products-section');
    if (productsSection) {
        productsSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// Event Listeners and Initialization
// ==================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌾 地元の恵み - ECサイト初期化中...');
    
    // Initialize components
    displayProducts();
    setupCategoryButtons();
    updateCartDisplay();
    setupModalEvents();
    
    console.log('✅ サイトの初期化が完了しました');
});

function setupModalEvents() {
    const modal = document.getElementById('cartModal');
    if (!modal) return;

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeCart();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isCartOpen) {
            closeCart();
        }
    });
}

// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
    const target = e.target.closest('a[href^="#"]');
    if (target) {
        e.preventDefault();
        const targetId = target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Export functions for global access
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.changeQuantity = changeQuantity;
window.toggleCart = toggleCart;
window.closeCart = closeCart;
window.checkout = checkout;
window.scrollToProducts = scrollToProducts;

console.log('📦 ECサイトのJavaScriptが読み込まれました');