import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaBoxOpen, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import toast from "react-hot-toast";
import api, { getErrorMessage } from "../../lib/api";
import AdminLayout from "../../components/layout/AdminLayout";
import Spinner from "../../components/ui/Spinner";
import Button from "../../components/ui/Button";
import Select from "../../components/ui/Select";
import EmptyState from "../../components/ui/EmptyState";
import ConfirmDialog from "../../components/ui/ConfirmDialog";

const PAGE_SIZE = 15;

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [toDelete, setToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        api.get("/categories").then((res) => setCategories(res.data.categories));
    }, []);

    const load = () => {
        setLoading(true);
        const params = { page, limit: PAGE_SIZE };
        if (categoryFilter) params.category = categoryFilter;

        api
            .get("/products", { params })
            .then((res) => {
                setProducts(res.data.products);
                setTotalPages(res.data.pages);
                setTotal(res.data.total);
            })
            .finally(() => setLoading(false));
    };

    useEffect(load, [page, categoryFilter]);

    const handleCategoryChange = (e) => {
        setCategoryFilter(e.target.value);
        setPage(1); // reset to first page whenever the filter changes
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await api.delete(`/admin/products/${toDelete._id}`);
            toast.success("Product deleted");
            setToDelete(null);
            load();
        } catch (err) {
            toast.error(getErrorMessage(err));
        } finally {
            setDeleting(false);
        }
    };

    return (
        <AdminLayout title="Products">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="w-full sm:w-64">
                    <Select value={categoryFilter} onChange={handleCategoryChange}>
                        <option value="">All Categories</option>
                        {categories.map((c) => (
                            <option key={c._id} value={c.slug}>
                                {c.name}
                            </option>
                        ))}
                    </Select>
                </div>
                <Link to="/products/new">
                    <Button className="w-full sm:w-auto">
                        <FaPlus /> Add Product
                    </Button>
                </Link>
            </div>

            {loading ? (
                <div className="flex justify-center py-16">
                    <Spinner size="lg" />
                </div>
            ) : products.length === 0 ? (
                <EmptyState
                    icon={FaBoxOpen}
                    title={categoryFilter ? "No products in this category" : "No products yet"}
                    description={
                        categoryFilter
                            ? "Try a different category, or add a product here."
                            : "Add your first product under one of your categories."
                    }
                    action={
                        <Link to="/products/new">
                            <Button>
                                <FaPlus /> Add Product
                            </Button>
                        </Link>
                    }
                />
            ) : (
                <>
                    <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-gray-500 text-left">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Image</th>
                                    <th className="px-6 py-3 font-medium">Name</th>
                                    <th className="px-6 py-3 font-medium">Category</th>
                                    <th className="px-6 py-3 font-medium">Stock</th>
                                    <th className="px-6 py-3 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {products.map((p) => (
                                    <tr key={p._id}>
                                        <td className="px-6 py-3">
                                            {p.images?.[0]?.url ? (
                                                <img src={p.images[0].url} alt="" className="w-10 h-10 rounded-lg object-cover" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-lg bg-gray-100" />
                                            )}
                                        </td>
                                        <td className="px-6 py-3 font-medium text-primary">{p.name}</td>
                                        <td className="px-6 py-3 text-gray-500">{p.category?.name || "—"}</td>
                                        <td className="px-6 py-3">
                                            <span
                                                className={`text-xs font-medium px-2 py-1 rounded-full ${p.inStock ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
                                                    }`}
                                            >
                                                {p.inStock ? "In Stock" : "Out of Stock"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className="flex justify-end gap-3">
                                                <Link to={`/products/${p._id}/edit`} className="text-gray-400 hover:text-accent transition-colors">
                                                    <FaEdit />
                                                </Link>
                                                <button onClick={() => setToDelete(p)} className="text-gray-400 hover:text-red-500 transition-colors">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-5 text-sm text-gray-500">
                            <p>
                                Showing page {page} of {totalPages} ({total} products total)
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                                    disabled={page === 1}
                                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
                                >
                                    <FaChevronLeft size={12} /> Prev
                                </button>
                                <button
                                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                                    disabled={page === totalPages}
                                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
                                >
                                    Next <FaChevronRight size={12} />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}

            <ConfirmDialog
                open={!!toDelete}
                title="Delete product?"
                description={`Are you sure you want to delete "${toDelete?.name}"? This cannot be undone.`}
                onConfirm={handleDelete}
                onCancel={() => setToDelete(null)}
                loading={deleting}
            />
        </AdminLayout>
    );
}