document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get("page");
  const id = urlParams.get("id");

  if (page == 1 && id) {
    viewSingleProduct(id);
  } else if (page == 2 && id) {
    viewSingleProductCart(id);
  } else if (page == 3 && id) {
    viewSingleProductCategory(id);
  }
});

let array = [];

const API_URL = "https://fakestoreapi.com";
let currentProductId = null;

function showToast(message, success = true) {
  const toaster = document.getElementById("toaster");
  if (toaster) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.style.backgroundColor = success ? "#F4D03F" : "#d9534f"; // Updated to yellow
    toast.textContent = message;
    toaster.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 5000);
  } else {
    console.error("Toaster element not found!");
  }
}

async function fetchProducts() {
  try {
    const response = await fetch(`${API_URL}/products`);
    const products = await response.json();
    displayIndexProducts(products);
    showToast("Products loaded successfully!", true);
  } catch (error) {
    console.error("Error fetching products:", error);
    showToast("Failed to load products.", false);
  }
}

function displayIndexProducts(products) {
  const productGrid = document.getElementById("product-grid");
  if (productGrid) {
    productGrid.innerHTML = "";

    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add("product");
      productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.title}" onclick="viewSingleProduct(${product.id})">
                    <h3>${product.title}</h3>
                    <p>$${product.price}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                `;
      productGrid.appendChild(productElement);
    });
  }
}

// async function viewSingleProduct(productId) {
//   try {
//     let bread_crumb = document.getElementById("bread-crumb");
//     if (bread_crumb) {
//       bread_crumb.style.display = "block";

//       bread_crumb.textContent = `Home > Product ${productId}`;
//     }
//     currentProductId = productId;
//     const response = await fetch(`${API_URL}/products/${productId}`);
//     const product = await response.json();

//     const productImage = document.getElementById("single-product-image");
//     const productTitle = document.getElementById("single-product-title");
//     const productCategory = document.getElementById("single-product-category");
//     const productDescription = document.getElementById(
//       "single-product-description"
//     );
//     const productPrice = document.getElementById("single-product-price");

//     if (
//       productImage &&
//       productTitle &&
//       productCategory &&
//       productDescription &&
//       productPrice
//     ) {
//       productImage.src = product.image;
//       productTitle.textContent = product.title;
//       productCategory.textContent = `Category: ${product.category}`;
//       productDescription.textContent = product.description;
//       productPrice.textContent = product.price;

//       document.querySelector(".products").style.display = "none";
//       document.getElementById("single-product-view").style.display = "block";
//     } else {
//       console.error("One or more single product view elements are missing!");
//     }
//   } catch (error) {
//     console.error("Error fetching single product:", error);
//     showToast("Failed to load product details.", false);
//   }
// }
async function viewSingleProduct(productId) {
  try {
    currentProductId = productId;
    const response = await fetch(`${API_URL}/products/${productId}`);
    const product = await response.json();
    window.history.pushState({}, "", `?page=${1}&id=${productId}`);
    let bread_crumb = document.getElementById("bread-crumb");
    bread_crumb.style.display = "block";
    if (bread_crumb) {
      bread_crumb.innerHTML = `
                <a href="./index.html" class="crumb">🏠 Home</a>
                 <span class="crumb" style="background: black;">🛍️ ${product.title}</span>
            `;
    }
    const productImage = document.getElementById("single-product-image");
    const productTitle = document.getElementById("single-product-title");
    const productCategory = document.getElementById("single-product-category");
    const productDescription = document.getElementById(
      "single-product-description"
    );
    const productPrice = document.getElementById("single-product-price");

    if (
      productImage &&
      productTitle &&
      productCategory &&
      productDescription &&
      productPrice
    ) {
      productImage.src = product.image;
      productTitle.textContent = product.title;
      productCategory.textContent = `Category: ${product.category}`;
      productDescription.textContent = product.description;
      productPrice.textContent = product.price;

      document.querySelector(".banner").style.display = "none";
      document.querySelector(".products").style.display = "none";
      document.getElementById("single-product-view").style.display = "block";
    } else {
      console.error("One or more single product view elements are missing!");
    }
  } catch (error) {
    console.error("Error fetching single product:", error);
    showToast("Failed to load product details.", false);
  }
}

function showProductGrid() {
  const bread_crumb = document.getElementById("bread-crumb");
  const singleProductView = document.getElementById("single-product-view");
  const productsSection = document.querySelector(".products");

  if (singleProductView && productsSection && bread_crumb) {
    bread_crumb.textContent = "Home";
    bread_crumb.style.display = "none";
    singleProductView.style.display = "none";
    productsSection.style.display = "block";
  } else {
    console.error("Unable to switch to product grid view!");
  }
}

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || []; // Get existing cart
  if (!cart.includes(productId)) {
    showToast(`Product ${productId} added to cart!`, true);
    array.push(productId);
    cart.push(productId); // Add product ID
    localStorage.setItem("cart", JSON.stringify(cart)); // Save to localStorage
  } else {
    showToast("Product already in cart!", false);
  }
}

function addToCartSingleProduct() {
  if (currentProductId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Get existing cart
    if (!cart.includes(currentProductId)) {
      showToast(`Product ${currentProductId} added to cart!`, true);
      array.push(currentProductId);
      cart.push(currentProductId); // Add product ID
      localStorage.setItem("cart", JSON.stringify(cart)); // Save to localStorage
    } else {
      showToast("Product already in cart!", false);
    }
  }
}

fetchProducts();
currentProductId = null;

async function fetchCartItems() {
  try {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = ""; // Clear existing content

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    for (const product of cart) {
      const productDetails = await fetchProductDetails(product);
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
                <img src="${productDetails.image}" alt="${productDetails.title}" onclick="viewSingleProductCart(${productDetails.id})">
                <h3>${productDetails.title}</h3>
                <p>Price: $${productDetails.price}</p>
                <button onclick="removeFromCart(${productDetails.id})">Remove</button>
            `;
      cartItemsContainer.appendChild(cartItem);
    }
  } catch (error) {}
}

