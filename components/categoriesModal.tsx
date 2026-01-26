import { Category } from "@/types";
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
import React, { useRef } from "react";
import { toast } from "sonner";

interface ModalProps {
  data: Category | null;
  onSuccess: () => void;
  onSave: (o: Category) => void;
}

export default function CategoriesModal({
  data,
  onSuccess,
  onSave,
}: ModalProps) {
  const { loading } = fetchCategories();
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    if (!formValues.title || formValues.title == "") {
      toast.error("Title is required");
      return;
    }

    const category = {
      id: data ? data.id : null,
      createdAt: data ? data.createdAt : null,
      title: formValues.title.toString(),
      desc: formValues.desc.toString(),
      img: formValues.img.toString(),
      slug: formValues.title.toString().toLowerCase().replaceAll(" ", "-"),
    };
    console.log(category);
    onSave(category);
    toast.success("Success! Your changes have been saved");
    onSuccess();
  };
  return (
    <>
      <DialogContent>
        <form ref={ref} onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{data ? "Edit category" : "Add category"}</DialogTitle>
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
