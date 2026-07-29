import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaLayerGroup } from "react-icons/fa";
import toast from "react-hot-toast";
import api, { getErrorMessage } from "../../lib/api";
import AdminLayout from "../../components/layout/AdminLayout";
import Spinner from "../../components/ui/Spinner";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import ConfirmDialog from "../../components/ui/ConfirmDialog";

export default function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toDelete, setToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const load = () => {
        setLoading(true);
        api
            .get("/categories")
            .then((res) => setCategories(res.data.categories))
            .finally(() => setLoading(false));
    };

    useEffect(load, []);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await api.delete(`/admin/categories/${toDelete._id}`);
            toast.success("Category deleted");
            setToDelete(null);
            load();
        } catch (err) {
            toast.error(getErrorMessage(err));
        } finally {
            setDeleting(false);
        }
    };

    return (
        <AdminLayout title="Categories">
            <div className="flex justify-end mb-6">
                <Link to="/categories/new">
                    <Button>
                        <FaPlus /> Add Category
                    </Button>
                </Link>
            </div>

            {loading ? (
                <div className="flex justify-center py-16">
                    <Spinner size="lg" />
                </div>
            ) : categories.length === 0 ? (
                <EmptyState
                    icon={FaLayerGroup}
                    title="No categories yet"
                    description="Create your first category, like CPAP Machines or Oxygen Concentrators."
                    action={
                        <Link to="/categories/new">
                            <Button>
                                <FaPlus /> Add Category
                            </Button>
                        </Link>
                    }
                />
            ) : (
                <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-500 text-left">
                            <tr>
                                <th className="px-6 py-3 font-medium">Image</th>
                                <th className="px-6 py-3 font-medium">Name</th>
                                <th className="px-6 py-3 font-medium">Slug</th>
                                {/* <th className="px-6 py-3 font-medium">Order</th> */}
                                <th className="px-6 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {categories.map((cat) => (
                                <tr key={cat._id}>
                                    <td className="px-6 py-3">
                                        {cat.image?.url ? (
                                            <img src={cat.image.url} alt="" className="w-10 h-10 rounded-lg object-cover" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-lg bg-gray-100" />
                                        )}
                                    </td>
                                    <td className="px-6 py-3 font-medium text-primary">{cat.name}</td>
                                    <td className="px-6 py-3 text-gray-400">{cat.slug}</td>
                                    {/* <td className="px-6 py-3 text-gray-500">{cat.order}</td> */}
                                    <td className="px-6 py-3">
                                        <div className="flex justify-end gap-3">
                                            <Link
                                                to={`/categories/${cat._id}/edit`}
                                                className="text-gray-400 hover:text-accent transition-colors"
                                            >
                                                <FaEdit />
                                            </Link>
                                            <button
                                                onClick={() => setToDelete(cat)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <ConfirmDialog
                open={!!toDelete}
                title="Delete category?"
                description={`Are you sure you want to delete "${toDelete?.name}"? This cannot be undone.`}
                onConfirm={handleDelete}
                onCancel={() => setToDelete(null)}
                loading={deleting}
            />
        </AdminLayout>
    );
}