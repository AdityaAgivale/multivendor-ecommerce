"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { clearCart } = useCart();
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (orderId) {
      fetch("/api/orders/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      }).then(() => {
        clearCart();
        setConfirmed(true);
      });
    }
  }, [orderId]);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold text-neutral-900">Order Confirmed 🎉</h1>
      <p className="text-neutral-600">Thank you for shopping with us.</p>
      {confirmed && orderId && (
        <Link
          href={`/invoice/${orderId}`}
          className="bg-neutral-900 text-white px-6 py-2 rounded-full mt-2"
        >
          Download Invoice
        </Link>
      )}
    </div>
  );
}

export default function OrderSuccess() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}