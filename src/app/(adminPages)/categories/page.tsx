"use client"


import CategoriesComponent from "@/components/categories"
import { ClipboardList } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

/* const categories = [{
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
] */

const fetchCategories = async () => {
  try{
    const response = await fetch('/api/categories')
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


export default function CategoriesPage() {
    
    const [categories, setCategories] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      const getCategories = async () => {
        setLoading(true)
        const data = await fetchCategories();
        setCategories(data.categories || [])
        setLoading(false)
      }

      getCategories()
    }, [])

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
            {loading ? <span>Cargando ...</span> : <CategoriesComponent categories={categories} />}
          </main>
        </div>
    )
}