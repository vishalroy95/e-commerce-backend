const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");

// @route GET /api/products
// @desc Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
});

module.exports = router;
