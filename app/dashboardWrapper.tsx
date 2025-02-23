import React from 'react';
import Navbar from './Components/navbar';
import Sidebar from './Components/Sidebar';

interface DashboardWrapperProps {
  children: React.ReactNode;
}

const DashboardWrapper: React.FC<DashboardWrapperProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-500">
        <Sidebar/>
      <main className="flex w-full flex-col bg-gray-50 dark:bg-dark-bg md:pl-64">
       <Navbar/>
        {children}
        Hello
      </main>
    </div>
  );
};

export default DashboardWrapper;