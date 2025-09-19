// Product Data
const products = [
    {
        id: 'adidas-Campus-00s',
        name: 'Adidas Campus 00s',
        price: 300.00,
        image: 'images/products/Adidas Campus 00s.jpg',
        category: 'lifestyle',
        tag: 'casual classic',
        inStock: true,
        description: 'They are done with a premium leather upper lind with  soft textile terry fabric, with all of it riding on an off-white midsle - a clear connect to the Campus legacy'
    },
    {
        id: 'New-Balance-530',
        name: 'New Balance 530',
        price: 420.00,
        image: 'images/products/New Balance 530.jpeg',
        category: 'sneaker',
        tag: 'Classic Comfort',
        inStock: false, // Out of stock example
        description: 'The New Balance 530 is a claSssic running shoe that combines retro style with modern comfort. Featuring a mesh and synthetic upper for breathability, it also includes ENCAP midsole technology for superior cushioning and support.'
    },
    {
        id: 'Combat-boots',
        name: 'Combat Boots',
        price: 750.00,
        image: 'images/products/boots.jpeg',
        category: 'streetwear',
        tag: 'Chunky boots',
        inStock: true, 
        description: 'These combat boots are designed for both style and durability. Made with high-quality leather and a rugged rubber sole, they provide excellent traction and support. Perfect for adding an edgy touch to any outfit.'
    },
    {
        id: 'Nike-Dunk-Low',
        name: 'Nike Dunk Low',
        price: 370.00,
        image: 'images/products/Nike Dunk Low.jpeg',
        category: 'streetwear',
        tag: 'Street Style',
        inStock: true,
        description: 'The Nike Dunk Low is a timeless sneaker that has transcended its basketball origins to become a streetwear staple. With its low-cut design, premium leather upper, and iconic Swoosh logo, it offers both style and comfort for everyday wear.'
    },
    {
        id: 'Converse-All-Star',
        name: 'Converse All Star',
        price: 280.00,
        image: 'images/products/converse.jpeg',
        category: 'sneaker',
        tag: 'All Star Classic',
        inStock: false, 
        description: 'The Converse All Star is an iconic sneaker known for its timeless design and versatility. Featuring a canvas upper, rubber toe cap, and vulcanized rubber sole, it offers comfort and durability for everyday wear.'
    },
];

// Render Products
function renderProducts(productsToRender) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    productsToRender.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="card-body">
                <span class="tag">${product.tag}</span>
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button onclick="openModal('${product.id}')">Quick View</button>
            </div>
        `;
        grid.appendChild(card);
        // const outOfStockBadge = !product.inStock ? '<span class="out-of-stock">OUT OF STOCK</span>' : '';
        const outOfStockBadge = !product.inStock ? 
            '<span class="out-of-stock">OUT OF STOCK</span>' : '';

        const actionButton = product.inStock ? 
            `<button onclick="openModal('${product.id}')">Quick View</button>` : 
            `<button disabled class="btn-sold-out">Sold Out</button>`;

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="card-body">
               <span class="tag">${product.tag}</span>
               ${outOfStockBadge}
               <h3>${product.name}</h3>
               <p class="price">$${product.price.toFixed(2)}</p>
               ${actionButton}
            </div>
        `;
    });
}

// Filter Products
document.querySelectorAll('.filters button').forEach(button => {
    button.addEventListener('click', () => {
        // Update active state
        document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        if (filter === 'all') {
            renderProducts(products);
        } else {
            const filtered = products.filter(p => p.category === filter);
            renderProducts(filtered);
        }
    });
});

// Open Modal
function openModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('productModal');
    const modalDetails = document.getElementById('modalDetails');

    modalDetails.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p class="price">$${product.price.toFixed(2)}</p>
        <p>${product.description}</p>
        <button onclick="addToCart('${product.id}', '${product.name}', '${product.price}')" class="btn">Add to Cart</button>
    `;

    modal.style.display = 'block';
}

// Close Modal
document.querySelector('.close')?.addEventListener('click', () => {
    document.getElementById('productModal').style.display = 'none';
});

window.addEventListener('click', (e) => {
    const modal = document.getElementById('productModal');
    if (e.target === modal) modal.style.display = 'none';
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
});

