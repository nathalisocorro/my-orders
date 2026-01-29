import prisma from "@/src/lib/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function getCurrentUser() {
  const cookieStored = await cookies()
  const token = cookieStored.get("token")?.value;

  if (!token) return null;

  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

  try {
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.userId as string;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, username: true },
    });

    return user;
  } catch {
    return null;
  }
}
