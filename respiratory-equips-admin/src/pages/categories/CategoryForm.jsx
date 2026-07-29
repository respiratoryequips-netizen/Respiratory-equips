import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import api, { getErrorMessage } from "../../lib/api";
import AdminLayout from "../../components/layout/AdminLayout";
import Input from "../../components/ui/Input";
import TextArea from "../../components/ui/TextArea";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import ImageUploader from "../../components/ui/ImageUploader";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  order: z.coerce.number().int().min(0).optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().max(160, "Keep meta description under 160 characters for SEO").optional(),
});

export default function CategoryForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema), defaultValues: { order: 0 } });

  useEffect(() => {
    if (!isEdit) return;
    api.get(`/categories/${id}`).catch(() => api.get(`/admin/categories`)); // fallback not needed, kept simple below
    api
      .get(`/categories`)
      .then((res) => {
        const cat = res.data.categories.find((c) => c._id === id);
        if (cat) {
          reset({
            name: cat.name,
            description: cat.description,
            order: cat.order,
            metaTitle: cat.metaTitle,
            metaDescription: cat.metaDescription,
          });
          setImage(cat.image?.url ? cat.image : null);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const payload = { ...data, image };
      if (isEdit) {
        await api.put(`/admin/categories/${id}`, payload);
        toast.success("Category updated");
      } else {
        await api.post("/admin/categories", payload);
        toast.success("Category created");
      }
      navigate("/categories");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title={isEdit ? "Edit Category" : "Add Category"}>
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={isEdit ? "Edit Category" : "Add Category"}>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-sm p-6 max-w-2xl space-y-5">
        <Input label="Category Name*" placeholder="e.g. CPAP Machines" error={errors.name?.message} {...register("name")} />

        <TextArea
          label="Short Description"
          placeholder="Shown on the category card, e.g. 'Advanced sleep therapy for better rest.'"
          rows={2}
          error={errors.description?.message}
          {...register("description")}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Category Image</label>
          <ImageUploader images={image ? [image] : []} onChange={(imgs) => setImage(imgs[0] || null)} multiple={false} />
        </div>

        <Input
          label="Display Order"
          type="number"
          placeholder="0"
          error={errors.order?.message}
          {...register("order")}
        />

        <div className="border-t border-gray-100 pt-5">
          <p className="font-semibold text-primary text-sm mb-3">SEO Settings</p>
          <div className="space-y-4">
            <Input
              label="Meta Title"
              placeholder="Defaults to category name if left blank"
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
          <Button type="button" variant="outline" onClick={() => navigate("/categories")}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Category"}
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
}