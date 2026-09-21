/**
 * Resolves Supabase connection settings if configured in environment.
 * Returns null if Supabase is not configured, allowing the app to run standalone.
 */
export function supabaseEnv() {
  const env = (typeof process !== "undefined" ? process.env : {}) as Record<
    string,
    string | undefined
  >;
  const url = env["SUPABASE_URL"] || import.meta.env.VITE_SUPABASE_URL;
  const key =
    env["SUPABASE_PUBLISHABLE_KEY"] || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return null;
  }
  return { url, key };
}
