import { NextResponse } from "next/server";

import { createUser } from "@/src/lib/auth/register";

// Kept alongside the registerUser Server Action for future mobile/CLI
// clients. Both share the same createUser core, so validation, duplicate
// checks and password hashing can't drift apart.
export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const result = await createUser(body);

  if (!result.success) {
    return NextResponse.json(
      { success: false, error: result.error },
      { status: result.status }
    );
  }

  return NextResponse.json(
    { success: true, data: result.data },
    { status: 201 }
  );
}
