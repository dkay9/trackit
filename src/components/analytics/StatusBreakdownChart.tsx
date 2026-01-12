'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface StatusBreakdownChartProps {
  data: {
    applied: number;
    interview: number;
    offer: number;
    rejected: number;
  };
}

const COLORS = {
  applied: '#3b82f6',    // blue
  interview: '#a855f7',  // purple
  offer: '#22c55e',      // green
  rejected: '#ef4444',   // red
};

export default function StatusBreakdownChart({ data }: StatusBreakdownChartProps) {
  const chartData = [
    { name: 'Applied', value: data.applied, color: COLORS.applied },
    { name: 'Interview', value: data.interview, color: COLORS.interview },
    { name: 'Offer', value: data.offer, color: COLORS.offer },
    { name: 'Rejected', value: data.rejected, color: COLORS.rejected },
  ].filter(item => item.value > 0); // Only show statuses with data

  const total = data.applied + data.interview + data.offer + data.rejected;

  if (total === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Status Breakdown</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          No data to display
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Status Breakdown</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 gap-3 mt-6">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-gray-700">
              {item.name}: <strong>{item.value}</strong>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}