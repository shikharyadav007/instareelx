const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

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