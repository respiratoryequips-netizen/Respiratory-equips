const express = require("express");
const {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const protect = require("../middleware/auth");

const router = express.Router();

// Public
router.get("/", getCategories);
router.get("/:slug", getCategoryBySlug);

// Admin (protected) — mounted again under /api/admin/categories in app.js
const adminRouter = express.Router();
adminRouter.use(protect);
adminRouter.post("/", createCategory);
adminRouter.put("/:id", updateCategory);
adminRouter.delete("/:id", deleteCategory);

module.exports = { router, adminRouter };