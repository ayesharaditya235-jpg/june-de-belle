import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function ProductSection() {
  return (
    <section id="products" className="section-padding bg-white">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-rose-500 text-xs uppercase tracking-widest font-medium mb-3">
            Our Collection
          </p>
          <h2 className="font-playfair text-4xl sm:text-5xl text-charcoal font-bold leading-tight mb-4">
            Made for Every School Day
          </h2>
          <p className="font-sans text-gray-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Three essentials, one aesthetic. Each piece designed to keep you organised,
            comfortable, and looking effortlessly put-together.
          </p>
        </div>

        {/* Product cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Note about Inner Bag */}
        <p className="text-center font-sans text-sm text-gray-400 mt-8">
          * Inner Bag Pouch price will be announced before pre-order period ends.
        </p>
      </div>
    </section>
  );
}
