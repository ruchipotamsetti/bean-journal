"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/logs");
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-primary bg-noise px-4 sm:px-6">
      <Card className="w-full max-w-md border-border-tan shadow-lg">
        <CardHeader className="text-center">
          <svg viewBox="0 0 48 48" className="mx-auto mb-2 size-12 text-accent-warm" fill="currentColor" aria-hidden="true">
            <ellipse cx="24" cy="24" rx="12" ry="18" transform="rotate(-20 24 24)" />
            <path d="M24 8 Q28 24 24 40" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          </svg>
          <CardTitle className="font-heading text-2xl text-text-primary">
            Welcome back
          </CardTitle>
          <CardDescription className="text-text-secondary">
            Sign in to your Bean Journal
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
            <p className="text-sm text-text-secondary">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-medium text-accent-warm underline underline-offset-4 hover:text-accent-warm/80">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
