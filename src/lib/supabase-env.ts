/**
 * Resolves Supabase connection settings for server-side code on ANY host.
 *
 * Resolves Supabase credentials from runtime env vars (set by the host) or
 * build-time VITE_* values (inlined by Vite). The VITE_* values are inlined
 * into the bundle at build time, so they are always present. Falling back to
 * them means no public page depends on host-specific runtime secrets.
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
    throw new Error(
      "Supabase URL/publishable key unavailable. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in the deployment environment.",
    );
  }
  return { url, key };
}
