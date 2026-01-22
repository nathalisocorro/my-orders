import ProductsByCategory from "@/components/productsByCat"
import { Box } from "lucide-react"

interface Props {
  category: string
  products: any[]
}

export default function ProductsClient({ category, products }: Props) {
  return (
    <div className="flex bg-[#d7eff5] min-h-screen justify-start">
          <main className="mx-4 my-5 w-full">
            <div className="flex justify-start gap-2 items-end"><h1 className="text-4xl font-extrabold">Products</h1><Box size={"40"} /></div>
            <h3 className="text-md text-gray-500 mt-1 font-bold">Registry of all the products in the category of {category}</h3>
            <h2 className="text-3xl font-extrabold mt-10 capitalize">{category}</h2>
                <ProductsByCategory products={products} />
          </main>
        </div>
  )
}
