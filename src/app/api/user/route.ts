import prisma from "@/src/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try{
    const users = await prisma.user.findMany()
    return new NextResponse(JSON.stringify({message: 'Success', users: users}), {status: 200})
  }
  catch(error){
    return new NextResponse(JSON.stringify({message: 'Error processing your request'+error}), {status: 500})
  }
}