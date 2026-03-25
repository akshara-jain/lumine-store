export function getSessionId(): string {
  if (typeof window === 'undefined') return 'server-session';
  
  let sessionId = localStorage.getItem('lumine_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('lumine_session_id', sessionId);
  }
  return sessionId;
}
