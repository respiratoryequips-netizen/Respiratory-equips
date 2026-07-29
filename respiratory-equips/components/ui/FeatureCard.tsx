import { Feature } from "@/data/features";

export default function FeatureCard({ feature: { icon: Icon, title, description } }: { feature: Feature }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 text-center">
      <Icon className="text-accent text-4xl mx-auto mb-3" />
      <p className="font-semibold text-primary text-sm">{title}</p>
      <p className="text-gray-500 text-xs mt-1">{description}</p>
    </div>
  );
}