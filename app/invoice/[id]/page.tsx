"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import jsPDF from "jspdf";

type OrderDetail = {
  id: string;
  totalAmount: number;
  createdAt: string;
  user: { name: string; email: string };
  items: { quantity: number; price: number; product: { name: string } }[];
};

export default function InvoicePage() {
  const params = useParams();
  const [order, setOrder] = useState<OrderDetail | null>(null);

  useEffect(() => {
    fetch(`/api/orders/${params.id}`)
      .then((res) => res.json())
      .then(setOrder);
  }, [params.id]);

  const downloadPDF = () => {
    if (!order) return;
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Invoice", 20, 20);
    doc.setFontSize(11);
    doc.text(`Order ID: ${order.id}`, 20, 32);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 20, 40);
    doc.text(`Customer: ${order.user.name || order.user.email}`, 20, 48);

    let y = 65;
    doc.text("Item", 20, y);
    doc.text("Qty", 120, y);
    doc.text("Price", 150, y);
    y += 8;

    order.items.forEach((item) => {
      doc.text(item.product.name, 20, y);
      doc.text(String(item.quantity), 120, y);
      doc.text(`$${item.price.toFixed(2)}`, 150, y);
      y += 8;
    });

    y += 10;
    doc.setFontSize(13);
    doc.text(`Total: $${order.totalAmount.toFixed(2)}`, 20, y);

    doc.save(`invoice-${order.id}.pdf`);
  };

  if (!order) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-stone-50 p-10 flex flex-col items-center justify-center gap-6">
      <div className="bg-white rounded-xl shadow-sm p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">Invoice Preview</h1>
        <p className="text-neutral-600 mb-2">Order #{order.id.slice(0, 8)}</p>
        <p className="text-neutral-600 mb-4">Total: ${order.totalAmount.toFixed(2)}</p>
        <button onClick={downloadPDF} className="bg-neutral-900 text-white px-6 py-2 rounded-full w-full">
          Download PDF
        </button>
      </div>
    </div>
  );
}