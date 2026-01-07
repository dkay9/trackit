export type ApplicationStatus = 
  | 'applied' 
  | 'interview' 
  | 'offer' 
  | 'rejected';

export interface Application {
  id: string;
  user_id: string;
  company: string;
  position: string;
  status: ApplicationStatus;
  applied_date: string;
  salary_min?: number;
  salary_max?: number;
  job_url?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}