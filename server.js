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

    // 🔥 Better API (more stable)
    const apiUrl = `https://snapinsta.app/action.php`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `url=${encodeURIComponent(url)}`
    });

    const text = await response.text();

    // 🔥 Extract video link (simple regex)
    const match = text.match(/https?:\/\/[^"]+\.mp4/);

    if (match) {
      return res.json({ videoUrl: match[0] });
    } else {
      return res.json({ error: "Video not found" });
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