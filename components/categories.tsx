"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Dialog } from "./ui/dialog";
import CategoriesModal from "./categoriesModal";
import { useState } from "react";
import { AlertCircle, ClipboardList, Edit, Plus, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Category } from "@/types";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Tooltip } from "./ui/tooltip";
import fetchCategories from "@/hooks/categories-hooks";
import LoadingComponent from "./loading";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import AlertComponent from "./alert";

interface CategoriesComponent {
  categories: Category[];
}

export default function CategoriesComponent() {
  const {
    categories,
    loading,
    addCategories,
    updateCategories,
    deleteCategories,
  } = fetchCategories();
  const [openModal, setOpenModal] = useState(false);
  const [alert, setAlert] = useState(false);
  const [editingItem, setEditingItem] = useState<Category | null>(null);

  const handleEdit = (c: Category) => {
    setEditingItem(c);
    setOpenModal(true);
  };

  const handleConfirmDelete = (c: Category) => {
    setEditingItem(c);
    setAlert(true);
  };

  const handleDelete = async (c: Category | null) => {
    if (!c) return;
    await deleteCategories(c);
    setEditingItem(null);
    setAlert(true);
  };

  const handleSuccess = () => {
    setEditingItem(null);
    setOpenModal(false);
  };

  const handleSave = (c: Category) => {
    if (c && c.id) {
      updateCategories(c);
      return;
    }
    addCategories(c);
  };

  const handleCancel = () => {
    (setEditingItem(null), setAlert(false));
  };

  const handleAdd = () => {
    setEditingItem(null);
    setOpenModal(true);
  };

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row justify-between items-center">
        <div>
          {alert && (
            <AlertComponent
              loading={loading}
              item={editingItem}
              onDelete={handleDelete}
              onCancel={handleCancel}
            />
          )}
          <div className="flex justify-start gap-2 items-end">
            <h1 className="text-4xl font-extrabold">Categories</h1>
            <ClipboardList size={"40"} />
          </div>
          <h3 className="text-md text-gray-500 mt-1 font-bold">
            Registry of all the categories available
          </h3>
        </div>
        <div></div>
        <div>
          <Button
            onClick={handleAdd}
            className="bg-[#3eb2b4] hover:bg-[#FDBB2D] mt-2 xl:mt-0"
          >
            Add Category
            <Plus />
          </Button>
        </div>
      </div>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center gap-4 my-10">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="w-full h-full p-0 m-0 shadow-gray-400"
            >
              <Link href={`/categories/${category.slug}`} key={category.id}>
                <CardHeader className="p-0">
                  <div className="relative w-full h-full">
                    <Image
                      src={"./placeholder.svg"}
                      alt={category.title}
                      height={"80"}
                      width={"80"}
                      className="object-fill w-full max-h-50 rounded-lg"
                    />
                    <h2 className="absolute bottom-3 left-3 text-lg font-bold">
                      {category.title}
                    </h2>
                  </div>
                </CardHeader>
                <CardContent className="font-medium text-md">
                  {category.desc}
                </CardContent>
              </Link>
              <CardFooter className="pb-4 text-sm font-medium text-gray-500">
                <span>Look at the products which fit this category</span>
                <div className="flex gap-2" aria-label="actions">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={"ghost"}
                        onClick={() => handleEdit(category)}
                      >
                        <Edit />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit category</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={"ghost"}
                        onClick={() => handleConfirmDelete(category)}
                      >
                        <Trash />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete category</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardFooter>
            </Card>
          ))}
          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <CategoriesModal
              key={editingItem ? editingItem.id : "new"}
              data={editingItem}
              onSuccess={handleSuccess}
              onSave={handleSave}
            />
          </Dialog>
        </div>
      )}
    </>
  );
}
