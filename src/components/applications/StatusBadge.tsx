// src/components/applications/StatusBadge.tsx
import { Clock, Calendar, CheckCircle, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'applied':
        return {
          color: 'bg-blue-100 text-blue-700',
          icon: Clock,
          label: 'Applied',
        };
      case 'interview':
        return {
          color: 'bg-purple-100 text-purple-700',
          icon: Calendar,
          label: 'Interview',
        };
      case 'offer':
        return {
          color: 'bg-green-100 text-green-700',
          icon: CheckCircle,
          label: 'Offer',
        };
      case 'rejected':
        return {
          color: 'bg-red-100 text-red-700',
          icon: XCircle,
          label: 'Rejected',
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-700',
          icon: Clock,
          label: status,
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;
  
  const sizeClasses = size === 'sm' 
    ? 'px-2 py-1 text-xs gap-1'
    : 'px-3 py-1.5 text-sm gap-1.5';

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${config.color} ${sizeClasses}`}>
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      {config.label}
    </span>
  );
}