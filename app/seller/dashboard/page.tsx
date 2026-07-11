"use client";
import { useState } from "react";

export default function SellerDashboard() {
  const [form, setForm] = useState({ name: "", description: "", price: "", imageUrl: "", category: "", stock: "10" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setMessage("Product added!");
      setForm({ name: "", description: "", price: "", imageUrl: "", category: "", stock: "10" });
    } else {
      const data = await res.json();
      setMessage("Error: " + data.error);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 p-10">
      <h1 className="text-3xl font-bold text-neutral-900 mb-6">Seller Dashboard</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 max-w-lg space-y-4">
        <input placeholder="Product Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full p-2 border rounded" />
        <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full p-2 border rounded" />
        <input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full p-2 border rounded" />
        <input placeholder="Image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="w-full p-2 border rounded" />
        <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full p-2 border rounded" />
        <input placeholder="Stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="w-full p-2 border rounded" />
        <button type="submit" className="bg-neutral-900 text-white px-6 py-2 rounded-full font-semibold">
          Add Product
        </button>
        {message && <p className="text-neutral-600">{message}</p>}
      </form>
    </div>
  );
}