"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";

type UserRole = "member" | "manager" | "admin";

interface MainLayoutProps {
  children: React.ReactNode;
  userRole?: UserRole;
}

const MainLayout = ({ children, userRole = "member" }: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        userRole={userRole}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative lg:ml-64 h-screen overflow-hidden">
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 overflow-y-auto p-4 mt-20">{children}</main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default MainLayout;
