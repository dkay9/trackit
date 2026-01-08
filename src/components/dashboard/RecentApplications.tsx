// src/components/dashboard/RecentApplications.tsx
import Link from 'next/link';
import { Briefcase, Calendar, Plus, Clock, CheckCircle, XCircle, FileText } from 'lucide-react';

interface Application {
  id: string;
  company: string;
  position: string;
  status: string;
  applied_date: string;
  created_at: string;
}

interface RecentApplicationsProps {
  applications: Application[];
}

export default function RecentApplications({ applications }: RecentApplicationsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied':
        return 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400';
      case 'interview':
        return 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400';
      case 'offer':
        return 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400';
      case 'rejected':
        return 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied':
        return <Clock className="w-4 h-4" />;
      case 'interview':
        return <Calendar className="w-4 h-4" />;
      case 'offer':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white dark:bg-dark-lighter border border-gray-200 dark:border-white/10 rounded-xl">
      <div className="p-6 border-b border-gray-200 dark:border-white/10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Applications
          </h2>
          <Link
            href="/dashboard/applications"
            className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
          >
            View all →
          </Link>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="p-12 text-center">
          <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No applications yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start tracking your job applications by adding your first one.
          </p>
          <Link
            href="/dashboard/applications/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Your First Application
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-gray-200 dark:divide-white/10">
          {applications.map((app) => (
            <div
              key={app.id}
              className="p-6 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                    {app.position}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {app.company}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Applied {new Date(app.applied_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                  {getStatusIcon(app.status)}
                  <span className="capitalize">{app.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}