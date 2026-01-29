import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/src/lib/db";
import bcrypt from "bcryptjs";

export const POST = async (request: NextRequest) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

 const user = await prisma.user.findUnique({
  where: { email },
});

if (!user) {
  return NextResponse.json(
    { message: "Invalid credentials" },
    { status: 401 }
  );
}

const isValidPassword = await bcrypt.compare(password, user.password);

if (!isValidPassword) {
  return NextResponse.json(
    { message: "Invalid credentials" },
    { status: 401 }
  );
}

const token = jwt.sign(
  {
    userId: user.id,
    email: user.email,
  },
  process.env.JWT_SECRET!,
  { expiresIn: "1h" }
);
  const response = NextResponse.json(
    { message: "Success" },
    { status: 200 }
  );

  response.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60,
  });

  return response;
};
