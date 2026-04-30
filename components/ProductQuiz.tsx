"use client";

import { useState } from "react";
import { Sparkles, RotateCcw, ArrowRight, Check } from "lucide-react";
import { PRODUCTS } from "@/lib/products";

type ProductId = "totebag" | "pencilcase" | "pouch";
type Scores = Record<ProductId, number>;

const questions = [
  {
    id: 1,
    question: "What best describes your everyday style?",
    options: [
      { label: "Practical & on-the-go", icon: "🎒", scores: { totebag: 3, pencilcase: 0, pouch: 1 } },
      { label: "Minimalist & light", icon: "✨", scores: { totebag: 0, pencilcase: 3, pouch: 1 } },
      { label: "Organized & always prepared", icon: "🗂️", scores: { totebag: 1, pencilcase: 1, pouch: 3 } },
    ],
  },
  {
    id: 2,
    question: "What do you usually carry around?",
    options: [
      { label: "Textbooks, laptop & tumbler", icon: "📚", scores: { totebag: 3, pencilcase: 0, pouch: 0 } },
      { label: "Just pens, erasers & stationery", icon: "🖊️", scores: { totebag: 0, pencilcase: 3, pouch: 0 } },
      { label: "Everything — I switch bags a lot", icon: "👜", scores: { totebag: 0, pencilcase: 0, pouch: 3 } },
    ],
  },
  {
    id: 3,
    question: "Which color palette speaks to you?",
    options: [
      { label: "Navy & classic tones", icon: "🌊", scores: { totebag: 2, pencilcase: 0, pouch: 1 } },
      { label: "Soft pink & sweet hues", icon: "🌸", scores: { totebag: 1, pencilcase: 2, pouch: 1 } },
      { label: "Warm neutrals & earth tones", icon: "🤎", scores: { totebag: 0, pencilcase: 1, pouch: 2 } },
    ],
  },
];

const resultMessages: Record<ProductId, string> = {
  totebag: "You need a bag that works as hard as you do. The Tote Bag is your perfect match — roomy, reliable, and effortlessly stylish.",
  pencilcase: "You keep things simple and intentional. The Compact Pencil Case was made for you — lightweight, cute, and always within reach.",
  pouch: "You're the kind of person who has everything in its place. The Inner Bag Pouch is your secret weapon for staying perfectly organized.",
};

