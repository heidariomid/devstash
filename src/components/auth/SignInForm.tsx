"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { signInWithCredentials, signInWithGitHub } from "@/src/actions/auth";
import { GitHubIcon } from "@/src/components/auth/GitHubIcon";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Separator } from "@/src/components/ui/separator";

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isGitHubPending, startGitHubTransition] = useTransition();

  // Only accept same-origin relative paths so a crafted ?callbackUrl=
  // can't bounce the user to an external site after signing in.
  const rawCallbackUrl = searchParams.get("callbackUrl");
  const callbackUrl =
    rawCallbackUrl?.startsWith("/") && !rawCallbackUrl.startsWith("//")
      ? rawCallbackUrl
      : "/dashboard";

  // onSubmit + preventDefault rather than <form action={...}>: React resets
  // uncontrolled fields after a form action runs, which would wipe the email
  // and password on a failed sign-in attempt.
  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setError(null);
    startTransition(async () => {
      const result = await signInWithCredentials(formData);

      if (!result.success) {
        setError(result.error ?? "Could not sign in.");
        return;
      }

      toast.success("Signed in successfully.");
      // The session cookie is set by the action; refresh so server
      // components pick it up before navigating.
      router.replace(callbackUrl);
      router.refresh();
    });
  }

  function handleGitHubSignIn() {
    setError(null);
    startGitHubTransition(async () => {
      const result = await signInWithGitHub();
      if (!result.success) {
        setError(result.error ?? "Could not sign in with GitHub.");
      }
    });
  }

  const isBusy = isPending || isGitHubPending;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          Welcome back. Sign in to access your stash.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGitHubSignIn}
          disabled={isBusy}
        >
          {isGitHubPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <GitHubIcon className="size-4" />
          )}
          Sign in with GitHub
        </Button>

        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">or</span>
          <Separator className="flex-1" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              disabled={isBusy}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              required
              disabled={isBusy}
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={isBusy}>
            {isPending && <Loader2 className="size-4 animate-spin" />}
            Sign in
          </Button>
        </form>
      </CardContent>

      <CardFooter>
        <p className="w-full text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-foreground underline-offset-4 hover:underline">
            Create one
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
