import bcrypt from "bcryptjs";

import { prisma } from "@/src/lib/prisma";
import { registerSchema } from "@/src/lib/validations/auth";

const SALT_ROUNDS = 10;

export interface RegisteredUser {
  id: string;
  name: string | null;
  email: string;
}

export type RegisterResult =
  | { success: true; data: RegisteredUser }
  | { success: false; error: string; status: number };

// Shared registration core so the Server Action (used by the register form)
// and the /api/auth/register route (kept for future mobile/CLI clients)
// validate and create users through exactly the same path.
export async function createUser(input: unknown): Promise<RegisterResult> {
  const parsed = registerSchema.safeParse(input);

  if (!parsed.success) {
    // Surface the first validation issue as the user-facing message.
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid input.",
      status: 400,
    };
  }

  // Schema has already trimmed the name and normalized the email
  // (trim + lowercase).
  const { name, email, password } = parsed.data;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return {
        success: false,
        error: "A user with this email already exists.",
        status: 409,
      };
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
      select: { id: true, name: true, email: true },
    });

    return { success: true, data: user };
  } catch (error) {
    console.error("[auth] Failed to register user:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
      status: 500,
    };
  }
}