export default function ProductQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Scores>({ totebag: 0, pencilcase: 0, pouch: 0 });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [result, setResult] = useState<ProductId | null>(null);

  const handleSelect = (optionIdx: number) => {
    setSelectedOption(optionIdx);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const option = questions[currentQ].options[selectedOption];
    const newScores: Scores = {
      totebag: scores.totebag + option.scores.totebag,
      pencilcase: scores.pencilcase + option.scores.pencilcase,
      pouch: scores.pouch + option.scores.pouch,
    };
    setScores(newScores);
    setSelectedOption(null);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      const winner = (Object.keys(newScores) as ProductId[]).reduce((a, b) =>
        newScores[a] >= newScores[b] ? a : b
      );
      setResult(winner);
    }
  };

  const handleReset = () => {
    setCurrentQ(0);
    setScores({ totebag: 0, pencilcase: 0, pouch: 0 });
    setSelectedOption(null);
    setResult(null);
  };

  const resultProduct = result ? PRODUCTS.find((p) => p.id === result) : null;
  const progress = ((currentQ) / questions.length) * 100;

  return (
    <section className="section-padding bg-cream">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-sans text-rose-500 text-xs uppercase tracking-widest font-medium mb-3">
            Style Quiz
          </p>
          <h2 className="font-playfair text-4xl sm:text-5xl text-charcoal font-bold leading-tight mb-4">
            Find Your Perfect Match
          </h2>
          <p className="font-sans text-gray-500 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
            Answer 3 quick questions and we'll find the june de belle piece made just for you.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          {!result ? (
            <div className="bg-white rounded-3xl border border-rose-100 shadow-sm p-8">
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-sans text-xs text-gray-400">
                    Question {currentQ + 1} of {questions.length}
                  </span>
                  <span className="font-sans text-xs text-rose-400 font-medium">
                    {Math.round(progress)}% done
                  </span>
                </div>
                <div className="h-1.5 bg-rose-50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-400 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <h3 className="font-playfair text-xl sm:text-2xl font-bold text-charcoal mb-6 leading-snug">
                {questions[currentQ].question}
              </h3>

              {/* Options */}
              <div className="flex flex-col gap-3 mb-8">
                {questions[currentQ].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                      selectedOption === i
                        ? "border-rose-400 bg-rose-50 shadow-sm"
                        : "border-rose-100 hover:border-rose-300 hover:bg-rose-50/50"
                    }`}
                  >
                    <span className="text-2xl flex-shrink-0">{opt.icon}</span>
                    <span className="font-sans text-sm font-medium text-charcoal flex-1">
                      {opt.label}
                    </span>
                    {selectedOption === i && (
                      <div className="w-5 h-5 rounded-full bg-rose-400 flex items-center justify-center flex-shrink-0">
                        <Check size={11} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Next button */}
              <button
                onClick={handleNext}
                disabled={selectedOption === null}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-sans text-sm font-semibold transition-all duration-200 ${
                  selectedOption !== null
                    ? "bg-rose-500 text-white hover:bg-rose-600 shadow-md shadow-rose-200"
                    : "bg-rose-100 text-rose-300 cursor-not-allowed"
                }`}
              >
                {currentQ < questions.length - 1 ? (
                  <>Next <ArrowRight size={15} /></>
                ) : (
                  <>See My Match <Sparkles size={15} /></>
                )}
              </button>
            </div>
          ) : (
            /* Result card */
            <div className="bg-white rounded-3xl border border-rose-100 shadow-sm overflow-hidden">
              {/* Product image */}
              {resultProduct!.variants[0]?.productImage && (
                <div className="w-full h-[200px] bg-rose-50 flex items-center justify-center">
                  <img
                    src={resultProduct!.variants[0].productImage}
                    alt={resultProduct!.name}
                    className="h-full w-full object-contain rounded-t-3xl"
                  />
                </div>
              )}

              {/* Result header */}
              <div
                className="px-8 pt-6 pb-6"
                style={{
                  background: `linear-gradient(135deg, ${resultProduct!.gradientFrom} 0%, ${resultProduct!.gradientTo} 100%)`,
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={14} className="text-rose-500" />
                  <span className="font-sans text-xs text-rose-500 uppercase tracking-widest font-medium">
                    Your Perfect Match
                  </span>
                </div>
                <h3 className="font-playfair text-3xl font-bold text-charcoal mb-1">
                  {resultProduct!.name}
                </h3>
                {resultProduct!.price ? (
                  <p className="font-playfair text-xl font-bold text-rose-600">
                    {resultProduct!.price}
                  </p>
                ) : (
                  <span className="font-sans text-sm font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                    Price to be announced
                  </span>
                )}
              </div>

              {/* Result body */}
              <div className="px-8 py-6">
                <p className="font-sans text-sm text-gray-500 leading-relaxed mb-6">
                  {resultMessages[result]}
                </p>

                {/* Variant swatches */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-sans text-xs text-gray-400 uppercase tracking-wider">
                    Available in
                  </span>
                  {resultProduct!.variants.map((v) => (
                    <div key={v.name} className="flex items-center gap-1.5">
                      <div
                        className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: v.color }}
                      />
                      <span className="font-sans text-xs text-charcoal">{v.name}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="#order" className="btn-primary flex-1 justify-center">
                    Pre-Order Now
                  </a>
                  <button
                    onClick={handleReset}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border-2 border-rose-200 text-rose-500 font-sans text-sm font-medium hover:bg-rose-50 transition-colors"
                  >
                    <RotateCcw size={13} />
                    Retake Quiz
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
