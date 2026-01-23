"use client"

import LoadingComponent from "@/components/loading"
import ProductsComponent from "@/components/products"
import { Box } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const fetchProducts = async () => {
  try{
    const response = await fetch('/api/products')
    console.log(response)
    if(!response.ok) {
      toast("There's been an error in your request")
    }
    const data = response.json()
    return data
  }

  catch(err) {
    console.log(err)
    toast("There's been an error in your request")
    return null
  }
}

export default function ProductsPage() {

    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
      const getProducts = async () => {
        setLoading(true)
        const data = await fetchProducts();
        setProducts(data.products || [])
        setLoading(false)
      }

      getProducts()
    }, [])

        
    return(
        <div className="flex bg-[#d7eff5] min-h-screen justify-start">
          <main className="mx-4 my-5 w-full">
            <div className="flex justify-start gap-2 items-end"><h1 className="text-4xl font-extrabold">Products</h1><Box size={"40"} /></div>
            <h3 className="text-md text-gray-500 mt-1 font-bold">Registry of all the products available</h3>
            {loading ? <LoadingComponent /> : <ProductsComponent products={products} />}
          </main>
        </div>
    )
}