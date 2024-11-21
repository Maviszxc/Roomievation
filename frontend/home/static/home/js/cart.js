// Function to get JWT token from localStorage
function getToken() {
  return localStorage.getItem("token");
}

// Function to format price
function formatPrice(price) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(price);
}

// Function to load cart items
async function loadCartItems() {
  try {
    const token = getToken();
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const response = await fetch("http://localhost:4000/api/v1/cart/items", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cart items");
    }

    const cartItems = await response.json();
    displayCartItems(cartItems);
  } catch (error) {
    console.error("Error loading cart items:", error);
    // showError("Failed to load cart items");
  }
}

// Function to display cart items
function displayCartItems(items) {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartSummaryContainer = document.getElementById("cart-summary");

  const staticUrl = document.body.getAttribute("data-static-url");

  if (items.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
          <i class="fas fa-shopping-cart" style="font-size: 48px; color: #ddd; margin-bottom: 20px;"></i>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
      </div>
    `;
    cartSummaryContainer.style.display = "none";
    return;
  }

  let totalAmount = 0;
  cartItemsContainer.innerHTML = items
    .map((item) => {
      const price = parseFloat(item.price) || 0;
      totalAmount += price;
      const mainImage = new Image();
      mainImage.src = `${staticUrl}${item.image}`;
      mainImage.alt = item.name;
      mainImage.className = "cart-item-image";

      return `
        <div class="cart-item" data-id="${item._id}">
            ${mainImage.outerHTML}
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-description">${item.description}</div>
                <div class="item-type">Type: ${item.type}</div>
                <div class="item-price">${formatPrice(price)}</div>
            </div>
            <button class="remove-btn" onclick="removeFromCart('${item._id}')">
                <i class="fas fa-trash"></i> Remove
            </button>
        </div>
      `;
    })
    .join("");

  cartSummaryContainer.style.display = "block";
  cartSummaryContainer.innerHTML = `
    <h3>Order Summary</h3>
    <div style="display: flex; justify-content: space-between; margin: 10px 0;">
        <span>Total</span>
        <span>${formatPrice(totalAmount)}</span>
    </div>
    <button class="checkout-btn" onclick="proceedToCheckout()">
        Proceed to Checkout
    </button>
  `;
}

// Function to remove item from cart
async function removeFromCart(itemId) {
  try {
    const token = getToken();
    const response = await fetch(
      `http://localhost:4000/api/v1/cart/remove/${itemId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to remove item");
    }

    loadCartItems();
  } catch (error) {
    console.error("Error removing item:", error);
    showError("Failed to remove item from cart");
  }
}

// Function to proceed to checkout
function proceedToCheckout() {
  alert("Proceeding to checkout...");
}

// Function to show error message
function showError(message) {
  alert(message);
}

// Load cart items when page loads
document.addEventListener("DOMContentLoaded", loadCartItems);
