import React from "react";
import { Menu, Moon, Search, Settings, Sun } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black">
      {/* Left Section - Menu Button (only when sidebar is collapsed) & Search Bar (always visible) */}
      <div className="flex items-center gap-4">
        {/* Show Menu Button Only When Sidebar is Collapsed */}
        {isSidebarCollapsed && (
          <button
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Menu className="h-8 w-8 dark:text-white" />
          </button>
        )}

        {/* Search Box (Always Visible, Adjusted for Mobile) */}
        <div className="relative flex h-min w-[200px] md:w-[250px] sm:w-[180px]">
          <Search className="absolute left-[4px] top-1/2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white" />
          <input
            className="w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
            type="search"
            placeholder="Search..."
          />
        </div>
      </div>

     
      <div className="flex items-center">
        

        <button
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {isDarkMode ? (
            <Sun className="h-6 w-6 cursor-pointer dark:text-white" />
          ) : (
            <Moon className="h-6 w-6 cursor-pointer dark:text-white" />
          )}
        </button>

        {/* Settings Button */}
        <Link
          href={"/settings"}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Settings className="h-6 w-6 cursor-pointer dark:text-white" />
        </Link>

        {/* Divider Line */}
        <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>
      </div>
    </div>
  );
};

export default Navbar;
