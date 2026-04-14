const express = require("express");
const { spawn } = require("child_process");
const path = require("path");

const app = express();

app.use(express.json());

/* HOME */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

/* PREVIEW */
app.post("/get-video", (req, res) => {
  const { url } = req.body;

  const yt = spawn("yt-dlp", ["-f", "best", "-g", url]);

  let data = "";

  yt.stdout.on("data", (chunk) => {
    data += chunk.toString();
  });

  yt.on("close", () => {
    res.json({ videoUrl: data.trim() });
  });
});

/* DOWNLOAD (STREAM) */
app.get("/download-file", (req, res) => {
  const url = req.query.url;

  const yt = spawn("yt-dlp", ["-f", "best", "-o", "-", url]);

  res.setHeader("Content-Disposition", "attachment; filename=reel.mp4");
  res.setHeader("Content-Type", "video/mp4");

  yt.stdout.pipe(res);
});

/* START */
app.listen(5500, () => {
  console.log("🚀 Server running: http://localhost:5500");
});