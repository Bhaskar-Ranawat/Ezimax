const mongoose = require("mongoose");

// Define sub-schema for variant options
const OptionSchema = new mongoose.Schema({
  name: String,
  displayName: String,
  values: [],
});

// Define sub-schema for variants
const VariantSchema = new mongoose.Schema(
  {
    id: String,
    skuId: String,
    Price: {
      type: Number,
      default: 0,
      set: (v) => parseFloat(v.toFixed(2)),
    },
    SalePrice: {
      type: Number,
      default: 0,
      set: (v) => parseFloat(v.toFixed(2)),
    },
    SavePrice: {
      type: Number,
      default: 0,
      set: (v) => parseFloat(v.toFixed(2)),
    },
    discountPercent: {
      type: Number,
      default: 0,
      set: (v) => parseFloat(v.toFixed(2)),
    },
    PriceOnline: {
      type: Number,
      default: 0,
      set: (v) => parseFloat(v.toFixed(2)),
    },
    SalePriceOnline: {
      type: Number,
      default: 0,
      set: (v) => parseFloat(v.toFixed(2)),
    },
    SavePriceOnline: {
      type: Number,
      default: 0,
      set: (v) => parseFloat(v.toFixed(2)),
    },
    discountPercentOnline: {
      type: Number,
      default: 0,
      set: (v) => parseFloat(v.toFixed(2)),
    },
    OnlinePriceHikePercent: {
      type: Number,
      default: 0,
      set: (v) => parseFloat(v.toFixed(2)),
    },
    // available: Boolean,
    // imageIds: [String],
    mediaIds: [],
    defaultVariant: Boolean,
    optionValueMap: {
      // type: Map,
      // of: String
    },
    inStock: { type: Boolean },
    hasAddOns: { type: Boolean, default: false },
    addOnGroups: [],
    stockQuantity: { type: Number, default: 0 },
    VariantUrl: String,
  },
  { timestamps: true }
);

module.exports = { OptionSchema, VariantSchema };
