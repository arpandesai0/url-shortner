const mongoose = require("mongoose");
const NewUrl = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    shortId: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
    collection: "newUrls",
  }
);
module.exports = mongoose.model("NewUrl", NewUrl);
