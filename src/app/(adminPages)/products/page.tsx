import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Box } from "lucide-react"
import Image from "next/image"

const products = [{
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

export default function ProductsPage() {


    return(
        <div className="flex bg-[#d7eff5] min-h-screen justify-start">
          <main className="mx-4 my-5 w-full">
            <div className="flex justify-start gap-2 items-end"><h1 className="text-4xl font-extrabold">Products</h1><Box size={"40"} /></div>
            <h3 className="text-md text-gray-500 mt-1 font-bold">Registry of all the products available</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center gap-4 my-10">
              {
              products.map((product) => (
                <Card key={product.id} className="w-full h-full p-0 m-0 shadow-gray-400">
                  <CardHeader className="p-0">
                    <div className="relative w-full h-full">
                      <Image
                      src={"./placeholder.svg"}
                      alt={product.title}
                      height={"80"}
                      width={"80"}
                      className="object-fill w-full max-h-50 rounded-lg"
                      />
                      <Badge className="absolute top-3 right-2" color="#3eb2b4">{product.categorySlug}</Badge>
                      <h2 className="absolute bottom-3 left-3 text-lg font-bold">{product.title}</h2>
                    </div>
                  </CardHeader>
                  <CardContent className="font-medium text-md">
                    {product.desc}
                  </CardContent>

                  <CardFooter className="pb-4 text-xl font-extrabold text-[#FDBB2D]">
                    ${product.price}
                  </CardFooter>
                </Card>
              ))
            }
            </div>
          </main>
        </div>
    )
}