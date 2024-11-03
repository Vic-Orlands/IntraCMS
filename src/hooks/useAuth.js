"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "../libs/firebase/auth";

export const AuthContext = createContext(undefined);

// Auth Provider component
export const AuthProvider = ({ children, initSession }) => {
  const [uid, setUid] = useState(initSession);
  const [toggleSidebar, setToggleSidebar] = useState(false)

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser) => {
      if (authUser) {
        setUid(authUser.uid);
      } else {
        setUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleToggleSideBar = () => {
    setToggleSidebar((prevState) => !prevState)
  }

  const value = useMemo(
    () => ({ uid, toggleSidebar, handleToggleSideBar }),
    [uid, toggleSidebar]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
