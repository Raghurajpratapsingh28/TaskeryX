"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import {toast} from "react-hot-toast";

export default function Home() {
const router = useRouter();
  const  logout=async()=>{
    try {
     await axios.get("http://localhost:3000/api/user/logout")
     toast.success("logout successful")
     router.push("/login")
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }
  return (
   <div>
   <button
   onClick={logout} 
    className="bg-black text-slate-50">Logout</button>
  
   </div>

  );
}
