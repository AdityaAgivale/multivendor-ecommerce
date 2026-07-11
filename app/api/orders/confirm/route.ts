import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { orderId } = await req.json();

  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status: "paid" },
  });

  return NextResponse.json(order);
}