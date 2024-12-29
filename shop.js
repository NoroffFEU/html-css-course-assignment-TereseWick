const API_URL = "https://v2.api.noroff.dev/rainy-days";
const token = localStorage.getItem("token");
let allProducts = []; // Array to store all products

// Parse query parameters from the URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Fetch products from API
async function fetchProducts() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Network error: ${response.status}`);
    }

    const result = await response.json();
    if (result && result.data && Array.isArray(result.data)) {
      allProducts = result.data;
      applyInitialFilter(); // Apply gender filter from URL
    } else {
      console.error("Invalid product data structure.");
    }
  } catch (error) {
    console.error("Error fetching products:", error.message);
  }
}

// Display products in the DOM
function displayProducts(products) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // Clear previous content

  if (products.length === 0) {
    productList.innerHTML = "<p>No products found.</p>";
    return;
  }

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <img src="${product.image.url}" alt="${product.image.alt}" class="product-image" />
      <h2 class="product-title">${product.title}</h2>
      <p class="product-description">${product.description}</p>
      <p class="product-price">$${product.price.toFixed(2)}</p>
      <a href="product.html?id=${product.id}" class="view-product-link">View Product</a>
      <button class="add-to-cart-button" data-product-id="${product.id}"
        data-product-title="${product.title}" data-product-price="${product.price}"
        data-product-id="${product.id}"
            data-product-title="${product.title}"
            data-product-price="${product.price}"
            data-product-image="${product.image.url}"
            data-product-alt="${product.image.alt}"
            >Add to Cart</button>
    `;

    productList.appendChild(productCard);
  });
}

// Filter products by gender
function filterProducts(gender) {
  let filteredProducts;

  if (gender === "all") {
    filteredProducts = allProducts;
  } else {
    filteredProducts = allProducts.filter((product) => product.gender === gender);
  }

  displayProducts(filteredProducts);

  // Highlight active button (optional)
  updateActiveFilterButton(gender);
}

// Apply filter from URL on page load
function applyInitialFilter() {
  const gender = getQueryParam("gender"); // Get 'gender' query parameter
  if (gender) {
    filterProducts(gender);
  } else {
    filterProducts("all"); // Show all products by default
  }
}

// Optional: Highlight active filter button
function updateActiveFilterButton(activeGender) {
  const buttons = document.querySelectorAll(".filter-container button");
  buttons.forEach((button) => {
    button.classList.toggle("active", button.textContent.toLowerCase() === activeGender);
  });
}

// Run the fetchProducts function on page load
document.addEventListener("DOMContentLoaded", fetchProducts);

function menuBar() {
    const menuList = document.getElementById('menu-list');

    if (menuList) {

    if (menuList.style.display === 'block') {
      menuList.style.display = 'none';
    } else {
      menuList.style.display = 'block';
    }
  } else {
    console.error("No container found for displaying products!");
    return;
  }
}

const addToCartButtons = document.querySelectorAll(".add-to-cart-button");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const productId = event.target.dataset.productId;
    const productTitle = event.target.dataset.productTitle;
    const productPrice = parseFloat(event.target.dataset.productPrice);

    addToCart({ id: productId, title: productTitle, price: productPrice });
  });
});


// Add product to the cart
function addToCart(product) {
cart.push(product);
total += product.price;
updateCartUI();
}

// Remove product from the cart
function removeFromCart(index) {
const product = cart[index];
if (product) {
  total -= product.price;
  cart.splice(index, 1);
  updateCartUI();
}
}


function updateCartUI() {
  const cartItemsContainer = document.getElementById("cartItems");
  const cartCount = document.getElementById("cart-count");
  const totalContainer = document.getElementById("total");

  cartCount.textContent = cart.length;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "Your cart is empty";
  } else {
    cartItemsContainer.innerHTML = cart
      .map((item, index) => `
        <div class="cart-item">
          <p>${item.title} - $${item.price.toFixed(2)}</p>
          <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
        </div>
      `)
      .join("");
  }

  totalContainer.textContent = `$ ${total.toFixed(2)}`;
}

