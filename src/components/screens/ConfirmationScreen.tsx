import React, { useState } from "react";
import { ValentineButton } from "@/components/ui/valentine-button";
import FloatingHearts from "@/components/FloatingHearts";
import Confetti from "@/components/Confetti";

interface ConfirmationScreenProps {
  onComplete: () => void;
}

const CONFIRMATION_STEPS = [
  {
    emoji: "😳",
    text: "Wait… you're NOT angry??",
    subtext: "Like… not even a little bit?",
    buttons: ["Nope, I'm over it 😌", "Not even a tiny bit 🫶"],
  },
  {
    emoji: "🤨",
    text: "Even after I saved your cutest photos?",
    subtext: "",
    buttons: ["That was annoying BUT…", "Forgiven 🍟"],
  },
  {
    emoji: "😬",
    text: "What about when I joked you?",
    subtext: "",
    buttons: ["Okay that hurt a little 😤", "I'll let it slide 🙄"],
  },
  {
    emoji: "🥺",
    text: "And when I made you wait for an hour?",
    subtext: "",
    buttons: ["You OWE me for that 😠", "Fine… even that 💕"],
  },
  {
    emoji: "😤",
    text: "Even when I disagree with your mooda reasons?",
    subtext: "This is the ultimate test…",
    buttons: ["THAT one still hurts 😤", "Even then… 🥺"],
    showConfetti: true,
  },
];

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const currentStep = CONFIRMATION_STEPS[step];

  const handleButtonClick = () => {
    if (step === CONFIRMATION_STEPS.length - 1) {
      setShowConfetti(true);
      setTimeout(onComplete, 1500);
    } else {
      if (currentStep.showConfetti) {
        setShowConfetti(true);
      }
      setStep(step + 1);
    }
  };

  return (
    <div className="min-h-screen bg-valentine-gradient flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <FloatingHearts intensity={step >= 3 ? "high" : "medium"} />
      {showConfetti && <Confetti />}
      
      <div className="z-10 text-center animate-fade-in-up max-w-lg" key={step}>
        <div className="text-6xl mb-6">{currentStep.emoji}</div>
        
        <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4 drop-shadow-sm">
          {currentStep.text}
        </h1>
        
        {currentStep.subtext && (
          <div className="bg-card/50 backdrop-blur-sm rounded-xl px-5 py-2 mb-6 inline-block border border-border/20">
            <p className="text-muted-foreground text-lg font-body italic">
              {currentStep.subtext}
            </p>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          {currentStep.buttons.map((buttonText, index) => (
            <ValentineButton
              key={index}
              variant={index === 0 ? "soft" : "yes"}
              size="lg"
              onClick={handleButtonClick}
              className={index === 1 ? "animate-bounce-soft" : ""}
            >
              {buttonText}
            </ValentineButton>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-10 max-w-xs mx-auto">
          <div className="flex gap-2 justify-center mb-2">
            {CONFIRMATION_STEPS.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i <= step 
                    ? 'bg-primary flex-grow' 
                    : 'bg-muted w-6'
                }`} 
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground/50 font-body">
            Forgiveness progress: {Math.round(((step + 1) / CONFIRMATION_STEPS.length) * 100)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
