import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/src/auth";
import { RegisterForm } from "@/src/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create an account | DevStash",
};

export default async function RegisterPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }

  return <RegisterForm />;
}
