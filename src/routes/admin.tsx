import { createFileRoute, redirect } from "@tanstack/react-router";

/** Convenience alias so /admin always lands on the real dashboard route. */
export const Route = createFileRoute("/admin")({
  beforeLoad: () => {
    throw redirect({ to: "/azeemadmin" });
  },
  component: () => null,
});
