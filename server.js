const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json());
app.use(express.static(__dirname));

/* 🔥 GET VIDEO USING FREE API */
app.post("/get-video", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.json({ error: "No URL" });
    }

    // FREE PUBLIC API (works on Render)
    const api = `https://api.gramsnap.com/v1/video?url=${encodeURIComponent(url)}`;

    const response = await fetch(api);
    const data = await response.json();

    if (data && data.video) {
      return res.json({ videoUrl: data.video });
    } else {
      return res.json({ error: "Video not found" });
    }

  } catch (err) {
    res.json({ error: "Server error" });
  }
});

/* DOWNLOAD */
app.get("/download-file", async (req, res) => {
  try {
    const url = req.query.url;

    const api = `https://api.gramsnap.com/v1/video?url=${encodeURIComponent(url)}`;
    const response = await fetch(api);
    const data = await response.json();

    if (data.video) {
      res.redirect(data.video);
    } else {
      res.send("Download failed");
    }

  } catch {
    res.send("Error");
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});