\# CLAUDE.md — June de Belle



\## Project Overview

June de Belle adalah landing page pre-order untuk brand tas \& organizer pelajar SMA. 

Target user: pelajar SMA usia 15-18 tahun. Masalah yang dipecahkan: tas berat \& 

barang berantakan. Solusi: produk ergonomis, ringan, estetik dengan sistem PO online.



\## Tech Stack

\- Frontend: Next.js 15 (App Router), TypeScript, Tailwind CSS

\- Backend/DB: Supabase (PostgreSQL + RLS)

\- WA Notifikasi: Fonnte

\- Hosting: Vercel

\- Package Manager: npm



\## Project Structure

\- /app — route pages (Next.js App Router)

\- /components — komponen UI reusable

\- /public/products — foto produk

\- /lib — helper functions, Supabase client



\## Design Guidelines

\- Vibe: kawaii, pastel, estetik Gen Z

\- Warna utama: pink \& nude

\- Font: Playfair Display (heading), sans-serif (body)

\- Style: organic, editorial, bukan template AI



\## Do's \& Don'ts

\- DO: simpan API key di .env.local

\- DO: cek .gitignore sebelum commit pertama

\- DO: aktifkan RLS di setiap tabel Supabase

\- DON'T: commit .env.local atau file apapun yang berisi API key ke Git

\- DON'T: accept semua saran AI tanpa dibaca, terutama yang menyentuh file konfigurasi

\- DON'T: hardcode API key di file .ts/.tsx

\- DON'T: pakai font default AI (Inter, Roboto)



\## Commands

\- `npm run dev` — jalankan local server

\- `npm run build` — build production

\- `git add . \&\& git commit -m "pesan" \&\& git push` — push ke GitHub

