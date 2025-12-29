// // backend/controllers/cartController.js
// const mongoose = require("mongoose");
// const Cart = require("../models/Cart");
// const Product = require("../models/productModel");

// // -------------------- ADD TO CART --------------------
// exports.addToCart = async (req, res) => {
//   try {
//     const { productId, quantity = 1 } = req.body;
//     const userId = req.user?.id; 

//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized: Login required" });
//     }

//     const userObjectId = new mongoose.Types.ObjectId(userId);

//     //  product check
//     const product = await Product.findById(productId);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     //  cart check
//     let cart = await Cart.findOne({ userId: userObjectId });
//     if (!cart) cart = new Cart({ userId: userObjectId, items: [] });


//     const itemIndex = cart.items.findIndex(i => i.productId.toString() === productId);
//     if (itemIndex > -1) {
//       cart.items[itemIndex].quantity += quantity;
//     } else {
//       cart.items.push({ productId, quantity });
//     }

//     await cart.save();
//     const populatedCart = await cart.populate("items.productId");
//     res.json({ cart: populatedCart });
//   } catch (error) {
//     console.error("❌ addToCart error:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // -------------------- UPDATE QUANTITY (increase/decrease) --------------------
// exports.updateQuantity = async (req, res) => {
//   try {
//     const { productId, quantity } = req.body;
//     const userId = req.user?.id;

//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized: Login required" });
//     }

//     const userObjectId = new mongoose.Types.ObjectId(userId);

//     let cart = await Cart.findOne({ userId: userObjectId });
//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     const itemIndex = cart.items.findIndex(i => i.productId.toString() === productId);
//     if (itemIndex === -1) return res.status(404).json({ message: "Product not in cart" });

//     //  increase/decrease
//     cart.items[itemIndex].quantity = quantity;

    
//     if (cart.items[itemIndex].quantity <= 0) {
//       cart.items.splice(itemIndex, 1);
//     }

//     await cart.save();
//     const populatedCart = await cart.populate("items.productId");
//     res.json({ cart: populatedCart });
//   } catch (error) {
//     console.error("❌ updateQuantity error:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // -------------------- REMOVE FROM CART --------------------
// exports.removeFromCart = async (req, res) => {
//   try {
//     const { productId } = req.body;
//     const userId = req.user?.id;

//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized: Login required" });
//     }

//     const userObjectId = new mongoose.Types.ObjectId(userId);

//     let cart = await Cart.findOne({ userId: userObjectId });
//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     cart.items = cart.items.filter(i => i.productId.toString() !== productId);

//     await cart.save();
//     const populatedCart = await cart.populate("items.productId");
//     res.json({ cart: populatedCart });
//   } catch (error) {
//     console.error("❌ removeFromCart error:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // -------------------- GET CART --------------------
// exports.getCart = async (req, res) => {
//   try {
//     const userId = req.user?.id;

//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized: Login required" });
//     }

//     const userObjectId = new mongoose.Types.ObjectId(userId);

//     let cart = await Cart.findOne({ userId: userObjectId }).populate("items.productId");
//     if (!cart) cart = { items: [] };

//     res.json({ cart });
//   } catch (error) {
//     console.error("❌ getCart error:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // -------------------- CLEAR CART --------------------
// exports.clearCart = async (req, res) => {
//   try {
//     const userId = req.user?.id;

//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized: Login required" });
//     }

//     const userObjectId = new mongoose.Types.ObjectId(userId);

//     let cart = await Cart.findOne({ userId: userObjectId });
//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     cart.items = []; 
//     await cart.save();

//     res.json({ message: "Cart cleared successfully", cart });
//   } catch (error) {
//     console.error("❌ clearCart error:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };




// updated controller





const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Product = require("../models/productModel");


// helper: safely get userId
const getUserId = (req) => req.user?.id || req.user?._id;

// -------------------- ADD TO CART --------------------
// exports.addToCart = async (req, res) => {
//   try {
//     const { productId, quantity = 1 } = req.body;
//     const userId = getUserId(req);

//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
//       return res.status(400).json({ message: "Invalid productId" });
//     }

//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     let cart = await Cart.findOne({ userId });
//     if (!cart) {
//       cart = new Cart({ userId, items: [] });
//     }

//     const index = cart.items.findIndex(
//       (item) => item.productId.toString() === productId.toString()
//     );

//     if (index >= 0) {
//       cart.items[index].quantity += Number(quantity);
//     } else {
//       cart.items.push({
//         productId,
//         quantity: Number(quantity),
//       });
//     }

//     await cart.save();
//     cart = await cart.populate("items.productId");

//     res.status(200).json({ cart });
//   } catch (error) {
//     console.error("❌ addToCart error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

 // updated add to cart

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const index = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (index >= 0) {
      cart.items[index].quantity += Number(quantity);
    } else {
      cart.items.push({ productId, quantity: Number(quantity) });
    }

    await cart.save();
    await cart.populate("items.productId");

    res.status(200).json({ cart });
  } catch (error) {
    console.error("❌ addToCart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// -------------------- GET CART --------------------
exports.getCart = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let cart = await Cart.findOne({ userId }).populate("items.productId");

    res.status(200).json({ cart: cart || { items: [] } });
  } catch (error) {
    console.error("❌ getCart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------- UPDATE QUANTITY --------------------
exports.updateQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const index = cart.items.findIndex(
      (i) => i.productId.toString() === productId.toString()
    );

    if (index === -1) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    if (quantity <= 0) {
      cart.items.splice(index, 1);
    } else {
      cart.items[index].quantity = Number(quantity);
    }

    await cart.save();
    cart = await cart.populate("items.productId");

    res.json({ cart });
  } catch (error) {
    console.error("❌ updateQuantity error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------- REMOVE FROM CART --------------------
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (i) => i.productId.toString() !== productId.toString()
    );

    await cart.save();
    cart = await cart.populate("items.productId");

    res.json({ cart });
  } catch (error) {
    console.error("❌ removeFromCart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------- CLEAR CART --------------------
exports.clearCart = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await Cart.findOneAndUpdate({ userId }, { items: [] });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    console.error("❌ clearCart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
