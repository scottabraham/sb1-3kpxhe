import React from 'react';
import { useAlertTable } from '../hooks/useAlerts';

export default function AlertList() {
  const { data, isLoading, error } = useAlertTable({
    page: 1,
    limit: 10,
    sortBy: 'timestamp',
    sortOrder: 'desc',
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading alerts</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Alerts</h1>
      <div className="bg-white rounded-lg shadow">
        {data?.alerts.map((alert) => (
          <div
            key={alert.id}
            className="p-4 border-b last:border-b-0 hover:bg-gray-50"
          >
            <h3 className="font-semibold">{alert.title}</h3>
            <p className="text-gray-600">{alert.message}</p>
            <div className="flex justify-between items-center mt-2">
              <span className={`px-2 py-1 rounded text-sm ${
                alert.severity === 'error' ? 'bg-red-100 text-red-800' :
                alert.severity === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {alert.severity}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(alert.timestamp).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}