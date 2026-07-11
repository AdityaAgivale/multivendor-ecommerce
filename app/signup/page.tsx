"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "customer" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/login");
    } else {
      setError("Signup failed. This email may already be registered.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <Link href="/" className="text-2xl font-serif font-bold text-neutral-900 block text-center mb-8">
          MARKET
        </Link>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8 space-y-4">
          <div>
            <h1 className="text-2xl font-serif font-bold text-neutral-900">Create your account</h1>
            <p className="text-neutral-500 text-sm mt-1">Join thousands of shoppers and sellers</p>
          </div>

          {error && <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg">{error}</div>}

          <div>
            <label className="text-sm text-neutral-600 mb-1 block">Full Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
              required
            />
          </div>
          <div>
            <label className="text-sm text-neutral-600 mb-1 block">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
              required
            />
          </div>
          <div>
            <label className="text-sm text-neutral-600 mb-1 block">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full p-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
              required
            />
          </div>

          <div>
            <label className="text-sm text-neutral-600 mb-2 block">I want to join as</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setForm({ ...form, role: "customer" })}
                className={`p-3 rounded-lg border-2 font-medium transition ${
                  form.role === "customer"
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-stone-200 text-neutral-600"
                }`}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, role: "seller" })}
                className={`p-3 rounded-lg border-2 font-medium transition ${
                  form.role === "seller"
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-stone-200 text-neutral-600"
                }`}
              >
                Seller
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-neutral-900 text-white p-3 rounded-lg font-semibold hover:bg-neutral-700 transition"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <p className="text-center text-sm text-neutral-500">
            Already have an account?{" "}
            <Link href="/login" className="text-neutral-900 font-semibold underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}