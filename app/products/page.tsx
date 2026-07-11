"use client";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

type Product = { id: string; name: string; price: number; imageUrl: string; category: string; stock: number };

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart, items } = useCart();

  useEffect(() => {
    fetch("/api/products").then((res) => res.json()).then(setProducts);
  }, []);

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-50 p-10">
      <div className="flex justify-between items-center mb-10 max-w-7xl mx-auto">
  <div>
    <h1 className="text-4xl font-serif font-bold text-neutral-900 tracking-tight">Shop All Products</h1>
    <p className="text-neutral-500 mt-1">Curated picks from our best sellers</p>
  </div>
  <Link href="/cart" className="bg-neutral-900 text-white px-5 py-2.5 rounded-full hover:bg-neutral-700 transition">
    Cart ({cartCount})
  </Link>
</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {products.map((p) => (
  <div key={p.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden group">
    <div className="h-48 overflow-hidden">
      <img
        src={p.imageUrl}
        alt={p.name}
        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
      />
    </div>
    <div className="p-4">
      <p className="font-semibold text-neutral-900 font-serif">{p.name}</p>
      <p className="text-neutral-500 text-sm mb-2">{p.category}</p>
      <div className="flex justify-between items-center">
        <span className="font-bold text-neutral-900">${p.price.toFixed(2)}</span>
        <button
          onClick={() =>
            addToCart({ productId: p.id, name: p.name, price: p.price, imageUrl: p.imageUrl })
          }
          className="bg-neutral-900 text-white text-sm px-4 py-1.5 rounded-full hover:bg-neutral-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
))}
      </div>
    </div>
  );
}