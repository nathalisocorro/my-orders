import { Order } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function FetchOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      console.log(response);
      if (!response.ok) {
        toast("There's been an error in your request");
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
    const getOrders = async () => {
      setLoading(true);
      const data = await fetchOrders();
      console.log(data);
      setOrders(data.orders || []);
      setLoading(false);
    };
    getOrders();
  }, []);

  const addOrders = async (newOrder: Order) => {
    setLoading(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify({
          total: newOrder.total,
          products: newOrder.products,
          status: newOrder.status,
          userId: newOrder.userId,
        }),
      });
      console.log(response);
      if (!response.ok) {
        toast("There's been an error in your request");
      }
      const data = await response.json();
      console.log(data);
      console.log([...orders, data.order]);
      setOrders((prev) => [...prev, data.order]);
    } catch (err) {
      console.error(err);
      toast("There's been an error in your request");
    } finally {
      setLoading(false);
    }
  };

  const updateOrders = async (orderToUpdate: Order) => {
    setLoading(true);
    try {
      const response = await fetch("/api/orders", {
        method: "PUT",
        body: JSON.stringify({
          id: orderToUpdate.id,
          products: orderToUpdate.products,
          total: orderToUpdate.total,
          status: orderToUpdate.status,
          createdAt: orderToUpdate.createdAt,
          userId: orderToUpdate.userId,
        }),
      });
      console.log(response);
      if (!response.ok) {
        toast("There's been an error in your request");
      }
      const data = await response.json();
      console.log(data);
      console.log(
        orders.map((order) =>
          order.id === orderToUpdate.id ? orderToUpdate : order,
        ),
      );
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderToUpdate.id ? orderToUpdate : order,
        ),
      );
    } catch (err) {
      console.error(err);
      toast("There's been an error in your request");
    } finally {
      setLoading(false);
    }
  };

  const deleteOrders = async (order: Order) => {
    setLoading(true);
    try {
      const response = await fetch("/api/orders", {
        method: "DELETE",
        body: JSON.stringify({
          id: order.id,
        }),
      });
      console.log(response);
      if (!response.ok) {
        toast("There's been an error in your request");
      }
      const data = response.json();
      console.log(data);
      setOrders((prev) => prev.filter((t) => t.id != order.id));
    } catch (err) {
      console.error(err);
      toast("There's been an error in your request");
    } finally {
      setLoading(false);
    }
  };

  return {
    orders,
    loading,
    addOrders,
    updateOrders,
    deleteOrders,
  };
}
