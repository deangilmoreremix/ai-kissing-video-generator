"use client";

import { SignUp } from "@clerk/nextjs";
import { FaInfoCircle } from "react-icons/fa";

export default function SignUpPage() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-bg-page px-6 text-primary-text select-none">
      <div className="relative bg-bg-card border border-divider w-full max-w-md rounded-lg p-8 space-y-8 shadow-2xl">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-2xl text-primary font-black shadow-md shadow-primary/15">
            A
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight">Create Your Studio Account</h2>
          <p className="text-xs font-semibold text-secondary-text leading-relaxed px-4">
            Sign up to enable predictions, save generation history, and top up credits packages.
          </p>
        </div>

        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/login"
          fallbackRedirectUrl="/"
        />

        <div className="flex items-start gap-2.5 bg-primary/5 border border-primary/10 p-3.5 rounded text-[11px] leading-relaxed text-secondary-text">
          <FaInfoCircle className="text-primary text-xs shrink-0 mt-0.5" />
          <span>
            By signing up, you agree to our Terms of Service. Purchases are stripe-secured and credit balance addition is automated.
          </span>
        </div>
      </div>
    </div>
  );
}
