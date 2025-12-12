// controllers/orderController.js
const Order = require("../models/Order");

const placeOrder = async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod } = req.body;

    const newOrder = new Order({
      user: req.user.id,
      items,
      totalAmount,
      paymentMethod,
    });

     

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("❌ Order Place Error:", error.message);
    res.status(500).json({ message: "Failed to place order" });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.productId") 
      .populate("user", "name email");

    res.json(orders);
  } catch (error) {
    console.error("❌ Get Orders Error:", error.message);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

module.exports = { placeOrder, getOrders };









