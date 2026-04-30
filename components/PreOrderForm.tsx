"use client";

import { useState } from "react";
import { CheckCircle, MessageCircle, Loader2, AlertCircle, X } from "lucide-react";
import { PRODUCTS } from "@/lib/products";

interface ContactFields {
  name: string;
  whatsapp: string;
  email: string;
  notes: string;
}

interface SelectedItem {
  productId: string;
  productName: string;
  variantName: string;
  price: string | null;
}

interface FormErrors {
  name?: string;
  whatsapp?: string;
  email?: string;
  items?: string;
}

const INITIAL_FIELDS: ContactFields = { name: "", whatsapp: "", email: "", notes: "" };

export default function PreOrderForm() {
  const [fields, setFields] = useState<ContactFields>(INITIAL_FIELDS);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isSelected = (productId: string, variantName: string) =>
    selectedItems.some((i) => i.productId === productId && i.variantName === variantName);

  const toggleItem = (productId: string, variantName: string) => {
    const product = PRODUCTS.find((p) => p.id === productId)!;
    if (isSelected(productId, variantName)) {
      setSelectedItems((prev) => prev.filter((i) => !(i.productId === productId && i.variantName === variantName)));
    } else {
      setSelectedItems((prev) => [
        ...prev,
        { productId, productName: product.name, variantName, price: product.price },
      ]);
    }
    if (errors.items) setErrors((e) => ({ ...e, items: undefined }));
  };

  const removeItem = (productId: string, variantName: string) => {
    setSelectedItems((prev) => prev.filter((i) => !(i.productId === productId && i.variantName === variantName)));
  };

  const setField = (k: keyof ContactFields, v: string) => {
    setFields((f) => ({ ...f, [k]: v }));
    if (errors[k as keyof FormErrors]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: FormErrors = {};
    if (!fields.name.trim()) e.name = "Name is required";
    if (!fields.whatsapp.trim()) {
      e.whatsapp = "WhatsApp number is required";
    } else if (!/^(08|\+628|628)\d{8,12}$/.test(fields.whatsapp.replace(/\s/g, ""))) {
      e.whatsapp = "Please enter a valid Indonesian WhatsApp number";
    }
    if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      e.email = "Please enter a valid email";
    }
    if (selectedItems.length === 0) e.items = "Please select at least one item";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildWaMessage = () => {
    const itemLines = selectedItems.map(
      (i) => `• ${i.productName} — ${i.variantName}${i.price ? ` (${i.price})` : " (Price TBD)"}`
    );
    const msg = [
      "Hi! I'd like to confirm my Pre-Order for *June de Belle* 🌸",
      "",
      "📦 *Order Details:*",
      `Name: ${fields.name}`,
      `Contact: ${fields.whatsapp}`,
      "",
      "*Items Ordered:*",
      ...itemLines,
      fields.notes ? `\nNotes: ${fields.notes}` : "",
      "",
      "Please let me know the payment details. Thank you! ✨",
    ]
      .filter((l) => l !== undefined)
      .join("\n");
    const ownerNumber = process.env.NEXT_PUBLIC_OWNER_WA ?? "6281234567890";
    return `https://wa.me/${ownerNumber}?text=${encodeURIComponent(msg)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const productStr = selectedItems.map((i) => `${i.productName} (${i.variantName})`).join(", ");
      const variantStr = selectedItems.map((i) => i.variantName).join(", ");
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name,
          whatsapp: fields.whatsapp,
          email: fields.email,
          product: productStr,
          variant: variantStr,
          notes: fields.notes,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Submission failed");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center text-center py-10 px-6">
        <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-rose-500" />
        </div>
        <h3 className="font-playfair text-2xl font-bold text-charcoal mb-2">Order Received!</h3>
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
          onClick={() => { setFields(INITIAL_FIELDS); setSelectedItems([]); setStatus("idle"); }}
          className="mt-4 font-sans text-sm text-gray-400 hover:text-rose-500 transition-colors"
        >
          Place another order
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
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
          value={fields.name}
          onChange={(e) => setField("name", e.target.value)}
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
          value={fields.whatsapp}
          onChange={(e) => setField("whatsapp", e.target.value)}
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
          value={fields.email}
          onChange={(e) => setField("email", e.target.value)}
          className={`form-input ${errors.email ? "border-red-300 focus:ring-red-200" : ""}`}
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>

      {/* Product selection */}
      <div>
        <label className="form-label">Select Items *</label>
        <div className="space-y-3">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border border-rose-100 overflow-hidden"
            >
              {/* Product header */}
              <div
                className="px-4 py-3 flex items-center justify-between"
                style={{
                  background: `linear-gradient(135deg, ${product.gradientFrom} 0%, ${product.gradientTo} 100%)`,
                }}
              >
                <div>
                  <p className="font-playfair text-sm font-bold text-charcoal">{product.name}</p>
                  {product.price ? (
                    <p className="font-sans text-xs text-rose-600 font-semibold">{product.price}</p>
                  ) : (
                    <p className="font-sans text-xs text-amber-600">Price TBD</p>
                  )}
                </div>
                {product.variants.some((v) => isSelected(product.id, v.name)) && (
                  <span className="font-sans text-[10px] bg-rose-500 text-white px-2 py-0.5 rounded-full">
                    Selected
                  </span>
                )}
              </div>

              {/* Variant buttons */}
              <div className="px-4 py-3 bg-white flex flex-wrap gap-2">
                {product.variants.map((v) => {
                  const active = isSelected(product.id, v.name);
                  return (
                    <button
                      key={v.name}
                      type="button"
                      onClick={() => toggleItem(product.id, v.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium font-sans transition-all duration-200 ${
                        active
                          ? "border-rose-500 bg-rose-50 text-rose-700"
                          : "border-rose-100 text-gray-600 hover:border-rose-300"
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-white shadow-sm flex-shrink-0"
                        style={{ backgroundColor: v.color }}
                      />
                      {v.name}
                      {active && <CheckCircle size={11} className="text-rose-500" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {errors.items && <p className="mt-1.5 text-xs text-red-500">{errors.items}</p>}
      </div>

      {/* Selected items summary */}
      {selectedItems.length > 0 && (
        <div className="bg-rose-50 rounded-2xl px-4 py-3 border border-rose-100">
          <p className="font-sans text-xs text-rose-500 uppercase tracking-wider font-medium mb-2">
            Your Order ({selectedItems.length} item{selectedItems.length > 1 ? "s" : ""})
          </p>
          <ul className="space-y-1.5">
            {selectedItems.map((item) => (
              <li
                key={`${item.productId}-${item.variantName}`}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full border border-white shadow-sm flex-shrink-0"
                    style={{
                      backgroundColor: PRODUCTS.find((p) => p.id === item.productId)
                        ?.variants.find((v) => v.name === item.variantName)?.color,
                    }}
                  />
                  <span className="font-sans text-xs text-charcoal">
                    {item.productName} — {item.variantName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-sans text-xs text-rose-600 font-medium">
                    {item.price ?? "Price TBD"}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId, item.variantName)}
                    className="text-gray-300 hover:text-red-400 transition-colors"
                  >
                    <X size={13} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Notes */}
      <div>
        <label className="form-label" htmlFor="notes">
          Notes <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          id="notes"
          rows={3}
          placeholder="Any special requests or questions?"
          value={fields.notes}
          onChange={(e) => setField("notes", e.target.value)}
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
