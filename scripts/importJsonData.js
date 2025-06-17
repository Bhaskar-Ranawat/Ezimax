const mongoose = require("mongoose");
const fs = require("fs").promises;
const path = require("path");
require("dotenv").config();

// Import models
const { BusinessProduct } = require("../Model/UserDetails");
const { vendorProductCollectionsSchema } = require("../Model/ProductDetails");

// Create model for collections
const VendorProductCollection = mongoose.model(
  "vendorProductCollections",
  vendorProductCollectionsSchema
);

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("MONGO_URI is not defined in environment variables");
  process.exit(1);
}

function fixMongoTypes(obj) {
  if (Array.isArray(obj)) {
    return obj.map(fixMongoTypes);
  } else if (obj && typeof obj === "object") {
    if ("$oid" in obj) {
      return obj["$oid"];
    }
    if ("$date" in obj) {
      return new Date(obj["$date"]);
    }
    const newObj = {};
    for (const key in obj) {
      newObj[key] = fixMongoTypes(obj[key]);
    }
    return newObj;
  }
  return obj;
}

async function importJsonData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(`${mongoURI}/Ezimax`);
    console.log("MongoDB connected successfully");

    // Read and import VendorProduct data
    console.log("Reading vendor product data...");
    const vendorProductPath = path.join(
      __dirname,
      "../json/KNOWWUDEV.VendorProduct.json"
    );
    const rawVendorProductData = JSON.parse(
      await fs.readFile(vendorProductPath, "utf8")
    );
    const vendorProductData = fixMongoTypes(rawVendorProductData);

    // Clear existing data
    console.log("Clearing existing vendor products...");
    await BusinessProduct.deleteMany({});

    // Insert new data in batches
    console.log("Inserting vendor products...");
    const batchSize = 100;
    for (let i = 0; i < vendorProductData.length; i += batchSize) {
      const batch = vendorProductData.slice(i, i + batchSize);
      await BusinessProduct.insertMany(batch);
      console.log(
        `Processed ${Math.min(i + batchSize, vendorProductData.length)} of ${
          vendorProductData.length
        } products`
      );
    }

    // Read and import VendorProductCollections data
    console.log("\nReading vendor product collections data...");
    const collectionsPath = path.join(
      __dirname,
      "../json/KNOWWUDEV.vendorProductCollections (1).json"
    );
    const rawCollectionsData = JSON.parse(
      await fs.readFile(collectionsPath, "utf8")
    );
    const collectionsData = fixMongoTypes(rawCollectionsData);

    // Clear existing data
    console.log("Clearing existing collections...");
    await VendorProductCollection.deleteMany({});

    // Insert new data
    console.log("Inserting collections...");
    const collectionsResult = await VendorProductCollection.insertMany(
      collectionsData
    );
    console.log(
      `✅ Inserted ${collectionsResult.length} vendor product collections`
    );
  } catch (error) {
    console.error("Error importing data:", error);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
}

// Run the import
importJsonData();
