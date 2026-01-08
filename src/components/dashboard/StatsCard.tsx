// src/components/dashboard/StatsCard.tsx
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number | string;
  subtitle: string;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor,
  iconBgColor,
}: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-dark-lighter border border-gray-200 dark:border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 ${iconBgColor} rounded-lg`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
        {value}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
        {subtitle}
      </p>
    </div>
  );
}