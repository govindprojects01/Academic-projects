import { clerkMiddleware } from "@clerk/nextjs/server";

// Keep Clerk middleware on authenticated application routes and API endpoints.
// Public marketing/SEO pages must remain directly crawlable by search engines;
// applying the development Clerk instance to every public route causes repeated
// dev-browser handshake redirects for crawlers that do not carry browser cookies.
export default clerkMiddleware();

export const config = {
  matcher: [
    "/dashboard(.*)",
    "/admin(.*)",
    "/api(.*)",
    "/trpc(.*)",
    "/__clerk/(.*)",
  ],
};
