const Product = require("../models/Product");
const Category = require("../models/Category");
const cloudinary = require("../config/cloudinary");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const { generateUniqueSlug } = require("../utils/slugify");
const triggerRevalidate = require("../utils/revalidate");

// GET /api/products?category=slug — public
const getProducts = asyncHandler(async (req, res) => {
  const { category, limit } = req.query;
  const filter = {};

  if (category) {
    const categoryDoc = await Category.findOne({ slug: category });
    if (!categoryDoc) return res.json({ success: true, products: [] });
    filter.category = categoryDoc._id;
  }

  let query = Product.find(filter).populate("category", "name slug").sort({ createdAt: -1 });
  if (limit) query = query.limit(Number(limit));

  const products = await query;
  res.json({ success: true, products });
});

// GET /api/products/:slug — public
const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }).populate(
    "category",
    "name slug"
  );
  if (!product) throw new ApiError(404, "Product not found");
  res.json({ success: true, product });
});

// POST /api/admin/products — protected
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    brand,
    tagline,
    shortDescription,
    description,
    images,
    specifications,
    price,
    inStock,
    metaTitle,
    metaDescription,
  } = req.body;

  if (!name || !name.trim()) throw new ApiError(400, "Product name is required");
  if (!category) throw new ApiError(400, "Category is required");

  const categoryDoc = await Category.findById(category);
  if (!categoryDoc) throw new ApiError(400, "Selected category does not exist");

  const slug = await generateUniqueSlug(Product, name);

  const product = await Product.create({
    name: name.trim(),
    slug,
    category,
    brand: brand || "",
    tagline: tagline || "",
    shortDescription: shortDescription || "",
    description: description || "",
    images: images || [],
    specifications: specifications || [],
    price: price ?? null,
    inStock: inStock ?? true,
    metaTitle: metaTitle || name.trim(),
    metaDescription: metaDescription || shortDescription || "",
  });

  await triggerRevalidate([
    "/products",
    `/products/${categoryDoc.slug}`,
    `/products/${categoryDoc.slug}/${slug}`,
    "/",
  ]);

  res.status(201).json({ success: true, product });
});

// PUT /api/admin/products/:id — protected
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category", "slug");
  if (!product) throw new ApiError(404, "Product not found");

  const oldCategorySlug = product.category.slug;

  const {
    name,
    category,
    brand,
    tagline,
    shortDescription,
    description,
    images,
    specifications,
    price,
    inStock,
    metaTitle,
    metaDescription,
  } = req.body;

  if (name && name.trim() && name.trim() !== product.name) {
    product.slug = await generateUniqueSlug(Product, name, product._id);
    product.name = name.trim();
  }

  if (category) {
    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) throw new ApiError(400, "Selected category does not exist");
    product.category = category;
  }

  if (brand !== undefined) product.brand = brand;
  if (tagline !== undefined) product.tagline = tagline;
  if (shortDescription !== undefined) product.shortDescription = shortDescription;
  if (description !== undefined) product.description = description;
  if (specifications !== undefined) product.specifications = specifications;
  if (price !== undefined) product.price = price;
  if (inStock !== undefined) product.inStock = inStock;
  if (metaTitle !== undefined) product.metaTitle = metaTitle;
  if (metaDescription !== undefined) product.metaDescription = metaDescription;

  if (images !== undefined) {
    // Clean up any removed images from Cloudinary.
    const oldPublicIds = product.images.map((img) => img.publicId);
    const newPublicIds = images.map((img) => img.publicId);
    const removed = oldPublicIds.filter((id) => !newPublicIds.includes(id));
    await Promise.all(
      removed.map((id) => cloudinary.uploader.destroy(id).catch(() => {}))
    );
    product.images = images;
  }

  await product.save();
  await product.populate("category", "slug");

  const paths = new Set([
    "/products",
    `/products/${oldCategorySlug}`,
    `/products/${product.category.slug}`,
    `/products/${product.category.slug}/${product.slug}`,
    "/",
  ]);
  await triggerRevalidate([...paths]);

  res.json({ success: true, product });
});

// DELETE /api/admin/products/:id — protected
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category", "slug");
  if (!product) throw new ApiError(404, "Product not found");

  await Promise.all(
    product.images.map((img) => cloudinary.uploader.destroy(img.publicId).catch(() => {}))
  );

  const categorySlug = product.category.slug;
  const slug = product.slug;

  await product.deleteOne();
  await triggerRevalidate(["/products", `/products/${categorySlug}`, "/"]);

  res.json({ success: true, message: "Product deleted" });
});

module.exports = {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
};