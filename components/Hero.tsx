'use client'
import CountdownTimer from "./CountdownTimer";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">

      {/* Background foto */}
      <div className="absolute inset-0">
        <img
          src="/products/Tote Bag Navy Rue → foto model.png"
          alt="June de Belle"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(255,182,193,0.3) 0%, rgba(180,60,100,0.55) 60%, rgba(255,182,193,0.8) 100%)"
        }} />
      </div>

      {/* Floating frame LEFT */}
      <div className="absolute left-6 sm:left-12 top-1/2 -translate-y-1/2 z-20 hidden sm:block">
        <div style={{animation: "floatY 4s ease-in-out infinite"}}>
          <div className="w-40 sm:w-52 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-rose-300/50 -rotate-6 hover:rotate-0 transition-transform duration-500 border-4 border-white">
            <img src="/products/Tote Bag Pink Lou → foto produk.png" alt="Tote Bag Pink" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Floating frames RIGHT */}
      <div className="absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col gap-4">
        <div style={{animation: "floatY 4s ease-in-out infinite 1s"}}>
          <div className="w-32 sm:w-40 aspect-[3/4] rounded-2xl overflow-hidden shadow-xl shadow-rose-200/50 rotate-6 hover:rotate-0 transition-transform duration-500 border-4 border-white">
            <img src="/products/Tote Bag Pink Lou → foto model.png" alt="Tote Bag Pink model" className="w-full h-full object-cover" />
          </div>
        </div>
        <div style={{animation: "floatY 4s ease-in-out infinite 2s"}}>
          <div className="w-28 sm:w-36 aspect-[3/4] rounded-2xl overflow-hidden shadow-xl shadow-rose-200/50 -rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-white ml-4">
            <img src="/products/Compact Pencil Case Sweet June → foto produk.png" alt="Pencil Case" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8 pt-32 pb-48 flex flex-col items-center text-center">

        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/30 backdrop-blur-sm border border-white/50 mb-8">
          <span className="text-white text-xs font-sans font-medium tracking-widest uppercase">✨ Pre-Order Now Open</span>
        </div>

        <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
          Carry Your Day,
          <br />
          <em className="italic text-pink-100">In Style.</em>
        </h1>

        <p className="font-oldstandard italic text-pink-200 text-xl mb-6">— June de Belle</p>

        <p className="font-sans text-white/80 text-base sm:text-lg max-w-md leading-relaxed mb-10">
          Aesthetic bags & organizers crafted for the modern student.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
          <a href="#order" className="bg-white text-rose-500 font-sans font-semibold px-8 py-4 rounded-full hover:bg-pink-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            Pre-Order Now 🛍️
          </a>
          <a href="#products" className="font-sans text-sm text-white/80 hover:text-white flex items-center gap-2 transition-colors">
            View Collection <ArrowDown size={15} />
          </a>
        </div>

        <div>
          <p className="font-sans text-xs text-pink-200/80 uppercase tracking-widest mb-3">Pre-order closes in</p>
          <CountdownTimer />
        </div>
      </div>

      {/* Wavy bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full" style={{height: "80px", display: "block"}} fill="white">
          <path d="M0,40 C80,80 160,0 240,40 C320,80 400,0 480,40 C560,80 640,0 720,40 C800,80 880,0 960,40 C1040,80 1120,0 1200,40 C1280,80 1360,20 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>

      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 animate-bounce opacity-60">
        <ArrowDown size={18} className="text-white" />
      </div>

      <style jsx>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </section>
  );
}
