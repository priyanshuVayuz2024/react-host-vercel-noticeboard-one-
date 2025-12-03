const express = require("express");
const path = require("path");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");

const app = express();
const upload = multer(); // use in-memory storage

// Serve React static files
app.use(express.static(path.join(__dirname, "../dist")));

// Test route
app.get("/test", function (req, res) {
  res.json({ code: 200, message: "Test" });
});

// ✅ Upload route - gets token from frontend request headers
app.post("/api/upload-image", upload.array("files"), async (req, res) => {
  try {
    const form = new FormData();

    req.files.forEach((file) => {
      form.append("file[]", file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });
    });

    // 🔐 Get Authorization token from frontend request headers
    const authHeader = req.headers['authorization'] || '';
    // console.log(authHeader);
    // console.log("AUth Header");
    const headers = {
      ...form.getHeaders(),
      Authorization: authHeader, // forward token from frontend
    };

    const response = await axios.post(
      "https://react-revamp.apnacomplex.com/api/upload-image",
      form,
      { headers }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Upload proxy error:", error?.response?.data || error.message);
    res.status(error?.response?.status || 500).json({
      error: "Upload proxy failed",
      detail: error?.response?.data || error.message,
    });
  }
});

// Catch-all route for SPA support
app.get("/*", function (req, res) {
  res.sendFile("index.html", { root: path.join(__dirname, "../dist") });
});

let port = process.env.PORT || 3000
// Start server
app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});

