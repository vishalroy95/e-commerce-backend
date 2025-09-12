const Wishlist = require("../models/wishlist");

//  Add to Wishlist (only for logged-in users)
exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id; // authMiddleware se aata hai

    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId, items: [] });
    }

    // Agar already hai to dobara add mat karna
    const exists = wishlist.items.some(
      (item) => item.productId.toString() === productId
    );
    if (!exists) {
      wishlist.items.push({ productId });
    }

    await wishlist.save();

    //  populate karke return karo
    await wishlist.populate("items.productId");

    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Remove from Wishlist (only for logged-in users)
exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    wishlist.items = wishlist.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await wishlist.save();

    //  populate karke return karo
    await wishlist.populate("items.productId");

    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Wishlist (only for logged-in users)
exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const wishlist = await Wishlist.findOne({ userId }).populate("items.productId");

    res.json(wishlist || { items: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
