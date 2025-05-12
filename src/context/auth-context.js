"use client";

import { validateSessionWithoutRedirect } from "@/actions/auth";
import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";

const AuthContext = createContext({
  user: null,
  setUser: () => null,
  loading: false,
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateUser = useCallback(async () => {
    // Check if the current URL contains 'admin'
    const isAdminRoute = window.location.pathname.includes("/admin");

    // If not an admin route, don't validate
    if (!isAdminRoute) {
      setLoading(false);
      return;
    }

    // Only run validation for admin routes
    setLoading(true);
    try {
      const { user } = await validateSessionWithoutRedirect();
      setUser(user);
    } catch (error) {
      console.error("Auth validation error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    validateUser();
  }, [validateUser]);

  // Add a pathname change listener to revalidate when navigating
  useEffect(() => {
    // Only available in browser environment
    if (typeof window !== "undefined") {
      const handleRouteChange = () => {
        validateUser();
      };

      // For single-page apps, listen for route changes
      window.addEventListener("popstate", handleRouteChange);

      // Cleanup listener
      return () => {
        window.removeEventListener("popstate", handleRouteChange);
      };
    }
  }, [validateUser]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
