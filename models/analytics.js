const mongoose = require("mongoose");
const analytics = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: "analytics",
  }
);
module.exports = mongoose.model("analytics", analytics);
