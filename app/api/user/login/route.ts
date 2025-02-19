import { PrismaClient } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();
const prisma = new PrismaClient();
const JWT_KEY = process.env.JWT_SECRET!;

export async function GET() {
  return NextResponse.json({ messege: "You are in Login API" });
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isPasswordMatch=bcrypt.compareSync(password,user.password)
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = jwt.sign({ userId: user.userId, email: user.email }, JWT_KEY, {
      expiresIn: "7d",
    });
    console.log("token:", token);
    const response = NextResponse.json({
      message: "Login Sucessfull",
      success: true,
    });
    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
