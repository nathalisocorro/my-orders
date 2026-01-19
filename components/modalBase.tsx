"use client"
import { useMemo, useRef, useState } from "react";
import { Props } from "./modal";
import { Button } from "./ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "./ui/dropdown-menu";
import { toast } from "sonner";

const users = [
    {
        id:'user_123',
        name: 'Steven',
        email:'test@test.com',
        password: 'dnejnd',
        createdAt: '2026-01-10',
        orders: []
    },
    {
        id:'kcndhguju',
        name: 'Jess',
        email:'test2@test.com',
        password: 'dnejnsd',
        createdAt: '2026-01-11',
        orders: []
    }
]
const products = [{
      id: '1',
      title: "Bowls set",
      desc: "Ready to use for your next family trip, made with the best materials.",
      img: "./bowls.jpg",
      price: 10.5,
      categorySlug: "home"
    },
    {
      id: '2',
      title: "Blender",
      desc: "To enjoy the best goals, use the best means",
      img: "./spoons.jpg",
      price: 5.49,
      categorySlug: "home"
    },
    {
      id: '3',
      title: "School Bag",
      desc: "For school and for adventure",
      img: "./school-bag.jpg",
      price: 15.4,
      categorySlug: "school"
    },
    {
      id: '4',
      title: "Bath gel",
      desc: "Experience the true fragance of the flowers",
      img: "./bath-gel.jpg",
      price: 5.49,
      categorySlug: "bath&body"
    }
  
  ]
interface ModalBaseProps {
  data?: any,
  onSuccess: () => void
}
export default function ModalBase({data, onSuccess} : ModalBaseProps) {
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(data ? data.products.map((p:any) => p.id) : [])
  const ref = useRef<HTMLFormElement>(null)
  function toggleProduct(id: string) {
  setSelectedProductIds((prev) =>
    prev.includes(id)
      ? prev.filter((p) => p !== id)
      : [...prev, id]
  )
}

const totalPrice = useMemo(() => {
  return products
    .filter((p) => selectedProductIds.includes(p.id.toString()))
    .reduce((acc, product) => acc + product.price, 0)
}, [products, selectedProductIds])

const showToast = (msg='Invalid operation') => {
  toast(msg)
}

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('click')
    if (!selectedProductIds.length || selectedProductIds.length === 0) {
      showToast("You must pick at least one item from the products list")
      return
    }
    const formData = new FormData(e.currentTarget)
    const formValues = Object.fromEntries(formData.entries())

    console.log(formValues)

    if (!formValues.userId || formValues.userId === '') {
      showToast("You must select an user")
      return
    }
    const order = {
      total: totalPrice || 0,
      products: [...selectedProductIds],     
      status: formValues.status || "PENDING",
      userId: formValues.userId || ''
    }

    setSelectedProductIds([])
    console.log("order: ", order)
    showToast('Success! Your changes have been saved')
    onSuccess()
  }

    return (
        <>
        <DialogContent className="sm:max-w-100">
          <form ref={ref} onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>{data ? "Edit order" : "Add order"}</DialogTitle>
            <DialogDescription>
              Check all the fields before submitting
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-4">
            <div className="grid gap-3">
              <Label htmlFor="status">Status</Label>
              <Select name="status" required defaultValue={data ? data.status : null}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="PAID">PAID</SelectItem>
                    <SelectItem value="CANCELED">CANCELED</SelectItem>
                    <SelectItem value="PENDING">PENDING</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="userId">Username</Label>
              <Select name="userId" required defaultValue={data ? data.userId : null}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Username</SelectLabel>
                    {users.map(u => (
                      <SelectItem value={u.id} key={u.id}>{u.name}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Products ({selectedProductIds.length})
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-64 max-h-72 overflow-y-auto"
                  align="start"
                >
                  {products.map((product) => (
                    <DropdownMenuCheckboxItem
                      key={product.id}
                      checked={selectedProductIds.includes(product.id.toString())}
                      onCheckedChange={() => toggleProduct(product.id.toString())}
                    >
                      {product.title}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
                <div className="text-sm text-muted-foreground mt-1">
                  {selectedProductIds.length === 0
                    ? "No products selected"
                    : `${selectedProductIds.length} products selected`}
                </div>
            </div>
            <div className="grid gap-3">
                <Label htmlFor="total">Total</Label>
                <Input id="total" name="total" readOnly value={totalPrice} />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" onClick={() => onSuccess()}>Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-[#3eb2b4]">Save changes</Button>
          </DialogFooter>
          </form>
        </DialogContent>
        
        </>
    )
}