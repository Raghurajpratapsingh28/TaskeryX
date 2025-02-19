import { NextResponse } from "next/server";

export async function GET(res:NextResponse) {
    
try {
    const response = NextResponse.json({
        message:"Logout Succesfull",
        success:true
    })
    response.cookies.set("token","",{httpOnly:true,expires:new Date()});

    return response;

} catch (error) {
    
}}