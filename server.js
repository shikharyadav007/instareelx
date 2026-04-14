const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5500;

// Serve static files
app.use(express.static(__dirname));

// ==============================
// DOWNLOAD ROUTE (FINAL)
// ==============================
app.get("/download-file", (req, res) => {
  const fileUrl = req.query.url;

  if (!fileUrl) {
    return res.send("No URL provided");
  }

  try {
    return res.redirect(fileUrl);
  } catch (err) {
    return res.send("Download failed");
  }
});

// ==============================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});