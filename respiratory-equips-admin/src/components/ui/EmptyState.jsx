export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-white rounded-xl border border-dashed border-gray-200">
      {Icon && <Icon className="text-4xl text-gray-300 mb-3" />}
      <p className="font-semibold text-primary">{title}</p>
      {description && <p className="text-gray-500 text-sm mt-1 max-w-xs">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}