import prisma from "@/src/lib/db";
import { NextRequest, NextResponse } from "next/server";

//Fetch all products and filter by category
export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  try {
    const products = await prisma.product.findMany({
      where: {
        ...(category ? { categorySlug: category } : undefined),
      },
    });
    return new NextResponse(
      JSON.stringify({ message: "Success", products: products }),
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        message: "There has been an error processing your request",
        error,
      }),
      { status: 500 },
    );
  }
};

//Create a new product

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  try {
    const product = await prisma.product.create({
      data: body,
    });
    return new NextResponse(
      JSON.stringify({ message: "Success", product: product }),
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
    const product = await prisma.product.update({
      data: body,
      where: {
        id: body.id,
      },
    });
    return new NextResponse(
      JSON.stringify({ message: "Success", product: product }),
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
    const product = await prisma.product.delete({
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
