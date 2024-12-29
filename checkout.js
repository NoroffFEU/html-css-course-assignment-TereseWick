document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cartItems");
    const totalElement = document.getElementById("total");

    // Retrieve cart from local storage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = 0;

    const renderCart = () => {
        cartItemsContainer.innerHTML ="";

    if (cart.length === 0) {
        cartItemsContainer.textContent = "Your cart is empty.";
        totalElement.textContent = "$0.00";
        return;
    }

    totalPrice = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <p>${item.title} - $${item.price.toFixed(2)}</p>
            <button class="remove-from-cart" data-index="${index}">Remove</button>
        `;

        cartItemsContainer.appendChild(cartItem);

        totalPrice += item.price;
    });

    totalElement.textContent = `$${totalPrice.toFixed(2)}`;
    };

    renderCart();

    const removeFromCart = (index) => {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    };

    const removeButtons = document.querySelectorAll(".remove-from-cart");
    removeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const index = parseInt(button.getAttribute("data-index"));
            removeFromCart(index);
        });
    });
});