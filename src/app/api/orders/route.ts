import prisma from "@/src/lib/db"
import { NextRequest, NextResponse } from "next/server"


//Fetch all the orders
export const GET = async () => {
    try{
        const orders = await prisma.order.findMany({})
        return new NextResponse(JSON.stringify({message: 'Success', orders: orders}), {status: 200})
    }
    catch {
        return new NextResponse(JSON.stringify({message: 'There has been an error processing your request'}), {status: 500})
    }
}