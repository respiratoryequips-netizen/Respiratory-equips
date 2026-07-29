const express = require("express");
const {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const protect = require("../middleware/auth");

const router = express.Router();

// Public
router.get("/", getProducts);
router.get("/:slug", getProductBySlug);

// Admin (protected)
const adminRouter = express.Router();
adminRouter.use(protect);
adminRouter.post("/", createProduct);
adminRouter.put("/:id", updateProduct);
adminRouter.delete("/:id", deleteProduct);

module.exports = { router, adminRouter };