"use client";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // MVP ke liye: abhi sirf UI hai, backend email service baad mein add kar sakte ho (Resend/Nodemailer)
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 p-10 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8">
        <h1 className="text-3xl font-serif font-bold text-neutral-900 mb-2">Get in Touch</h1>
        <p className="text-neutral-600 mb-6">We usually respond within 24 hours.</p>
        {submitted ? (
          <p className="text-green-700 font-medium">Thanks! We'll get back to you soon.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input placeholder="Your Name" className="w-full p-2 border rounded" required />
            <input placeholder="Email" type="email" className="w-full p-2 border rounded" required />
            <textarea placeholder="Message" rows={4} className="w-full p-2 border rounded" required />
            <button type="submit" className="bg-neutral-900 text-white px-6 py-2 rounded-full w-full font-semibold">
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}