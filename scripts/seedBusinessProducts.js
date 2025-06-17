const mongoose = require("mongoose");
require('dotenv').config();
const BusinessProduct = require("../models/VendorProductCollectionSchema");
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("MONGO_URI is not defined in environment variables");
  process.exit(1);
}

mongoose.connect(mongoURI)
.then(() => {
  console.log("MongoDB connected successfully");
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

mongoose.connection.once("open", async () => {
  console.log("MongoDB connected.");

  // Clear old data if needed (optional)
  await BusinessProduct.deleteMany({}); // Comment this out if you want to keep old data

//   const vendorUserId = new mongoose.Types.ObjectId(); // Replace with real user ID if needed
//   const vendorCardId = new mongoose.Types.ObjectId(); // Replace with real card ID if needed

  const dummyProducts = [
    {
      productName: "Tandoori Paneer Pizza",
      description: "Delicious paneer pizza with smoky tandoori flavor.",
      VenderUserId: vendorUserId,
      VenderCardId: vendorCardId,
      Price: 299.99,
      SalePrice: 249.99,
      SavePrice: 50.0,
      discountPercent: 16.67,
      collections: ["pizza", "veg", "tandoori"],
      hasVariants: true,
      variantDetails: {
        options: [{ name: "Size", values: ["Regular", "Medium", "Large"] }],
        variants: [
          { optionValues: ["Regular"], Price: 249.99 },
          { optionValues: ["Medium"], Price: 199.99 },
          { optionValues: ["Large"], Price: 349.99 },
        ],
      },
      images: [
        "https://cdn.example.com/images/pizza-tandoori-regular.png",
        "https://cdn.example.com/images/pizza-tandoori-large.png",
      ],
      productTags: ["paneer", "tandoori", "veg pizza"],
    },
    {
      productName: "Himalayan Organic Honey 500g",
      description:
        "Pure, raw, and unprocessed honey directly sourced from Himalayan beekeepers.",
      VenderUserId: vendorUserId,
      VenderCardId: vendorCardId,
      Price: 500,
      SalePrice: 450,
      SavePrice: 50,
      discountPercent: 10.0,
      stockQuantity: 200,
      categories: { type: "grocery", organic: true },
      brand: { name: "Himalaya Naturals" },
      images: [
        "https://cdn.example.com/images/honey-500g-front.jpg",
        "https://cdn.example.com/images/honey-500g-back.jpg",
      ],
      hasVariants: false,
      isCustomizable: false,
      isCoinApplicable: true,
      productTags: ["honey", "organic", "natural"],
      productSEOkeyword: ["organic honey", "raw honey", "Himalayan honey"],
      keyDetails: [
        { key: "Weight", value: "500g" },
        { key: "Ingredients", value: "100% Honey" },
      ],
      collections: ["honey", "organic", "health"],
      isActive: true,
      isForDelivery: true,
      HSNCode: "04090000",
      GSTrate: 5,
      taxName: "GST",
      skuId: "HNY-500G",
      BarCode: "8901234567890",
    },
  ];

  try {
    const result = await BusinessProduct.insertMany(dummyProducts);
    console.log(`✅ Inserted ${result.length} dummy products.`);
  } catch (err) {
    console.error("❌ Error inserting products:", err);
  } finally {
    mongoose.connection.close();
  }
});
