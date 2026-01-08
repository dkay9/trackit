// src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase/client';
import { 
  Plus, 
  Briefcase, 
  Calendar, 
  TrendingUp,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react';

interface Application {
  id: string;
  company: string;
  position: string;
  status: string;
  applied_date: string;
  created_at: string;
}

interface Stats {
  total: number;
  applied: number;
  interview: number;
  offer: number;
  rejected: number;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    applied: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchApplications();
    } else {
      // If no user yet, just stop loading
      setLoading(false);
    }
  }, [user]);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Supabase error:', error);
        // Don't throw - just set empty state
        setApplications([]);
        setLoading(false);
        return;
      }

      setApplications(data || []);

      // Calculate stats - handle null/undefined data
      const allData = data || [];
      const total = allData.length;
      const applied = allData.filter((app) => app.status === 'applied').length;
      const interview = allData.filter((app) => app.status === 'interview').length;
      const offer = allData.filter((app) => app.status === 'offer').length;
      const rejected = allData.filter((app) => app.status === 'rejected').length;

      setStats({ total, applied, interview, offer, rejected });
    } catch (error) {
      console.error('Error fetching applications:', error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back, {user?.user_metadata?.name || user?.email?.split('@')[0]}!
          </p>
        </div>
        <Link
          href="/dashboard/applications/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Application
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-dark-lighter border border-gray-200 dark:border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
              <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Applications</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
            {stats.total}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            All time
          </p>
        </div>

        <div className="bg-white dark:bg-dark-lighter border border-gray-200 dark:border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-500/20 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Interviews</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
            {stats.interview}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            In progress
          </p>
        </div>

        <div className="bg-white dark:bg-dark-lighter border border-gray-200 dark:border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-green-100 dark:bg-green-500/20 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Offers</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
            {stats.offer}
          </p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-2">
            {stats.total > 0 ? `${((stats.offer / stats.total) * 100).toFixed(0)}% success rate` : 'No data'}
          </p>
        </div>

        <div className="bg-white dark:bg-dark-lighter border border-gray-200 dark:border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Response Rate</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
            {stats.total > 0 ? `${(((stats.interview + stats.offer) / stats.total) * 100).toFixed(0)}%` : '0%'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Interview + Offer
          </p>
        </div>
      </div>

      {/* Recent Applications */}
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
    </div>
  );
}