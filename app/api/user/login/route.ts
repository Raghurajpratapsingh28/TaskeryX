import { PrismaClient } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();
const JWT_KEY = process.env.JWT_SECRET!;



export async function GET() {
    return NextResponse.json({messege:"You are in Login API" });
  }
  


  export async function POST(req: NextRequest,res:NextResponse) {
try {
    const {email,password} = await req.json()

    const user= await prisma.user.findUnique({where:{email}})
    if(!user || user.password !== password){
         return NextResponse.json({message : "Invalid email or password"},{status:401})}
    

         const token = jwt.sign({ userId: user.id, email: user.email },JWT_KEY, {
            expiresIn: "7d",
          });
            console.log("token:",token);
            
            
          return NextResponse.json({token, user: { id: user.id, email: user.email, name: user.name } }, { status: 201 });
      

} catch (error:any) {
    return NextResponse.json({error : error.message}, { status: 500 });
}
 



  }