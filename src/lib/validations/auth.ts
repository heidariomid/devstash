import { z } from "zod";

// Validation schemas for auth flows. Shared so API routes and any
// future client-side forms validate against the same rules.

export const registerSchema = z
  .object({
    // Custom `error` gives a friendly message when the field is missing or
    // not a string, instead of Zod's raw "expected string, received undefined".
    name: z
      .string({ error: "Name is required." })
      .trim()
      .min(1, "Name is required."),
    // Trim + lowercase BEFORE validating the format — Zod runs `.email()`
    // on the transformed value, so leading/trailing spaces or uppercase in
    // the raw input don't cause a false "invalid email".
    email: z
      .string({ error: "Enter a valid email address." })
      .trim()
      .toLowerCase()
      .pipe(z.email("Enter a valid email address.")),
    password: z
      .string({ error: "Password must be at least 8 characters." })
      .min(8, "Password must be at least 8 characters."),
    confirmPassword: z
      .string({ error: "Please confirm your password." })
      .min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
