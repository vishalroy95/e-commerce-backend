const express = require("express");
const router = express.Router();
const { addToWishlist, removeFromWishlist, getWishlist } = require("../controllers/wishlistController");
const authMiddleware = require("../middleware/authMiddleware");

//  sirf logged-in user ke liye routes
router.get("/", authMiddleware, getWishlist);
router.post("/", authMiddleware, addToWishlist);
router.delete("/:productId", authMiddleware, removeFromWishlist);

module.exports = router;

