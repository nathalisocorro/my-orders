import { Product } from "@/types";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import fetchCategories from "@/hooks/categories-hooks";
import { Field, FieldContent, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import useProducts from "@/hooks/products-hooks";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ModalProps {
  data: Product | null;
  onSuccess: () => void;
  onSave: (o: Product) => void;
}

export default function ProductsModal({ data, onSuccess, onSave }: ModalProps) {
  const { loading } = useProducts();
  const { categories } = fetchCategories();
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    if (!formValues.title || formValues.title == "") {
      toast.error("Title is required");
      return;
    }

    const product = {
      id: data ? data.id : null,
      createdAt: data ? data.createdAt : null,
      title: formValues.title.toString(),
      desc: formValues.desc.toString(),
      img: formValues.img.toString(),
      price: Number(formValues.price),
      categorySlug: formValues.category.toString(),
    };
    console.log(product);
    onSave(product);
    toast.success("Success! Your changes have been saved");
    onSuccess();
  };
  return (
    <>
      <DialogContent>
        <form ref={ref} onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{data ? "Edit product" : "Add product"}</DialogTitle>
            <DialogDescription>
              Check all the fields before submitting
            </DialogDescription>
          </DialogHeader>
          <div className="grid my-4 gap-3">
            <Field key={"title"} className="gap-1">
              <FieldLabel>Title</FieldLabel>
              <FieldContent>
                <Input
                  required
                  name="title"
                  defaultValue={data ? data.title : ""}
                  placeholder="Insert the title"
                />
              </FieldContent>
            </Field>
            <Field key={"desc"} className="gap-1">
              <FieldLabel>Description</FieldLabel>
              <FieldContent>
                <Input
                  required
                  name="desc"
                  defaultValue={data ? data.desc : ""}
                  placeholder="Insert the description"
                />
              </FieldContent>
            </Field>
            <Field key={"img"} className="gap-1">
              <FieldLabel>Image URL</FieldLabel>
              <FieldContent>
                <Input
                  required
                  name="img"
                  defaultValue={data ? data.img : ""}
                  placeholder="Insert the image url"
                />
              </FieldContent>
            </Field>
            <Field key={"price"} className="gap-1">
              <FieldLabel>Price</FieldLabel>
              <FieldContent>
                <Input
                  type="number"
                  step={"0.01"}
                  min={0}
                  required
                  name="price"
                  defaultValue={data ? data.price : 0}
                  placeholder="Insert the price"
                />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel>Category</FieldLabel>
              <FieldContent>
                <Select
                  name="category"
                  required
                  defaultValue={data ? data.categorySlug : undefined}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={c.slug}>
                          {c.title}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FieldContent>
            </Field>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={onSuccess}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-[#3eb2b4]">
              {loading ? "Processing" : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </>
  );
}
