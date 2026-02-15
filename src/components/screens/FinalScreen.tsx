import React, { useState } from "react";
import { ValentineButton } from "@/components/ui/valentine-button";
import FloatingHearts from "@/components/FloatingHearts";
import Confetti from "@/components/Confetti";

const PROMISES = [
  "I'll always listen, even when you're yelling 😤",
  "I'll never let you go to sleep angry 🌙",
  "I'll save you the last bite (sometimes) 🍕",
  "I'll be your person — always 🫶",
  "I'll love you even on your mooda days 💛",
];

const FinalScreen: React.FC = () => {
  const [hugged, setHugged] = useState(false);
  const [hugCount, setHugCount] = useState(0);

  const handleHug = () => {
    setHugged(true);
    setHugCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <FloatingHearts intensity="high" />
      {hugged && <Confetti />}

      {/* Warm ambient glows */}
      <div className="absolute top-20 left-10 w-52 h-52 rounded-full bg-amber-300/20 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-52 h-52 rounded-full bg-rose-300/20 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-orange-200/10 blur-3xl" />

      <div className="z-10 text-center max-w-lg">
        <div className="text-7xl mb-6 animate-pulse-heart">
          {hugged ? "🤗" : "🫶"}
        </div>

        <h1 className="font-display text-4xl md:text-5xl text-amber-900 mb-4 drop-shadow-sm">
          {hugged ? "See? That wasn't so hard 🤗" : "One last thing, Modi…"}
        </h1>

        {!hugged ? (
          <>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-amber-200/50 px-6 py-6 mb-8 shadow-float">
              <p className="text-amber-800 text-lg font-body leading-relaxed mb-4">
                I know I'm not perfect. I make mistakes. I say dumb things.
                Sometimes I'm late. Sometimes I forget.
              </p>
              <p className="text-amber-800 text-lg font-body leading-relaxed mb-4">
                But there's one thing I'll never forget —
              </p>
              <p className="text-amber-950 text-xl font-display leading-relaxed">
                How lucky I am to have you in my life. 🧡
              </p>
            </div>

            <div className="bg-amber-100/50 rounded-xl px-5 py-4 mb-8 border border-amber-200/30">
              <p className="text-amber-700 font-body text-base italic">
                "ඔබ මගේ ජීවිතේට ආපු හොඳම දේ. මම ඒක කවදාවත් අමතක කරන්නේ නෑ."
              </p>
              <p className="text-amber-600/70 font-body text-sm mt-2">
                — You're the best thing that happened to my life. I'll never forget that.
              </p>
            </div>

            <ValentineButton
              variant="celebration"
              size="xl"
              onClick={handleHug}
              className="animate-bounce-soft"
            >
              🤗 Come here, virtual hug!
            </ValentineButton>
          </>
        ) : (
          <>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-amber-200/50 px-6 py-6 mb-6 shadow-float">
              <p className="text-amber-800 text-xl font-body leading-relaxed mb-2">
                Virtual hug received! 🤗
              </p>
              <p className="text-amber-700 text-lg font-body">
                But I still owe you a real one.
              </p>

              {hugCount > 1 && (
                <p className="text-amber-600/70 text-sm font-body mt-3 italic">
                  ({hugCount} hugs and counting… greedy much? 😏)
                </p>
              )}
            </div>

            {/* Promise card */}
            <div className="bg-gradient-to-br from-rose-100 to-amber-100 rounded-2xl px-6 py-5 mb-6 border border-rose-200/30 shadow-float">
              <p className="text-rose-900 font-display text-xl mb-3">
                My promises to you:
              </p>
              <div className="space-y-2 text-left">
                {PROMISES.map((promise, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-rose-500 mt-0.5">✓</span>
                    <p className="text-rose-800 font-body text-sm">{promise}</p>
                  </div>
                ))}
              </div>
            </div>

            <ValentineButton
              variant="yes"
              size="lg"
              onClick={handleHug}
              className="animate-bounce-soft"
            >
              🤗 One more hug!
            </ValentineButton>

            <p className="text-amber-600/50 text-xs font-body mt-6">
              Made with 🧡 and a lot of code, just for you.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default FinalScreen;
