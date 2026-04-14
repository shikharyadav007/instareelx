const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.static(__dirname));


// ==============================
// 🎯 GET VIDEO (API BASED)
// ==============================
app.get("/get-video", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.json({ error: "No URL provided" });
  }

  try {
    const response = await fetch(
      `https://api.ryzendesu.vip/api/downloader/instagram?url=${encodeURIComponent(url)}`
    );

    const data = await response.json();

    if (!data || !data.data) {
      return res.json({ error: "Failed to fetch video" });
    }

    res.json({
      videoUrl: data.data[0].url
    });

  } catch (error) {
    res.json({ error: "Server error" });
  }
});


// ==============================
// 📥 DOWNLOAD (DIRECT LINK)
// ==============================
app.get("/download-file", (req, res) => {
  const fileUrl = req.query.url;

  if (!fileUrl) {
    return res.send("No URL provided");
  }

  res.redirect(fileUrl); // direct download
});


// ==============================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});