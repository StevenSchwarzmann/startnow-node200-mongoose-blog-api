const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/my-blog", { useMongoClient: true });

mongoose.Promise = Promise;

const app = express();

app.use(bodyParser.json());
app.use("/api/users", require("./routes/users"));
app.use("/api/blogs", require("./routes/blogs"));

app.get("/", (req, res) => {
  res.status(200).send();
});

module.exports = app;
