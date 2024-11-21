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

// Function to format date
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Function to get status badge class
function getStatusBadgeClass(status) {
  const statusClasses = {
    Pending: "status-pending",
    Processing: "status-processing",
    Shipped: "status-shipped",
    Delivered: "status-delivered",
    Cancelled: "status-cancelled",
  };
  return statusClasses[status] || "";
}

// Function to load orders
async function loadOrders() {
  try {
    const token = getToken();
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const response = await fetch(
      "http://localhost:4000/api/v1/orders/user-orders",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    const orders = await response.json();
    displayOrders(orders);
  } catch (error) {
    console.error("Error loading orders:", error);
  }
}

// Function to display orders
function displayOrders(orders) {
  const ordersContainer = document.getElementById("orders-list");
  const staticUrl = document.body.getAttribute("data-static-url");

  if (orders.length === 0) {
    ordersContainer.innerHTML = `
      <div class="empty-orders">
        <i class="fas fa-box-open"></i>
        <h2>No Orders Yet</h2>
        <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
      </div>
    `;
    return;
  }

  ordersContainer.innerHTML = orders
    .map((order) => {
      const orderItems = order.orderedFurniture
        .map(
          (item) => `
          <div class="order-item">
            <img src="${staticUrl}${item.furnitureID.image}" alt="${
            item.furnitureID.name
          }">
            <div class="item-details">
              <h4>${item.furnitureID.name}</h4>
              <p>Quantity: ${item.quantity}</p>
              <p>Price: ${formatPrice(item.price)}</p>
            </div>
          </div>
        `
        )
        .join("");

      return `
        <div class="order-card">
          <div class="order-header">
            <div>
              <h3>Order #${order._id}</h3>
              <p>Ordered on ${formatDate(order.dateOrdered)}</p>
            </div>
            <span class="status-badge ${getStatusBadgeClass(order.status)}">
              ${order.status}
            </span>
          </div>
          
          <div class="order-items">
            ${orderItems}
          </div>
          
          <div class="order-summary">
            <p><strong>Delivery Address:</strong> ${order.fullAddress}</p>
            <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
            <p><strong>Payment Status:</strong> ${order.paymentStatus}</p>
            <p><strong>Total Amount:</strong> ${formatPrice(
              order.totalAmount
            )}</p>
            ${
              order.dateDelivered
                ? `<p><strong>Delivered on:</strong> ${formatDate(
                    order.dateDelivered
                  )}</p>`
                : ""
            }
          </div>
        </div>
      `;
    })
    .join("");
}

// Load orders when page loads
document.addEventListener("DOMContentLoaded", loadOrders);
