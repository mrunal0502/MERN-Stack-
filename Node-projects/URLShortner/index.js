const express = require("express");
const mongoose = require("mongoose");
const URL = require("./model/url");
const urlRoutes = require("./routes/url");
const { connectDB } = require("./connect");
const app = express();
const PORT = 3000;

connectDB("mongodb://localhost:27017/short-url").then(() => {
  console.log("Connected to DB");
});

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/url", urlRoutes);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: new Date().toISOString(),
        },
      },
    },
    { new: true }
  );

  if (!entry) return res.status(404).send("Short URL not found");

  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
