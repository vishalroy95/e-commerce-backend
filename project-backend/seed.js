// backend/seeds/seedProducts.js
const mongoose = require("mongoose");
const Product = require("./models/productModel"); // ✅ Adjust path if needed
const dotenv = require("dotenv");
dotenv.config();

const seedProducts = [
  {
    title: "Flat 40% Off on Skincare",
    price: "999",
    image: "/assets/deals/skincare.jpg",
    category: "Hair",
    categorySlug: "hair",
    subcategory: "Hair Oil",
    subCategorySlug: "hair-oil",
    inStock: true,
    isFeatured: true,
  },
  {
    title: "Lipsticks",
    price: "199",
    image: "/assets/deals/lipstick.jpg",
    category: "Makeup",
    categorySlug: "makeup",
    subcategory: "Lipstick",
    subCategorySlug: "lipstick",
    inStock: true,
    isFeatured: true,
  },
  {
    title: "Shampoo",
    price: "499",
    image: "/assets/deals/haircare.jpg",
    category: "Hair",
    categorySlug: "hair",
    subcategory: "Shampoo",
    subCategorySlug: "shampoo",
    inStock: true,
    isFeatured: true,
  },
  {
    title: "Perfume",
    price: "299",
    image: "/assets/deals/fragrance.jpg",
    category: "Fragnance",
    categorySlug: "fragrance",
    subcategory: "perfume",
    subCategorySlug: "perfume",
    inStock: true,
    isFeatured: true,
  },
  {
    title: "Hair Dryer",
    price: "999",
    image: "/assets/deals/hairdryer.jpg",
    category: "Tools & Brushes",
    categorySlug: "tools & brushes",
    subcategory: "Hair Dryer",
    subCategorySlug: "hair-dryer",
    inStock: true,
    isFeatured: true,
  },
  {
    title: "Body Wash",
    price: "199",
    image: "/assets/deals/bodywash.jpg",
    category: "Bath & Body",
    categorySlug: "bath & body",
    subcategory: "Body Wash",
    subCategorySlug: "body-wash",
    inStock: true,
    isFeatured: true,
  },
  {
    title: "Body Mist",
    price: "299",
    image: "/assets/deals/mist.jpg",
    category: "Fragrance",
    categorySlug: "fragrance",
    subcategory: "Body Mist",
    subCategorySlug: "body-mist",
    inStock: true,
    isFeatured: true,
  },
  {
    title: "Conditioner",
    price: "299",
    image: "/assets/deals/conditioner.jpg",
    category: "Hair",
    categorySlug: "hair",
    subcategory: "Conditioner",
    subCategorySlug: "conditioner",
    inStock: true,
    isFeatured: true,
  },
  {
    title: "Foundation",
    price: "299",
    image: "/assets/deals/foundation.jpg",
    category: "Makeup",
    categorySlug: "makeup",
    subcategory: "Foundation",
    subCategorySlug: "foundation",
    inStock: true,
    isFeatured: true,
  },
  {
    title: "Blush",
    price: "299",
    image: "/assets/deals/blush.jpg",
    category: "Makeup",
    categorySlug: "makeup",
    subcategory: "Blush",
    subCategorySlug: "blush",
    inStock: true,
    isFeatured: true,
  },
  {
    title: "Hair Oil",
    price: "299",
    image: "/assets/deals/hairoil.jpg",
    category: "Hair",
    categorySlug: "hair",
    subcategory: "Hair Oil",
    subCategorySlug: "hair-oil",
    inStock: true,
    isFeatured: true,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Product.deleteMany(); 
    await Product.insertMany(seedProducts);

    console.log("✅ Seed data inserted successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
};

seedDB();
