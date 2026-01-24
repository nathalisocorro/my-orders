import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function FetchCategories() {
    const [categories, setCategories] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

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
    useEffect(() => {
      const getCategories = async () => {
      setLoading(true)
      const data = await fetchCategories();
      console.log(data)
      setCategories(data.categories || [])
      setLoading(false)
      }
      getCategories()
    }, [])


    const addCategories = async (newCategory: any) => {
        setLoading(true)
    try{
    const response = await fetch('/api/categories', {
      method:'POST',
      body: JSON.stringify({
        title: newCategory.title,
        desc : newCategory.desc,
        img: newCategory.img,
        slug: newCategory.slug
      })
    })
    console.log(response)
    if(!response.ok) {
      toast("There's been an error in your request")
    }
    const data = await response.json()
    console.log(data)
    setCategories((prev) => [...prev, data.order])
  }

  catch(err) {
    console.error(err)
    toast("There's been an error in your request")
  } finally{
    setLoading(false)
  }
}

const updateCategories = async (categoryToUpdate: any) => {
    setLoading(true)
  try{
    const response = await fetch('/api/categories', {
      method:'PUT',
      body: JSON.stringify({
        id: categoryToUpdate.id,
        title: categoryToUpdate.title,
        desc : categoryToUpdate.desc,
        img: categoryToUpdate.img,
        slug: categoryToUpdate.slug,
        createdAt: categoryToUpdate.createdAt
      })
    })
    console.log(response)
    if(!response.ok) {
      toast("There's been an error in your request")
    }
    const data = response.json()
    console.log(data)
    setCategories(((prev) => prev.map((t) => (t.id === categoryToUpdate.id ? categoryToUpdate : t))))
  }

  catch(err) {
    console.error(err)
    toast("There's been an error in your request")
  } finally {
    setLoading(false)
  }
}

return {
  categories, loading, addCategories, updateCategories
}
      
}