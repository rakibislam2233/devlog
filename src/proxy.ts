import { NextRequest, NextResponse } from "next/server";
import { createAuth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  // 1. Extract dynamic runtime environment variables
  const env = (request as any).context?.env || process.env;
  // 2. Initialize the Better-Auth instance
  const authInstance = createAuth(env);

  // 3. Fetch the secure session via internal API handler
  const sessionResponse = await authInstance.api.getSession({
    headers: request.headers,
  });

  // If sessionResponse is null, gracefully fall back to null without crashing
  const session = sessionResponse ? sessionResponse.session : null;
  const { pathname } = request.nextUrl;

  // 4. Protection Guard: If user tries to access /dashboard without a valid session
  if (pathname.startsWith("/dashboard") && !session) {
    // Construct absolute fallback URL pointing to the authorization gateway
    const loginUrl = new URL("/auth/login", request.url);

    // Optional: Keeps track of where the user originally wanted to go
    loginUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(loginUrl);
  }

  // 5. Anti-Loop Guard: If authenticated user tries to access auth pages, send them back to dashboard
  if (pathname.startsWith("/auth") && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// 6. Config Routing Filter: Defines precisely which paths trigger this middleware execution
export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
