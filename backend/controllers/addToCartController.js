const multer = require("multer");
const path = require("path");
const Cart = require("../models/addToCartSchema");

const addToCart = async (req, res) => {
  try {
    const {
      name,
      description,
      type,
      theme,
      colorscheme,
      image,
      price,
      quantity = 1,
    } = req.body;
    const userID = req.user.userId;

    const newCartItem = new Cart({
      userID,
      name,
      description,
      type,
      theme,
      colorscheme,
      image,
      price,
      quantity,
    });

    await newCartItem.save();
    res.status(201).json({
      message: "Item added to cart successfully",
      cartItem: newCartItem,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Failed to add item to cart" });
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const userID = req.user.userId;

    const updatedItem = await Cart.findOneAndUpdate(
      { _id: itemId, userID },
      { quantity: Math.max(1, quantity) },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Error updating quantity:", error);
    res.status(500).json({ message: "Failed to update quantity" });
  }
};


// Get cart items for a user
const getCartItems = async (req, res) => {
  try {
    const userID = req.user.userId;
    const cartItems = await Cart.find({ userID });
    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Failed to fetch cart items" });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    const userID = req.user.userId;

    const deletedItem = await Cart.findOneAndDelete({
      _id: itemId,
      userID
    });

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    res.status(200).json({ message: "Item removed from cart successfully" });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Failed to remove item from cart" });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  removeFromCart,
  updateQuantity,
};