import { NavLink } from "react-router-dom";
import { FaThLarge, FaLayerGroup, FaBoxOpen, FaTimes } from "react-icons/fa";

const links = [
  { to: "/", label: "Dashboard", icon: FaThLarge, end: true },
  { to: "/categories", label: "Categories", icon: FaLayerGroup },
  { to: "/products", label: "Products", icon: FaBoxOpen },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          w-64 shrink-0 bg-primary text-white flex flex-col
          fixed lg:static inset-y-0 left-0 z-50
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <p className="font-bold text-lg leading-tight">
              RESPIRATORY <span className="text-accent">EQUIPS</span>
            </p>
            <p className="text-[10px] text-white/50 tracking-wide mt-1">ADMIN PANEL</p>
          </div>
          <button onClick={onClose} className="lg:hidden text-white/70 hover:text-white">
            <FaTimes />
          </button>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-accent text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <link.icon />
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}