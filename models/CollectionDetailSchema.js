const mongoose = require("mongoose");

const imageSchema = require("./ImageSchema");

let collectionDetailSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    displayName: { type: String, required: true },
    icon: { type: String, default: "" },
    description: { type: String, default: "" },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
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

// Create and export the model
const CollectionDetail = mongoose.model('CollectionDetail', collectionDetailSchema);
module.exports = CollectionDetail;
