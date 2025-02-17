import { NextRequest, NextResponse } from 'next/server';
// import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";

const prisma = new PrismaClient();
dotenv.config();

export async function GET() {
  return NextResponse.json({ username: "harkirat", email: "harkirat@gmail.com" });
}

const JWT_KEY = process.env.JWT_SECRET!;
if (!JWT_KEY) {
  throw new Error("JWT_SECRET is missing from .env ");
}

export async function POST(req: NextRequest) {
  
  
  try {
    const { name, email, password, role } = await req.json();

    // Checking......
    console.log("Checking User Exist or Not");
    
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Hash password
    // const salt = await bcryptjs.genSalt(10);
    // const hashedPassword = await bcryptjs.hash(password, 10);
    // console.log("Hashed Password:",hashedPassword);
    

    // Creating User if user is not there
    console.log("Putting Data into DataBase");
    
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role,
      },
    });

    // Generate JWT token
   
    
    const token = jwt.sign({ userId: user.id, email: user.email },JWT_KEY, {
      expiresIn: "1d",
    });
      console.log("token:",token);
      
    return NextResponse.json({ message: "User registered successfully",token }, { status: 201 });

  } catch (error:any) {
    // console.log("Signup Error:", error);
    return NextResponse.json({error:error.message}, { status: 500 });
  }
}
