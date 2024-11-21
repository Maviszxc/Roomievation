const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const orderController = require("../controllers/orderController");

// Create a new order
router.post("/create", auth, orderController.createOrder);

// Get all orders for a user
router.get("/user-orders", auth, orderController.getUserOrders);

// Get specific order by ID
router.get("/:id", auth, orderController.getOrderById);

// Update order status
router.patch("/:id/status", auth, orderController.updateOrderStatus);

module.exports = router;