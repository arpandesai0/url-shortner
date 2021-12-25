const router = require("express").Router();
const newUrl = require("../models/newUrl");
const analytics = require("../models/analytics");
router.post("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const data = await newUrl.findOne({ shortId: shortId });
  if (data) {
    const url = JSON.parse(JSON.stringify(data)).url;
    await analytics.updateOne({ shortId: shortId }, { $inc: { clicks: 1 } });
    res.json({ message: "URL found successfully", url: url, ok: true });
  } else {
    res.json({ message: "Enter a valid short url", ok: false });
  }
});

module.exports = router;
