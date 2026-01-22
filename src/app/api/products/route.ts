import prisma from "@/src/lib/db"
import { NextRequest, NextResponse } from "next/server"

const totalProducts = [{
      id: 1,
      title: "Bowls set",
      desc: "Ready to use for your next family trip, made with the best materials.",
      img: "./bowls.jpg",
      price: 10.5,
      categorySlug: "home"
    },
    {
      id: 2,
      title: "Blender",
      desc: "To enjoy the best goals, use the best means",
      img: "./spoons.jpg",
      price: 5.49,
      categorySlug: "home"
    },
    {
      id: 3,
      title: "School Bag",
      desc: "For school and for adventure",
      img: "./school-bag.jpg",
      price: 15.4,
      categorySlug: "school"
    },
    {
      id: 4,
      title: "Bath gel",
      desc: "Experience the true fragance of the flowers",
      img: "./bath-gel.jpg",
      price: 5.49,
      categorySlug: "bath&body"
    }
  
  ]
//Fetch all products and filter by category
export const GET = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    try{

       /*  const products = await prisma.product.findMany({
            where: {
                ...(category ? {categorySlug: category} : undefined)
            }
        }) */
       const filterProds = () => {
        if (!category) return [...totalProducts]
       const prod =  totalProducts.filter(p => p.categorySlug === category)
       return prod
       }
       const products = filterProds()
       return new NextResponse(JSON.stringify({message: 'Success', products: products}), {status: 200})
    }
    catch(error) {
      console.error(error)
        return new NextResponse(JSON.stringify({message: 'There has been an error processing your request', error}), {status: 500})
    }
}