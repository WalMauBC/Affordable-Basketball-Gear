// Fetching data from a placeholder API (replace with a real API)
async function fetchProducts() {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
  
    const gallery = document.getElementById('products');
    products.slice(0, 6).forEach(product => {
      const productCard = document.createElement('div');
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.price} USD</p>
      `;
      gallery.appendChild(productCard);
    });
  }
  
  // Initialize
  fetchProducts();
  