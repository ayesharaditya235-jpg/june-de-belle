import { NextRequest, NextResponse } from "next/server";

async function verifyAdminToken(token: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!adminPassword || !supabaseUrl) return false;

  const encoder = new TextEncoder();
  const data = encoder.encode(`${adminPassword}:${supabaseUrl}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const expected = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return token === expected;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login") return NextResponse.next();

  const token = req.cookies.get("admin_token")?.value;

  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
