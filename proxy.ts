import { clerkMiddleware } from "@clerk/nextjs/server";

// Public marketing pages should remain crawlable without invoking Clerk's
// development-instance middleware. Keep Clerk middleware on authenticated
// areas and API endpoints only.
export default clerkMiddleware();

export const config = {
  matcher: [
    "/admin(.*)",
    "/dashboard(.*)",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api(.*)",
    "/trpc(.*)",
    "/__clerk(.*)",
  ],
};
