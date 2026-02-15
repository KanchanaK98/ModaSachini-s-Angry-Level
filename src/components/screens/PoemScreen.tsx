import React, { useState, useEffect } from "react";
import { ValentineButton } from "@/components/ui/valentine-button";
import FloatingHearts from "@/components/FloatingHearts";
import Confetti from "@/components/Confetti";

interface PoemScreenProps {
  onNext: () => void;
}

const POEM_LINES = [
  { text: "ඔබ මගේ හිරු, මගේ සඳ,", sinhala: true },
  { text: "සොඳුරිය,", sinhala: true },
  { text: "ඔයා දෙව්ලොවටත් අපායේ දොරකඩටත් අතරින් බිහිවුණු සුරංගනාවක් වගේ,", sinhala: true },
  { text: "මට හිතෙන්නේ එහෙමයි.🌹✨.", sinhala: true },
  { text: "", sinhala: false },
  { text: "You are my morning light,", sinhala: false },
  { text: "My peace in every fight.", sinhala: false },
  { text: "When you're mad, the stars go dim,", sinhala: false },
  { text: "When you smile, the world begins.", sinhala: false },
  { text: "", sinhala: false },
  { text: "I don't need grand gestures or perfect days,", sinhala: false },
  { text: "Just you — in all your stubborn, beautiful ways.", sinhala: false },
  { text: "Your anger fades, but my love never will,", sinhala: false },
  { text: "Through every storm, I'll be standing still.", sinhala: false },
  { text: "", sinhala: false },
  { text: "So here's my truth, laid bare and true:", sinhala: false },
  { text: "There's no version of my life without you. 💛", sinhala: false },
];

const PoemScreen: React.FC<PoemScreenProps> = ({ onNext }) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= POEM_LINES.length) {
          clearInterval(interval);
          setTimeout(() => {
            setShowButton(true);
            setShowConfetti(true);
          }, 600);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-950 via-pink-950 to-violet-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <FloatingHearts intensity="medium" />
      {showConfetti && <Confetti />}

      {/* Ambient glow */}
      <div className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-rose-500/10 blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-pink-500/5 blur-3xl" />

      <div className="z-10 text-center max-w-xl">
        <div className="text-5xl mb-4 animate-pulse-heart">📝</div>
        <h1 className="font-display text-3xl md:text-4xl text-rose-200 mb-2 drop-shadow-sm">
          A Little Poem for You, Modii
        </h1>
        <p className="text-rose-300/60 text-sm font-body mb-8 italic">
          — written by someone who can't stop thinking about you
        </p>

        <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-rose-500/10 px-6 py-8 md:px-10 md:py-10 shadow-float">
          <div className="space-y-2">
            {POEM_LINES.map((line, i) => (
              <p
                key={i}
                className={`font-body transition-all duration-700 ${
                  line.text === ""
                    ? "h-4"
                    : i < visibleLines
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                } ${
                  line.sinhala
                    ? "text-amber-300/90 text-lg md:text-xl"
                    : "text-rose-100/80 text-base md:text-lg"
                }`}
              >
                {line.text}
              </p>
            ))}
          </div>
        </div>

        {showButton && (
          <div className="mt-8 animate-fade-in-up">
            <ValentineButton variant="yes" size="lg" onClick={onNext}>
              🥺 You are not crying, you are? →
            </ValentineButton>
            <p style={{color:"white"}}>Don’t ever forget that you are the cutest girl in this amazing world. 💕</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PoemScreen;
