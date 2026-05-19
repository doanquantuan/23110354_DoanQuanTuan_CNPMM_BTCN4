const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const api = require("./routes/api");
const profileRoutes = require("./routes/profileRoutes");
const courseRoutes = require("./routes/courseRoutes");
const sectionRoutes = require("./routes/sectionRoutes");

const app = express();

// ========== MIDDLEWARE ==========
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS - Cho phép các request từ client
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// ========== ROUTES ==========
app.use("/api", api);
app.use("/api/profile", profileRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/section", sectionRoutes);

// Route kiểm tra server
app.get("/", (req, res) => {
  res.json({
    message: "API Xây dựng website học lập trình",
    version: "1.0.0",
    status: "running",
  });
});

// ========== ERROR HANDLING ==========
app.use((err, req, res, next) => {
  console.error("Error:", err);

  const status = err.status || 500;
  const message = err.message || "Lỗi server nội bộ";

  res.status(status).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === "development" && { error: err.message }),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint không tồn tại",
  });
});

// ========== START SERVER ==========
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════╗
  ║   API Server đang chạy trên cổng ${PORT}    ║
  ║   URL: http://localhost:${PORT}        ║
  ╚══════════════════════════════════════════╝
  `);
  console.log("✓ CORS được bật");
  console.log("✓ JSON parser được kích hoạt");
  console.log(`✓ Chế độ: ${process.env.NODE_ENV || "development"}`);
});

module.exports = app;
