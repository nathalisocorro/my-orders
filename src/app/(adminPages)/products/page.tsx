"use client"

import ProductsComponent from "@/components/products"
import { Box } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

/* const products = [{
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
  
  ] */


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
            {loading ? <span>Cargando...</span> : <ProductsComponent products={products} />}
          </main>
        </div>
    )
}