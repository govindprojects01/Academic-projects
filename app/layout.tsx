import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.projectarea.online"),

  title: {
    default: "Project Area | Academic Projects, Thesis & Printing in Varanasi",
    template: "%s | Project Area",
  },

  description:
    "Project Area provides academic project assistance, MBA and B.Tech projects, thesis and dissertation support, research papers, PPTs, printing and thesis binding near BHU Gate, Varanasi.",

  alternates: {
    canonical: "https://www.projectarea.online/",
  },

  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: "wZSeGy2bVKXqrvDtPFZktxl03KWCBdQwtiFwEuCvUPE",
  },

  openGraph: {
    title: "Project Area | Academic Projects & Thesis Services in Varanasi",
    description:
      "Academic project, thesis, research paper, PPT, printing and binding services near BHU Gate, Varanasi.",
    url: "https://www.projectarea.online/",
    siteName: "Project Area",
    type: "website",
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "Project Area | Academic Projects & Thesis Services in Varanasi",
    description:
      "Academic project, thesis, research paper, PPT, printing and binding services near BHU Gate, Varanasi.",
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
        <ClerkProvider afterSignOutUrl="/">
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