async function fetchProductDetails(productId) {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const text = await response.text(); // Read response as text first
    if (!text) {
      throw new Error("Received empty response from API.");
    }

    const data = JSON.parse(text); // Now safely parse JSON

    if (!data || Object.keys(data).length === 0) {
      throw new Error("Received empty product data.");
    }

    return data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    showToast("Failed to load product details.", false);
    return null; // Return null to prevent crashes
  }
}

async function displayCartItems(products) {
  const cartItemsContainer = document.getElementById("cart-items");
  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = ""; // Clear existing content

    if (!products || products.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    for (const product of products) {
      const productDetails = await fetchProductDetails(product.productId);
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
                <img src="${productDetails.image}" alt="${productDetails.title}" onclick="viewSingleProductCart(${product.productId})">
                <h3>${productDetails.title}</h3>
                <p>Quantity: ${product.quantity}</p>
                <p>Price: $${productDetails.price}</p>
                <button onclick="removeFromCart(${product.productId})">Remove</button>
            `;
      cartItemsContainer.appendChild(cartItem);
    }
  }
}

async function viewSingleProductCart(productId) {
  try {
    currentProductId = productId;
    const product = await fetchProductDetails(productId);
    window.history.pushState({}, "", `?page=${2}&id=${productId}`);
    let bread_crumb = document.getElementById("bread-crumb");
    if (bread_crumb) {
      bread_crumb.innerHTML = `
    <a href="./index.html" class="crumb">🏠 Home</a>
    <a href="./cart.html" class="crumb">🛒 Cart</a> 
    <span class="crumb" style="background: black;">🛍️ ${product.title}</span>
  `;
    }

    document.getElementById("single-product-image").src = product.image;
    document.getElementById("single-product-title").textContent = product.title;
    document.getElementById(
      "single-product-category"
    ).textContent = `Category: ${product.category}`;
    document.getElementById("single-product-description").textContent =
      product.description;
    document.getElementById("single-product-price").textContent = product.price;

    document.querySelector(".cart").style.display = "none";
    document.getElementById("single-product-view").style.display = "block";
  } catch (error) {
    console.error("Error fetching single product details:", error);
    showToast("Failed to load product details.", false);
  }
}

function showCartItems() {
  let bread_crumb = document.getElementById("bread-crumb");
  if (bread_crumb) {
    bread_crumb.innerHTML = `
    <a href="./index.html" class="crumb">🏠 Home</a>
    <a href="./cart.html" class="crumb">🛒 Cart</a>
  `;
  }

  document.getElementById("single-product-view").style.display = "none";
  document.querySelector(".cart").style.display = "block";
}

function removeFromCart(productId) {
  if (localStorage.getItem("cart")) {
    array = JSON.parse(localStorage.getItem("cart")); // Load "to-do" tasks
  }
  let array1 = [];
  array.forEach((element) => {
    if (element == productId) {
    } else {
      array1.push(element);
    }
  });
  array = [];
  array = array1;
  localStorage.setItem("cart", JSON.stringify(array));
  showToast(`Product ${productId} removed from cart!`, true);
  fetchCartItems(); // Refresh cart UI
}
function removeFromCartSingleView() {
  let productId = currentProductId;
  if (localStorage.getItem("cart")) {
    array = JSON.parse(localStorage.getItem("cart")); // Load "to-do" tasks
  }
  let array1 = [];
  array.forEach((element) => {
    if (element == productId) {
    } else {
      array1.push(element);
    }
  });
  array = [];
  array = array1;
  localStorage.setItem("cart", JSON.stringify(array));
  showToast(`Product ${productId} removed from cart!`, true);
  fetchCartItems(); // Refresh cart UI
  showCartItems();
}
fetchCartItems();

currentProductId = null;

async function fetchCategories() {
  try {
    const response = await fetch(`${API_URL}/products/categories`);
    const categories = await response.json();
    displayCategories(categories);
    showToast("Categories loaded successfully!", true);
  } catch (error) {
    console.error("Error fetching categories:", error);
    showToast("Failed to load categories.", false);
  }
}

function capitalizeFirstLetter(str) {
  return str
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function displayCategories(categories) {
  const categoryGrid = document.getElementById("category-grid");
  if (categoryGrid) {
    categoryGrid.innerHTML = ""; // Clear existing content
    categories.forEach((category) => {
      const categoryElement = document.createElement("div");
      categoryElement.className = "category";

      // Add gradient background to each category
      categoryElement.style.background = `linear-gradient(to right, #ff7e5f, #feb47b)`;
      categoryElement.style.padding = "20px";
      categoryElement.style.borderRadius = "8px";
      categoryElement.style.color = "#fff";
      categoryElement.style.textAlign = "center";
      categoryElement.style.cursor = "pointer";

      categoryElement.textContent = category;
      categoryElement.textContent = capitalizeFirstLetter(category);

      categoryElement.addEventListener("click", () =>
        fetchProductsByCategory(category)
      );
      categoryGrid.appendChild(categoryElement);
    });
  }
}

