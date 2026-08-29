import Link from "next/link";
import { navItems } from "@/lib/site";
import { auth } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/admin";
import { AuthButtons } from "@/components/AuthButtons";

export async function Navbar() {
  const { userId } = await auth();
  const admin = userId ? await isAdmin() : false;

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 text-brand-ink shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex min-w-0 flex-col leading-tight">
          <span className="text-lg font-black text-brand-navy sm:text-xl">Project Area</span>
          <span className="hidden text-xs font-bold uppercase tracking-[0.14em] text-brand-blue sm:block">
            Academic Projects
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex max-w-[50vw] gap-1 overflow-x-auto rounded-md bg-slate-100 p-1 text-sm font-bold sm:max-w-none sm:overflow-visible">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded px-3 py-2 text-slate-700 transition hover:bg-white hover:text-brand-blue"
              >
                {item.label}
              </Link>
            ))}
            {userId && (
              <Link
                href="/dashboard"
                className="whitespace-nowrap rounded px-3 py-2 text-slate-700 transition hover:bg-white hover:text-brand-blue"
              >
                Dashboard
              </Link>
            )}
            {admin && (
              <Link
                href="/admin"
                className="whitespace-nowrap rounded px-3 py-2 text-slate-700 transition hover:bg-white hover:text-brand-blue"
              >
                Admin
              </Link>
            )}
          </div>
          <AuthButtons />
        </div>
      </div>
    </nav>
  );
}
