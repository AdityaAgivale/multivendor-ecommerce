import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { code } = await req.json();
  const coupon = await prisma.coupon.findUnique({ where: { code } });

  if (!coupon || !coupon.active) {
    return NextResponse.json({ error: "Invalid or expired coupon" }, { status: 404 });
  }

  return NextResponse.json({ discount: coupon.discount });
}