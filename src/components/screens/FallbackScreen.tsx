import React, { useState } from "react";
import { ValentineButton } from "@/components/ui/valentine-button";
import FloatingHearts from "@/components/FloatingHearts";

interface FallbackScreenProps {
  onContinue: () => void;
}

const FallbackScreen: React.FC<FallbackScreenProps> = ({ onContinue }) => {
  const [showSoftQuestion, setShowSoftQuestion] = useState(false);

  if (showSoftQuestion) {
    return (
      <div className="min-h-screen bg-valentine-gradient flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <FloatingHearts intensity="medium" />
        
        <div className="z-10 text-center animate-fade-in-up">
          <div className="text-6xl mb-6">🧡</div>
          
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            One last time, Modi…
          </h1>
          
          <div className="bg-card/50 backdrop-blur-sm rounded-xl px-5 py-3 mb-8 inline-block border border-border/20">
            <p className="font-body text-xl text-foreground/80">
              Are you still angry with me? 🥺
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ValentineButton
              variant="yes"
              size="lg"
              onClick={onContinue}
            >
              🤗 No, I forgive you
            </ValentineButton>
            <ValentineButton
              variant="yes"
              size="lg"
              onClick={onContinue}
            >
              🥰 Was never really angry
            </ValentineButton>
          </div>
          
          <p className="text-muted-foreground text-sm mt-8 italic">
            (The "Still angry" button rage-quit and left 💨)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-valentine-gradient flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <FloatingHearts intensity="low" />
      
      <div className="z-10 text-center max-w-md animate-fade-in-up">
        <div className="text-5xl mb-6">😔</div>
        
        <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4 drop-shadow-sm">
          Hey Modi, hold on…
        </h1>
        
        <div className="bg-card/60 backdrop-blur-sm rounded-2xl px-6 py-5 mb-6 border border-border/20">
          <p className="font-body text-lg text-foreground/80 mb-3 font-medium">
            Look, I know I messed up. 😔
          </p>
          <p className="text-muted-foreground text-base font-body italic mb-3">
            I'm annoying, I steal your food, I forget things…
          </p>
          <p className="text-muted-foreground text-base font-body italic">
            But we both know you can't stay mad at me forever, right? 🥺
          </p>
        </div>

        <div className="bg-card/80 backdrop-blur-md rounded-3xl p-8 shadow-float mb-8 border border-border/30">
          <p className="font-body text-foreground text-lg mb-2">
            No more 😤
          </p>
          <p className="font-body text-foreground text-lg mb-2">
            No more 🙄
          </p>
          <p className="font-body text-foreground text-lg mb-3">
            No more "I'm fine" 😑
          </p>
          <p className="font-display text-2xl text-primary">
            Just us, being okay again. 🧡
          </p>
        </div>
        
        <ValentineButton
          variant="yes"
          size="lg"
          onClick={() => setShowSoftQuestion(true)}
        >
          🤗 Okay, ask me one more time
        </ValentineButton>
      </div>
    </div>
  );
};

export default FallbackScreen;
