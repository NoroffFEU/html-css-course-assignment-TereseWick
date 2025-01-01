document.addEventListener("DOMContentLoaded", () => {
    const cart = []; // Array to store cart items
    const cartItemsContainer = document.getElementById("cartItems");
    const totalElement = document.getElementById("total");
    const cartCountElement = document.getElementById("cart-count");
  
    // Listen for Add to Cart button clicks
    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("add-to-cart-button")) {
        const button = event.target;
  
        // Get product details from data attributes
        const productId = button.getAttribute("data-product-id");
        const productTitle = button.getAttribute("data-product-title");
        const productPrice = parseFloat(button.getAttribute("data-product-price"));
        const productImage = button.getAttribute("data-product-image");
        const productAlt = button.getAttribute("data-product-alt");
  
        // Add product to the cart array
        const product = { id: productId, title: productTitle, price: productPrice, image: { url: productImage, alt: productAlt } };
        cart.push(product);
  
        // Update the sidebar UI
        updateCartUI();
      }
    });
  
    // Function to update the cart UI
    function updateCartUI() {
      cartItemsContainer.innerHTML = ""; // Clear existing cart items
      let totalPrice = 0;
  
      if (cart.length === 0) {
        cartItemsContainer.textContent = "Your cart is empty.";
      } else {
        cart.forEach((item, index) => {
          // Create cart item element
          const cartItem = document.createElement("div");
          cartItem.classList.add("cart-item");
  
          cartItem.innerHTML = `
            <p>${item.title} - $${item.price.toFixed(2)}</p>
            <button class="remove-from-cart" data-index="${index}">Remove</button>
          `;
  
          // Append to cart items container
          cartItemsContainer.appendChild(cartItem);
  
          // Calculate total price
          totalPrice += item.price;
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
  
      // Update the total price and cart count
      totalElement.textContent = `$ ${totalPrice.toFixed(2)}`;
      cartCountElement.textContent = cart.length;
  
      // Add event listener for Remove buttons
      addRemoveButtonsListeners();
    }
  
    // Function to handle removing items from the cart
    function addRemoveButtonsListeners() {
      const removeButtons = document.querySelectorAll(".remove-from-cart");
      removeButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          const index = parseInt(button.getAttribute("data-index"));
          cart.splice(index, 1); // Remove the item from the cart array
          updateCartUI(); // Update the cart UI
        });
      });
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.getElementById("cart-icon"); // Cart icon button
    const sidebar = document.getElementById("cart-sidebar"); // Sidebar element
    const overlay = document.getElementById("sidebar-overlay"); // Overlay element

    // Ensure elements exist
    if (!cartIcon || !sidebar || !overlay) {
        console.error("One or more elements (cartIcon, sidebar, overlay) are missing.");
        return;
    }

    // Toggle sidebar and overlay visibility on cart icon click
    cartIcon.addEventListener("click", () => {
        sidebar.classList.toggle("open"); // Add/remove 'open' class
        overlay.classList.toggle("active"); // Add/remove 'active' class
    });

    // Close sidebar when clicking on the overlay
    overlay.addEventListener("click", () => {
        sidebar.classList.remove("open");
        overlay.classList.remove("active");
    });
});




