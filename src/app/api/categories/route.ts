import prisma from "@/src/lib/db"
import { NextRequest, NextResponse } from "next/server"

//Fetch all categories of the different products:
export const GET = async (request: NextRequest) => {
    const {searchParams} = new URL(request.url)
    const category = searchParams.get('category')
    try{
        const categories = await prisma.category.findMany({
            where: {
                ...(category ? {slug: category} : undefined)
            }
        })
        return new NextResponse(JSON.stringify({message: 'Success', categories: categories}), {status: 200})
    }
    catch {
        return new NextResponse(JSON.stringify({message: 'There has been an error processing your request'}), {status: 500})
    }
}