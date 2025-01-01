const BASKET_KEY = "basket";

// Get basket from localStorage or initialize an empty array
function getBasket() {
  const basket = localStorage.getItem(BASKET_KEY);
  return basket ? JSON.parse(basket) : [];
}

// Save basket to localStorage
function saveBasket(basket) {
  localStorage.setItem(BASKET_KEY, JSON.stringify(basket));
}

// Add a product to the basket
function addToBasket(productId, productTitle, productPrice) {
  const basket = getBasket();

  // Check if the product already exists in the basket
  const existingProduct = basket.find((item) => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity += 1; // Increment quantity if product exists
  } else {
    // Add new product to the basket
    basket.push({
      id: productId,
      title: productTitle,
      price: productPrice,
      quantity: 1,
    });
  }

  saveBasket(basket);
  console.log("Basket updated:", basket);
}

// Remove a product from the basket
function removeFromBasket(productId) {
  let basket = getBasket();

  // Filter out the product to remove it
  basket = basket.filter((item) => item.id !== productId);

  saveBasket(basket);
  console.log("Product removed. Basket updated:", basket);
}

// Display basket contents (for debugging or UI updates)
function displayBasket() {
  const basket = getBasket();
  console.log("Current Basket:", basket);
}

// Event listeners for buttons
document.addEventListener("DOMContentLoaded", () => {
    displayBasket();
  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart-button")) {

      const productId = event.target.dataset.productId;
      const productCard = event.target.closest(".product-card");

      if (productCard) {
        const productTitle = productCard.querySelector(".product-title").innerText;
      const productPrice = parseFloat(
        productCard.querySelector(".product-price").innerText.replace("$", "")
      );

      addToBasket(productId, productTitle, productPrice);
      }
    }

    if (event.target.classList.contains("remove-from-basket")) {
      const productId = event.target.dataset.id;
      removeFromBasket(productId);
    }

    // Optionally display the basket for verification
    displayBasket();
  });
});

function displayBasket() {
    const basket = getBasket(); // Get the basket from localStorage
    const basketContainer = document.getElementById("basket-container"); // Target the basket container
  
    if (!basketContainer) {
      console.error("No container found for displaying the basket!");
      return;
    }
  
    // Clear the container
    basketContainer.innerHTML = "";
  
    // Check if the basket is empty
    if (basket.length === 0) {
      basketContainer.innerHTML = "<p>Your basket is empty</p>";
      return;
    }
  
    // Display the basket items
    const basketList = document.createElement("ul"); // Create a list
    basketList.classList.add("basket-list");
  
    basket.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.classList.add("basket-item");
  
      listItem.innerHTML = `
        <span>${item.title} - $${item.price} (x${item.quantity})</span>
        <button class="remove-from-basket" data-product-id="${item.id}">Remove</button>
      `;
  
      basketList.appendChild(listItem);
    });
  
    basketContainer.appendChild(basketList);
  }

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