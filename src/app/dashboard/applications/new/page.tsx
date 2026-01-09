'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ApplicationForm from '@/components/applications/ApplicationForm';

export default function NewApplicationPage() {
  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/dashboard/applications"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Applications
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Add New Application
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Track a new job application
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
        <ApplicationForm />
      </div>
    </div>
  );
}