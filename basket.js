// Modificaciones en JavaScript para cumplir con los requisitos

// Fetching data from a placeholder API
async function fetchProducts() {
    const gallery = document.getElementById('products');
    gallery.innerHTML = '<p>Loading products...</p>'; // Loading message

    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();

        // Clear previous loading message or empty content
        gallery.innerHTML = '';

        if (products.length === 0) {
            gallery.innerHTML = '<p>No products found.</p>'; // Show message if no products
        } else {
            // Display products
            products.slice(0, 6).forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card'); // Add a class for styling
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.title}" class="product-image">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-price">${product.price} USD</p>
                    <button class="add-to-cart">Add to Cart</button>
                `;

                // Add event listener for adding to cart
                const addToCartButton = productCard.querySelector('.add-to-cart');
                addToCartButton.addEventListener('click', () => addToCart(product));

                gallery.appendChild(productCard);
            });
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        gallery.innerHTML = '<p>Sorry, we encountered an error while fetching products.</p>';
    }
}

// Cart management with Local Storage
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add the product to the cart
    cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image
    });

    // Save updated cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${product.title} has been added to your cart!`);
}

// Fetch and display cart items (Optional for debugging or cart page)
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Cart:', cart);
}

// CSS enhancements for better user interaction
document.addEventListener('DOMContentLoaded', () => {
    // Highlight buttons on hover
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = '#ff6600';
        });

        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = '';
        });
    });

    // Fetch products on page load
    fetchProducts();
});
