"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaKey, FaSave, FaTrashAlt, FaInfoCircle, FaExternalLinkAlt } from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

export default function SettingsPage() {
  const { isLoaded, isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [key, setKey] = useState("");
  const [maskedKey, setMaskedKey] = useState(null);
  const [hasKey, setHasKey] = useState(false);
  const [showKey, setShowKey] = useState(false);

  async function fetchSettings() {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/settings");
      setHasKey(data.hasKey);
      setMaskedKey(data.maskedKey);
      setKey("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to load settings.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isSignedIn) {
      fetchSettings();
    } else if (isLoaded) {
      setLoading(false);
    }
  }, [isLoaded, isSignedIn]);

  const handleSave = async () => {
    if (!key.trim()) {
      toast.error("Enter your MuAPI key before saving.");
      return;
    }
    setSaving(true);
    try {
      const { data } = await axios.post("/api/settings", { muApiKey: key });
      setHasKey(data.hasKey);
      setMaskedKey(data.maskedKey);
      setKey("");
      setShowKey(false);
      toast.success("Your API key has been saved.");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to save API key.");
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async () => {
    setSaving(true);
    try {
      const { data } = await axios.post("/api/settings", { muApiKey: "" });
      setHasKey(data.hasKey);
      setMaskedKey(data.maskedKey);
      setKey("");
      toast.success("API key removed. Generation will use the shared key if available.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove API key.");
    } finally {
      setSaving(false);
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-zinc-950 text-zinc-100">
        <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex-1 flex items-center justify-center bg-zinc-950 text-zinc-100 px-6">
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-lg p-8 max-w-md text-center space-y-5">
          <div className="w-12 h-12 mx-auto rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <FaKey />
          </div>
          <h1 className="text-lg font-bold text-white">Sign in to manage settings</h1>
          <p className="text-xs text-zinc-400">
            Your API key is stored securely on your account. Sign in to continue.
          </p>
          <button
            onClick={() => openSignIn()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-lg text-sm font-semibold transition-all cursor-pointer shadow-lg shadow-rose-500/20"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="flex-1 bg-zinc-950 text-zinc-100 px-6 py-10">
        <div className="mx-auto max-w-2xl space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <FaKey className="text-rose-500 text-sm" />
              Account Settings
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Manage your personal MuAPI key so you can generate videos using your own account.
            </p>
          </div>

          <section className="bg-zinc-900/60 border border-zinc-800 rounded-lg p-6 space-y-5">
            <div className="flex items-start gap-2.5 bg-rose-500/5 border border-rose-500/10 p-3.5 rounded text-[11px] leading-relaxed text-zinc-300">
              <FaInfoCircle className="text-rose-400 text-xs shrink-0 mt-0.5" />
              <span>
                Provide your own MuAPI key to generate videos under your account. Get one from{" "}
                <a
                  href="https://muapi.ai/access-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-400 underline inline-flex items-center gap-1"
                >
                  muapi.ai/access-keys <FaExternalLinkAlt className="text-[9px]" />
                </a>
                . If no key is set, the app falls back to the shared server key.
              </span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                MuAPI API Key
              </label>

              {hasKey && !key && (
                <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded p-3">
                  <span className="text-xs text-zinc-400 font-mono">{maskedKey}</span>
                  <span className="text-[10px] text-emerald-400 font-semibold uppercase">Saved</span>
                </div>
              )}

              <div className="relative">
                <input
                  type={showKey ? "text" : "password"}
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder={hasKey ? "Enter a new key to replace the current one" : "Paste your MuAPI key"}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-3 pr-20 text-xs text-zinc-200 focus:outline-none focus:border-rose-500/40 focus:ring-1 focus:ring-rose-500/20 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowKey((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-zinc-400 hover:text-zinc-200 px-2 py-1 transition-colors"
                >
                  {showKey ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                disabled={saving || !key.trim()}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg ${
                  saving || !key.trim()
                    ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white shadow-rose-500/20 cursor-pointer"
                }`}
              >
                <FaSave className="text-xs" />
                {saving ? "Saving..." : "Save Key"}
              </button>

              {hasKey && (
                <button
                  onClick={handleRemove}
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border border-zinc-800 text-zinc-400 hover:text-rose-300 hover:border-rose-500/30 transition-all cursor-pointer disabled:opacity-60"
                >
                  <FaTrashAlt className="text-xs" />
                  Remove
                </button>
              )}
            </div>
          </section>

          <div className="text-center">
            <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
              ← Back to the studio
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <Toaster position="top-center" toastOptions={{ style: { background: "#18181b", color: "#fff", border: "1px solid #3f3f46" } }} />
    </>
  );
}
