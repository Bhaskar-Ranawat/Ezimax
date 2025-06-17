const mongoose = require("mongoose");
const CollectionDetail = require("./CollectionDetailSchema");

let vendorProductCollectionsSchema = new mongoose.Schema(
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
    Collections: [CollectionDetail.schema],
  },
  { collection: "vendorProductCollections", timestamps: true }
);

// Create and export the model
const BusinessProduct = mongoose.model('BusinessProduct', vendorProductCollectionsSchema);
module.exports = BusinessProduct;
