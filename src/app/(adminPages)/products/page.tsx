"use client";

import LoadingComponent from "@/components/loading";
import ProductsComponent from "@/components/products";
import useProducts from "@/hooks/products-hooks";

export default function ProductsPage() {
  const { loading } = useProducts();
  return (
    <div className="flex bg-[#d7eff5] min-h-screen justify-start">
      <main className="mx-4 my-5 w-full">
        {loading ? <LoadingComponent /> : <ProductsComponent />}
      </main>
    </div>
  );
}
