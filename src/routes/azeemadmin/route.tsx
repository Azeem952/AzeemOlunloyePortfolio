import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Toaster } from "@/components/ui/sonner";
import { ADMIN_EMAIL } from "@/lib/admin-client";

export const Route = createFileRoute("/azeemadmin")({
  ssr: false,
  head: () => ({ meta: [{ name: "robots", content: "noindex, nofollow" }, { title: "Studio" }] }),
  component: AdminLayout,
});

const NAV = [
  { to: "/azeemadmin", label: "Overview", exact: true },
  { to: "/azeemadmin/projects", label: "Portfolio" },
  { to: "/azeemadmin/media", label: "Media library" },
];

function AdminLayout() {
  const [email, setEmail] = useState<string | null | undefined>(undefined);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
        setEmail(session?.user.email ?? null);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (email === undefined) {
    return (
      <div className="grid min-h-dvh place-items-center text-sm text-muted-foreground">
        Checking access…
      </div>
    );
  }

  if (email?.toLowerCase() !== ADMIN_EMAIL) {
    return <SignIn signedInAs={email} />;
  }

  return (
    <div className="min-h-dvh bg-muted">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-5 py-8 md:flex-row md:px-8">
        <aside className="md:sticky md:top-8 md:h-fit md:w-60 md:shrink-0">
          <p className="font-display text-lg tracking-tight">Studio</p>
          <p className="mt-1 truncate text-xs text-muted-foreground">{email}</p>
          <nav className="mt-6 space-y-1">
            {NAV.map((n) => {
              const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-background font-semibold shadow-sm"
                      : "text-muted-foreground hover:bg-background/60"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-6 space-y-1 border-t pt-6">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-background/60"
            >
              View live site ↗
            </a>
            <button
              type="button"
              onClick={async () => {
                await supabase.auth.signOut();
              }}
              className="block w-full rounded-lg px-3 py-2 text-left text-sm text-muted-foreground hover:bg-background/60"
            >
              Sign out
            </button>
          </div>
        </aside>
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
      <Toaster position="top-right" richColors />
    </div>
  );
}

function SignIn({ signedInAs }: { signedInAs: string | null }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(
    signedInAs ? "That account is not authorised for this dashboard." : null,
  );

  const signIn = async () => {
    setBusy(true);
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/azeemadmin",
      extraParams: { prompt: "select_account" },
    });
    if (result.error) {
      setError("Sign-in failed. Please try again.");
      setBusy(false);
      return;
    }
    if (result.redirected) return;
    setBusy(false);
  };

  return (
    <div className="grid min-h-dvh place-items-center bg-muted px-5">
      <div className="w-full max-w-sm rounded-2xl border bg-background p-8 shadow-card">
        <p className="font-display text-2xl tracking-tight">Studio</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Private content dashboard. Sign in with the owner Google account.
        </p>
        {error && (
          <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}
        <button
          type="button"
          disabled={busy}
          onClick={signIn}
          className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-ink-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {busy ? "Opening Google…" : "Continue with Google"}
        </button>
        {signedInAs && (
          <button
            type="button"
            onClick={() => supabase.auth.signOut()}
            className="mt-3 w-full text-xs text-muted-foreground underline underline-offset-4"
          >
            Sign out of {signedInAs}
          </button>
        )}
      </div>
    </div>
  );
}
