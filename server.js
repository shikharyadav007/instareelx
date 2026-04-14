const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static(__dirname));

app.post("/get-video", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.json({ error: "No URL provided" });
    }

    // 🔥 proxy API (lightweight)
    const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`);
    const html = await response.text();

    const match = html.match(/https?:\/\/[^"]+\.mp4/);

    if (match) {
      res.json({ videoUrl: match[0] });
    } else {
      res.json({ error: "Video not found" });
    }

  } catch (err) {
    console.log(err);
    res.json({ error: "Failed to fetch video" });
  }
});

app.get("/download-file", (req, res) => {
  const url = req.query.url;
  if (!url) return res.send("No URL");

  res.redirect(url);
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});