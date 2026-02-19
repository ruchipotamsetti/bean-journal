import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If logged in, go straight to logs
  if (user) {
    redirect("/logs");
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg-primary bg-noise">
      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          {/* Steam animation */}
          <div className="relative mx-auto mb-4 w-fit">
            <div className="absolute -top-6 left-1/2 flex -translate-x-1/2 gap-2">
              <div className="h-6 w-1 rounded-full bg-accent-warm/30 animate-steam" style={{ animationDelay: "0s" }} />
              <div className="h-5 w-1 rounded-full bg-accent-warm/20 animate-steam" style={{ animationDelay: "0.8s" }} />
              <div className="h-6 w-1 rounded-full bg-accent-warm/30 animate-steam" style={{ animationDelay: "1.6s" }} />
            </div>
            {/* Coffee bean icon */}
            <svg viewBox="0 0 48 48" className="mx-auto size-16 text-accent-warm" fill="currentColor" aria-hidden="true">
              <ellipse cx="24" cy="24" rx="12" ry="18" transform="rotate(-20 24 24)" />
              <path d="M24 8 Q28 24 24 40" fill="none" stroke="#FEF7ED" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            </svg>
          </div>

          <h1 className="text-4xl tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-7xl">
            Bean Journal
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg text-text-secondary md:text-xl">
            Your personal coffee memory. Track what you love, learn how to brew it.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="cursor-bean">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline" className="cursor-bean">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Wavy divider */}
      <div className="divider-wavy" aria-hidden="true" />

      {/* Footer */}
      <footer className="bg-text-primary/95 py-12 text-bg-primary">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 text-center">
          {/* Decorative coffee beans */}
          <div className="mb-4 flex justify-center gap-3 opacity-30">
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor"><ellipse cx="12" cy="12" rx="5" ry="8" transform="rotate(-30 12 12)"/><path d="M12 5Q14 12 12 19" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/></svg>
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor"><ellipse cx="12" cy="12" rx="5" ry="8" transform="rotate(15 12 12)"/><path d="M12 5Q14 12 12 19" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/></svg>
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor"><ellipse cx="12" cy="12" rx="5" ry="8" transform="rotate(-10 12 12)"/><path d="M12 5Q14 12 12 19" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/></svg>
          </div>
          <p className="font-heading text-xl">
            Bean Journal
          </p>
          <p className="mt-2 text-sm text-bg-primary/60">
            Made with ☕ and code
          </p>
        </div>
      </footer>
    </div>
  );
}
