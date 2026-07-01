"use client";

import { useState } from "react";
import { FaKey, FaCheck, FaInfoCircle } from "react-icons/fa";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("muapi_api_key") || "";
    }
    return "";
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem("muapi_api_key", apiKey.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <main className="flex-1 overflow-y-auto bg-zinc-950 px-6 py-12 text-zinc-100">
      <div className="mx-auto max-w-2xl">
        <div className="border-b border-zinc-800 pb-5 mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Settings
          </h1>
          <p className="mt-1.5 text-xs text-zinc-500">
            Configure your MUAPI API key to generate videos using your own account.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-850 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
                <FaKey className="text-sm" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">MUAPI API Key</h2>
                <p className="text-[11px] text-zinc-400">
                  Enter your personal MUAPI key to use your own quota.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your MUAPI key..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-xs text-zinc-200 focus:outline-none focus:border-rose-500/40 focus:ring-1 focus:ring-rose-500/20"
              />

              <button
                onClick={handleSave}
                disabled={!apiKey.trim()}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-bold text-xs transition-all cursor-pointer"
              >
                {saved ? (
                  <>
                    <FaCheck className="text-[10px]" />
                    Saved!
                  </>
                ) : (
                  "Save API Key"
                )}
              </button>
            </div>

            <div className="mt-4 p-3 bg-zinc-950/60 border border-zinc-800 rounded-lg">
              <div className="flex items-start gap-2">
                <FaInfoCircle className="text-rose-400 text-[10px] mt-0.5 flex-shrink-0" />
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Your key is stored locally in your browser. If you clear your browser data, you will need to re-enter it. Without a key, the application cannot generate videos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
