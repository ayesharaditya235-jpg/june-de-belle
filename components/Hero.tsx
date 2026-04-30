'use client'
import CountdownTimer from "./CountdownTimer";
import { Sparkles, ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, #1A1A1A 0%, #2D0D1A 40%, #5A1C39 70%, #A33968 100%)",
        }}
      />

      {/* Decorative circles */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full -z-10 opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #E879A8 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full -z-10 opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #F9B4C8 0%, transparent 70%)" }} />

      {/* Floating orbs */}
      <div className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-rose-300/40 animate-float" />
      <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-rose-200/30 animate-float [animation-delay:1s]" />
      <div className="absolute bottom-1/3 right-1/5 w-4 h-4 rounded-full bg-rose-400/20 animate-float [animation-delay:2s]" />
      <div className="absolute top-1/2 left-1/4 w-2 h-2 rounded-full bg-blush/30 animate-float [animation-delay:0.5s]" />

      {/* Grid overlay */}
      <div className="absolute inset-0 -z-10 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(249,180,200,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(249,180,200,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-max px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-4xl">
          {/* Pre-order badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-500/30 bg-rose-500/10 mb-8 animate-fade-in">
            <Sparkles size={14} className="text-rose-300" />
            <span className="font-sans text-rose-200 text-xs tracking-widest uppercase font-medium">
              Pre-Order Now Open
            </span>
          </div>

          {/* Main heading */}
          <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-6 animate-fade-up">
            Carry Your Day,
            <br />
            <em className="font-playfair italic text-gradient-hero">In Style.</em>
          </h1>

          {/* Brand name */}
          <p className="font-playfair italic text-rose-300 text-xl sm:text-2xl mb-4 animate-fade-up [animation-delay:0.1s]">
            — june de belle
          </p>

          {/* Sub description */}
          <p className="font-sans text-white/60 text-base sm:text-lg max-w-xl leading-relaxed mb-10 animate-fade-up [animation-delay:0.2s]">
            Aesthetic bags & organizers crafted for the modern student. Lightweight,
            ergonomic, and effortlessly beautiful — designed to carry everything you love.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-14 animate-fade-up [animation-delay:0.3s]">
            <a href="#order" className="btn-primary px-9 py-4 text-base">
              Pre-Order Now
            </a>
            <a
              href="#products"
              className="inline-flex items-center gap-2 font-sans text-sm text-white/70 hover:text-white transition-colors"
            >
              View Collection
              <ArrowDown size={16} />
            </a>
          </div>

          {/* Countdown */}
          <div className="animate-fade-up [animation-delay:0.4s]">
            <p className="font-sans text-xs text-rose-200/60 uppercase tracking-widest mb-4">
              Pre-order closes in
            </p>
            <CountdownTimer />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
        <ArrowDown size={16} className="text-white" />
      </div>

      <style jsx>{`
        .text-gradient-hero {
          background: linear-gradient(90deg, #f9b4c8 0%, #e879a8 50%, #c94f82 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </section>
  );
}
