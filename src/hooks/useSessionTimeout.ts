'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export function useSessionTimeout(timeoutMinutes: number = 60) {
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const logout = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login?timeout=true');
  };
  
  const resetTimeout = () => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set new timeout
    timeoutRef.current = setTimeout(logout, timeoutMinutes * 60 * 1000);
  };
  
  useEffect(() => {
    // Activity events that reset timeout
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click',
    ];
    
    // Reset timeout on any activity
    const handleActivity = () => {
      resetTimeout();
    };
    
    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, handleActivity);
    });
    
    // Start initial timeout
    resetTimeout();
    
    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [timeoutMinutes]);
}