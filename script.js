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

        // Check for network errors
        if (!response.ok) {
          throw new Error(`Network error: ${response.status}`);
        }
    
        // Parse the JSON response
        const result = await response.json();
        console.log("Fetched Products:", result);

        if (result && result.data && Array.isArray(result.data)) {
            const products = result.data;
            console.log("Products found:", products); // Log the products array
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
      
        // Clear existing content
        productList.innerHTML = "";

        if (products.length === 0) {
            console.log("No products to display.");
            return;
          }
      
        // Map through products and generate HTML
        products.forEach((product) => {
          const productCard = document.createElement("div");
          productCard.classList.add("product-card");
      
          // Build product HTML
          productCard.innerHTML = `
            <img src="${product.image.url}" alt="${product.image.alt}" class="product-image" />
            <h2 class="product-title">${product.title}</h2>
            <p class="product-description">${product.description}</p>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <a href="product.html?id=${product.id}" class="view-product-link">View Product</a>
            <button class="add-to-cart-button" data-product-id="${product.id}">Add to Cart</button>
          `;
      
          // Append the product to the container
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