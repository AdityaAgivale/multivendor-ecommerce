"use client";
import { useEffect, useState } from "react";

type Order = { id: string; totalAmount: number; status: string; createdAt: string };

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch("/api/orders").then((res) => res.json()).then(setOrders);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 p-10">
      <h1 className="text-3xl font-bold text-neutral-900 mb-6">Order History</h1>
      <div className="space-y-4 max-w-2xl">
        {orders.map((o) => (
          <div key={o.id} className="bg-white rounded-xl shadow-sm p-4 flex justify-between">
            <span>Order #{o.id.slice(0, 8)}</span>
            <span className="capitalize">{o.status}</span>
            <span className="font-bold">${o.totalAmount.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
