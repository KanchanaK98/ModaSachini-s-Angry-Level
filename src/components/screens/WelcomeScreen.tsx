import React from "react";
import { ValentineButton } from "@/components/ui/valentine-button";
import FloatingHearts from "@/components/FloatingHearts";

interface WelcomeScreenProps {
  onContinue: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onContinue }) => {
  return (
    <div className="min-h-screen bg-valentine-gradient flex flex-col items-center justify-center p-6 relative overflow-hidden animate-subtle-bg">
      <FloatingHearts intensity="low" />
      
      {/* Warm decorative background blobs */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-primary/8 blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-accent/8 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-valentine-gold/5 blur-3xl" />
      
      <div className="z-10 text-center animate-fade-in-up">
        <div className="text-7xl mb-6 animate-bounce-soft">🥺</div>
        
        <h1 className="font-display text-5xl md:text-7xl text-foreground mb-4 drop-shadow-sm">
          Hey Modi…
        </h1>
        
        <div className="bg-card/60 backdrop-blur-sm rounded-2xl px-6 py-4 mb-6 max-w-md mx-auto border border-border/20">
          <p className="font-body text-xl md:text-2xl text-foreground/80 mb-1 font-medium">
            I know you're upset with me… 😔
          </p>
          <p className="text-muted-foreground text-sm font-body">
            But I really need to ask you something important.
          </p>
        </div>
        
        <p className="text-muted-foreground text-base mb-10 font-body italic">
          ලෝකේ ලස්සනම කෙල්ල එහෙම තරහා වෙලා ඉන්න එක හරිද මාත් එක්ක? 😌💕🥺✨
        </p>
        
        <ValentineButton 
          variant="yes" 
          size="lg"
          onClick={onContinue}
          className="animate-float"
        >
          😤 Fine, ask me…
        </ValentineButton>
        
        <p className="text-muted-foreground/60 text-xs mt-6 font-body">
          (Don't worry, it's just one tiny question)
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
