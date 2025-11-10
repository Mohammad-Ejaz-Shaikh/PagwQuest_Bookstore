// ------------------------------
// 🌿 PageQuest Bookstore JS Logic
// ------------------------------

// Get existing cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to add item to cart
function addToCart(title, price, img) {
  const item = { title, price, img };
  const found = cart.find((book) => book.title === title);

  if (found) {
    alert("✅ This book is already in your cart!");
  } else {
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`📗 "${title}" added to your cart!`);
  }
}

// Function to display cart on cart.html
function displayCart() {
  const cartContainer = document.getElementById("cart-items");
  const totalPriceEl = document.getElementById("total-price");

  if (!cartContainer) return;

  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty 🌿</p>";
  } else {
    cart.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("cart-item");

      div.innerHTML = `
        <img src="${item.img}" alt="${item.title}">
        <div class="cart-info">
          <h4>${item.title}</h4>
          <p>₹${item.price}</p>
          <button onclick="removeFromCart(${index})">Remove</button>
        </div>
      `;

      cartContainer.appendChild(div);
      total += parseFloat(item.price);
    });
  }

  totalPriceEl.textContent = `₹${total.toFixed(2)}`;
}

// Function to remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Clear all cart items
function clearCart() {
  localStorage.removeItem("cart");
  cart = [];
  displayCart();
}

// Checkout - clear and redirect
function checkout() {
  if (cart.length === 0) {
    alert("🛒 Your cart is empty!");
    return;
  }

  localStorage.removeItem("cart");
  window.location.href = "checkout.html";
}

// Run displayCart() automatically on cart page
if (window.location.pathname.includes("cart.html")) {
  displayCart();
}
