"use client";

import { useState } from "react";
import { Check, Package } from "lucide-react";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const variant = product.variants[selectedIdx];
  const hasImages = !!(variant.productImage && variant.modelImage);

  return (
    <div className="group/card relative bg-white rounded-3xl border border-rose-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-rose-100/50 transition-all duration-500 hover:-translate-y-1">
      {product.badge && (
        <div className="absolute top-4 right-4 z-10">
          <span
            className={`badge font-medium ${
              product.badge === "Most Popular"
                ? "bg-rose-600 text-white"
                : "bg-amber-100 text-amber-700 border border-amber-200"
            }`}
          >
            {product.badge}
          </span>
        </div>
      )}

      {/* Image area */}
      <div
        className="relative h-56 sm:h-64 overflow-hidden flex items-center justify-center group/img"
        style={
          !hasImages
            ? {
                background: `linear-gradient(135deg, ${product.gradientFrom} 0%, ${product.gradientTo} 100%)`,
              }
            : undefined
        }
      >
        {hasImages ? (
          <>
            <img
              src={variant.productImage}
              alt={`${product.name} ${variant.name}`}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-100 group-hover/img:opacity-0"
            />
            <img
              src={variant.modelImage}
              alt={`${product.name} ${variant.name} model`}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover/img:opacity-100"
            />
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 transition-transform duration-500 group-hover/card:scale-110">
            <div className="w-24 h-24 rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-sm">
              <Package size={40} className="text-rose-400" strokeWidth={1.5} />
            </div>
            <span className="font-playfair italic text-sm text-rose-500/70">
              {product.name}
            </span>
          </div>
        )}

        {/* Color swatches */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {product.variants.map((v, i) => (
            <button
              key={v.name}
              className={`w-5 h-5 rounded-full border-2 border-white shadow-sm transition-all duration-200 ${
                i === selectedIdx ? "scale-125 shadow-md" : "hover:scale-110"
              }`}
              style={{ backgroundColor: v.color }}
              title={v.name}
              onClick={() => setSelectedIdx(i)}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="font-playfair text-xl font-bold text-charcoal mb-1">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2 mb-3">
            {product.price ? (
              <span className="font-playfair text-2xl font-bold text-rose-600">
                {product.price}
              </span>
            ) : (
              <span className="font-sans text-sm font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                Price to be announced
              </span>
            )}
          </div>
          <p className="font-sans text-sm text-gray-500 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 mb-4 py-3 border-y border-rose-50">
          <div className="text-center">
            <p className="font-sans text-[10px] text-gray-400 uppercase tracking-wider">
              Material
            </p>
            <p className="font-sans text-xs font-medium text-charcoal mt-0.5">
              {product.material}
            </p>
          </div>
          <div className="w-px h-8 bg-rose-100" />
          <div className="text-center">
            <p className="font-sans text-[10px] text-gray-400 uppercase tracking-wider">
              Size
            </p>
            <p className="font-sans text-xs font-medium text-charcoal mt-0.5">
              {product.dimensions}
            </p>
          </div>
          <div className="w-px h-8 bg-rose-100" />
          <div className="text-center">
            <p className="font-sans text-[10px] text-gray-400 uppercase tracking-wider">
              Colours
            </p>
            <p className="font-sans text-xs font-medium text-charcoal mt-0.5">
              {product.variants.length} options
            </p>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-1.5 mb-6">
          {product.features.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <Check size={13} className="text-rose-400 flex-shrink-0" />
              <span className="font-sans text-xs text-gray-500">{f}</span>
            </li>
          ))}
        </ul>

        <a href="#order" className="btn-primary w-full justify-center">
          Add to Pre-Order
        </a>
      </div>
    </div>
  );
}