async function fetchProductsByCategory(category) {
  try {
    document.getElementById("single-product-view").style.display = "none";
    const response = await fetch(`${API_URL}/products/category/${category}`);
    const products = await response.json();
    let bread_crumb = document.getElementById("bread-crumb");
    if (bread_crumb) {
      bread_crumb.innerHTML = `
    <a href="./index.html" class="crumb">🏠 Home</a>
    <a href="./category.html" class="crumb">📂 Categories</a>
    <span class="crumb" style="background: black;">📁 ${category}</span>
  `;
    }

    displayProducts(products, category);
    showToast(`Products for ${category} loaded successfully!`, true);
  } catch (error) {
    console.error("Error fetching products:", error);
    showToast("Failed to load products.", false);
  }
}

function displayProducts(products, category) {
  const productsSection = document.getElementById("products-section");
  const productGrid = document.getElementById("product-grid");
  const categoryTitle = document.getElementById("category-title");

  if (productsSection && productGrid && categoryTitle) {
    categoryTitle.textContent = `Products in ${category}`;
    productsSection.style.display = "block";

    productGrid.innerHTML = ""; // Clear existing content
    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.className = "product";
      productElement.innerHTML = `
                <img src="${product.image}" alt="${product.title}" onclick="viewSingleProductCategory(${product.id})">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
      productGrid.appendChild(productElement);
    });
  }
}

let currentCategory;
async function viewSingleProductCategory(productId) {
  try {
    currentProductId = productId;
    const response = await fetch(`${API_URL}/products/${productId}`);
    const product = await response.json();
    currentCategory = product.category;
    window.history.pushState({}, "", `?page=${3}&id=${productId}`);
    let bread_crumb = document.getElementById("bread-crumb");
    if (bread_crumb) {
      bread_crumb.innerHTML = `
    <a href="./index.html" class="crumb">🏠 Home</a>
    <a href="./category.html" class="crumb">📂 Categories</a>
    <a onclick="showProductGridCategories()" class="crumb">📁 ${product.category}</a>
    <span class="crumb" style="background: black;">🛍️ ${product.title}</span>
  `;
    }

    document.getElementById("single-product-image").src = product.image;
    document.getElementById("single-product-title").textContent = product.title;
    document.getElementById(
      "single-product-category"
    ).textContent = `Category: ${product.category}`;
    document.getElementById("single-product-description").textContent =
      product.description;
    document.getElementById("single-product-price").textContent = product.price;

    document.querySelector(".products").style.display = "none";
    document.getElementById("single-product-view").style.display = "block";
  } catch (error) {
    console.error("Error fetching single product details:", error);
    showToast("Failed to load product details.", false);
  }
}

function showProductGridCategories() {
  let bread_crumb = document.getElementById("bread-crumb");
  if (bread_crumb) {
    bread_crumb.innerHTML = `
    <a href="./index.html" class="crumb">🏠 Home</a>
    <a href="./category.html" class="crumb">📂 Categories</a>
    <span class="crumb" style="background: black;">📁 ${currentCategory}</span>
  `;
  }

  document.getElementById("single-product-view").style.display = "none";
  document.querySelector(".products").style.display = "block";
}

fetchCategories();

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showToast("Login successful!", true);
        console.log("Token:", data.token);
      } else {
        showToast("Invalid username or password", false);
      }
    } catch (error) {
      console.error("Error during login:", error);
      showToast("An error occurred. Please try again later.", false);
    }
  });
}
