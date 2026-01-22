import prisma from "@/src/lib/db"
import { NextRequest, NextResponse } from "next/server"


//Fetch all the orders
export const GET = async () => {
    try{
        //const orders = await prisma.order.findMany()
        const orders = [ 
  { id: "ord_001", 
    createdAt: "2026-01-18T14:32:00Z", 
    total: 89.99, 
    products: [ 
      { id: '1', title: "Sunset Hoodie", quantity: 1, price: 49.99 }, 
      { id: '2', title: "Palm Tree Cap", quantity: 2, price: 20.00 }, ], 
    status: "PAID", 
    userId: "user_123", }, 
    { 
    id: "ord_002", 
    createdAt: "2026-01-17T10:15:00Z", 
    total: 59.50, products: [ 
      { id:'3', title: "Beach Towel", quantity: 1, price: 25.00 }, 
      { id: '4', title: "Sunset Mug", quantity: 2, price: 17.25 }, ], 
    status: "PENDING", userId: "user_456", }, 
    { 
    id: "ord_003", 
    createdAt: "2026-01-16T18:45:00Z", 
    total: 34.00, 
    products: [ 
      { id: "prod_005", title: "Sticker Pack", quantity: 4, price: 8.50 }, ], 
    status: "CANCELED", 
    userId: "user_789", }, ]
        return new NextResponse(JSON.stringify({message: 'Success', orders: orders}), {status: 200})
    }
    catch {
        return new NextResponse(JSON.stringify({message: 'There has been an error processing your request'}), {status: 500})
    }
}