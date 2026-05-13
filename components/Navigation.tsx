"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Collection", href: "#products" },
    { label: "Find Your Match ✨", href: "#quiz" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className={`transition-all duration-500 ${scrolled ? "bg-pink-50 shadow-sm py-2" : "bg-transparent py-4"}`}>
        <div className="container-max flex items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-auto flex-shrink-0">
              <img
                src="/logo-white.png"
                alt=""
                className={`absolute inset-0 h-8 w-auto object-contain transition-opacity duration-500 ${scrolled ? "opacity-0" : "opacity-100"}`}
                style={{filter: "brightness(0) saturate(100%) invert(51%) sepia(93%) saturate(754%) hue-rotate(306deg) brightness(101%)"}}
              />
              <img
                src="/logo-dark.png"
                alt=""
                className={`h-8 w-auto object-contain transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`}
              />
            </div>
            <span className="font-oldstandard italic text-xl font-bold tracking-wide">
              <span className={`transition-colors duration-500 ${scrolled ? "text-charcoal" : "text-rose-500"}`}>June</span>{" "}
              <span className="text-rose-500">de Belle</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a key={l.href} href={l.href}
                className={`font-sans text-sm transition-colors duration-200 tracking-wide hover:text-rose-500 ${scrolled ? "text-charcoal/70" : "text-white/80"}`}>
                {l.label}
              </a>
            ))}
          </nav>

          <a href="#order" className="hidden md:inline-flex btn-primary text-sm px-5 py-2.5">
            Pre-Order Now
          </a>

          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} className="text-charcoal" /> : <Menu size={20} className={scrolled ? "text-charcoal" : "text-white"} />}
          </button>
        </div>
      </div>

      {/* Wavy bottom edge when scrolled */}
      {scrolled && (
        <div className="w-full overflow-hidden" style={{height: "20px", marginTop: "-1px"}}>
          <svg viewBox="0 0 1440 20" preserveAspectRatio="none" className="w-full h-full" fill="#fdf2f8">
            <path d="M0,0 C60,20 120,0 180,10 C240,20 300,0 360,10 C420,20 480,0 540,10 C600,20 660,0 720,10 C780,20 840,0 900,10 C960,20 1020,0 1080,10 C1140,20 1200,0 1260,10 C1320,20 1380,5 1440,10 L1440,0 Z" />
          </svg>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-pink-50 border-t border-rose-100 px-4 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a key={l.href} href={l.href}
              className="font-sans text-sm text-charcoal/80 hover:text-rose-500 transition-colors"
              onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#order" className="btn-primary self-start mt-2" onClick={() => setMenuOpen(false)}>
            Pre-Order Now
          </a>
        </div>
      )}
    </header>
  );
}
