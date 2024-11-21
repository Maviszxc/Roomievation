const multer = require("multer");
const path = require("path");
const Order = require("../models/orderSchema");

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/payments");
  },
  filename: function (req, file, cb) {
    cb(null, "payment-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image! Please upload an image file."), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
}).single("paymentProof");

const createOrder = async (req, res) => {
  try {
    if (req.body.paymentMethod === "GCash") {
      upload(req, res, async function (err) {
        if (err) {
          return res.status(400).json({ message: err.message });
        }
        if (!req.file) {
          return res
            .status(400)
            .json({ message: "Please upload proof of payment for GCash" });
        }
        await createOrderWithPayment(req, res);
      });
    } else {
      await createOrderWithPayment(req, res);
    }
  } catch (error) {
    console.error("Order creation error:", error);
    res
      .status(500)
      .json({ message: error.message || "Failed to create order" });
  }
};

const createOrderWithPayment = async (req, res) => {
  try {
    const { orderedFurniture, fullAddress, totalAmount, paymentMethod } =
      req.body;
    const userID = req.user.userId;

    if (!fullAddress || !paymentMethod) {
      return res.status(400).json({
        message:
          "Missing required fields: address and payment method are required",
      });
    }

    // Parse orderedFurniture if it's a string
    const parsedFurniture =
      typeof orderedFurniture === "string"
        ? JSON.parse(orderedFurniture)
        : orderedFurniture;

    // Ensure totalAmount is a valid number
    const parsedTotalAmount = Number(totalAmount);
    if (isNaN(parsedTotalAmount)) {
      return res.status(400).json({ message: "Invalid total amount" });
    }

    const order = new Order({
      userID,
      orderedFurniture: parsedFurniture,
      fullAddress,
      totalAmount: parsedTotalAmount,
      paymentMethod,
      paymentProof: req.file
        ? `/uploads/payments/${req.file.filename}`
        : undefined,
      paymentStatus: paymentMethod === "GCash" ? "Paid" : "Not Yet Paid",
      status: "Pending",
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error("Order creation error:", error);
    res
      .status(500)
      .json({ message: error.message || "Failed to create order" });
  }
};

// Get all orders for a user
const getUserOrders = async (req, res) => {
  try {
    const userID = req.user.id;
    const orders = await Order.find({ userID })
      .populate("orderedFurniture.furnitureID")
      .sort({ dateOrdered: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "orderedFurniture.furnitureID"
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    if (status === "Delivered") {
      order.dateDelivered = new Date();
    }

    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
};
