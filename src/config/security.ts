export const SECURITY_CONFIG = {
  // Session timeout
  SESSION_TIMEOUT_MINUTES: 60,        // 1 hour inactivity
  
  // Rate limiting (if implemented in future)
  RATE_LIMIT_REQUESTS: 100,           // Requests per window
  RATE_LIMIT_WINDOW_MS: 60 * 60 * 1000, // 1 hour window
  
  // Auth specific (for future reference)
  MAX_LOGIN_ATTEMPTS: 5,              // Per 15 minutes
  LOGIN_LOCKOUT_MINUTES: 15,
  
  // Application operations (for future reference)
  MAX_APPLICATIONS_PER_DAY: 50,       // Reasonable for job search
} as const;