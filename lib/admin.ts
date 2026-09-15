import { currentUser } from "@clerk/nextjs/server";

export async function isAdmin() {
  try {
    const user = await currentUser();
    const email = user?.emailAddresses[0]?.emailAddress;
    if (!email) return false;

    const adminEmailsStr = process.env.ADMIN_EMAILS || "";
    const adminEmails = adminEmailsStr
      .split(",")
      .map((e) => e.trim().toLowerCase());
    return adminEmails.includes(email.toLowerCase());
  } catch (error) {
    console.error("isAdmin check failed:", error);
    return false;
  }
}
