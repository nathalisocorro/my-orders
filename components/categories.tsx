import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface CategoriesComponent {
    categories: any[]
}

export default function CategoriesComponent({categories}: CategoriesComponent) {

    console.log("categories", categories)
    return (
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
    )
}