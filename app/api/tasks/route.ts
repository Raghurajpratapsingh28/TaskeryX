import { PrismaClient } from "@prisma/client";
import { Londrina_Shadow } from "next/font/google";
import { NextRequest, NextResponse } from "next/server";
import { number } from "zod";

const prisma = new PrismaClient();
export async function GET(req: NextRequest) {
  try {
    const projectId = new URL(req.url).searchParams.get("projectId");

    if (!projectId || isNaN(Number(projectId))) {
      return NextResponse.json({ message: "Invalid project ID" }, { status: 400 });
    }

    const tasks = await prisma.task.findMany({
      where: { projectId: Number(projectId) },
      include: {
        author: true,
        assignedUser: true,
        comments: true,
        attachments: true,
      },
    });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    return NextResponse.json(
      { message: "Error retrieving tasks", error: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest, res: NextResponse) {
  console.log("hello");
 
  
  try {
    const {
      title,
      description,
      status,
      priority,
      tags,
      startDate,
      dueDate,
      points,
      projectId,
      authorUserId,
      assignedUserId,
    } = await req.json();
   
    console.log(description);

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId,
        authorUserId,
        assignedUserId,
      },
    });
    console.log("prisma done");

    return NextResponse.json({ newTask }, { status: 201 });
  } catch (error: any) {
    return Response.json(
      { message: `Error creating task ${error.message}` },
      { status: 500 }
    );
  }
}


export async function PUT(req: NextRequest, { params }: { params: { taskId: string } }) {
  try {
    const { status } = await req.json(); 
    const taskId = Number(params.taskId); 

    if (isNaN(taskId)) {
      return NextResponse.json({ message: "Invalid task ID" }, { status: 400 });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { status },
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { message: "Error updating task", error: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}