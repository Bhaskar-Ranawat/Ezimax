const mongoose = require("mongoose");
const { OptionSchema, VariantSchema } = require("./ProductVariantSchema");

// Define schema for product
const businessProductSchema = new mongoose.Schema(
  {
    VenderUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mycardusers",
      required: true,
    },
    VenderCardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mycards",
      required: true,
    },
    productName: { type: String, required: true },
    productUrl: { type: String },
    description: { type: String, required: true },
    metaTitle: { type: String },
    metaDescription: { type: String },
    country: {
      type: String,
      default: "India",
    },
    vendorProductCost: {
      type: Number,
      set: (v) => parseFloat(v.toFixed(2)),
    },
    discountPercent: {
      type: Number,
      set: (v) => parseFloat(v.toFixed(2)),
    },
    Price: {
      type: Number,
      set: (v) => parseFloat(v.toFixed(2)),
    },
    SalePrice: {
      type: Number,
      set: (v) => parseFloat(v.toFixed(2)),
    },
    SavePrice: {
      type: Number,
      set: (v) => parseFloat(v.toFixed(2)),
    },
    discountPercentOnline: {
      type: Number,
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
    OnlinePriceHikePercent: {
      type: Number,
      default: 0,
      set: (v) => parseFloat(v.toFixed(2)),
    },
    ReSellerComission: {
      type: Number,
      default: 0,
      set: (v) => parseFloat(v.toFixed(2)),
    },
    images: [String],
    mediaIds: {},
    badges: [],
    categories: {},
    foodType: {},
    collections: [String],
    hasVariants: Boolean,
    hasAddOns: { type: Boolean, default: false },
    addOnGroups: [],
    variantDetails: {
      options: [OptionSchema],
      variants: [VariantSchema],
    },
    storeId: { type: mongoose.Schema.Types.ObjectId },
    brand: {},
    productSEOkeyword: [{ type: String }],
    productTags: [],
    isActive: { type: Boolean, default: true },
    isArchived: { type: Boolean, default: false },
    isShow: { type: Boolean, default: true },
    isAprovedByAdmin: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    storeBadges: [String],
    productHightlight: [],
    specification: { type: String },
    YTvideo: { type: String },
    keyDetails: [],
    isCustomizable: { type: Boolean, default: false },
    isCoinApplicable: { type: Boolean, default: false },
    crossSaleProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    relatedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    HSNCode: { type: String },
    DeviceType: { type: String, default: "Unknown" },
    GSTrate: { type: Number },
    taxName: { type: String, default: "GST" },
    skuId: String,
    BarCode: String,
    productExternalUrl: String,
    stockQuantity: { type: Number, default: 0 },
    expiryDate: {},
    LotNo: { type: String },
    isReturnable: { type: Boolean, default: false },
    isReplaceable: { type: Boolean, default: false },
    isDrafted: { type: Boolean, default: false },
    isForDelivery: { type: Boolean, default: true },
  },
  { collection: "VendorProduct" },
  { timestamps: true }
);

// Pre-save hook for creating URLs before saving
businessProductSchema.pre("save", function (next) {
  const productNameSlug = this.productName.split(/\s+/).join("-").toLowerCase();
  this.productUrl = `/product/${productNameSlug}?pid=${this._id}`;

  if (this.variantDetails && this.variantDetails.variants) {
    this.variantDetails.variants.forEach((variant) => {
      const variantId = variant._id
        ? variant._id.toString()
        : new mongoose.Types.ObjectId().toString();
      variant.VariantUrl = `/product/${productNameSlug}?pid=${this._id}&vid=${variantId}`;
    });
  }

  next();
});

// Post-update hook for updating URLs
businessProductSchema.post("findOneAndUpdate", async function (doc, next) {
  if (doc) {
    const productNameSlug = doc.productName.split(/\s+/).join("-").toLowerCase();
    doc.productUrl = `/product/${productNameSlug}?pid=${doc._id}`;

    if (doc.variantDetails && doc.variantDetails.variants) {
      doc.variantDetails.variants.forEach((variant) => {
        const variantId = variant._id
          ? variant._id.toString()
          : new mongoose.Types.ObjectId().toString();
        variant.VariantUrl = `/product/${productNameSlug}?pid=${doc._id}&vid=${variantId}`;
      });
    }

    await doc.save();
  }
  next();
});

// Create and export the model
const Product = mongoose.model('VendorProduct', businessProductSchema);
module.exports = Product;
