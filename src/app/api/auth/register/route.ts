import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/src/lib/db";

export async function POST(request: NextRequest) {
  const { username, email, password } = await request.json();

  if (!username || !email || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json(
    {
      message: "User created successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    },
    { status: 201 }
  );
}
