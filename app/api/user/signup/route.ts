import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
import { z } from "zod";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
dotenv.config();

const JWT_KEY = process.env.JWT_SECRET!;
if (!JWT_KEY) {
  throw new Error("JWT_SECRET is missing from .env");
}

// ZOD
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string(),
});

export async function GET() {
  return NextResponse.json({ username: "harkirat", email: "harkirat@gmail.com" });
}

export async function POST(req: NextRequest) {
  console.log("backend reached");
  
  try {
    const body = await req.json();
    console.log("input inputting");
    
    // Validate request body using Zod
    const parsedBody = signupSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsedBody.error.format() },
        { status: 400 }
      );
    }
    console.log("parsed body", parsedBody.data);
    
    const { name, email, password, role } = parsedBody.data;

    // Check if user already exists
    console.log("Checking User Exist or Not");
    const existingUser = await prisma.user.findUnique({where:{email}})

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }
    console.log("existing checked");
    

    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user in database
    console.log("Putting Data into DataBase");
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });

    // Generate JWT token
    const token = jwt.sign({ userId: user.userId, email: user.email }, JWT_KEY, {
      expiresIn: "3d",
    });
    console.log("token:", token);
    const response = NextResponse.json({
      message: "Signup Sucessfull",
      success: true
    })
    response.cookies.set("token", token, { httpOnly: true })

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
