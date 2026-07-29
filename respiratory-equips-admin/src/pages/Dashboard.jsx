import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaLayerGroup, FaBoxOpen, FaPlus } from "react-icons/fa";
import api from "../lib/api";
import AdminLayout from "../components/layout/AdminLayout";
import Spinner from "../components/ui/Spinner";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    Promise.all([api.get("/categories"), api.get("/products")]).then(
      ([categoriesRes, productsRes]) => {
        setStats({
          categories: categoriesRes.data.categories.length,
          products: productsRes.data.products.length,
        });
      }
    );
  }, []);

  return (
    <AdminLayout title="Dashboard">
      {!stats ? (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
              <div className="bg-accent-light text-accent p-4 rounded-xl">
                <FaLayerGroup size={22} />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{stats.categories}</p>
                <p className="text-gray-500 text-sm">Categories</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
              <div className="bg-accent-light text-accent p-4 rounded-xl">
                <FaBoxOpen size={22} />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{stats.products}</p>
                <p className="text-gray-500 text-sm">Products</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/categories/new"
              className="flex items-center gap-2 bg-white border border-gray-200 hover:border-accent hover:text-accent rounded-lg px-5 py-3 text-sm font-medium transition-colors"
            >
              <FaPlus /> Add Category
            </Link>
            <Link
              to="/products/new"
              className="flex items-center gap-2 bg-white border border-gray-200 hover:border-accent hover:text-accent rounded-lg px-5 py-3 text-sm font-medium transition-colors"
            >
              <FaPlus /> Add Product
            </Link>
          </div>
        </>
      )}
    </AdminLayout>
  );
}