let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.createElement('div');
const cartOverlay = document.createElement('div');
cartSidebar.className = 'cart-sidebar';
cartOverlay.className = 'cart-overlay';

// Build Cart Sidebar HTML
function buildCartSidebar() {
    let cartHTML = '<h2>Your Cart</h2>';

    if (cart.length === 0) {
        cartHTML += '<div class="cart-empty"><p>Your cart is empty.</p></div>';
    } else {
        cart.forEach(item => {
            cartHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button onclick="updateQuantity('${item.id}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity('${item.id}', 1)">+</button>
                    </div>
                </div>
            `;
        });

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartHTML += `
            <div class="cart-total">Total: $${total.toFixed(2)}</div>
            <div class="cart-actions">
                <button class="btn" onclick="checkout()">Checkout</button>
                <button class="btn" style="background:#7f8c8d;" onclick="closeCart()">Continue Shopping</button>
            </div>
        `;
    }

    cartSidebar.innerHTML = cartHTML;
}

// Update Cart Count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}

// Open Cart
function openCart() {
    buildCartSidebar();
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('active');
    document.body.appendChild(cartSidebar);
    document.body.appendChild(cartOverlay);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

// Close Cart
function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('active');
    setTimeout(() => {
        if (cartSidebar.parentNode) {
            document.body.removeChild(cartSidebar);
            document.body.removeChild(cartOverlay);
        }
    }, 400);
    document.body.style.overflow = '';
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        openCart(); // Re-render cart
    }
}

// Simulate Checkout
function checkout() {
    if (cart.length === 0) return;
    alert('Thanks for your order! This is a demo — no real checkout yet 😊');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    closeCart();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // Attach cart icon click
    if (cartIcon) {
        cartIcon.addEventListener('click', openCart);
    }

    // Close cart when clicking overlay
    cartOverlay.addEventListener('click', closeCart);

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cartSidebar.classList.contains('open')) {
            closeCart();
        }
    });
});

// Add to Cart (called from products page)
function addToCart(productId, name, price) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: name,
            price: parseFloat(price),
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${name} added to cart!`);

    // Auto-open cart on add? Uncomment below:
    // openCart();
}