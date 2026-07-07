import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { clearStoredSession, loadStoredSession, saveStoredSession, validateLogin } from "../services/auth";

type AuthUser = {
  email: string;
  password: string;
  name: string;
  avatarUri: string;
};

type AuthContextType = {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  error: string;
  setError: (message: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function restoreSession() {
      const savedUser = await loadStoredSession();
      if (savedUser) {
        setUser(savedUser);
      }
    }

    restoreSession();
  }, []);

  const login = async (email: string, password: string) => {
    const matchedUser = validateLogin(email, password);
    if (!matchedUser) {
      setError("Email o password non validi");
      return false;
    }

    setError("");
    setUser(matchedUser);
    await saveStoredSession(matchedUser);
    return true;
  };

  const logout = async () => {
    setUser(null);
    await clearStoredSession();
  };

  const value = useMemo(() => ({ user, login, logout, error, setError }), [user, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}
