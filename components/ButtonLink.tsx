import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
  variant?: "primary" | "secondary" | "whatsapp";
  className?: string;
};

const variants = {
  primary: "bg-brand-blue text-white hover:bg-brand-navy",
  secondary: "bg-white text-brand-blue ring-1 ring-slate-200 hover:bg-brand-mist",
  whatsapp: "bg-brand-green text-white hover:bg-green-600",
};

export function ButtonLink({
  href,
  children,
  external = false,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  const classes = `inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 text-sm font-black shadow-sm transition focus:outline-none focus:ring-4 focus:ring-blue-100 ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
