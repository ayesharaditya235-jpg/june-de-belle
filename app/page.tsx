import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import ProductQuiz from "@/components/ProductQuiz";
import PreOrderForm from "@/components/PreOrderForm";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { Sparkles, ShieldCheck, Truck } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    desc: "All orders confirmed personally via WhatsApp. We verify before we ship.",
  },
  {
    icon: Sparkles,
    title: "Premium Quality",
    desc: "Carefully selected materials — durable, lightweight, and beautifully finished.",
  },
  {
    icon: Truck,
    title: "Nationwide Delivery",
    desc: "We deliver across Indonesia. Shipping details confirmed upon payment.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />

      {/* Trust bar */}
      <section className="py-10 px-4 sm:px-6 lg:px-8" style={{background: "#dbeafe"}}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4">
          {TRUST_ITEMS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Icon size={20} className="text-blue-500" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-sans font-semibold text-sm text-blue-900">{title}</p>
                <p className="font-sans text-xs text-blue-700/70 mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem / About strip */}
      <section className="section-padding" style={{background: "#fdf2f8"}}>
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-sans text-rose-500 text-xs uppercase tracking-widest font-medium mb-4">
              Our Story
            </p>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-charcoal leading-tight mb-6">
              Designed for the Modern Student
            </h2>
            <p className="font-sans text-gray-500 text-base sm:text-lg leading-relaxed">
              We know the struggle — heavy bags, scattered stationery, a pencil case that
              never zips right. June de Belle was born to fix all of that. Our kawaii-inspired
              collection brings together ergonomics, quality materials, and aesthetic design
              so you can focus on what actually matters: your day.
            </p>
          </div>
        </div>
      </section>

      <ProductSection />
      <section id="quiz" style={{background: "#fce7f3"}}>
        <ProductQuiz />
      </section>
      <HowItWorks />

      {/* Pre-Order Form */}
      <section id="order" className="section-padding section-bg-alt">
        <div className="container-max">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-10">
              <p className="font-sans text-rose-500 text-xs uppercase tracking-widest font-medium mb-3">
                Limited Pre-Order
              </p>
              <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-charcoal leading-tight mb-4">
                Reserve Yours Today
              </h2>
              <p className="font-sans text-gray-500 text-sm leading-relaxed">
                Fill in the form below. After submitting, you&apos;ll be connected to our WhatsApp
                to complete your order.
              </p>
            </div>

            {/* Card */}
            <div className="bg-white rounded-3xl border border-rose-100 shadow-xl shadow-rose-100/30 p-7 sm:p-10">
              <PreOrderForm />
            </div>
          </div>
        </div>
      </section>

      <FAQ />
      <Footer />
    </main>
  );
}
