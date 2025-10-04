const { nanoid } = require("nanoid");
const URL = require("../model/url");
async function handleGenerateNewShortURL(req, res) {
  try {
    const body = req.body;
    console.log("BODY:", req.body);
    if (!body.url) return res.status(400).json({ error: "url is required" });
    const shortID = nanoid(8);
    await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
    });
    res.status(201).json({ id: shortID });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
