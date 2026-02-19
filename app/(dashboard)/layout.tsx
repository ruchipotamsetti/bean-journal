import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg-primary bg-noise">
      <Navbar userEmail={user.email ?? ""} />
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-8 sm:px-6 md:py-16">{children}</main>

      {/* Wavy divider */}
      <div className="divider-wavy" aria-hidden="true" />

      {/* Footer */}
      <footer className="bg-text-primary/95 py-12 text-bg-primary">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 text-center">
          <div className="mb-3 flex justify-center gap-3 opacity-30">
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor"><ellipse cx="12" cy="12" rx="5" ry="8" transform="rotate(-30 12 12)"/><path d="M12 5Q14 12 12 19" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/></svg>
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor"><ellipse cx="12" cy="12" rx="5" ry="8" transform="rotate(15 12 12)"/><path d="M12 5Q14 12 12 19" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/></svg>
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor"><ellipse cx="12" cy="12" rx="5" ry="8" transform="rotate(-10 12 12)"/><path d="M12 5Q14 12 12 19" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/></svg>
          </div>
          <p className="font-heading text-xl">Bean Journal</p>
          <p className="mt-2 text-sm text-bg-primary/60">
            Made with ☕ and code
          </p>
        </div>
      </footer>
    </div>
  );
}
