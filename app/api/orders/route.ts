import prisma from "@/lib/db"
import { URL } from "next/dist/compiled/@edge-runtime/primitives/url"
import { NextRequest, NextResponse } from "next/server"


//Fetch all orders
export const GET = async (request: NextRequest) => {
    const {searchParams} = new URL(request.url)
    const user = searchParams.get('user')
    try{
        const orders = await prisma.order.findMany({
            where: {
                ...(user ? {userId: user} : undefined)
            }
        })
        return new NextResponse(JSON.stringify({message: 'Success', orders: orders}), {status: 200})
    }
    catch {
        return new NextResponse(JSON.stringify({message: 'There has been an error processing your request'}), {status: 500})
    }
}