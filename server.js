const config = require("./config/config");
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const app = express();

//connecting to mongo database
mongoose.connect(config.MONGO_URL, () => console.log("Connected to database"));

//starting the server
app.listen(config.PORT, () => {
  console.log("Server running at port: " + config.PORT);
});

//middlewares
//parsing json
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//sending original url for redirecting
app.get("/", (req, res) => {
  res.send("TEST OK");
});

//create routes
//for new urls
const createRouter = require("./routes/create.route");
app.use("/create", createRouter);

//for fetching urls
const getUrlRouter = require("./routes/getUrl.route");
app.use("/get-url", getUrlRouter);

//analytics
const analyticsRouter = require("./routes/analytics.route");
app.use("/analytics", analyticsRouter);
