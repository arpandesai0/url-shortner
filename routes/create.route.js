const router = require("express").Router();
const shortid = require("shortid");
const newUrl = require("../models/newUrl");
const validUrl = require("valid-url");
const analytics = require("../models/analytics");
router.post("/", async (req, res) => {
  const { url, password } = req.body;
  var urlExist = true;
  if (!validUrl.isUri(url)) {
    res.json({ message: "Enter a valid url!", ok: false });
    return;
  }
  const shortId = shortid.generate();
  const isExists = await newUrl.exists({ url: url });
  if (isExists) {
    res.json({ message: "URL already exists!", ok: false });
  } else {
    const newEntry = await newUrl.create({
      url: url,
      password: password,
      shortId: shortId,
    });
    await analytics.create({ shortId: shortId });
    res.json({
      ...JSON.parse(JSON.stringify(newEntry)),
      message: "Short URL generated successfully",
      ok: true,
    });
  }
});
module.exports = router;
