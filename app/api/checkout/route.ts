import Stripe from "stripe";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { items, discount } = await req.json();

  const subtotal = items.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0);
  const totalAmount = subtotal - (subtotal * (discount || 0)) / 100;

  // Order pehle "pending" status mein database mein banao
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      status: "pending",
      totalAmount,
      items: {
        create: items.map((i: any) => ({
          productId: i.productId,
          quantity: i.quantity,
          price: i.price,
        })),
      },
    },
  });

  const line_items = items.map((item: any) => ({
    price_data: {
      currency: "usd",
      product_data: { name: item.name },
      unit_amount: Math.round(item.price * (1 - (discount || 0) / 100) * 100),
    },
    quantity: item.quantity,
  }));

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items,
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order-success?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    customer_email: session.user.email,
    metadata: { orderId: order.id },
  });

  return NextResponse.json({ url: checkoutSession.url });
}