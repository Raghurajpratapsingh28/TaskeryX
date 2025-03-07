"use client";
import { Home, Icon, LockIcon, LucideIcon, X, Briefcase, Search, Settings, User, Users, ChevronUp, ChevronDown, AlertCircle, ShieldAlert, AlertTriangle, AlertOctagon, Layers3} from "lucide-react";
import  Link from 'next/link';
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux";
import { setIsSidebarCollapsed } from "@/state";

const Sidebar = () => {
// eslint-disable-next-line no-unused-vars
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const sidebarClassNames =
    `fixed flex flex-col h-[100%] justify-between shadow-xl transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white ${isSidebarCollapsed? "w-0 hidden":"w-64"} `;

  return (
    <div className={sidebarClassNames}>
      <div className="flex h-[100%] w-full flex-col justify-start">
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            TaskeryX
          </div>
          {isSidebarCollapsed ? null :(
            <button className="hover:bg-gray-300 px-3 py-3" onClick={()=>{dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}}>
              <X className="h-6 w-6 text-gray-500 dark:text-white"/>
            </button>
          )}
        </div>
        {/*Team */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image src={"/logo.png"} alt="task" width={40} height={40} />
          <div>
            <h3 className="text-black text-md font-bold tracking-wide dark:text-gray-200">
              Your Team
            </h3>
            <div className="mt-1 flex items-center gap-2">
              <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400"/>
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>
        {/*Navbar Links*/}
        <nav className="z-10 w-full ">
          <SidebarLink icon={Home} label="Home" href="/"/>
          <SidebarLink icon={Briefcase} label="Timeline" href="/timeline"/>
          <SidebarLink icon={Search} label="Search" href="/search"/>
          <SidebarLink icon={Settings} label="Settings" href="/settings"/>
          <SidebarLink icon={User} label="Users" href="/users"/>
          <SidebarLink icon={Users} label="Teams" href="/teams"/>
        </nav>
        <button onClick={()=> setShowProjects((prev:any)=>!prev)} 
        className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Projects</span>
          {showProjects?(<ChevronUp className="h-5 w-5 "/>): <ChevronDown className="h-5 w-5"/>}
        </button>
        {/* Project List */}


        {/* Priority */}
        <button onClick={()=> setShowPriority((prev:any)=>!prev)} 
        className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Priority</span>
          {showPriority?(<ChevronUp className="h-5 w-5 "/>): <ChevronDown className="h-5 w-5"/>}
        </button>
            {showPriority && (<>
              <SidebarLink icon={AlertCircle} label="Urgent" href="/priority/urgent"/>
              <SidebarLink icon={ShieldAlert} label="High" href="/priority/high"/>
              <SidebarLink icon={AlertTriangle} label="Medium" href="/priority/medium"/>
              <SidebarLink icon={AlertOctagon} label="Low" href="/priority/low"/>
              <SidebarLink icon={Layers3} label="Backlog" href="/priority/backlog"/>
              </>)}



        {/* Priority List */}
      </div>
    </div>
  );
};

interface sidebarLinkProps{
  href:string;
  icon:LucideIcon;
  label:string;
  // isCollapsed:boolean;
}

const SidebarLink = ({
  href,
  icon:Icon,
  label,
  // isCollapsed
}:sidebarLinkProps)=>{
  const pathname=usePathname();
  const isActive = pathname === href || (pathname === "/" && href === "/dashboard")
  const screenWidth = window.innerWidth;

  

  return (
    <Link href={href} className="w-full">
      <div className={` relative flex cursor-pointer items-center gap-3 transition-colors
      hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700
      ${isActive? "bg-gray-100 text-white dark:bg-gray-600":""} justify-start ps-8 py-3`}>
        {isActive && (
          <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200  "/>
        )}
        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100"/>
        <span className={`font-medium text-gray-800 dark:text-gray-100`}>
          {label}
        </span>
      </div>
    </Link>

  )
}

export default Sidebar;
