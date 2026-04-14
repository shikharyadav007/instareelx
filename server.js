const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static(__dirname));

/* 🔥 GET VIDEO */
app.post("/get-video", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.json({ error: "No URL" });
    }

    // 🔥 Working public API (more stable)
    const api = `https://api.ryzendesu.vip/api/downloader/instagram?url=${encodeURIComponent(url)}`;

    const response = await fetch(api);
    const data = await response.json();

    if (data && data.data && data.data.length > 0) {
      return res.json({ videoUrl: data.data[0].url });
    } else {
      return res.json({ error: "Video not found" });
    }

  } catch (err) {
    console.log(err);
    res.json({ error: "Server error" });
  }
});

/* DOWNLOAD */
app.get("/download-file", (req, res) => {
  const url = req.query.url;
  if (!url) return res.send("No URL");

  res.redirect(url);
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});