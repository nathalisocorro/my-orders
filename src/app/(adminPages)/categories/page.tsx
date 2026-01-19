import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge, ClipboardList } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

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



export default function CategoriesPage() {
    return(
        <div className="flex bg-[#d7eff5] min-h-screen justify-start">
          <main className="mx-4 my-5 w-full">
            <div className="w-full flex flex-col sm:flex-row justify-between items-center">
              <div>
                <div className="flex justify-start gap-2 items-end"><h1 className="text-4xl font-extrabold">Categories</h1><ClipboardList size={"40"} /></div>
                <h3 className="text-md text-gray-500 mt-1 font-bold">Registry of all the categories available</h3>
              </div>
              <div>
                
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center gap-4 my-10">
              {
              categories.map((category) => (
                <Link href={`/categories/${category.slug}`} key={category.id}>
                <Card key={category.id} className="w-full h-full p-0 m-0 shadow-gray-400">
                  <CardHeader className="p-0">
                    <div className="relative w-full h-full">
                      <Image
                      src={"./placeholder.svg"}
                      alt={category.title}
                      height={"80"}
                      width={"80"}
                      className="object-fill w-full max-h-50 rounded-lg"
                      />
                      <h2 className="absolute bottom-3 left-3 text-lg font-bold">{category.title}</h2>
                    </div>
                  </CardHeader>
                  <CardContent className="font-medium text-md">
                    {category.desc}
                  </CardContent>

                  <CardFooter className="pb-4 text-sm font-medium text-gray-500">
                    {category.products.length} products fit this category
                  </CardFooter>
                </Card>
                </Link>
              ))
            }
            </div>
          </main>
        </div>
    )
}