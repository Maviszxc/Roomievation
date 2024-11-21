const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addToCartSchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: [true, "Name is needed"],
  },
  description: {
    type: String,
    required: [true, "Description is needed"],
  },
  type: {
    type: String,
    required: [true, "Type is needed"],
  },
  theme: {
    type: [String],
    required: [true, "Theme is needed"],
  },
  colorscheme: {
    type: [String],
    required: [true, "Color scheme is needed"],
  },
  price: {
    type: Number,
    required: [true, "Price is needed"],
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: 1,
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
});

const Cart = mongoose.model("Cart", addToCartSchema);
module.exports = Cart;
