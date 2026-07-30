const express = require("express");
const cors = require("cors");

const logger = require("./middleware/logger");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const { router: categoryRoutes, adminRouter: adminCategoryRoutes } = require("./routes/categoryRoutes");
const { router: productRoutes, adminRouter: adminProductRoutes } = require("./routes/productRoutes");
const contactRoutes = require("./routes/contactRoutes");


// const app = express();

// const allowedOrigins = (process.env.CORS_ORIGINS || "").split(",").map((o) => o.trim());

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) callback(null, true);
//       else callback(new Error(`Origin ${origin} not allowed by CORS`));
//     },
//     credentials: true,
//   })
// );
console.log("CORS_ORIGINS =", process.env.CORS_ORIGINS);
const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((o) => o.trim());

console.log("Allowed Origins:", allowedOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Incoming Origin:", origin);

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("NOT ALLOWED:", origin);
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "2mb" }));
app.use(logger);

app.get("/api/health", (req, res) => res.json({ success: true, status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/admin/categories", adminCategoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/contact", contactRoutes); 

app.use(notFound);
app.use(errorHandler);

module.exports = app;