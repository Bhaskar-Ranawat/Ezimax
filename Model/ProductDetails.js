let mongoose = require("mongoose");
// let Schema = mongoose.Schema;
const { Schema } = mongoose;

const imageSchema = new mongoose.Schema({
  fileName: { type: String },
  fileType: { type: String },
});

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
      set: (v) => v == null ? 0 : parseFloat(Number(v).toFixed(2)),
    },
    SalePrice: {
      type: Number,
      default: 0,
      set: (v) => v == null ? 0 : parseFloat(Number(v).toFixed(2)),
    },
    SavePrice: {
      type: Number,
      default: 0,
      set: (v) => v == null ? 0 : parseFloat(Number(v).toFixed(2)),
    },
    discountPercent: {
      type: Number,
      default: 0,
      set: (v) => v == null ? 0 : parseFloat(Number(v).toFixed(2)),
    },
    PriceOnline: {
      type: Number,
      default: 0,
      set: (v) => v == null ? 0 : parseFloat(Number(v).toFixed(2)),
    },
    SalePriceOnline: {
      type: Number,
      default: 0,
      set: (v) => v == null ? 0 : parseFloat(Number(v).toFixed(2)),
    },
    SavePriceOnline: {
      type: Number,
      default: 0,
      set: (v) => v == null ? 0 : parseFloat(Number(v).toFixed(2)),
    },
    discountPercentOnline: {
      type: Number,
      default: 0,
      set: (v) => v == null ? 0 : parseFloat(Number(v).toFixed(2)),
    },
    OnlinePriceHikePercent: {
      type: Number,
      default: 0,
      set: (v) => v == null ? 0 : parseFloat(Number(v).toFixed(2)),
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

let collectionDetailSchema = new Schema(
  {
    name: { type: String, required: true },
    displayName: { type: String, required: true },
    icon: { type: String, default: "" },
    description: { type: String, default: "" },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
        },
        orderNo: { type: Number },
      },
    ],
    productsCount: { type: Number, default: 0 },
    isShow: {
      type: Boolean,
      default: true,
    },
    isCategory: {
      type: Boolean,
      default: false,
    },
    isGrid: {
      type: Boolean,
      default: false,
    },
    collectionUrl: {
      type: String,
    },
    collectionSetting: {},
    images: [imageSchema],
    orderNo: { type: Number, default: 9999 },
    isDelete: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

let vendorProductCollectionsSchema = new Schema(
  {
    VenderUserId: {
      type: Schema.Types.ObjectId,
      ref: "mycardusers",
      required: true,
    },
    VenderCardId: {
      type: Schema.Types.ObjectId,
      ref: "mycards",
      required: true,
    },
    Collections: [collectionDetailSchema],
  },
  { collection: "vendorProductCollections", timestamps: true }
);

module.exports = {
  vendorProductCollectionsSchema,
  OptionSchema,
  VariantSchema,
};
