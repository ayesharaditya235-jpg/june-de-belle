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
    { label: "Collection", href: "#products", highlight: false },
    { label: "Find Your Match ✨", href: "#quiz", highlight: true },
    { label: "How It Works", href: "#how-it-works", highlight: false },
    { label: "FAQ", href: "#faq", highlight: false },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm shadow-rose-100/40 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-max flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="relative h-8 w-auto flex-shrink-0">
            <img
              src="/logo-white.png"
              alt=""
              className={`absolute inset-0 h-8 w-auto object-contain transition-opacity duration-500 ${scrolled ? "opacity-0" : "opacity-100"}`}
            />
            <img
              src="/logo-dark.png"
              alt=""
              className={`h-8 w-auto object-contain transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`}
            />
          </div>
          <span className="font-oldstandard italic text-xl font-bold tracking-wide">
            <span className={`transition-colors duration-500 ${scrolled ? "text-charcoal" : "text-white"}`}>June</span>{" "}
            <span className="text-rose-500">de Belle</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`font-sans text-sm transition-colors duration-200 tracking-wide ${
                l.highlight
                  ? "text-rose-500 hover:text-rose-600 font-medium"
                  : "text-charcoal/70 hover:text-rose-600"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a href="#order" className="hidden md:inline-flex btn-primary">
          Pre-Order Now
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-rose-50 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <X size={20} className="text-charcoal" />
          ) : (
            <Menu size={20} className="text-charcoal" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-rose-100 px-4 py-6 flex flex-col gap-5 animate-fade-in">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-sans text-sm text-charcoal/80 hover:text-rose-600 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#order"
            className="btn-primary self-start mt-2"
            onClick={() => setMenuOpen(false)}
          >
            Pre-Order Now
          </a>
        </div>
      )}
    </header>
  );
}
