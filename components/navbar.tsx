"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

function CoffeeBeanIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <ellipse cx="12" cy="12" rx="6" ry="9" transform="rotate(-20 12 12)" />
      <path d="M12 4 Q14 12 12 20" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function Navbar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const navLinks = [
    { href: "/logs", label: "Your Journey" },
    { href: "/recipes", label: "Brew Guides" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-bg-primary/95 shadow-sm backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link
            href="/logs"
            className="flex items-center gap-2 font-heading text-xl text-text-primary cursor-bean"
          >
            <CoffeeBeanIcon className="size-6 text-accent-warm" />
            Bean Journal
          </Link>
          <nav className="hidden gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 cursor-bean ${
                  pathname.startsWith(link.href)
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.label}
                {pathname.startsWith(link.href) && (
                  <span className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-accent-pop" />
                )}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <span className="text-sm text-text-secondary">{userEmail}</span>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-text-primary md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border-tan bg-bg-primary px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  pathname.startsWith(link.href)
                    ? "bg-bg-accent text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex items-center justify-between border-t border-border-tan pt-3">
            <span className="text-sm text-text-secondary">{userEmail}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
