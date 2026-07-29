const Category = require("../models/Category");
const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const { generateUniqueSlug } = require("../utils/slugify");
const triggerRevalidate = require("../utils/revalidate");

// GET /api/categories — public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ order: 1, createdAt: 1 });
  res.json({ success: true, categories });
});

// GET /api/categories/:slug — public
const getCategoryBySlug = asyncHandler(async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug });
  if (!category) throw new ApiError(404, "Category not found");
  res.json({ success: true, category });
});

// POST /api/admin/categories — protected
const createCategory = asyncHandler(async (req, res) => {
  const { name, description, image, order, metaTitle, metaDescription } = req.body;

  if (!name || !name.trim()) throw new ApiError(400, "Category name is required");

  const slug = await generateUniqueSlug(Category, name);

  const category = await Category.create({
    name: name.trim(),
    slug,
    description: description || "",
    image: image || { url: "", publicId: "" },
    order: order ?? 0,
    metaTitle: metaTitle || name.trim(),
    metaDescription: metaDescription || description || "",
  });

  await triggerRevalidate(["/products", "/"]);

  res.status(201).json({ success: true, category });
});

// PUT /api/admin/categories/:id — protected
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw new ApiError(404, "Category not found");

  const { name, description, image, order, metaTitle, metaDescription } = req.body;

  if (name && name.trim() && name.trim() !== category.name) {
    category.slug = await generateUniqueSlug(Category, name, category._id);
    category.name = name.trim();
  }

  if (description !== undefined) category.description = description;
  if (order !== undefined) category.order = order;
  if (metaTitle !== undefined) category.metaTitle = metaTitle;
  if (metaDescription !== undefined) category.metaDescription = metaDescription;

  if (image && image.publicId && image.publicId !== category.image?.publicId) {
    // Replace image — remove the old one from Cloudinary if it existed.
    if (category.image?.publicId) {
      await cloudinary.uploader.destroy(category.image.publicId).catch(() => {});
    }
    category.image = image;
  }

  await category.save();
  await triggerRevalidate(["/products", `/products/${category.slug}`, "/"]);

  res.json({ success: true, category });
});

// DELETE /api/admin/categories/:id — protected
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw new ApiError(404, "Category not found");

  const productCount = await Product.countDocuments({ category: category._id });
  if (productCount > 0) {
    throw new ApiError(
      400,
      `Cannot delete — ${productCount} product(s) still belong to this category. Move or delete them first.`
    );
  }

  if (category.image?.publicId) {
    await cloudinary.uploader.destroy(category.image.publicId).catch(() => {});
  }

  await category.deleteOne();
  await triggerRevalidate(["/products", "/"]);

  res.json({ success: true, message: "Category deleted" });
});

module.exports = {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
};