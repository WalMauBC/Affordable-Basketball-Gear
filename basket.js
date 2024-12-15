// Fetching data from a placeholder API (replace with a real API)
async function fetchProducts() {
  const gallery = document.getElementById('products');
  gallery.innerHTML = '<p>Loading products...</p>';  // Loading message

  try {
      const response = await fetch('https://fakestoreapi.com/products');
      const products = await response.json();

      // Clear previous loading message or empty content
      gallery.innerHTML = ''; 

      if (products.length === 0) {
          gallery.innerHTML = '<p>No products found.</p>';  // Show message if no products
      } else {
          // Display products
          products.slice(0, 6).forEach(product => {
              const productCard = document.createElement('div');
              productCard.classList.add('product-card');  // Add a class for styling
              productCard.innerHTML = `
                  <img src="${product.image}" alt="${product.title}" class="product-image">
                  <h3 class="product-title">${product.title}</h3>
                  <p class="product-price">${product.price} USD</p>
              `;
              gallery.appendChild(productCard);
          });
      }
  } catch (error) {
      console.error('Error fetching products:', error);
      gallery.innerHTML = '<p>Sorry, we encountered an error while fetching products.</p>';
  }
}

// Initialize
fetchProducts();