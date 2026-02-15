import React, { useEffect, useState } from "react";
import { ValentineButton } from "@/components/ui/valentine-button";
import FloatingHearts from "@/components/FloatingHearts";
import Confetti from "@/components/Confetti";

interface CelebrationScreenProps {
  onContinue: () => void;
}

const CelebrationScreen: React.FC<CelebrationScreenProps> = ({ onContinue }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [showExtra, setShowExtra] = useState(false);

  useEffect(() => {
    // Refresh confetti periodically
    const interval = setInterval(() => {
      setShowConfetti(false);
      setTimeout(() => setShowConfetti(true), 100);
    }, 5000);
    setTimeout(() => setShowExtra(true), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-celebration-gradient flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <FloatingHearts intensity="celebration" />
      {showConfetti && <Confetti />}
      
      {/* Celebration background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-accent/15 blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-48 h-48 rounded-full bg-valentine-gold/10 blur-3xl" />
      
      <div className="z-10 text-center animate-fade-in-up">
        <div className="text-7xl mb-4 animate-bounce-soft">🎉</div>
        
        <h5 className="font-display text-5xl md:text-7xl text-foreground mb-4 drop-shadow-sm">
          THE MOST CUTEST PRINCESS FORGAVE ME!!!
        </h5>
        
        <p className="font-display text-2xl md:text-3xl text-primary mb-6">
          I knew you couldn't stay mad, Modi 🥹
        </p>
        
        <div className="text-4xl mb-6 flex justify-center gap-3">
          <span className="animate-pulse-heart">🤗</span>
          <span className="animate-pulse-heart" style={{ animationDelay: "0.15s" }}>💛</span>
          <span className="animate-pulse-heart" style={{ animationDelay: "0.3s" }}>🧡</span>
          <span className="animate-pulse-heart" style={{ animationDelay: "0.45s" }}>❤️</span>
        </div>
        
        <div className="bg-card/80 backdrop-blur-md rounded-3xl p-8 shadow-float mb-8 max-w-md mx-auto border border-border/30">
          <p className="font-body text-xl text-foreground mb-3">
            Official status update:
          </p>
          <div className="bg-background/50 rounded-2xl p-4 mb-4 border border-border/20">
            <p className="font-display text-3xl text-primary">
              NOT ANGRY ANYMORE ✅
            </p>
          </div>
          <div className="text-muted-foreground text-sm space-y-1.5">
            <p>🚫 No more silent treatment</p>
            <p>🚫 No more one-word replies</p>
            <p>🚫 No more ignoring my memes</p>
            <p className="font-semibold text-foreground pt-2">✨ Back to being my favorite person ✨</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <ValentineButton
            variant="celebration"
            size="lg"
            onClick={onContinue}
          >
            🤗 Fine, come here
          </ValentineButton>
          <ValentineButton
            variant="soft"
            size="lg"
            onClick={() => {
              alert("Screenshot taken! Evidence secured before she changes her mind! 📸🧡");
            }}
          >
            📸 Save the evidence
          </ValentineButton>
        </div>
        
        <p className="text-muted-foreground text-sm italic">
          Anger levels: 0% | Forgiveness: 100% | Hugs owed: ∞ 🤗
        </p>

        {showExtra && (
          <div className="mt-6 animate-fade-in-up">
            <ValentineButton
              variant="yes"
              size="xl"
              onClick={onContinue}
              className="animate-bounce-soft"
            >
              🧡 But wait, there's more… →
            </ValentineButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default CelebrationScreen;
