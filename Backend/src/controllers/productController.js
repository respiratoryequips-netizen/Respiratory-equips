const Product = require("../models/Product");
const Category = require("../models/Category");
const cloudinary = require("../config/cloudinary");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const { generateUniqueSlug } = require("../utils/slugify");
const triggerRevalidate = require("../utils/revalidate");

// GET /api/products?category=slug&limit=5&page=1 — public
const getProducts = asyncHandler(async (req, res) => {
    const { category, limit, page } = req.query;
    const filter = {};

    if (category) {
        const categoryDoc = await Category.findOne({ slug: category });
        if (!categoryDoc) return res.json({ success: true, products: [], total: 0, page: 1, pages: 1 });
        filter.category = categoryDoc._id;
    }

    // No pagination requested (e.g. the public homepage's "top 5" call) —
    // keep the original simple behavior so nothing else breaks.
    if (!page) {
        let query = Product.find(filter).populate("category", "name slug").sort({ createdAt: -1 });
        if (limit) query = query.limit(Number(limit));
        const products = await query;
        return res.json({ success: true, products, total: products.length, page: 1, pages: 1 });
    }

    const pageNum = Math.max(Number(page), 1);
    const limitNum = Number(limit) || 15;
    const skip = (pageNum - 1) * limitNum;

    const [products, total] = await Promise.all([
        Product.find(filter)
            .populate("category", "name slug")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum),
        Product.countDocuments(filter),
    ]);

    res.json({
        success: true,
        products,
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
    });
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
        name, category, brand, tagline, shortDescription, description,
        images, specifications, price, inStock, rating, reviewsCount,
        metaTitle, metaDescription,
    } = req.body;

    if (!name || !name.trim()) throw new ApiError(400, "Product name is required");
    if (!category) throw new ApiError(400, "Category is required");
    if (!brand || !brand.trim()) throw new ApiError(400, "Brand is required");
    if (!tagline || !tagline.trim()) throw new ApiError(400, "Tagline is required");
    if (!shortDescription || !shortDescription.trim()) throw new ApiError(400, "Short description is required");
    if (!description || !description.trim()) throw new ApiError(400, "Full description is required");
    if (!images || images.length === 0) throw new ApiError(400, "At least one product image is required");

    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) throw new ApiError(400, "Selected category does not exist");

    const slug = await generateUniqueSlug(Product, name);

    const product = await Product.create({
        name: name.trim(),
        slug,
        category,
        brand: brand.trim(),
        tagline: tagline.trim(),
        shortDescription: shortDescription.trim(),
        description: description.trim(),
        images,
        specifications: specifications || [],
        price: price ?? null,
        inStock: inStock ?? true,
        rating: rating ?? 0,
        reviewsCount: reviewsCount ?? 0,
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
        rating, reviewsCount,
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

    if (brand !== undefined) {
        if (!brand.trim()) throw new ApiError(400, "Brand cannot be empty");
        product.brand = brand;
    }
    if (tagline !== undefined) {
        if (!tagline.trim()) throw new ApiError(400, "Tagline cannot be empty");
        product.tagline = tagline;
    }
    if (shortDescription !== undefined) {
        if (!shortDescription.trim()) throw new ApiError(400, "Short description cannot be empty");
        product.shortDescription = shortDescription;
    }
    if (description !== undefined) {
        if (!description.trim()) throw new ApiError(400, "Full description cannot be empty");
        product.description = description;
    }
    if (specifications !== undefined) product.specifications = specifications;
    if (price !== undefined) product.price = price;
    if (inStock !== undefined) product.inStock = inStock;
    if (rating !== undefined) product.rating = rating;
    if (reviewsCount !== undefined) product.reviewsCount = reviewsCount;
    if (metaTitle !== undefined) product.metaTitle = metaTitle;
    if (metaDescription !== undefined) product.metaDescription = metaDescription;

    if (images !== undefined && images.length === 0) {
        throw new ApiError(400, "At least one product image is required");
    }

    if (images !== undefined) {
        // Clean up any removed images from Cloudinary.
        const oldPublicIds = product.images.map((img) => img.publicId);
        const newPublicIds = images.map((img) => img.publicId);
        const removed = oldPublicIds.filter((id) => !newPublicIds.includes(id));
        await Promise.all(
            removed.map((id) => cloudinary.uploader.destroy(id).catch(() => { }))
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
        product.images.map((img) => cloudinary.uploader.destroy(img.publicId).catch(() => { }))
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