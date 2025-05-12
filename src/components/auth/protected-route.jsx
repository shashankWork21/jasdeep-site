"use client";

import { useAuth } from "@/context/auth-context";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let redirectTimeout;

    if (!loading) {
      if (!user) {
        redirectTimeout = setTimeout(() => {
          router.push("/");
        }, 100);
      } else {
        clearTimeout(redirectTimeout);
      }
    }

    return () => {
      if (redirectTimeout) {
        clearTimeout(redirectTimeout);
      }
    };
  }, [user, loading, router, pathname]);

  return <>{children}</>;
}
