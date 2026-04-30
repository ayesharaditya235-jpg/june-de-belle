"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "When will the pre-order period open and close?",
    a: "The pre-order period runs for approximately 2 weeks. The exact start and end dates will be announced on our Instagram. Stay tuned!",
  },
  {
    q: "How do I pay for my pre-order?",
    a: "All payments are made manually via WhatsApp. After submitting the form, you'll be redirected to chat with our owner, who will provide payment instructions (bank transfer, QRIS, or e-wallet).",
  },
  {
    q: "When will I receive my order?",
    a: "Orders will be produced and shipped after the pre-order period closes. Estimated delivery time will be communicated via WhatsApp once your payment is confirmed.",
  },
  {
    q: "Can I order more than one item?",
    a: "Yes! Simply fill out the form once per item, or mention it in the notes/WhatsApp chat and we'll arrange it for you.",
  },
  {
    q: "What if I want to cancel my order?",
    a: "Please contact us via WhatsApp as soon as possible. Cancellations can be processed before production begins. Refund policy will be communicated upon purchase.",
  },
  {
    q: "Is the Inner Bag Pouch Organizer available now?",
    a: "The Inner Bag Pouch is part of our pre-order collection! The price is still being finalised and will be announced before the pre-order period ends. You can still reserve yours now.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container-max max-w-3xl">
        <div className="text-center mb-14">
          <p className="font-sans text-rose-500 text-xs uppercase tracking-widest font-medium mb-3">
            Questions?
          </p>
          <h2 className="font-playfair text-4xl sm:text-5xl text-charcoal font-bold leading-tight mb-4">
            Frequently Asked
          </h2>
          <p className="font-sans text-gray-500 text-base">
            Can&apos;t find what you&apos;re looking for? Chat with us on WhatsApp.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map(({ q, a }, i) => (
            <div
              key={i}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                open === i
                  ? "border-rose-200 bg-rose-50/40"
                  : "border-rose-100 bg-white hover:border-rose-200"
              }`}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-sans font-medium text-sm sm:text-base text-charcoal leading-snug">
                  {q}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-rose-400 flex-shrink-0 transition-transform duration-300 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="font-sans text-sm text-gray-500 leading-relaxed">{a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
