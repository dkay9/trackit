// src/lib/utils/user.ts
import type { User } from '@supabase/supabase-js';

export function getUserFirstName(user: User | null): string {
  if (!user) {
    return 'User';
  }

  // Try full_name first (our new field)
  if (user.user_metadata?.full_name) {
    const name = user.user_metadata.full_name.trim();
    const firstName = name.split(' ')[0];
    return firstName;
  }

  // Try name field (fallback)
  if (user.user_metadata?.name) {
    const name = user.user_metadata.name.trim();
    const firstName = name.split(' ')[0];
    return firstName;
  }

  // Try email
  if (user.email) {
    const emailName = user.email.split('@')[0];
    return emailName;
  }

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