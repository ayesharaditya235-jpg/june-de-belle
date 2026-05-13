"use client";

import { useState } from "react";
import { Check, Package, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);
  const variant = product.variants[selectedIdx];

  const images = [
    variant.productImage,
    variant.modelImage,
    variant.insideImage,
  ].filter(Boolean) as string[];

  const prevPhoto = () => setPhotoIdx((i) => (i - 1 + images.length) % images.length);
  const nextPhoto = () => setPhotoIdx((i) => (i + 1) % images.length);

  const handleVariantChange = (i: number) => {
    setSelectedIdx(i);
    setPhotoIdx(0);
  };

  const hasImages = images.length > 0;

  return (
    <div className="group/card relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-rose-100/60 transition-all duration-500 hover:-translate-y-2">
      {product.badge && (
        <div className="absolute top-4 left-4 z-10">
          <span className={`badge font-medium text-xs px-3 py-1 rounded-full ${
            product.badge === "Most Popular"
              ? "bg-rose-600 text-white"
              : "bg-amber-100 text-amber-700 border border-amber-200"
          }`}>
            {product.badge}
          </span>
        </div>
      )}

      {/* Image area — tall, no padding */}
      <div className="relative aspect-[3/4] overflow-hidden bg-rose-50">
        {hasImages ? (
          <>
            {images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${product.name} ${variant.name} photo ${i + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  i === photoIdx ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {/* Gradient overlay bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent z-10" />

            {/* Swipe hint */}
            {photoIdx === 0 && images.length > 1 && (
              <div className="absolute bottom-12 right-3 z-20 flex items-center gap-1 bg-black/30 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full pointer-events-none">
                <ChevronRight size={10} />
                <span>more photos</span>
              </div>
            )}

            {/* Arrows */}
            {images.length > 1 && (
              <>
                <button onClick={prevPhoto}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover/card:opacity-100">
                  <ChevronLeft size={15} className="text-gray-700" />
                </button>
                <button onClick={nextPhoto}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover/card:opacity-100">
                  <ChevronRight size={15} className="text-gray-700" />
                </button>
              </>
            )}

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
              {images.map((_, i) => (
                <button key={i} onClick={() => setPhotoIdx(i)}
                  className={`rounded-full transition-all duration-200 ${
                    i === photoIdx ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
                  }`} />
              ))}
            </div>

            {/* Color swatches — bottom right overlay */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 z-20">
              {product.variants.map((v, i) => (
                <button key={v.name}
                  onClick={() => handleVariantChange(i)}
                  className={`w-5 h-5 rounded-full border-2 shadow transition-all duration-200 ${
                    i === selectedIdx ? "border-white scale-125 shadow-md" : "border-white/60 hover:scale-110"
                  }`}
                  style={{ backgroundColor: v.color }}
                  title={v.name}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            style={{ background: `linear-gradient(135deg, ${product.gradientFrom}, ${product.gradientTo})` }}>
            <Package size={40} className="text-rose-400" strokeWidth={1.5} />
            <span className="font-playfair italic text-sm text-rose-500/70">{product.name}</span>
          </div>
        )}
      </div>

      {/* Info — clean minimal */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-playfair text-lg font-bold text-charcoal">{product.name}</h3>
          {product.price ? (
            <span className="font-playfair text-lg font-bold text-rose-600">{product.price}</span>
          ) : (
            <span className="font-sans text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full border border-amber-100">TBA</span>
          )}
        </div>

        <p className="font-sans text-xs text-gray-400 leading-relaxed mb-4 whitespace-pre-line">{product.description}</p>

        {/* Features */}
        <ul className="space-y-1 mb-5">
          {product.features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-center gap-2">
              <Check size={12} className="text-rose-400 flex-shrink-0" />
              <span className="font-sans text-xs text-gray-500">{f}</span>
            </li>
          ))}
        </ul>

        <a href="#order" className="btn-primary w-full justify-center text-sm py-3">
          Add to Pre-Order
        </a>
      </div>
    </div>
  );
}
