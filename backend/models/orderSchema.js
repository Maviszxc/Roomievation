const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderedFurniture: [
    {
      furnitureID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Furniture",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  fullAddress: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["GCash", "Cash on Delivery"],
  },
  paymentProof: {
    type: String,
    required: function () {
      return this.paymentMethod === "GCash";
    },
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ["Paid", "Not Yet Paid"],
  },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
  dateDelivered: {
    type: Date,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
