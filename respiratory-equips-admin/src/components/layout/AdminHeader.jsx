import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export default function AdminHeader({ title }) {
  const { admin, logout } = useAuth();

  return (
    <header className="flex items-center justify-between bg-white border-b border-gray-100 px-8 py-4">
      <h1 className="font-bold text-primary text-xl">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaUserCircle className="text-accent" />
          {admin?.email}
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </header>
  );
}