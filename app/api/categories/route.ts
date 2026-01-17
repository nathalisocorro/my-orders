import prisma from "@/lib/db"
import { NextResponse } from "next/server"

//Fetch all categories of the different products:
export const GET = async () => {
    try{
        const categories = await prisma.category.findMany()
        return new NextResponse(JSON.stringify({message: 'Success', categories: categories}), {status: 200})
    }
    catch {
        return new NextResponse(JSON.stringify({message: 'There has been an error processing your request'}), {status: 500})
    }
}