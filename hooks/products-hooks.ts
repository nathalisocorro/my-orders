"use client";

import { Product } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      console.log(response);
      if (!response.ok) {
        toast.error("There's been an error in your request");
      }
      const data = response.json();
      return data;
    } catch (err) {
      console.log(err);
      toast("There's been an error in your request");
      return null;
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data.products || []);
      setLoading(false);
    };

    getProducts();
  }, []);

  const addProduct = async (newProduct: Product) => {
    setLoading(true);
    console.log("en el hook", newProduct);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify({
          title: newProduct.title,
          desc: newProduct.desc,
          img: newProduct.img,
          price: newProduct.price,
          categorySlug: newProduct.categorySlug,
        }),
      });
      console.log(response);
      if (!response.ok) {
        toast.error("There's been an error in your request");
      }
      const data = await response.json();
      console.log(data);
      setProducts((prev) => [...prev, data.product]);
    } catch (err) {
      console.error(err);
      toast.error("There's been an error in your request");
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (product: Product) => {
    setLoading(true);
    try {
      const response = await fetch("/api/products", {
        method: "PUT",
        body: JSON.stringify({
          id: product.id,
          createdAt: product.createdAt,
          title: product.title,
          desc: product.desc,
          img: product.img,
          price: product.price,
          categorySlug: product.categorySlug,
        }),
      });
      console.log(response);
      if (!response.ok) {
        toast("There's been an error in your request");
      }
      const data = response.json();
      console.log(data);
      setProducts((prev) =>
        prev.map((t) => (t.id === product.id ? product : t)),
      );
    } catch (err) {
      console.error(err);
      toast("There's been an error in your request");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (product: Product) => {
    setLoading(true);
    try {
      const response = await fetch("/api/products", {
        method: "DELETE",
        body: JSON.stringify({
          id: product.id,
        }),
      });
      console.log(response);
      if (!response.ok) {
        toast.error("There's been an error in your request");
      }
      const data = response.json();
      console.log(data);
      setProducts((prev) => prev.filter((t) => t.id != product.id));
    } catch (err) {
      console.error(err);
      toast.error("There's been an error in your request");
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}
