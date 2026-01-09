// src/components/applications/ApplicationForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Loader2, AlertCircle } from 'lucide-react';

interface ApplicationFormData {
  company: string;
  position: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected';
  applied_date: string;
  salary_min?: number;
  salary_max?: number;
  job_url?: string;
  notes?: string;
}

interface ApplicationFormProps {
  initialData?: ApplicationFormData & { id?: string };
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function ApplicationForm({ 
  initialData, 
  onSuccess,
  onCancel 
}: ApplicationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<ApplicationFormData>({
    company: initialData?.company || '',
    position: initialData?.position || '',
    status: initialData?.status || 'applied',
    applied_date: initialData?.applied_date || new Date().toISOString().split('T')[0],
    salary_min: initialData?.salary_min || undefined,
    salary_max: initialData?.salary_max || undefined,
    job_url: initialData?.job_url || '',
    notes: initialData?.notes || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error('Not authenticated. Please log in again.');
      }

      // Prepare data
      const applicationData = {
        ...formData,
        user_id: user.id,
        salary_min: formData.salary_min || null,
        salary_max: formData.salary_max || null,
        job_url: formData.job_url || null,
        notes: formData.notes || null,
      };

      if (initialData?.id) {
        // Update existing
        const { error: updateError } = await supabase
          .from('applications')
          .update(applicationData)
          .eq('id', initialData.id);

        if (updateError) throw updateError;
      } else {
        // Create new
        const { error: insertError } = await supabase
          .from('applications')
          .insert([applicationData]);

        if (insertError) throw insertError;
      }

      // Success
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/dashboard/applications');
        router.refresh();
      }
    } catch (err: unknown) {
        console.error('Error saving application:', err);

        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('Failed to save application');
        }
        } finally {
            setLoading(false);
        }
    };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes('salary') ? (value ? parseInt(value) : undefined) : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Company Name *
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-lighter border border-gray-300 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white"
            placeholder="e.g., Google"
          />
        </div>

        {/* Position */}
        <div>
          <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Position *
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-lighter border border-gray-300 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white"
            placeholder="e.g., Frontend Developer"
          />
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status *
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-lighter border border-gray-300 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white"
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Applied Date */}
        <div>
          <label htmlFor="applied_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Applied Date *
          </label>
          <input
            type="date"
            id="applied_date"
            name="applied_date"
            value={formData.applied_date}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-lighter border border-gray-300 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white"
          />
        </div>

        {/* Salary Min */}
        <div>
          <label htmlFor="salary_min" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Min Salary (Optional)
          </label>
          <input
            type="number"
            id="salary_min"
            name="salary_min"
            value={formData.salary_min || ''}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-lighter border border-gray-300 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white"
            placeholder="e.g., 80000"
          />
        </div>

        {/* Salary Max */}
        <div>
          <label htmlFor="salary_max" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Max Salary (Optional)
          </label>
          <input
            type="number"
            id="salary_max"
            name="salary_max"
            value={formData.salary_max || ''}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-lighter border border-gray-300 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white"
            placeholder="e.g., 120000"
          />
        </div>
      </div>

      {/* Job URL */}
      <div>
        <label htmlFor="job_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Job Posting URL (Optional)
        </label>
        <input
          type="url"
          id="job_url"
          name="job_url"
          value={formData.job_url}
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-lighter border border-gray-300 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white"
          placeholder="https://..."
        />
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Notes (Optional)
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-lighter border border-gray-300 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white resize-none"
          placeholder="Add any additional notes about this application..."
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 border-2 border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="flex-1 sm:flex-initial px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            initialData?.id ? 'Update Application' : 'Add Application'
          )}
        </button>
      </div>
    </form>
  );
}