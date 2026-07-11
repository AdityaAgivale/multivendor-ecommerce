"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const applyCoupon = async () => {
    const res = await fetch("/api/coupon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: couponCode }),
    });
    const data = await res.json();
    if (res.ok) {
      setDiscount(data.discount);
      setCouponMessage(`${data.discount}% discount applied!`);
    } else {
      setDiscount(0);
      setCouponMessage(data.error);
    }
  };

  const discountedTotal = total - (total * discount) / 100;

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, discount }),
    });
    const data = await res.json();
    if (res.ok) {
      window.location.href = data.url;
    } else {
      alert("Checkout failed: " + data.error);
      setLoading(false);
    }
  };

  if (items.length === 0) {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center gap-4 px-4">
      <div className="text-6xl mb-2">🛒</div>
      <p className="text-xl font-serif font-bold text-neutral-900">Your cart is empty</p>
      <p className="text-neutral-500">Looks like you haven't added anything yet.</p>
      <Link href="/products" className="bg-neutral-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-neutral-700 transition">
        Browse Products
      </Link>
    </div>
  );
}

return (
  <div className="min-h-screen bg-stone-50 p-6 md:p-10">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-serif font-bold text-neutral-900 mb-8">Your Cart</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm p-6 space-y-4">
          {items.map((item) => (
            <div key={item.productId} className="flex justify-between items-center py-3 border-b border-stone-100 last:border-0">
              <div className="flex items-center gap-4">
                <img src={item.imageUrl} className="w-16 h-16 object-cover rounded-lg" />
                <div>
                  <p className="font-semibold text-neutral-900">{item.name}</p>
                  <p className="text-neutral-500 text-sm">${item.price.toFixed(2)} each</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-7 h-7 bg-stone-100 rounded-full hover:bg-stone-200 transition"
                    >
                      -
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="w-7 h-7 bg-stone-100 rounded-full hover:bg-stone-200 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-neutral-900">${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="text-red-500 text-xs mt-1 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 h-fit space-y-4">
          <h2 className="font-serif font-bold text-lg text-neutral-900">Order Summary</h2>
          <div className="flex gap-2">
            <input
              placeholder="Coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1 p-2 border border-stone-200 rounded-lg text-sm"
            />
            <button onClick={applyCoupon} className="bg-stone-800 text-white px-4 rounded-lg text-sm hover:bg-stone-700 transition">
              Apply
            </button>
          </div>
          {couponMessage && <p className="text-sm text-neutral-600">{couponMessage}</p>}

          <div className="space-y-2 pt-2 border-t border-stone-100">
            <div className="flex justify-between text-neutral-600 text-sm">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-700 text-sm">
                <span>Discount ({discount}%)</span>
                <span>-${((total * discount) / 100).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-stone-100">
              <span>Total</span>
              <span>${discountedTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="bg-neutral-900 text-white px-6 py-3 rounded-full font-semibold w-full hover:bg-neutral-700 transition"
          >
            {loading ? "Redirecting..." : "Checkout with Stripe"}
          </button>
        </div>
      </div>
    </div>
  </div>
);
}