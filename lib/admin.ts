import { currentUser } from "@clerk/nextjs/server";

export async function isAdmin() {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  if (!email) return false;

  const adminEmailsStr = process.env.ADMIN_EMAILS || "";
  const adminEmails = adminEmailsStr
    .split(",")
    .map((e) => e.trim().toLowerCase());
  return adminEmails.includes(email.toLowerCase());
}
