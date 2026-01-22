import prisma from "@/src/lib/db"
import { NextRequest, NextResponse } from "next/server"

//Fetch all categories of the different products:
export const GET = async (request: NextRequest) => {
    const {searchParams} = new URL(request.url)
    const category = searchParams.get('category')
    try{
        /* const categories = await prisma.category.findMany({
            where: {
                ...(category ? {slug: category} : undefined)
            }
        }) */
       const categories = [{
  id: 1,
  title: "Home",
  desc: "Take a look to our home products: make your home shine and your life nicer",
  img: "./home.jpg",
  slug: "home",
  products: [
    {
      title: "Bowls set",
      desc: "Ready to use for your next family trip, made with the best materials.",
      img: "./bowls.jpg",
      price: 10.5,
      categorySlug: "home"
    },
    {
      title: "Spoons set",
      desc: "To enjoy the best goals, use the best means",
      img: "./spoons.jpg",
      price: 5.49,
      categorySlug: "home"
    }
  ]
},
{
  id: 2,
  title: "Home",
  desc: "Take a look to our home products: make your home shine and your life nicer",
  img: "./home.jpg",
  slug: "home",
  products: [
    {
      title: "Bowls set",
      desc: "Ready to use for your next family trip, made with the best materials.",
      img: "./bowls.jpg",
      price: 10.5,
      categorySlug: "home"
    },
    {
      title: "Spoons set",
      desc: "To enjoy the best goals, use the best means",
      img: "./spoons.jpg",
      price: 5.49,
      categorySlug: "home"
    }
  ]
},
] 
        return new NextResponse(JSON.stringify({message: 'Success', categories: categories}), {status: 200})
    }
    catch(error) {
        return new NextResponse(JSON.stringify({message: 'There has been an error processing your request'+error}), {status: 500})
    }
}