const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const addToCartController = require("../controllers/addToCartController");

router.post("/add", auth, addToCartController.addToCart);
router.get("/items", auth, addToCartController.getCartItems);
router.delete("/remove/:itemId", auth, addToCartController.removeFromCart);
router.patch(
  "/update-quantity/:itemId",
  auth,
  addToCartController.updateQuantity
);

module.exports = router;
