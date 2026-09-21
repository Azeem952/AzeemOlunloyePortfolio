// Returns the auth storage backend for the Supabase client.
// On the server (SSR) returns undefined; on the client returns localStorage.
export function brokeredPreviewStorage() {
  if (typeof window === 'undefined') return undefined;
  return localStorage;
}
