"use client";

import { useState, useMemo } from "react";
import { CheckCircle, MessageCircle, Loader2, AlertCircle } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import type { OrderFormData } from "@/lib/types";

const INITIAL: OrderFormData = {
  name: "",
  whatsapp: "",
  email: "",
  product: "",
  variant: "",
  notes: "",
};

export default function PreOrderForm() {
  const [form, setForm] = useState<OrderFormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<OrderFormData>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const selectedProduct = useMemo(
    () => PRODUCTS.find((p) => p.id === form.product),
    [form.product]
  );

  const validate = () => {
    const e: Partial<OrderFormData> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.whatsapp.trim()) {
      e.whatsapp = "WhatsApp number is required";
    } else if (!/^(08|\+628|628)\d{8,12}$/.test(form.whatsapp.replace(/\s/g, ""))) {
      e.whatsapp = "Please enter a valid Indonesian WhatsApp number";
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Please enter a valid email";
    }
    if (!form.product) e.product = "Please select a product";
    if (!form.variant) e.variant = "Please select a colour";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const set = (k: keyof OrderFormData, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
    if (k === "product") setForm((f) => ({ ...f, product: v, variant: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Submission failed");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const buildWaMessage = () => {
    const product = selectedProduct?.name ?? form.product;
    const msg = [
      "Hi! I'd like to confirm my Pre-Order for *June de Belle* 🌸",
      "",
      "📦 *Order Details:*",
      `Name: ${form.name}`,
      `Product: ${product}`,
      `Colour: ${form.variant}`,
      `Contact: ${form.whatsapp}`,
      form.notes ? `Notes: ${form.notes}` : "",
      "",
      "Please let me know the payment details. Thank you! ✨",
    ]
      .filter((l) => l !== undefined)
      .join("\n");
    const ownerNumber = process.env.NEXT_PUBLIC_OWNER_WA ?? "6281234567890";
    return `https://wa.me/${ownerNumber}?text=${encodeURIComponent(msg)}`;
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center text-center py-10 px-6">
        <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-rose-500" />
        </div>
        <h3 className="font-playfair text-2xl font-bold text-charcoal mb-2">
          Order Received!
        </h3>
        <p className="font-sans text-gray-500 text-sm max-w-sm mb-8 leading-relaxed">
          Your pre-order has been saved. Click the button below to chat with us on WhatsApp
          and confirm your payment details.
        </p>
        <a
          href={buildWaMessage()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-wa px-10 py-4 text-base"
        >
          <MessageCircle size={18} />
          Confirm via WhatsApp
        </a>
        <button
          onClick={() => { setForm(INITIAL); setStatus("idle"); }}
          className="mt-4 font-sans text-sm text-gray-400 hover:text-rose-500 transition-colors"
        >
          Place another order
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {status === "error" && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
          <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
          <p className="font-sans text-sm text-red-600">{errorMsg}</p>
        </div>
      )}

      {/* Name */}
      <div>
        <label className="form-label" htmlFor="name">Full Name *</label>
        <input
          id="name"
          type="text"
          placeholder="Your full name"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          className={`form-input ${errors.name ? "border-red-300 focus:ring-red-200" : ""}`}
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>

      {/* WhatsApp */}
      <div>
        <label className="form-label" htmlFor="whatsapp">WhatsApp Number *</label>
        <input
          id="whatsapp"
          type="tel"
          placeholder="08xxxxxxxxxx or +628xxxxxxxxxx"
          value={form.whatsapp}
          onChange={(e) => set("whatsapp", e.target.value)}
          className={`form-input ${errors.whatsapp ? "border-red-300 focus:ring-red-200" : ""}`}
        />
        {errors.whatsapp && <p className="mt-1 text-xs text-red-500">{errors.whatsapp}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="form-label" htmlFor="email">
          Email <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          className={`form-input ${errors.email ? "border-red-300 focus:ring-red-200" : ""}`}
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>

      {/* Product */}
      <div>
        <label className="form-label" htmlFor="product">Product *</label>
        <select
          id="product"
          value={form.product}
          onChange={(e) => set("product", e.target.value)}
          className={`form-input ${errors.product ? "border-red-300 focus:ring-red-200" : ""}`}
        >
          <option value="">Select a product</option>
          {PRODUCTS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} {p.price ? `— ${p.price}` : "— Price TBD"}
            </option>
          ))}
        </select>
        {errors.product && <p className="mt-1 text-xs text-red-500">{errors.product}</p>}
      </div>

      {/* Variant */}
      <div>
        <label className="form-label">Colour *</label>
        {selectedProduct ? (
          <div className="flex flex-wrap gap-2">
            {selectedProduct.variants.map((v) => (
              <button
                key={v.name}
                type="button"
                onClick={() => set("variant", v.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-medium font-sans transition-all duration-200 ${
                  form.variant === v.name
                    ? "border-rose-500 bg-rose-50 text-rose-700"
                    : "border-rose-100 text-gray-600 hover:border-rose-300"
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-gray-200"
                  style={{ backgroundColor: v.color }}
                />
                {v.name}
              </button>
            ))}
          </div>
        ) : (
          <p className="font-sans text-sm text-gray-400 italic py-2">
            Select a product first to see colour options.
          </p>
        )}
        {errors.variant && <p className="mt-1 text-xs text-red-500">{errors.variant}</p>}
      </div>

      {/* Notes */}
      <div>
        <label className="form-label" htmlFor="notes">
          Notes <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          id="notes"
          rows={3}
          placeholder="Any special requests or questions?"
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          className="form-input resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full justify-center py-4 text-base mt-2"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Placing Order…
          </>
        ) : (
          "Place Pre-Order →"
        )}
      </button>

      <p className="text-center font-sans text-xs text-gray-400 leading-relaxed">
        By submitting, you&apos;ll be directed to WhatsApp to complete payment with our owner.
        No payment is processed on this site.
      </p>
    </form>
  );
}
