// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     image: { type: String }, 
//     price: { type: Number, required: true },
//     category: { type: String, required: true },
//     categorySlug: { type: String, required: false },
//     subcategory: { type: String, required: false },
//     subCategorySlug: { type: String, required: false },
//     inStock: { type: Boolean, default: true },
//     isFeatured: { type: Boolean, default: false },
//   },
//   { timestamps: true }
//   collection: "products" //  YE LINE FIX HAI
// );

// module.exports = mongoose.model("Product", productSchema);




// updated



const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    categorySlug: { type: String },
    subcategory: { type: String },
    subCategorySlug: { type: String },
    inStock: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: "products", // YAHAN SAHI HAI
  }
);

module.exports = mongoose.model("Product", productSchema);
