// src/components/dashboard/HomeExplorerWidget.jsx
'use client'

export function HomeExplorerWidget({ observations }) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-amber-100 rounded-md p-3">
            <span className="text-2xl">🔍</span>
          </div>
          <div className="ml-5 w-0 flex-1">
            <h3 className="text-lg font-medium text-gray-900">Home Explorer</h3>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <p className="text-sm text-gray-600">Recent observations:</p>
          {observations.map((observation) => (
            <div key={observation.id} className="flex items-start border-b border-gray-200 pb-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {observation.name} ({observation.type})
                </p>
                <p className="text-xs text-gray-500">
                  {observation.location} • {observation.date}
                </p>
              </div>
            </div>
          ))}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button className="w-full px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-600">
              Record Observation
            </button>
            <button className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              View All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
