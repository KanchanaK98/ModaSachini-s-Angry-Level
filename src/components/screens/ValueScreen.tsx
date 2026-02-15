import React, { useState, useEffect } from "react";
import { ValentineButton } from "@/components/ui/valentine-button";
import FloatingHearts from "@/components/FloatingHearts";

interface ValueScreenProps {
  onNext: () => void;
}

const VALUE_PAGES = [
  {
    emoji: "🌙",
    title: "Before you came…",
    lines: [
      "My days were just days.",
      "Nothing special. Nothing warm.",
      "Just… existing.",
    ],
    bg: "bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900",
    titleColor: "text-indigo-200",
    textColor: "text-indigo-300/80",
    buttonText: "Then what happened? →",
  },
  {
    emoji: "☀️",
    title: "Then you showed up.",
    lines: [
      "And suddenly everything had color.",
      "Your laugh became my favorite sound.",
      "Your smile — my reason to try harder.",
      "Your anger — proof that you care.",
    ],
    bg: "bg-gradient-to-b from-amber-100 via-orange-50 to-yellow-100",
    titleColor: "text-amber-900",
    textColor: "text-amber-800/80",
    buttonText: "Tell me more… →",
  },
  {
    emoji: "💎",
    title: "What you mean to me",
    lines: [
      "You're not just someone in my life.",
      "You're the reason I want to be better.",
      "The reason I smile at my phone like an idiot.",
      "The reason 'good morning' texts feel like sunshine.",
      "The reason I never want to lose anyone again.",
    ],
    bg: "bg-gradient-to-b from-rose-50 via-pink-50 to-red-50",
    titleColor: "text-rose-900",
    textColor: "text-rose-800/80",
    buttonText: "There's more… →",
  },
  {
    emoji: "🫀",
    title: "Things I never told you",
    lines: [
      "I see again our conversations when I can't sleep.",
      "I imagine like I am with you.",
      "When you're upset, my whole world feels off.",
      "I'd cross oceans, but I'd also just sit with you in silence.",
      "Because being near you is enough.",
    ],
    bg: "bg-gradient-to-b from-violet-50 via-purple-50 to-fuchsia-50",
    titleColor: "text-violet-900",
    textColor: "text-violet-800/80",
    buttonText: "One last thing… →",
  },
];

const ValueScreen: React.FC<ValueScreenProps> = ({ onNext }) => {
  const [page, setPage] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  const current = VALUE_PAGES[page];

  useEffect(() => {
    setVisibleLines(0);
    setFadeIn(true);
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= current.lines.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
    return () => clearInterval(interval);
  }, [page, current.lines.length]);

  const handleNext = () => {
    setFadeIn(false);
    setTimeout(() => {
      if (page < VALUE_PAGES.length - 1) {
        setPage(page + 1);
      } else {
        onNext();
      }
    }, 400);
  };

  return (
    <div
      className={`min-h-screen ${current.bg} flex flex-col items-center justify-center p-6 relative overflow-hidden transition-all duration-1000`}
    >
      <FloatingHearts intensity="low" />

      {/* Soft ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-white/10 blur-3xl" />

      <div
        className={`z-10 text-center max-w-lg transition-all duration-500 ${
          fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        key={page}
      >
        <div className="text-7xl mb-6 animate-pulse-heart">{current.emoji}</div>

        <h1 className={`font-display text-3xl md:text-5xl ${current.titleColor} mb-8 drop-shadow-sm`}>
          {current.title}
        </h1>

        <div className="space-y-4 mb-10">
          {current.lines.map((line, i) => (
            <p
              key={i}
              className={`text-lg md:text-xl font-body ${current.textColor} transition-all duration-700 ${
                i < visibleLines
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3"
              }`}
            >
              {line}
            </p>
          ))}
        </div>

        {visibleLines >= current.lines.length && (
          <div className="animate-fade-in-up">
            <ValentineButton variant="yes" size="lg" onClick={handleNext} className="mt-4">
              {current.buttonText}
            </ValentineButton>
          </div>
        )}

        {/* Page dots */}
        <div className="flex gap-2 justify-center mt-8">
          {VALUE_PAGES.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === page
                  ? "w-8 bg-primary"
                  : i < page
                  ? "w-2 bg-primary/50"
                  : "w-2 bg-muted/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValueScreen;
