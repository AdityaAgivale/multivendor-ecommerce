import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user || user.role !== "seller") {
    return NextResponse.json({ error: "Only sellers can add products" }, { status: 403 });
  }
  const data = await req.json();
  const product = await prisma.product.create({
    data: { ...data, price: parseFloat(data.price), stock: parseInt(data.stock), sellerId: user.id },
  });
  return NextResponse.json(product);
}