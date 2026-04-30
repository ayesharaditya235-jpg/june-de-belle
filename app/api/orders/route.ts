import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { PRODUCTS } from "@/lib/products";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, whatsapp, email, product, variant, notes } = body;

    if (!name || !whatsapp || !product || !variant) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const waClean = whatsapp.replace(/\s/g, "");
    if (!/^(08|\+628|628)\d{8,12}$/.test(waClean)) {
      return NextResponse.json({ error: "Invalid WhatsApp number" }, { status: 400 });
    }

    const productData = PRODUCTS.find((p) => p.id === product);
    if (!productData) {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 });
    }

    const validVariant = productData.variants.find((v) => v.name === variant);
    if (!validVariant) {
      return NextResponse.json({ error: "Invalid variant" }, { status: 400 });
    }

    const db = supabaseAdmin();
    const { data, error } = await db
      .from("orders")
      .insert({
        name: name.trim(),
        whatsapp: waClean,
        email: email?.trim() || null,
        product: productData.nameId,
        variant,
        notes: notes?.trim() || null,
        status: "Waiting Confirmation",
      })
      .select()
      .single();

    if (error) throw error;

    // Send Fonnte notification to owner (non-blocking)
    sendOwnerNotification(data).catch(console.error);

    return NextResponse.json({ success: true, id: data.id });
  } catch (err) {
    console.error("Order error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

async function sendOwnerNotification(order: {
  id: string;
  name: string;
  whatsapp: string;
  product: string;
  variant: string;
  created_at: string;
}) {
  const token = process.env.FONNTE_TOKEN;
  const ownerNumber = process.env.OWNER_WA_NUMBER;
  if (!token || !ownerNumber) return;

  const message = [
    "🌸 *New Pre-Order — June de Belle*",
    "",
    `📦 Product: ${order.product}`,
    `🎨 Colour: ${order.variant}`,
    `👤 Name: ${order.name}`,
    `📱 WA: ${order.whatsapp}`,
    `🕐 Time: ${new Date(order.created_at).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}`,
    `🆔 Order ID: ${order.id.slice(0, 8)}`,
  ].join("\n");

  await fetch("https://api.fonnte.com/send", {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ target: ownerNumber, message }),
  });
}
