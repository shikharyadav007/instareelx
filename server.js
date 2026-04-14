const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static(__dirname));

/* VIDEO FETCH (FREE WORKING API) */
app.post("/get-video", async (req, res) => {
  try {
    const { url } = req.body;

    const api = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    const response = await fetch(api);
    const html = await response.text();

    const match = html.match(/https?:\/\/[^"]+\.mp4/);

    if (match) {
      res.json({ videoUrl: match[0] });
    } else {
      res.json({ error: "Video not found" });
    }

  } catch {
    res.json({ error: "Failed" });
  }
});

app.listen(PORT, () => {
  console.log("Server running");
});