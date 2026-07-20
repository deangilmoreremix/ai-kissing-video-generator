"use client";

import { SignInButton, SignUpButton as ClerkSignUpButton, UserButton } from "@clerk/nextjs";

export function LoginButton({ className }) {
  return (
    <SignInButton mode="modal">
      <button
        className={`inline-flex items-center justify-center gap-2 px-4 py-2 border border-zinc-800 text-zinc-200 rounded-lg font-medium hover:bg-zinc-900 hover:border-zinc-700 transition-all text-sm outline-none cursor-pointer ${className}`}
      >
        Sign In
      </button>
    </SignInButton>
  );
}

export function SignUpButton({ className }) {
  return (
    <ClerkSignUpButton mode="modal">
      <button
        className={`inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-lg font-medium transition-all text-sm outline-none cursor-pointer shadow-lg shadow-rose-500/20 ${className}`}
      >
        Sign Up
      </button>
    </ClerkSignUpButton>
  );
}

export function SignOutButton({ className }) {
  return <UserButton afterSignOutUrl="/" />;
}
