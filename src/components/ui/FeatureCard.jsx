// src/components/ui/FeatureCard.jsx
export function FeatureCard({ title, description, icon, color }) {
    return (
      <div className="relative">
        <dt>
          <div className={`absolute flex items-center justify-center h-12 w-12 rounded-md ${color}`}>
            <span className="text-2xl">{icon}</span>
          </div>
          <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{title}</p>
        </dt>
        <dd className="mt-2 ml-16 text-base text-gray-500">
          {description}
        </dd>
      </div>
    );
  }