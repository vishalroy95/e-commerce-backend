// backend/controllers/cartController.js
const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Product = require("../models/productModel");

// -------------------- ADD TO CART --------------------
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user?.id; 

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Login required" });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    //  product check
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    //  cart check
    let cart = await Cart.findOne({ userId: userObjectId });
    if (!cart) cart = new Cart({ userId: userObjectId, items: [] });


    const itemIndex = cart.items.findIndex(i => i.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    const populatedCart = await cart.populate("items.productId");
    res.json({ cart: populatedCart });
  } catch (error) {
    console.error("❌ addToCart error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// -------------------- UPDATE QUANTITY (increase/decrease) --------------------
exports.updateQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Login required" });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    let cart = await Cart.findOne({ userId: userObjectId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(i => i.productId.toString() === productId);
    if (itemIndex === -1) return res.status(404).json({ message: "Product not in cart" });

    //  increase/decrease
    cart.items[itemIndex].quantity = quantity;

    
    if (cart.items[itemIndex].quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();
    const populatedCart = await cart.populate("items.productId");
    res.json({ cart: populatedCart });
  } catch (error) {
    console.error("❌ updateQuantity error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// -------------------- REMOVE FROM CART --------------------
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Login required" });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    let cart = await Cart.findOne({ userId: userObjectId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(i => i.productId.toString() !== productId);

    await cart.save();
    const populatedCart = await cart.populate("items.productId");
    res.json({ cart: populatedCart });
  } catch (error) {
    console.error("❌ removeFromCart error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// -------------------- GET CART --------------------
exports.getCart = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Login required" });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    let cart = await Cart.findOne({ userId: userObjectId }).populate("items.productId");
    if (!cart) cart = { items: [] };

    res.json({ cart });
  } catch (error) {
    console.error("❌ getCart error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// -------------------- CLEAR CART --------------------
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Login required" });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    let cart = await Cart.findOne({ userId: userObjectId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = []; 
    await cart.save();

    res.json({ message: "Cart cleared successfully", cart });
  } catch (error) {
    console.error("❌ clearCart error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
