import { PrismaClient } from "@prisma/client";
import { Londrina_Shadow } from "next/font/google";
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient();
export async function GET(): Promise<NextResponse> {
    try {
        const projects = await prisma.project.findMany();
        return NextResponse.json(projects, { status: 200 });
      } catch (error) {
        console.error("Error retrieving projects:", error);
        return NextResponse.json({ message: "Error retrieving projects" }, { status: 500 });
      } finally {
        await prisma.$disconnect();
}}

export async function POST(req: NextRequest, res: NextResponse) {
    console.log("hello");
    
   try {

    const { name, description, startDate,endDate } = await req.json();
    console.log(name);
    console.log(description);
    
    
    const newProject = await prisma.project.create({
        data: {
            name,
            description,
            startDate,
            endDate
        }
    })
    console.log("prisma done");
    
   return NextResponse.json({newProject},{status:201})
   } catch (error:any) {
   return Response.json({message:`Error creating project ${error.message}`},{status:500})
   }}
     