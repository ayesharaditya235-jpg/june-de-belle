import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function ProductSection() {
  return (
    <section id="products" className="relative" style={{background: "#f9a8d4"}}>

      {/* Wavy top */}
      <div className="w-full overflow-hidden" style={{marginTop: "-2px"}}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full" style={{height: "80px", display: "block"}} fill="white">
          <path d="M0,40 C80,80 160,0 240,40 C320,80 400,0 480,40 C560,80 640,0 720,40 C800,80 880,0 960,40 C1040,80 1120,0 1200,40 C1280,80 1360,20 1440,40 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="container-max px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center mb-14">
          <p className="font-sans text-white/80 text-xs uppercase tracking-widest font-medium mb-3">✦ Our Collection ✦</p>
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold leading-tight mb-4 text-white drop-shadow-sm">
            Shop the Top Sellers
          </h2>
          <p className="font-sans text-white/80 text-base max-w-md mx-auto leading-relaxed">
            Three essentials, one aesthetic. Designed to keep you organised and effortlessly cute.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <p className="text-center font-sans text-xs text-white/50 mt-8">
          * Inner Bag Pouch price will be announced before pre-order ends.
        </p>
      </div>

      {/* Wavy bottom */}
      <div className="w-full overflow-hidden">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full" style={{height: "80px", display: "block"}} fill="white">
          <path d="M0,40 C80,80 160,0 240,40 C320,80 400,0 480,40 C560,80 640,0 720,40 C800,80 880,0 960,40 C1040,80 1120,0 1200,40 C1280,80 1360,20 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>

    </section>
  );
}
