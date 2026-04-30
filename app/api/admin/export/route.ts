import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { supabaseAdmin } from "@/lib/supabase";
import type { Order } from "@/lib/types";

function isAuthed(req: NextRequest): boolean {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return false;
  const expected = createHash("sha256")
    .update(`${process.env.ADMIN_PASSWORD}:${process.env.NEXT_PUBLIC_SUPABASE_URL}`)
    .digest("hex");
  return token === expected;
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = supabaseAdmin();
  const { data, error } = await db
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const headers = ["ID", "Name", "WhatsApp", "Email", "Product", "Variant", "Status", "Notes", "Created At"];
  const rows = (data as Order[]).map((o) => [
    o.id,
    o.name,
    o.whatsapp,
    o.email ?? "",
    o.product,
    o.variant,
    o.status,
    o.notes ?? "",
    new Date(o.created_at).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
  ]);

  const csv = [headers, ...rows]
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
    )
    .join("\r\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="june-de-belle-orders-${Date.now()}.csv"`,
    },
  });
}
