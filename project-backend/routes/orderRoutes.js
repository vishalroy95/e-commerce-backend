// routes/orderRoutes.js
const express = require("express");
const auth = require("../middleware/authMiddleware");
const { placeOrder, getOrders } = require("../controllers/orderController");

const router = express.Router();

router.post("/", auth, placeOrder);
router.get("/", auth, getOrders);

module.exports = router;
