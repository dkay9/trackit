// src/lib/utils/user.ts
import type { User } from '@supabase/supabase-js';

export function getUserFirstName(user: User | null): string {
  console.log('=== getUserFirstName Debug ===');
  console.log('User object:', user);
  console.log('User metadata:', user?.user_metadata);
  console.log('Email:', user?.email);
  
  if (!user) {
    console.log('No user, returning "User"');
    return 'User';
  }

  // Try full_name first (our new field)
  if (user.user_metadata?.full_name) {
    const name = user.user_metadata.full_name.trim();
    const firstName = name.split(' ')[0];
    console.log('✅ Using full_name:', firstName);
    return firstName;
  }

  // Try name field (fallback)
  if (user.user_metadata?.name) {
    const name = user.user_metadata.name.trim();
    const firstName = name.split(' ')[0];
    console.log('✅ Using name:', firstName);
    return firstName;
  }

  // Try email
  if (user.email) {
    const emailName = user.email.split('@')[0];
    console.log('⚠️ Using email fallback:', emailName);
    return emailName;
  }

  console.log('❌ No name found, returning "User"');
  return 'User';
}

export function getUserFullName(user: User | null): string {
  if (!user) return 'User';

  if (user.user_metadata?.full_name) {
    return user.user_metadata.full_name;
  }

  if (user.user_metadata?.name) {
    return user.user_metadata.name;
  }

  if (user.email) {
    return user.email.split('@')[0];
  }

  return 'User';
}

export function getUserInitial(user: User | null): string {
  const firstName = getUserFirstName(user);
  return firstName[0]?.toUpperCase() || 'U';
}