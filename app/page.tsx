import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50">
      <nav className="flex items-center justify-between px-10 py-6 border-b border-stone-200 bg-white">
        <div className="text-2xl font-serif font-bold text-neutral-900 tracking-tight">MARKET</div>
        <div className="flex gap-8 text-neutral-700 text-sm font-medium">
          <Link href="/products">Shop</Link>
          <Link href="/seller/dashboard">Sell</Link>
          <Link href="/orders">Orders</Link>
        </div>
        <Link href="/login" className="bg-neutral-900 text-white px-5 py-2 rounded-full text-sm font-medium">
          Account
        </Link>
      </nav>

      {/* Hero with real image */}
      <section className="grid md:grid-cols-2 items-center px-10 py-24 gap-12 max-w-7xl mx-auto">
  <div>
    <p className="text-orange-700 font-medium mb-3 tracking-wide text-sm uppercase">
      New Arrivals Every Week
    </p>
    <h1 className="text-6xl md:text-7xl font-serif font-bold text-neutral-900 tracking-tight leading-[1.05] mb-6">
      Shop from independent sellers, all in one place.
    </h1>
    <p className="text-neutral-600 text-lg mb-8 max-w-xl leading-relaxed">
      Discover unique products from real sellers — curated, quality-checked, delivered fast.
    </p>
    <div className="flex gap-4 items-center">
      <Link href="/products" className="bg-neutral-900 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-neutral-700 transition inline-block">
        Browse Products
      </Link>
      <Link href="/signup" className="text-neutral-900 font-semibold underline underline-offset-4 hover:text-neutral-600 transition">
        Become a Seller
      </Link>
    </div>
    <div className="flex gap-8 mt-12 pt-8 border-t border-stone-200">
      <div>
        <p className="text-2xl font-serif font-bold text-neutral-900">10K+</p>
        <p className="text-neutral-500 text-sm">Products</p>
      </div>
      <div>
        <p className="text-2xl font-serif font-bold text-neutral-900">2K+</p>
        <p className="text-neutral-500 text-sm">Sellers</p>
      </div>
      <div>
        <p className="text-2xl font-serif font-bold text-neutral-900">4.8★</p>
        <p className="text-neutral-500 text-sm">Avg Rating</p>
      </div>
    </div>
  </div>
  <div className="relative">
    <img
      src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&q=80"
      alt="Shopping"
      className="rounded-2xl w-full h-[550px] object-cover shadow-xl"
    />
    <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
      <div className="bg-green-100 text-green-700 rounded-full w-10 h-10 flex items-center justify-center font-bold">
        ✓
      </div>
      <div>
        <p className="font-semibold text-neutral-900 text-sm">Secure Checkout</p>
        <p className="text-neutral-500 text-xs">100% protected payments</p>
      </div>
    </div>
  </div>
</section>

      {/* Category Cards with real images */}
      <section className="px-10 py-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-8">Explore by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Fashion", img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80" },
            { name: "Electronics", img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80" },
            { name: "Home & Living", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80" },
            { name: "Accessories", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" },
          ].map((cat) => (
            <div key={cat.name} className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer group">
              <div className="h-40 overflow-hidden">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="bg-white p-4 text-center">
                <p className="font-semibold text-neutral-900">{cat.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="px-10 py-16 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-10">Trusted by Thousands</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                text: "Amazing quality and super fast delivery. My go-to store for everything now.",
                rating: 5,
              },
              {
                name: "Rohan Mehta",
                text: "Great variety of sellers and products. Checkout was smooth and quick.",
                rating: 5,
              },
              {
                name: "Ananya Iyer",
                text: "Customer support resolved my query within minutes. Highly recommend!",
                rating: 4,
              },
            ].map((review) => (
              <div key={review.name} className="bg-neutral-800 rounded-xl p-6">
                <div className="text-amber-400 mb-3">{"★".repeat(review.rating)}</div>
                <p className="text-neutral-300 mb-4">"{review.text}"</p>
                <p className="font-semibold">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer with Contact */}
      <footer className="px-10 py-12 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <p className="text-xl font-serif font-bold text-neutral-900 mb-3">MARKET</p>
            <p className="text-neutral-500 text-sm">
              Your one-stop destination for quality products from trusted independent sellers.
            </p>
          </div>
          <div>
            <p className="font-semibold text-neutral-900 mb-3">Quick Links</p>
            <div className="flex flex-col gap-2 text-neutral-600 text-sm">
              <Link href="/products">All Products</Link>
              <Link href="/orders">My Orders</Link>
              <Link href="/cart">Cart</Link>
            </div>
          </div>
          <div>
            <p className="font-semibold text-neutral-900 mb-3">Customer Care</p>
            <div className="flex flex-col gap-2 text-neutral-600 text-sm">
              <p>support@market.com</p>
              <p>+91 98765 43210</p>
              <p>Mon–Sat, 9am–7pm</p>
            </div>
          </div>
          <div>
            <p className="font-semibold text-neutral-900 mb-3">Contact Us</p>
            <p className="text-neutral-600 text-sm mb-3">
              Have a question? We'd love to hear from you.
            </p>
            <Link href="/contact" className="bg-neutral-900 text-white px-5 py-2 rounded-full text-sm inline-block">
              Get in Touch
            </Link>
          </div>
        </div>
        <p className="text-center text-neutral-400 text-xs mt-10">
          © 2026 MARKET. All rights reserved.
        </p>
      </footer>
    </div>
  );
}