// src/components/applications/ApplicationCard.tsx
import { useState } from 'react';
import { Calendar, DollarSign, ExternalLink, Trash2, Edit2, MoreVertical } from 'lucide-react';
import StatusBadge from './StatusBadge';

interface Application {
  id: string;
  company: string;
  position: string;
  status: string;
  applied_date: string;
  salary_min?: number;
  salary_max?: number;
  job_url?: string;
  notes?: string;
}

interface ApplicationCardProps {
  application: Application;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ApplicationCard({ 
  application, 
  onEdit, 
  onDelete 
}: ApplicationCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return null;
    if (min && max) return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;
    if (min) return `$${(min / 1000).toFixed(0)}k+`;
    if (max) return `Up to $${(max / 1000).toFixed(0)}k`;
    return null;
  };

  const salary = formatSalary(application.salary_min, application.salary_max);

  return (
    <div className="bg-white dark:bg-dark-lighter border border-gray-200 dark:border-white/10 rounded-xl p-6 hover:border-primary/50 dark:hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate">
            {application.position}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            {application.company}
          </p>
          <StatusBadge status={application.status} />
        </div>

        {/* Actions Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-lighter border border-gray-200 dark:border-white/10 rounded-lg shadow-lg z-20">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onEdit(application.id);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors rounded-t-lg"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onDelete(application.id);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors rounded-b-lg"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Meta Information */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          Applied {new Date(application.applied_date).toLocaleDateString()}
        </span>
        
        {salary && (
          <span className="flex items-center gap-1.5">
            <DollarSign className="w-4 h-4" />
            {salary}
          </span>
        )}

        {application.job_url && (
          <a
            href={application.job_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-primary hover:text-primary-dark transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Posting
          </a>
        )}
      </div>

      {/* Notes Preview */}
      {application.notes && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {application.notes}
          </p>
        </div>
      )}
    </div>
  );
}