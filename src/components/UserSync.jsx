"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useUser } from "@clerk/nextjs";

const UserContext = createContext({
  credits: 0,
  hasApiKey: false,
  userId: null,
  loading: true,
  refresh: async () => {},
});

export function UserSync({ children }) {
  const { isSignedIn, isLoaded } = useUser();
  const [credits, setCredits] = useState(0);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/user");
      if (res.ok) {
        const data = await res.json();
        setCredits(data.credits ?? 0);
        setHasApiKey(Boolean(data.hasApiKey));
        setUserId(data.id ?? null);
      }
    } catch (err) {
      console.error("Failed to load user profile", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      setCredits(0);
      setHasApiKey(false);
      setUserId(null);
      setLoading(false);
      return;
    }
    refresh();
  }, [isLoaded, isSignedIn, refresh]);

  return (
    <UserContext.Provider value={{ credits, hasApiKey, userId, loading, refresh }}>
      {children}
    </UserContext.Provider>
  );
}

export function useAppUser() {
  return useContext(UserContext);
}
