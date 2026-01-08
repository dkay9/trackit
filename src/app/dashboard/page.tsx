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
  CheckCircle,
  Loader2
} from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import RecentApplications from '@/components/dashboard/RecentApplications';

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
        setApplications([]);
        setLoading(false);
        return;
      }

      setApplications(data || []);

      // Calculate stats
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
            Welcome back, {user?.user_metadata?.name?.split(' ')[0] || user?.email?.split('@')[0]}!
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
        <StatsCard
          title="Total Applications"
          value={stats.total}
          subtitle="All time"
          icon={Briefcase}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBgColor="bg-blue-100 dark:bg-blue-500/20"
        />
        <StatsCard
          title="Interviews"
          value={stats.interview}
          subtitle="In progress"
          icon={Calendar}
          iconColor="text-purple-600 dark:text-purple-400"
          iconBgColor="bg-purple-100 dark:bg-purple-500/20"
        />
        <StatsCard
          title="Offers"
          value={stats.offer}
          subtitle={
            stats.total > 0
              ? `${((stats.offer / stats.total) * 100).toFixed(0)}% success rate`
              : 'No data'
          }
          icon={CheckCircle}
          iconColor="text-green-600 dark:text-green-400"
          iconBgColor="bg-green-100 dark:bg-green-500/20"
        />
        <StatsCard
          title="Response Rate"
          value={
            stats.total > 0
              ? `${(((stats.interview + stats.offer) / stats.total) * 100).toFixed(0)}%`
              : '0%'
          }
          subtitle="Interview + Offer"
          icon={TrendingUp}
          iconColor="text-orange-600 dark:text-orange-400"
          iconBgColor="bg-orange-100 dark:bg-orange-500/20"
        />
      </div>

      {/* Recent Applications */}
      <RecentApplications applications={applications} />
    </div>
  );
}