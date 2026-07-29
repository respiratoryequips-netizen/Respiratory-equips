import { FaSignOutAlt, FaUserCircle, FaBars } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export default function AdminHeader({ title, onMenuClick }) {
  const { admin, logout } = useAuth();

  return (
    <header className="flex items-center justify-between bg-white border-b border-gray-100 px-4 md:px-8 py-4">
      <div className="flex items-center gap-3 min-w-0">
        <button onClick={onMenuClick} className="lg:hidden text-primary text-xl shrink-0">
          <FaBars />
        </button>
        <h1 className="font-bold text-primary text-lg md:text-xl truncate">{title}</h1>
      </div>
      <div className="flex items-center gap-3 md:gap-4 shrink-0">
        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
          <FaUserCircle className="text-accent" />
          {admin?.email}
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
        >
          <FaSignOutAlt /> <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}