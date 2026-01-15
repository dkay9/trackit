'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      console.log('=== useAuth getSession ===');
      console.log('Session:', session);
      console.log('User:', session?.user);
      console.log('Error:', error);
      
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('=== useAuth onAuthStateChange ===');
      console.log('Event:', event);
      console.log('Session:', session);
      console.log('User:', session?.user);
      
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
    router.refresh();
  };

  console.log('=== useAuth current state ===');
  console.log('User:', user);
  console.log('Loading:', loading);
  console.log('IsAuthenticated:', !!user);

  return {
    user,
    loading,
    signOut,
    isAuthenticated: !!user,
  };
}