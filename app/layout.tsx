import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Project Area | Academic Project Assistance",
    template: "%s | Project Area",
  },
  description:
    "Academic project help, thesis writing, printing, binding and online form services near BHU Gate, Varanasi.",
  robots: "index, follow",
  verification: {
    google: "wZSeGy2bVKXqrvDtPFZktxl03KWCBdQwtiFwEuCvUPE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider afterSignOutUrl="/">{children}</ClerkProvider>
      </body>
    </html>
  );
}
