import { ClipboardList, MessageCircle, Package } from "lucide-react";

const STEPS = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Fill the Form",
    desc: "Choose your favourite product and colour, then fill in your details. Takes under 3 minutes.",
  },
  {
    icon: MessageCircle,
    step: "02",
    title: "Confirm via WhatsApp",
    desc: "After submitting, you'll be redirected to chat with our owner directly to confirm and complete payment.",
  },
  {
    icon: Package,
    step: "03",
    title: "Receive Your Order",
    desc: "We'll process and ship your order once the pre-order period closes. Updates sent via WhatsApp.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding section-bg-alt">
      <div className="container-max">
        <div className="text-center mb-16">
          <p className="font-sans text-rose-500 text-xs uppercase tracking-widest font-medium mb-3">
            Simple Process
          </p>
          <h2 className="font-playfair text-4xl sm:text-5xl text-charcoal font-bold leading-tight mb-4">
            How It Works
          </h2>
          <p className="font-sans text-gray-500 text-base max-w-md mx-auto">
            Three easy steps from browsing to receiving your order.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {STEPS.map(({ icon: Icon, step, title, desc }, i) => (
            <div key={title} className="relative flex flex-col items-center text-center group">
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-rose-200 to-rose-100 z-0" />
              )}

              {/* Icon circle */}
              <div className="relative z-10 mb-6">
                <div className="w-24 h-24 rounded-3xl bg-white border border-rose-100 shadow-sm flex items-center justify-center transition-all duration-300 group-hover:shadow-md group-hover:border-rose-200 group-hover:-translate-y-1">
                  <Icon size={32} strokeWidth={1.5} className="text-rose-500" />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-rose-600 text-white text-xs font-bold font-sans flex items-center justify-center shadow">
                  {step}
                </span>
              </div>

              <h3 className="font-playfair text-xl font-bold text-charcoal mb-3">
                {title}
              </h3>
              <p className="font-sans text-sm text-gray-500 leading-relaxed max-w-xs">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
