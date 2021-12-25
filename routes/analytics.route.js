const router = require("express").Router();
const newUrl = require("../models/newUrl");
const analytics = require("../models/analytics");
router.post("/", async (req, res) => {
  const { shortId, password } = req.body;
  var data = await newUrl.findOne({ shortId: shortId });
  if (data) {
    data = JSON.parse(JSON.stringify(data));
    if (data.password === password) {
      var analyticsData = await analytics.findOne({ shortId: shortId });
      analyticsData = JSON.parse(JSON.stringify(analyticsData));
      res.json({
        message: "URL found successfully",
        ok: true,
        url: data.url,
        analytics: analyticsData,
      });
    } else {
      res.json({ message: "Enter a valid password", ok: -2 });
    }
  } else {
    res.json({ message: "Enter a valid short url", ok: -1 });
  }
});

module.exports = router;
