const API_URL = "https://v2.api.noroff.dev/rainy-days";
const token = localStorage.getItem("token");

// Parse the query parameter to get the product ID
function getProductId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

// Fetch product details based on the ID
async function fetchProductDetails(productId) {
  try {
    const response = await fetch(`${API_URL}/${productId}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch product details: ${response.status}`);
    }

    const result = await response.json();
    if (result && result.data) {
      displayProductDetails(result.data);
    } else {
      console.error("Invalid product data structure.");
    }
  } catch (error) {
    console.error("Error fetching product details:", error.message);
  }
}

// Display product details on the page
function displayProductDetails(product) {
  const productDetails = document.getElementById("product-details");

  productDetails.innerHTML = `
    <div class="product-card-details">
      <img src="${product.image.url}" alt="${product.image.alt}" class="product-image-large" />
      <h2>${product.title}</h2>
      <p><strong>Description:</strong> ${product.description}</p>
      <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
      <p><strong>Gender:</strong> ${product.gender}</p>
      <button class="add-to-cart-button" data-product-id="${product.id}">Add to Cart</button>
      <a href="shop.html" class="back-link">Back to Shop</a>
    </div>
  `;
}

// Load product details on page load
document.addEventListener("DOMContentLoaded", () => {
  const productId = getProductId();
  if (productId) {
    fetchProductDetails(productId);
  } else {
    console.error("No product ID found in the URL.");
    document.getElementById("product-details").innerHTML = "<p>Product not found.</p>";
  }
});

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