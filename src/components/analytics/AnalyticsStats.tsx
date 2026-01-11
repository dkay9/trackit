// src/components/analytics/AnalyticsStats.tsx

interface AnalyticsStatsProps {
  stats: {
    total: number;
    applied: number;
    interview: number;
    offer: number;
    rejected: number;
    responseRate: number;
    successRate: number;
    avgTimeToResponse: number;
  };
}

export default function AnalyticsStats({ stats }: AnalyticsStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Applications */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <p className="text-sm text-gray-600 mb-1">Total Applications</p>
        <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        <p className="text-xs text-gray-500 mt-2">All time</p>
      </div>

      {/* Response Rate */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <p className="text-sm text-gray-600 mb-1">Response Rate</p>
        <p className="text-3xl font-bold text-gray-900">{stats.responseRate}%</p>
        <p className="text-xs text-gray-500 mt-2">
          {stats.interview + stats.offer} responses
        </p>
      </div>

      {/* Success Rate */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <p className="text-sm text-gray-600 mb-1">Success Rate</p>
        <p className="text-3xl font-bold text-gray-900">{stats.successRate}%</p>
        <p className="text-xs text-gray-500 mt-2">
          {stats.offer} offers received
        </p>
      </div>

      {/* Avg Response Time */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <p className="text-sm text-gray-600 mb-1">Avg Response Time</p>
        <p className="text-3xl font-bold text-gray-900">
          {stats.avgTimeToResponse > 0 ? `${stats.avgTimeToResponse}d` : 'N/A'}
        </p>
        <p className="text-xs text-gray-500 mt-2">Days to first response</p>
      </div>
    </div>
  );
}