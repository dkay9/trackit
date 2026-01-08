'use client';

import { FileText } from 'lucide-react';

export default function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Applications
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage all your job applications
        </p>
      </div>

      <div className="bg-white dark:bg-dark-lighter border border-gray-200 dark:border-white/10 rounded-xl p-12 text-center">
        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Applications List Coming Soon
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          We&apos;ll build the full applications management here next.
        </p>
      </div>
    </div>
  );
}