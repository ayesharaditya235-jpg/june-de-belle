import { Instagram, Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <p className="font-playfair italic text-2xl font-semibold mb-3">
              june <span className="text-rose-400">de belle</span>
            </p>
            <p className="font-sans text-sm text-white/50 leading-relaxed max-w-xs">
              Aesthetic bags & organizers for the modern student. Carry everything you love,
              in style.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://instagram.com/junedebelle"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-rose-500/30 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-white/40 mb-4">
              Quick Links
            </p>
            <ul className="space-y-3">
              {[
                { label: "Our Collection", href: "#products" },
                { label: "Pre-Order Now", href: "#order" },
                { label: "How It Works", href: "#how-it-works" },
                { label: "FAQ", href: "#faq" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="font-sans text-sm text-white/60 hover:text-rose-300 transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-white/40 mb-4">
              Get in Touch
            </p>
            <p className="font-sans text-sm text-white/60 leading-relaxed mb-4">
              Have questions? We&apos;re just a message away.
            </p>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_OWNER_WA ?? "6281234567890"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-sm text-rose-300 hover:text-rose-200 transition-colors font-medium"
            >
              Chat on WhatsApp →
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-white/30">
            © {year} June de Belle. All rights reserved.
          </p>
          <p className="font-sans text-xs text-white/30 flex items-center gap-1.5">
            Made with <Heart size={11} className="text-rose-400" fill="currentColor" /> for
            every modern student
          </p>
        </div>
      </div>
    </footer>
  );
}
