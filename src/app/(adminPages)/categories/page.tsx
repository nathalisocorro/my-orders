"use client"


import CategoriesComponent from "@/components/categories"
import LoadingComponent from "@/components/loading"
import FetchCategories from "@/hooks/categories-hooks"
import { ClipboardList } from "lucide-react"

export default function CategoriesPage() {
    
    const { categories, loading } = FetchCategories()

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
            {loading ? <LoadingComponent /> : <CategoriesComponent categories={categories} />}
          </main>
        </div>
    )
}