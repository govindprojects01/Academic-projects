import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publishableKey:
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
    "pk_test_cmVsaWV2ZWQtYmVkYnVnLTI4MzcuY2xlcmsuYWNjb3VudHMuZGV2JA",
  secretKey:
    process.env.CLERK_SECRET_KEY ||
    "sk_test_XQlHFhjUhSYwSrpGwIVLR8uEwjUWpqqPLLeraYhIia",
});

export const config = {
  runtime: "nodejs",
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
