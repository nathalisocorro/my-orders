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
    catch(error) {
        return new NextResponse(JSON.stringify({message: 'There has been an error processing your request'+error}), {status: 500})
    }
}


//Add category
export const POST = async (request: NextRequest) => {
    const body = await request.json()
    try{
      const category = await prisma.category.create({
        data: body,
      })
        return new NextResponse(JSON.stringify({message: 'Success', category: category}), {status: 200})
    }
    catch(error) {
        return new NextResponse(JSON.stringify({message: 'There has been an error processing your request'+error}), {status: 500})
    }
}