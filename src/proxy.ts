import { auth } from "@/src/auth";

// Next.js 16 proxy (formerly middleware). Protects /dashboard/* by
// redirecting unauthenticated users to the custom sign-in page.
export const proxy = auth((req) => {
  const isLoggedIn = !!req.auth;
  const isProtected = req.nextUrl.pathname.startsWith("/dashboard");

  if (isProtected && !isLoggedIn) {
    const signInUrl = new URL("/sign-in", req.nextUrl.origin);
    // Relative path only — SignInForm rejects absolute callbackUrls.
    signInUrl.searchParams.set(
      "callbackUrl",
      req.nextUrl.pathname + req.nextUrl.search
    );
    return Response.redirect(signInUrl);
  }
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
