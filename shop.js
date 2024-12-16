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
      <button class="add-to-cart-button" data-product-id="${product.id}">Add to Cart</button>
      <a href="product.html?id=${product.id}" class="view-product-link">View Product</a>
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