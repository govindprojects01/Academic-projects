"use client";

import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";

export function AuthButtons() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Show when="signed-out">
        <SignInButton mode="modal">
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-black text-brand-blue shadow-sm ring-1 ring-slate-200 transition hover:bg-brand-mist focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            Sign In
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-brand-green px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-100"
          >
            Sign Up
          </button>
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <div className="flex items-center gap-3 rounded-md bg-white px-4 py-2 text-sm font-bold text-brand-navy shadow-sm">
          <span>Account</span>
          <UserButton />
        </div>
      </Show>
    </div>
  );
}
