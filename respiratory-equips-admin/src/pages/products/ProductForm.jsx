import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { FaPlus, FaTrash } from "react-icons/fa";
import api, { getErrorMessage } from "../../lib/api";
import AdminLayout from "../../components/layout/AdminLayout";
import Input from "../../components/ui/Input";
import TextArea from "../../components/ui/TextArea";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import ImageUploader from "../../components/ui/ImageUploader";

const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    category: z.string().min(1, "Please select a category"),
    brand: z.string().min(1, "Brand is required"),
    tagline: z.string().min(1, "Tagline is required"),
    shortDescription: z.string().min(1, "Short description is required"),
    description: z.string().min(1, "Full description is required"),
    price: z.coerce.number().nonnegative("Price cannot be negative").optional().or(z.literal("")),
    inStock: z.enum(["true", "false"]).transform((v) => v === "true"),
    rating: z.coerce.number().min(0, "Minimum rating is 0").max(5, "Maximum rating is 5").optional(),
    reviewsCount: z.coerce.number().int().nonnegative("Reviews count cannot be negative").optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().max(160, "Keep meta description under 160 characters for SEO").optional(),
    specifications: z.array(z.object({ key: z.string().min(1, "Required"), value: z.string().min(1, "Required") })).optional(),
});

export default function ProductForm() {
    const { id } = useParams();
    const isEdit = !!id;
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [imageError, setImageError] = useState("");

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { inStock: "true", rating: 0, reviewsCount: 0, specifications: [] },
    });

    const { fields, append, remove } = useFieldArray({ control, name: "specifications" });

    useEffect(() => {
        const loadCategories = api.get("/categories").then((res) => setCategories(res.data.categories));

        if (isEdit) {
            Promise.all([loadCategories, api.get("/products")]).then(([, productsRes]) => {
                const product = productsRes.data.products.find((p) => p._id === id);
                if (product) {
                    reset({
                        name: product.name,
                        category: product.category?._id || "",
                        brand: product.brand,
                        tagline: product.tagline,
                        shortDescription: product.shortDescription,
                        description: product.description,
                        price: product.price ?? "",
                        inStock: product.inStock ? "true" : "false",
                        rating: product.rating ?? 0,
                        reviewsCount: product.reviewsCount ?? 0,
                        metaTitle: product.metaTitle,
                        metaDescription: product.metaDescription,
                        specifications: product.specifications || [],
                    });
                    setImages(product.images || []);
                }
                setLoading(false);
            });
        } else {
            loadCategories.finally(() => setLoading(false));
        }
    }, [id]);

    const onSubmit = async (data) => {
        if (images.length === 0) {
            setImageError("At least one product image is required");
            return;
        }
        setImageError("");

        setSaving(true);
        try {
            const payload = { ...data, price: data.price === "" ? null : data.price, images };
            if (isEdit) {
                await api.put(`/admin/products/${id}`, payload);
                toast.success("Product updated");
            } else {
                await api.post("/admin/products", payload);
                toast.success("Product created");
            }
            navigate("/products");
        } catch (err) {
            toast.error(getErrorMessage(err));
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout title={isEdit ? "Edit Product" : "Add Product"}>
                <div className="flex justify-center py-16">
                    <Spinner size="lg" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title={isEdit ? "Edit Product" : "Add Product"}>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-sm p-6 max-w-3xl space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input label="Product Name*" placeholder="e.g. AirSense 11 AutoSet" error={errors.name?.message} {...register("name")} />

                    <Select label="Category*" error={errors.category?.message} {...register("category")}>
                        <option value="">Select a category</option>
                        {categories.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                    </Select>

                    <Input label="Brand*" placeholder="e.g. ResMed" error={errors.brand?.message} {...register("brand")} />
                    <Input label="Tagline*" placeholder="e.g. Premium CPAP Machine" error={errors.tagline?.message} {...register("tagline")} />

                    <Input
                        label="Price (PKR)"
                        type="number"
                        placeholder="e.g. 165000"
                        error={errors.price?.message}
                        {...register("price")}
                    />

                    <Select label="Stock Status" {...register("inStock")}>
                        <option value="true">In Stock</option>
                        <option value="false">Out of Stock</option>
                    </Select>

                    <Input
                        label="Rating (0–5)"
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        placeholder="e.g. 4.5"
                        error={errors.rating?.message}
                        {...register("rating")}
                    />

                    <Input
                        label="Number of Reviews"
                        type="number"
                        min="0"
                        placeholder="e.g. 128"
                        error={errors.reviewsCount?.message}
                        {...register("reviewsCount")}
                    />
                </div>

                <TextArea
                    label="Short Description"
                    placeholder="One-line summary shown on the product card"
                    rows={2}
                    error={errors.shortDescription?.message}
                    {...register("shortDescription")}
                />

                <TextArea
                    label="Full Description"
                    placeholder="Complete product details shown on the product page"
                    rows={5}
                    error={errors.description?.message}
                    {...register("description")}
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Images*</label>
                    <ImageUploader images={images} onChange={setImages} multiple />
                    {imageError && <p className="text-red-500 text-xs mt-1">{imageError}</p>}
                </div>

                <div className="border-t border-gray-100 pt-5">
                    <div className="flex items-center justify-between mb-3">
                        <p className="font-semibold text-primary text-sm">Specifications</p>
                        <button
                            type="button"
                            onClick={() => append({ key: "", value: "" })}
                            className="flex items-center gap-1.5 text-accent text-sm font-medium hover:text-accent-dark"
                        >
                            <FaPlus size={12} /> Add Spec
                        </button>
                    </div>

                    {fields.length === 0 ? (
                        <p className="text-gray-400 text-sm">No specifications added yet.</p>
                    ) : (
                        <div className="space-y-3">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex gap-3 items-start">
                                    <Input
                                        placeholder="e.g. Weight"
                                        error={errors.specifications?.[index]?.key?.message}
                                        {...register(`specifications.${index}.key`)}
                                    />
                                    <Input
                                        placeholder="e.g. 785g"
                                        error={errors.specifications?.[index]?.value?.message}
                                        {...register(`specifications.${index}.value`)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="text-gray-400 hover:text-red-500 mt-2.5 shrink-0"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="border-t border-gray-100 pt-5">
                    <p className="font-semibold text-primary text-sm mb-3">SEO Settings</p>
                    <div className="space-y-4">
                        <Input
                            label="Meta Title"
                            placeholder="Defaults to product name if left blank"
                            error={errors.metaTitle?.message}
                            {...register("metaTitle")}
                        />
                        <TextArea
                            label="Meta Description"
                            placeholder="A short summary for search engines (max 160 characters)"
                            rows={2}
                            error={errors.metaDescription?.message}
                            {...register("metaDescription")}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <Button type="button" variant="outline" onClick={() => navigate("/products")}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={saving}>
                        {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Product"}
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}