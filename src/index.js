let allProducts = [];
let cart = []; 

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://json-server-3-5fa8.onrender.com/products")
    .then(res => res.json())
    .then(products => {
      allProducts = products;
      renderAllProducts(allProducts);
    })
    .catch(err => console.error("Failed to load products:", err));
});

function renderAllProducts(productArray) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  productArray.forEach(renderProduct);
}

function renderProduct(product) {
  const productList = document.getElementById("product-list");

  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <h3>${product.name}</h3>
    <p>Category: ${product.category}</p>
    <p>Price: Ksh ${product.price}</p>
    <button class="like-btn">❤️ <span>${product.likes}</span></button>
    <button class="add-to-cart-btn">🛒 Add to Cart</button>
    <button class="delete-btn">Delete</button>
  `;

  // Add to cart functionality
  card.querySelector(".add-to-cart-btn").addEventListener("click", () => {
    addToCart(product);
  });

  // Like functionality
  const likeBtn = card.querySelector(".like-btn");
  const likeCount = likeBtn.querySelector("span");
  likeBtn.dataset.liked = "false";

  likeBtn.addEventListener("click", () => {
    const isLiked = likeBtn.dataset.liked === "true";
    const newLikes = isLiked ? product.likes - 1 : product.likes + 1;

    fetch("https://json-server-3-5fa8.onrender.com/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: newLikes })
    })
      .then(res => res.json())
      .then(updatedProduct => {
        product.likes = updatedProduct.likes;
        likeCount.textContent = updatedProduct.likes;
        likeBtn.dataset.liked = isLiked ? "false" : "true";
      });
  });

// Delete functionality
const deleteBtn = card.querySelector(".delete-btn");
deleteBtn.addEventListener("click", () => {
  fetch("https://json-server-3-5fa8.onrender.com/products", {
    method: "DELETE"
  })
  .then(() => {
    card.remove();
  });
});

  productList.appendChild(card);
}

// 🛒 Add to Cart
function addToCart(product) {
  cart.push(product);
  renderCart();
}

// 🧺 Render Cart
function renderCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      {item.name} - Ksh ${item.price}
      <button class="cart-remove-btn">Remove</button>
    `;
    li.querySelector(".cart-remove-btn").addEventListener("click", () => {
      removeFromCart(index);
    });
    cartList.appendChild(li);
  });
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

// 🔁 Product form submission
const form = document.getElementById("product-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("product-name").value;
  const price = document.getElementById("product-price").value;
  const category = document.getElementById("category").value;
  const image = document.getElementById("product-image").value;

  const newProduct = {
    name,
    price,
    category,
    image,
    likes: 0
  };

 fetch("https://json-server-3-5fa8.onrender.com/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct)
  })
    .then(res => res.json())
    .then(addedProduct => {
      renderProduct(addedProduct);
      form.reset();
    });
});

// 🔍 Filter by Category
const categoryFilter = document.getElementById("category-filter");

categoryFilter.addEventListener("change", (e) => {
  const selected = e.target.value;

  if (selected === "All") {
    renderAllProducts(allProducts);
  } else {
    const filtered = allProducts.filter(product => product.category === selected);
    renderAllProducts(filtered);
  }
});
