import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/src/auth";
import { SignInForm } from "@/src/components/auth/SignInForm";
import { Skeleton } from "@/src/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Sign in | DevStash",
};

export default async function SignInPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    // SignInForm reads ?callbackUrl via useSearchParams, which needs a
    // Suspense boundary so the rest of the page can still be prerendered.
    <Suspense fallback={<Skeleton className="h-[26rem] w-full max-w-sm" />}>
      <SignInForm />
    </Suspense>
  );
}
