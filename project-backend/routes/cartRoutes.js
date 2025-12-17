// backend/routes/cartRoutes.js
const express = require("express");
const {
  addToCart,
  updateQuantity,
  removeFromCart,
  getCart,
  clearCart,
} = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware"); 

const router = express.Router();

//  Add product to cart
 router.post("/add", authMiddleware, addToCart);



//  Update quantity
router.post("/update", authMiddleware, updateQuantity);

//  Remove product from cart
router.post("/remove", authMiddleware, removeFromCart);

//  Get cart for a user (optional: userId param hata de agar req.user.id use karna hai)
router.get("/", authMiddleware, getCart);

//  Clear cart after order placed
router.post("/clear", authMiddleware, clearCart);   


module.exports = router;

