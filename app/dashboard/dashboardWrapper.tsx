"use client";
import React, { useEffect } from "react";
import Navbar from "../Components/navbar";
import Sidebar from "../Components/Sidebar";
import StoreProvider, { useAppSelector } from "../redux";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector(
    (state) => state.global.isDarkMode);

    useEffect(() => {
      if(isDarkMode){
        document.documentElement.classList.add("dark")
      } 
      else{
        document.documentElement.classList.remove("dark") 
      }
    }, [])
    

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      <Sidebar />
      <main className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg ${
        isSidebarCollapsed? "" : "md:pl-64"}`}>
        <Navbar />
        {children}
        Page
      </main>
    </div>
  );
};

interface DashboardWrapperProps {
  children: React.ReactNode;
}

const DashboardWrapper: React.FC<DashboardWrapperProps> = ({ children }) => {
  return (
    <StoreProvider>
      <DashboardLayout> {children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
