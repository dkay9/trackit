// src/app/debug-user/page.tsx
// TEMPORARY DEBUG PAGE - Delete after fixing
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { getUserFirstName, getUserFullName, getUserInitial } from '@/lib/utils/user';
import type { User } from '@supabase/supabase-js';

export default function DebugUserPage() {
  const { user } = useAuth();
  const [rawUser, setRawUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.auth.getUser();
      setRawUser(data.user);
    }
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">User Debug Info</h1>

        {/* From useAuth Hook */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">From useAuth Hook</h2>
          <pre className="bg-gray-50 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>

        {/* Raw from Supabase */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Raw from Supabase</h2>
          <pre className="bg-gray-50 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(rawUser, null, 2)}
          </pre>
        </div>

        {/* User Metadata Specifically */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">User Metadata Only</h2>
          <pre className="bg-gray-50 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(user?.user_metadata || rawUser?.user_metadata, null, 2)}
          </pre>
        </div>

        {/* Parsed Names */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Parsed Values</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="font-medium w-32">First Name:</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded">
                {getUserFirstName(user)}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-medium w-32">Full Name:</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded">
                {getUserFullName(user)}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-medium w-32">Initial:</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded">
                {getUserInitial(user)}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-medium w-32">Email:</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded">
                {user?.email || 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* What's Wrong? */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-yellow-900">Diagnosis</h2>
          <div className="space-y-2 text-sm">
            {!user?.user_metadata?.full_name && !user?.user_metadata?.name ? (
              <p className="text-red-600 font-medium">
                ❌ No name in user_metadata! This is why it shows &quot;User&quot;
              </p>
            ) : (
              <p className="text-green-600 font-medium">
                ✅ Name exists in user_metadata
              </p>
            )}

            {user?.email && (
              <p className="text-gray-700">
                Email fallback would be: <strong>{user.email.split('@')[0]}</strong>
              </p>
            )}
          </div>
        </div>

        {/* Fix Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-900">How to Fix</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li>If no name in metadata: Sign up form didn&apos;t save it correctly</li>
            <li>Go to Supabase Dashboard → Authentication → Users</li>
            <li>Find your user (by email)</li>
            <li>Click on the user</li>
            <li>Edit User Metadata</li>
            <li>
              Add:
              <pre className="bg-white p-2 rounded mt-2 text-xs">
{`{
  "full_name": "Your Name",
  "name": "Your Name"
}`}
              </pre>
            </li>
            <li>Save and sign out/in</li>
          </ol>
        </div>
      </div>
    </div>
  );
}