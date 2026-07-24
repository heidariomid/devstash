"use server";

import { AuthError } from "next-auth";
import { unstable_rethrow } from "next/navigation";

import { signIn, signOut } from "@/src/auth";
import { createUser } from "@/src/lib/auth/register";
import { signInSchema } from "@/src/lib/validations/auth";

export interface ActionResult {
  success: boolean;
  error?: string;
}

export async function signInWithCredentials(
  formData: FormData
): Promise<ActionResult> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }

  try {
    // redirectTo is handled by the caller instead, so we can surface errors
    // in the form. `redirect: false` makes signIn throw on bad credentials
    // rather than redirecting to NextAuth's error page.
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      // CredentialsSignin is the only error the provider raises for a bad
      // email/password pair. Anything else is unexpected.
      if (error.type === "CredentialsSignin") {
        return { success: false, error: "Invalid email or password." };
      }
      return { success: false, error: "Could not sign in. Please try again." };
    }
    throw error;
  }
}

export async function signInWithGitHub(): Promise<ActionResult> {
  try {
    await signIn("github", { redirectTo: "/dashboard" });
    return { success: true };
  } catch (error) {
    // signIn redirects by throwing — let Next.js handle that control flow.
    unstable_rethrow(error);
    console.error("[auth] GitHub sign-in failed:", error);
    return {
      success: false,
      error: "Could not sign in with GitHub. Please try again.",
    };
  }
}

export async function signOutAction(): Promise<void> {
  await signOut({ redirectTo: "/sign-in" });
}

export async function registerUser(formData: FormData): Promise<ActionResult> {
  const result = await createUser({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  return result.success
    ? { success: true }
    : { success: false, error: result.error };
}
