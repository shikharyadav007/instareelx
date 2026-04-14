const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static(__dirname));

/* =========================
   GET VIDEO PREVIEW API
========================= */
app.post("/get-video", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.json({ error: "No URL provided" });
    }

    // 🔥 Simple trick (works for many reels)
    const apiUrl = `https://api.vxtiktok.com/instagram?url=${url}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data && data.video) {
      return res.json({ videoUrl: data.video });
    } else {
      return res.json({ error: "Video not found" });
    }

  } catch (err) {
    console.log(err);
    res.json({ error: "Failed to fetch video" });
  }
});

/* =========================
   DOWNLOAD ROUTE
========================= */
app.get("/download-file", (req, res) => {
  const url = req.query.url;

  if (!url) return res.send("No URL");

  res.redirect(url);
});

/* =========================
   START SERVER
========================= */
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});