const apiResponse ={
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidF93aWNrIiwiZW1haWwiOiJ0ZXJlc2Uud2lja0BzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTczMjc0MTEzNX0.pgp_t6AVmwApSfkclK4tmwNQigg56BFXW7gg_8qQ_eo" 
  };
  
  localStorage.setItem("token", apiResponse.token);
  
  const token = localStorage.getItem("token");
  console.log("token:", token);

  const API_URL ="https://v2.api.noroff.dev/rainy-days";

   document.addEventListener("DOMContentLoaded",function (){
    console.log("DOM fully loaded and parsed");
    fetchProducts();
  });

  async function fetchProducts(){
    try {
        console.log("Starting product fetch...");

        const response = await fetch(API_URL, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        console.log("Fetch Response Status:", response.status);

        
        if (!response.ok) {
          throw new Error(`Network error: ${response.status}`);
        }
    
        
        const result = await response.json();
        console.log("Fetched Products:", result);

        if (result && result.data && Array.isArray(result.data)) {
            const products = result.data;
            console.log("Products found:", products); 
            displayProducts(products);
          } else {
            console.log("No products or invalid data structure.");
          }
    
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    } 

    function displayProducts(products) {
        const productList = document.getElementById("product-list");
      
        if (!productList) {
          console.error("No container found for displaying products!");
          return;
        }
      
        
        productList.innerHTML = "";

        if (products.length === 0) {
            console.log("No products to display.");
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
            <button class="add-to-cart-button" 
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

      addToCart({ id: productId, title: productTitle, price: productPrice, image: { url: event.target.dataset.productImage, alt: event.target.dataset.productAlt } });
    });
  });



function addToCart(product) {
  cart.push(product);
  total += product.price;
  updateCartUI();
}


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
        <img src="${item.image.url}" alt="${item.image.alt}" class="product-image" />
          <p>${item.title} - $${item.price.toFixed(2)}</p>
          <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
        </div>
      `)
      .join("");
  }

  totalContainer.textContent = `$ ${total.toFixed(2)}`;
}

