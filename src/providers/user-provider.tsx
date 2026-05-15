"use client";

import { createContext, useContext, ReactNode } from "react";

interface UserContextType {
  role: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ 
  children, 
  role 
}: { 
  children: ReactNode; 
  role: string | null;
}) {
  return (
    <UserContext.Provider value={{ role }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
