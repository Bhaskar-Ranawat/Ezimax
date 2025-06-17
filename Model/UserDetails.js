const mongoose = require("mongoose");
const { Schema } = mongoose;
const { OptionSchema, VariantSchema } = require("./ProductDetails");

const businessProductSchema = new mongoose.Schema(
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
    productName: { type: String, required: true },
    productUrl: { type: String },
    description: { type: String, required: true },
    metaTitle: { type: String },
    metaDescription: { type: String },
    country: {
      type: String,
      default: "India",
    },
    // weight: Number,
    vendorProductCost: {
      type: Number,
      // default: 0,
      set: (v) => parseFloat(v.toFixed(2)),
    },
    // Price: Number,
    // SalePrice: Number,
    // SavePrice: Number,
    discountPercent: {
      type: Number,
      // default: 0,
      set: (v) => parseFloat(v.toFixed(2)),
    },
    Price: {
      type: Number,
      // default: 0,
      set: (v) => parseFloat(v.toFixed(2)),
    },
    SalePrice: {
      type: Number,
      // default: 0,
      set: (v) => parseFloat(v.toFixed(2)),
    },
    SavePrice: {
      type: Number,
      // default: 0,
      set: (v) => parseFloat(v.toFixed(2)),
    },
    discountPercentOnline: {
      type: Number,
      // default: 0,
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
    // example :
    // "mediaIds": {
    //   thumbnail : [{ fileName: "abc.png" , filetype: "njgh.png"}]
    //   images: [ { fileName: "abc.png" , filetype: "njgh.png"},{ fileName: "abc.png" , filetype: "njgh.png"} ]
    // },

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
    storeId: { type: Schema.Types.ObjectId },
    brand: {},
    productSEOkeyword: [{ type: String }],
    productTags: [],
    // productTags: [{
    //   tag: { type: String, default: "" },
    //   tagUrl: {
    //     type: String,
    //     default: function() {
    //       const baseUrl = "www.knowwu.com/tag/";
    //       return ${baseUrl}${this.tag.replace(/\s/g, '-').toLowerCase()};
    //     }
    //   }
    // }],
    isActive: { type: Boolean, default: true },
    isArchived: { type: Boolean, default: false },
    isShow: { type: Boolean, default: true },
    isAprovedByAdmin: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    storeBadges: [String],
    productHightlight: [], // key value data features
    specification: { type: String },
    YTvideo: { type: String }, // for youTube video
    keyDetails: [
      // key: String,
      // value: String
    ],
    isCustomizable: { type: Boolean, default: false },
    isCoinApplicable: { type: Boolean, default: false },

    //cross Sale and upSale filds
    crossSaleProducts: [
      {
        type: Schema.Types.ObjectId,

        // required: true,
      },
    ], // list of productIds
    relatedProducts: [
      {
        type: Schema.Types.ObjectId,
        // required: true,
      },
    ],

    //GST Fields

    HSNCode: { type: String },
    DeviceType: { type: String, default: "Unknown" },
    GSTrate: { type: Number },
    taxName: { type: String, default: "GST" },

    //Inventry Feilds

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

    // db.getCollection("VendorProduct").updateMany(
    // {
    // "isForDelivery": { "$exists": false },
    // },
    // {
    // $set: {
    // "isForDelivery": true,
    // }
    // }
    // );

    // shippingDetails: {
    //       shippingRate: {
    //         value: Number,
    //         currency: String
    //       },
    //       shippingDestination: {
    //         addressCountry: String
    //       },
    //       deliveryTime: {
    //         handlingTime: {
    //           minValue: Number,
    //           maxValue: Number,
    //           unitCode: String
    //         },
    //         transitTime: {
    //           minValue: Number,
    //           maxValue: Number,
    //           unitCode: String
    //         }
    //       }
    //     },
    //     returnPolicy: {
    //       applicableCountry: String,
    //       returnPolicyCategory: String,
    //       merchantReturnDays: Number,
    //       returnMethod: String,
    //       returnFees: String
    //     }
    //   });
  },
  { collection: "VendorProduct" },
  { timestamps: true }
);

// Compile the schema into a model
const BusinessProduct = mongoose.model('VendorProduct', businessProductSchema);

// Pre-save hook for creating URLs before saving
businessProductSchema.pre("save", function (next) {
  // Ensure product name is slugified for the URL
  // const productNameSlug = slugify(this.productName, { lower: true, replacement: "-", trim: true });
  const productNameSlug = this.productName.split(/\s+/).join("-").toLowerCase();

  // Set productUrl
  this.productUrl = `/product/${productNameSlug}?pid=${this._id}`;

  // Set variant URLs if they exist
  if (this.variantDetails && this.variantDetails.variants) {
    this.variantDetails.variants.forEach((variant) => {
      const variantId = variant._id
        ? variant._id.toString()
        : new mongoose.Types.ObjectId().toString(); // Ensure variant has an ID
      variant.VariantUrl = `/product/${productNameSlug}?pid=${this._id}&vid=${variantId}`;
    });
  }

  next();
});

// Optionally, if you also want to update the URLs after an update, you can add a post-hook:
businessProductSchema.post("findOneAndUpdate", async function (doc, next) {
  if (doc) {
    // const productNameSlug = slugify(doc.productName, { lower: true, replacement: "-", trim: true });
    const productNameSlug = doc.productName
      .split(/\s+/)
      .join("-")
      .toLowerCase();

    // Update productUrl
    doc.productUrl = `/product/${productNameSlug}?pid=${doc._id}`;

    // Update variant URLs
    if (doc.variantDetails && doc.variantDetails.variants) {
      doc.variantDetails.variants.forEach((variant) => {
        const variantId = variant._id
          ? variant._id.toString()
          : new mongoose.Types.ObjectId().toString();
        variant.VariantUrl = `/product/${productNameSlug}?pid=${doc._id}&vid=${variantId}`;
      });
    }

    // Save changes
    await doc.save();
  }
  next();
});

module.exports = {
  businessProductSchema,
  BusinessProduct,
  OptionSchema,
  VariantSchema,
};
