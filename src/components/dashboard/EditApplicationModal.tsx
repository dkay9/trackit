'use client';
import { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

interface Application {
  id: string;
  user_id?: string;
  company: string;
  position: string;
  status: string;
  applied_date: string;
  salary_min?: number;
  salary_max?: number;
  job_url?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

interface EditApplicationModalProps {
  application: Application;
  onClose: () => void;
  onSuccess: () => void;
}

const statusOptions = [
  { value: 'applied', label: 'Applied' },
  { value: 'interview', label: 'Interview' },
  { value: 'offer', label: 'Offer' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'withdrawn', label: 'Withdrawn' },
];

export default function EditApplicationModal({ 
  application, 
  onClose, 
  onSuccess 
}: EditApplicationModalProps) {
  const [formData, setFormData] = useState({
    company: application.company,
    position: application.position,
    status: application.status,
    applied_date: application.applied_date,
    salary_min: application.salary_min || '',
    salary_max: application.salary_max || '',
    job_url: application.job_url || '',
    notes: application.notes || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Check if user is authenticated
      const { data: { user: currentUser }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !currentUser) {
        throw new Error('You must be logged in to update applications');
      }

      // Prepare data for update
      const updateData: {
        company: string;
        position: string;
        status: string;
        applied_date: string;
        notes: string | null;
        job_url: string | null;
        salary_min?: number;
        salary_max?: number;
      } = {
        company: formData.company,
        position: formData.position,
        status: formData.status,
        applied_date: formData.applied_date,
        notes: formData.notes || null,
        job_url: formData.job_url || null,
      };

      // Only include salary if values are provided
      if (formData.salary_min) {
        updateData.salary_min = Number(formData.salary_min);
      }
      if (formData.salary_max) {
        updateData.salary_max = Number(formData.salary_max);
      }

      const result = await supabase
        .from('applications')
        .update(updateData)
        .eq('id', application.id)
        .select();

      if (result.error) {
        console.error('Supabase update error details:', {
          message: result.error.message,
          details: result.error.details,
          hint: result.error.hint,
          code: result.error.code,
        });
        throw result.error;
      }

      if (!result.data || result.data.length === 0) {
        throw new Error('Update succeeded but no data returned. Check RLS policies.');
      }

      console.log('Update successful!');
      onSuccess();
    } catch (err) {
      console.error('Error updating application:', err);
      
      // Handle Supabase error format
      let errorMessage = 'Failed to update application';
      
      if (err && typeof err === 'object') {
        const supabaseError = err as { message?: string; error?: string; details?: string };
        errorMessage = supabaseError.message || supabaseError.error || supabaseError.details || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Edit Application
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
            <div className="p-6 space-y-4">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Position */}
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                  Position <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Applied Date */}
              <div>
                <label htmlFor="applied_date" className="block text-sm font-medium text-gray-700 mb-1">
                  Applied Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="applied_date"
                  name="applied_date"
                  value={formData.applied_date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Job URL */}
              <div>
                <label htmlFor="job_url" className="block text-sm font-medium text-gray-700 mb-1">
                  Job URL
                </label>
                <input
                  type="url"
                  id="job_url"
                  name="job_url"
                  value={formData.job_url}
                  onChange={handleChange}
                  placeholder="https://company.com/jobs/123"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Salary Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="salary_min" className="block text-sm font-medium text-gray-700 mb-1">
                    Min Salary
                  </label>
                  <input
                    type="number"
                    id="salary_min"
                    name="salary_min"
                    value={formData.salary_min}
                    onChange={handleChange}
                    placeholder="e.g., 80000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="salary_max" className="block text-sm font-medium text-gray-700 mb-1">
                    Max Salary
                  </label>
                  <input
                    type="number"
                    id="salary_max"
                    name="salary_max"
                    value={formData.salary_max}
                    onChange={handleChange}
                    placeholder="e.g., 120000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Add any additional notes about this application..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}