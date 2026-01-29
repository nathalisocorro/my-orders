"use client";
import CategoriesComponent from "@/components/categories";

export default function CategoriesPage() {
  return (
    <div className="flex bg-[#d7eff5] min-h-screen justify-start">
      <main className="mx-4 my-5 w-full">
        <CategoriesComponent />
      </main>
    </div>
  );
}
