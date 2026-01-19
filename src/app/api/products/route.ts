import prisma from "@/src/lib/db"
import { NextRequest, NextResponse } from "next/server"


//Fetch all products and filter by category
export const GET = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    try{

        const products = await prisma.product.findMany({
            where: {
                ...(category ? {categorySlug: category} : undefined)
            }
        })
        return new NextResponse(JSON.stringify({message: 'Success', products: products}), {status: 200})
    }
    catch {
        return new NextResponse(JSON.stringify({message: 'There has been an error processing your request'}), {status: 500})
    }
}