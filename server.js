const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5500;

// IMPORTANT: correct path serve karo
app.use(express.static(path.join(__dirname)));

// Home route (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Download route
app.get("/download-file", (req, res) => {
  const fileUrl = req.query.url;

  if (!fileUrl) {
    return res.send("No URL provided");
  }

  res.redirect(fileUrl);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});