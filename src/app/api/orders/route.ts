import prisma from "@/src/lib/db";
import { NextRequest, NextResponse } from "next/server";

//Fetch all the orders
export const GET = async () => {
  try {
    const orders = await prisma.order.findMany();
    return new NextResponse(
      JSON.stringify({ message: "Success", orders: orders }),
      { status: 200 },
    );
  } catch {
    return new NextResponse(
      JSON.stringify({
        message: "There has been an error processing your request",
      }),
      { status: 500 },
    );
  }
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  console.log(body);
  try {
    const order = await prisma.order.create({
      data: body,
    });
    return new NextResponse(
      JSON.stringify({ message: "Success", order: order }),
      { status: 200 },
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "There has been an error processing your request" + error,
      }),
      { status: 500 },
    );
  }
};

export const PUT = async (request: NextRequest) => {
  const body = await request.json();

  try {
    const order = await prisma.order.update({
      data: body,
      where: {
        id: body.id,
      },
    });
    return new NextResponse(
      JSON.stringify({ message: "Success", order: order }),
      { status: 200 },
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "There has been an error processing your request" + error,
      }),
      { status: 500 },
    );
  }
};

export const DELETE = async (request: NextRequest) => {
  const body = await request.json();

  try {
    const order = await prisma.order.delete({
      where: {
        id: body.id,
      },
    });
    return new NextResponse(JSON.stringify({ message: "Success" }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "There has been an error processing your request" + error,
      }),
      { status: 500 },
    );
  }
};
