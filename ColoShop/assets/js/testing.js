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

async function viewSingleProduct(productId) {
  try {
    let bread_crumb = document.getElementById("bread-crumb");
    if (bread_crumb) {
      bread_crumb.style.display = "block";

      bread_crumb.textContent = `Home > Product ${productId}`;
    }
    currentProductId = productId;
    const response = await fetch(`${API_URL}/products/${productId}`);
    const product = await response.json();

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
  showToast(`Product ${productId} added to cart!`, true);
}

function addToCartSingleProduct() {
  if (currentProductId) {
    showToast(`Product ${currentProductId} added to cart!`, true);
  }
}

fetchProducts();
currentProductId = null;

async function fetchCartItems() {
  try {
    const response = await fetch(`${API_URL}/carts/1`); // Replace with dynamic cart ID if needed
    const cart = await response.json();
    const products = cart.products;
    displayCartItems(products);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    showToast("Failed to load cart items.", false);
  }
}

async function fetchProductDetails(productId) {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching product details:", error);
    showToast("Failed to load product details.", false);
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
    let bread_crumb = document.getElementById("bread-crumb");
    if (bread_crumb) {
      bread_crumb.textContent = `Home > Cart > Product ${productId}`;
    }
    currentProductId = productId;
    const product = await fetchProductDetails(productId);

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
    bread_crumb.textContent = `Home > Cart`;
  }
  document.getElementById("single-product-view").style.display = "none";
  document.querySelector(".cart").style.display = "block";
}

function removeFromCart(productId) {
  showToast(`Product ${productId} removed from cart!`, true);
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
      categoryElement.addEventListener("click", () =>
        fetchProductsByCategory(category)
      );
      categoryGrid.appendChild(categoryElement);
    });
  }
}

async function fetchProductsByCategory(category) {
  try {
    const response = await fetch(`${API_URL}/products/category/${category}`);
    const products = await response.json();
    let bread_crumb = document.getElementById("bread-crumb");
    if (bread_crumb) {
      bread_crumb.textContent = `Home > Categories > ${category}`;
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
    categoryTitle.textContent = `Products in ${category.replace(
      /\b\w/g,
      (char) => char.toUpperCase()
    )}`;
    productsSection.style.display = "block";

    productGrid.innerHTML = ""; // Clear existing content
    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.className = "product";
      productElement.innerHTML = `
                <img src="${product.image}" alt="${product.title}" onclick="viewSingleProductCategory(&quot;${product.category}&quot;, ${product.id})">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
      productGrid.appendChild(productElement);
    });
  }
}

async function viewSingleProductCategory(category, productId) {
  try {
    let bread_crumb = document.getElementById("bread-crumb");
    if (bread_crumb) {
      bread_crumb.textContent = `Home > Categries > ${category} > Product ${productId}`;
    }
    currentProductId = productId;
    const response = await fetch(`${API_URL}/products/${productId}`);
    const product = await response.json();

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
