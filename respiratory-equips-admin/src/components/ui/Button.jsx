export default function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  disabled,
  className = "",
  ...props
}) {
  const base = "inline-flex items-center justify-center gap-2 rounded-lg font-semibold text-sm px-5 py-2.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-accent hover:bg-accent-dark text-white",
    outline: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    ghost: "text-gray-600 hover:bg-gray-100",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}