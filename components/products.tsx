import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Box, Edit, Plus, Trash } from "lucide-react"
import Image from "next/image"
import EmptyContent from "./emptyState"
import useProducts from "@/hooks/products-hooks"
import { Button } from "./ui/button"
import { useState } from "react"
import { Product } from "@/types"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import AlertComponent from "./alert"
import { Dialog } from "./ui/dialog"
import ProductsModal from "./products-modal"


export default function ProductsComponent() {
  const [editing, setEditing] = useState<Product|null>(null)
  const {products, loading, deleteProduct, addProduct, updateProduct} = useProducts()
  const [open, setOpen] = useState(false)
  const [alert, setAlert] = useState(false)
  
  const handleAdd = () => {
    setEditing(null)
    setOpen(true)
  }
  const handleEdit = (p: Product) => {
    setEditing(p)
    setOpen(true)
  }

  const handleConfirmDelete = (p: Product) => {
    setEditing(p)
    setAlert(true)
  }

  const handleDelete = async (p: Product) => {
    await deleteProduct(p)
    setEditing(null)
    setAlert(true)
  }

  const handleSuccess = () => {
      setEditing(null)
      setOpen(false)
    }
  
    const handleSave = (p: Product) => {
      if(p && p.id){
        updateProduct(p)
        return
      }
      addProduct(p)
    }
  
    const handleCancel = () => {
      setEditing(null),
      setAlert(false)
    }

    return (
      <>
      <div className="flex justify-between items-center">
        {alert && <AlertComponent loading={loading} item={editing} onDelete={handleDelete} onCancel={handleCancel} />}
        <div>
          <div className="flex justify-start gap-2 items-end"><h1 className="text-4xl font-extrabold">Products</h1><Box size={"40"} /></div>
          <h3 className="text-md text-gray-500 mt-1 font-bold">Registry of all the products available</h3>
        </div>
      <Button onClick={handleAdd} className="bg-[#3eb2b4] hover:bg-[#FDBB2D] mt-2 xl:mt-0">Add Product<Plus /></Button>
      </div>
      {products.length===0 ? <EmptyContent/> :

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center gap-4 my-10">
              {products.map((product) => (
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
                  <CardContent className="grid gap-2 font-medium text-md">
                    <div className="text-sm text-gray-500">
                      ID: {product.id}
                    </div>
                    <div>
                      {product.desc}
                    </div>
                  </CardContent>

            <CardFooter className="flex justify-between pb-4 text-xl font-extrabold text-[#FDBB2D]">
              <span>
                ${product.price}
              </span>
                <div className="flex gap-2 text-gray-500" aria-label="actions">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant={'ghost'} onClick={() => handleEdit(product)}><Edit /></Button>
                    </TooltipTrigger>
                    <TooltipContent><p>Edit product</p></TooltipContent>
                  </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                  <Button variant={'ghost'} onClick={() => handleConfirmDelete(product)}><Trash /></Button>
                </TooltipTrigger>
                <TooltipContent><p>Delete category</p></TooltipContent>
                </Tooltip>
                </div>
            </CardFooter>
                </Card>
              ))}
            </div>
          }
          <Dialog open={open} onOpenChange={setOpen}>
            <ProductsModal key={editing ? editing.id : 'new'} data={editing} onSuccess={handleSuccess} onSave={handleSave}/>
          </Dialog>
      </>
        
    )
}