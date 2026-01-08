'use client';

import { useAuth } from '@/hooks/useAuth';
import { Loader2, LogOut } from 'lucide-react';

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-bg">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Welcome back, {user?.user_metadata?.name || user?.email}!
            </p>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Temporary Content */}
        <div className="glass-dark dark:glass-dark bg-white border border-gray-200 dark:border-white/20 rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            🎉 Authentication Works!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You&apos;re successfully logged in. We&apos;ll build the actual dashboard next.
          </p>
          <div className="bg-gray-50 dark:bg-dark-lighter rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Email:</strong> {user?.email}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              <strong>User ID:</strong> {user?.id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}