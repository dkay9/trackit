// src/app/dashboard/analytics/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Loader2, Download } from 'lucide-react';
import AnalyticsStats from '@/components/analytics/AnalyticsStats';
import StatusBreakdownChart from '@/components/analytics/StatusBreakdownChart';
import ApplicationsTimelineChart from '@/components/analytics/ApplicationsTimelineChart';
import TopCompanies from '@/components/analytics/TopCompanies';

interface Application {
  id: string;
  company: string;
  position: string;
  status: string;
  applied_date: string;
  created_at: string;
}

export default function AnalyticsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching applications:', error);
        setApplications([]);
        return;
      }

      setApplications(data || []);
    } catch (error) {
      console.error('Error:', error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const calculateStats = () => {
    const total = applications.length;
    const applied = applications.filter(app => app.status === 'applied').length;
    const interview = applications.filter(app => app.status === 'interview').length;
    const offer = applications.filter(app => app.status === 'offer').length;
    const rejected = applications.filter(app => app.status === 'rejected').length;

    const responseRate = total > 0 ? Math.round(((interview + offer) / total) * 100) : 0;
    const successRate = total > 0 ? Math.round((offer / total) * 100) : 0;

    // Calculate average time to response (simplified)
    const avgTimeToResponse = 0; // Placeholder for now

    return {
      total,
      applied,
      interview,
      offer,
      rejected,
      responseRate,
      successRate,
      avgTimeToResponse,
    };
  };

  // Prepare timeline data (last 30 days)
  const prepareTimelineData = () => {
    const last30Days: { [key: string]: number } = {};
    const today = new Date();

    // Initialize last 30 days with 0
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      last30Days[dateStr] = 0;
    }

    // Count applications per day
    applications.forEach(app => {
      const dateStr = app.applied_date;
      if (last30Days.hasOwnProperty(dateStr)) {
        last30Days[dateStr]++;
      }
    });

    return Object.entries(last30Days).map(([date, count]) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      count,
    }));
  };

  // Get top companies
  const getTopCompanies = () => {
    const companyCounts: { [key: string]: number } = {};

    applications.forEach(app => {
      companyCounts[app.company] = (companyCounts[app.company] || 0) + 1;
    });

    return Object.entries(companyCounts)
      .map(([company, count]) => ({ company, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Top 5
  };

  const handleExport = () => {
    // Simple CSV export
    const headers = ['Company', 'Position', 'Status', 'Applied Date'];
    const rows = applications.map(app => [
      app.company,
      app.position,
      app.status,
      app.applied_date,
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `job-applications-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const stats = calculateStats();
  const timelineData = prepareTimelineData();
  const topCompanies = getTopCompanies();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Analytics
          </h1>
          <p className="text-gray-600 mt-1">
            Insights and statistics about your job search
          </p>
        </div>
        {applications.length > 0 && (
          <button
            onClick={handleExport}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary font-semibold rounded-lg transition-colors"
          >
            <Download className="w-5 h-5" />
            Export CSV
          </button>
        )}
      </div>

      {applications.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No analytics yet
          </h3>
          <p className="text-gray-600 mb-6">
            Add some job applications to see your analytics and insights.
          </p>
          <a
            href="/dashboard/applications/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
          >
            Add Your First Application
          </a>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <AnalyticsStats stats={stats} />

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StatusBreakdownChart
              data={{
                applied: stats.applied,
                interview: stats.interview,
                offer: stats.offer,
                rejected: stats.rejected,
              }}
            />
            <TopCompanies data={topCompanies} />
          </div>

          {/* Charts Row 2 */}
          <ApplicationsTimelineChart data={timelineData} />
        </>
      )}
    </div>
  );
}