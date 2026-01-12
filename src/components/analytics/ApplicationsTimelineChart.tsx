'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TimelineData {
  date: string;
  count: number;
}

interface ApplicationsTimelineChartProps {
  data: TimelineData[];
}

export default function ApplicationsTimelineChart({ data }: ApplicationsTimelineChartProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Applications Over Time</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          No data to display
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Applications Over Time</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#4f7bff"
            strokeWidth={2}
            dot={{ fill: '#4f7bff', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}