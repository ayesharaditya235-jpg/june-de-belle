\# TASKS.md — June de Belle



\## Phase 1: Foundation

\- \[x] Setup project Next.js 15 + TypeScript + Tailwind CSS

\- \[x] Setup Supabase project + tabel orders

\- \[x] Konfigurasi .env.local dengan Supabase keys

\- \[x] Deploy ke Vercel (auto-deploy dari GitHub)

\- \[x] Setup GitHub repository



\## Phase 2: Core Features

\- \[x] Hero section dengan brand tagline + CTA tombol Pesan Sekarang

\- \[x] Countdown timer periode PO

\- \[x] Product showcase 3 produk (Totebag, Tempat Pensil, Inner Bag Pouch)

\- \[x] Image carousel per produk (3 foto, swipe kiri-kanan)

\- \[x] Color variant picker per produk

\- \[x] Badge TBA untuk harga Inner Bag Pouch

\- \[x] Form pre-order (nama, WA, email, produk, warna, ukuran)

\- \[x] Validasi input form (nomor WA valid)

\- \[x] Data order tersimpan ke Supabase

\- \[x] Notifikasi WA ke owner via Fonnte setiap ada order masuk

\- \[x] WhatsApp redirect dengan pesan pre-filled setelah submit form

\- \[x] Dashboard admin /admin (login-protected)

\- \[x] Tampilan semua orders di dashboard (nama, WA, produk, varian, timestamp)



\## Phase 3: Polish

\- \[x] Wavy border antar section

\- \[x] Responsive design (mobile \& desktop)

\- \[x] Loading state di form submit

\- \[x] Navbar dengan smooth scroll

\- \[x] Product quiz / size guide



\## Phase 4: Security \& Pre-Deploy

\- \[x] RLS aktif di tabel orders (Allow public insert + Allow admin select)

\- \[x] .env.local tidak ter-commit ke GitHub

\- \[x] Environment variables dikonfigurasi di Vercel

\- \[x] Smoke test di production



\## Backlog — V2 (Out of Scope MVP)

\- \[ ] Integrasi payment gateway (Midtrans / Xendit)

\- \[ ] Konfirmasi pembayaran otomatis

\- \[ ] Notifikasi email otomatis ke customer

\- \[ ] Update status order manual di dashboard (Menunggu / Sudah Bayar / Selesai)

\- \[ ] Export data orders ke CSV

\- \[ ] Manajemen stok real-time

\- \[ ] Sistem review \& rating produk

\- \[ ] Mobile app native

\- \[ ] Loyalty program / poin reward

