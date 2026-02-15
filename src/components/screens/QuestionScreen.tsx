import React, { useState, useRef, useCallback, useEffect } from "react";
import { ValentineButton } from "@/components/ui/valentine-button";
import FloatingHearts from "@/components/FloatingHearts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface QuestionScreenProps {
  onYes: () => void;
  onChaosMode: () => void;
  onFallback: () => void;
}

const PHASE_THRESHOLDS = {
  shy: 2,
  playful: 5,
  dramatic: 8,
  emotional: 12,
};

const TOOLTIPS = {
  shy: ["Modi, seriously? 🤭", "Modi, come on now", "Modi, you sure about that?", "Modi, think harder 🤔"],
  playful: ["Modi, too slow! 😛", "Modi, can't catch this button!", "Modi, anger.exe has stopped working 😂", "Modi, try again loser"],
  dramatic: ["Modi, YOUR ANGER IS FAKE 😭", "Modi, you miss me admit it!", "Modi, I see that smile 👀", "Modi, just forgive me already!"],
  emotional: ["Modi, this is hurting me 🥺", "Modi, wrong button again", "Modi, please just tap NO 😔", "Modi, I'm literally begging 🥺"],
};

const HELPER_TEXTS = {
  shy: "Modi, be honest with yourself…",
  playful: "Modi, why are you even chasing that button? 🤔",
  dramatic: "Modi, even the button knows you're faking it.",
  emotional: "Modi, we both know you can't stay mad at me. Just say NO.",
};

const QuestionScreen: React.FC<QuestionScreenProps> = ({ onYes, onChaosMode, onFallback }) => {
  const [attempts, setAttempts] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [tooltip, setTooltip] = useState("");
  const [isPositioned, setIsPositioned] = useState(false);
  const [chaosActivated, setChaosActivated] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [showBetrayalPopup, setShowBetrayalPopup] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout>();

  const getPhase = () => {
    if (attempts <= PHASE_THRESHOLDS.shy) return "shy";
    if (attempts <= PHASE_THRESHOLDS.playful) return "playful";
    if (attempts <= PHASE_THRESHOLDS.dramatic) return "dramatic";
    return "emotional";
  };

  const phase = getPhase();

  // Inactivity fallback trigger
  useEffect(() => {
    if (chaosActivated) {
      inactivityTimerRef.current = setInterval(() => {
        const now = Date.now();
        if (now - lastInteraction > 6000) {
          onFallback();
        }
      }, 1000);
    }
    return () => {
      if (inactivityTimerRef.current) {
        clearInterval(inactivityTimerRef.current);
      }
    };
  }, [chaosActivated, lastInteraction, onFallback]);

  const moveNoButton = useCallback(() => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();
    
    const maxX = container.width - button.width - 40;
    const maxY = container.height - button.height - 100;
    
    let newX, newY;
    
    if (phase === "shy") {
      // Small displacement
      const currentX = noPosition.x || container.width / 2;
      const currentY = noPosition.y || container.height / 2;
      newX = Math.max(20, Math.min(maxX, currentX + (Math.random() - 0.5) * 100));
      newY = Math.max(100, Math.min(maxY, currentY + (Math.random() - 0.5) * 100));
    } else if (phase === "emotional") {
      // Hide in corners
      const corners = [
        { x: 20, y: 100 },
        { x: maxX, y: 100 },
        { x: 20, y: maxY },
        { x: maxX, y: maxY },
      ];
      const corner = corners[Math.floor(Math.random() * corners.length)];
      newX = corner.x;
      newY = corner.y;
    } else {
      // Random jumps
      newX = 20 + Math.random() * maxX;
      newY = 100 + Math.random() * (maxY - 100);
    }

    setNoPosition({ x: newX, y: newY });
    setIsPositioned(true);
    
    // Show tooltip
    const tooltips = TOOLTIPS[phase];
    setTooltip(tooltips[Math.floor(Math.random() * tooltips.length)]);
    
    // Hide tooltip after a moment
    setTimeout(() => setTooltip(""), 1500);
  }, [phase, noPosition]);

  const handleNoInteraction = () => {
    setLastInteraction(Date.now());
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    // Trigger chaos mode
    if (newAttempts >= 7 && !chaosActivated) {
      setChaosActivated(true);
      onChaosMode();
    }

    // Betrayal Mode: 40% chance to show popup during chaos mode
    if (chaosActivated && Math.random() < 0.4) {
      setShowBetrayalPopup(true);
      return;
    }

    moveNoButton();
  };

  const getButtonSize = () => {
    if (phase === "emotional") return "sm";
    if (phase === "dramatic") return "default";
    return "lg";
  };

  const getButtonAnimation = () => {
    if (phase === "dramatic") return "animate-shake";
    if (phase === "emotional") return "animate-shrink-scared";
    return "";
  };

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden transition-all duration-500 ${
        chaosActivated ? "bg-chaos-gradient animate-chaos-rotate" : "bg-valentine-gradient"
      }`}
    >
      <FloatingHearts intensity={chaosActivated ? "high" : "medium"} />
      
      {/* Decorative warm blurs */}
      <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-52 h-52 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-valentine-coral/5 blur-3xl" />
      
      <div className="z-10 text-center mb-16">
        <div className="text-6xl mb-4 animate-pulse-heart">{chaosActivated ? "🤨" : "😤"}</div>
        
        <h1 className="font-display text-4xl md:text-6xl text-foreground mb-2 drop-shadow-sm">
          Are you still angry with me?
        </h1>
        
        <div className="bg-card/40 backdrop-blur-sm rounded-xl px-4 py-2 mt-3 mb-2 inline-block">
          <p className="text-muted-foreground text-lg font-body italic">
            {HELPER_TEXTS[phase]}
          </p>
        </div>

        {attempts > 0 && (
          <div className="mt-3 text-sm text-muted-foreground/70 font-body flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-destructive animate-pulse" />
            Stubbornness level: {attempts}
          </div>
        )}

        {chaosActivated && (
          <div className="mt-4 bg-destructive/10 border border-destructive/20 rounded-2xl px-6 py-3 inline-block">
            <p className="text-lg text-destructive font-bold animate-bounce">
              ⚠️ Modi, your anger has expired ⚠️
            </p>
            <p className="text-sm text-muted-foreground">Seriously, even this website knows.</p>
          </div>
        )}
      </div>

      {/* NO Button - HAPPY PATH */}
      <div className="z-10 mb-8">
        <ValentineButton 
          variant={chaosActivated ? "celebration" : "yes"}
          size="xl"
          onClick={onYes}
          className="animate-bounce-soft"
        >
          🤗 Nah, I forgive you
        </ValentineButton>
      </div>

      {/* YES Button - Dodgy moving button */}
      <div 
        className="absolute z-20"
        style={{
          left: isPositioned ? noPosition.x : "50%",
          top: isPositioned ? noPosition.y : "70%",
          transform: isPositioned ? "none" : "translateX(-50%)",
          transition: phase === "shy" ? "all 0.3s ease-out" : "all 0.15s ease-out",
        }}
      >
        {tooltip && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-sm text-foreground px-4 py-1.5 rounded-full text-sm shadow-float whitespace-nowrap animate-fade-in-up border border-border/50">
            {tooltip}
          </div>
        )}
        <ValentineButton
          ref={noButtonRef}
          variant={chaosActivated ? "chaos" : "no"}
          size={getButtonSize()}
          onClick={handleNoInteraction}
          onMouseEnter={handleNoInteraction}
          onTouchStart={handleNoInteraction}
          className={getButtonAnimation()}
        >
          😠 Yeah, still furious
        </ValentineButton>
      </div>

      {/* Betrayal Mode Popup */}
      <Dialog open={showBetrayalPopup} onOpenChange={setShowBetrayalPopup}>
        <DialogContent className="bg-card/95 backdrop-blur-md border-destructive text-center max-w-sm rounded-3xl shadow-float">
          <DialogHeader>
            <DialogTitle className="text-destructive text-2xl flex items-center justify-center gap-2">
              🚫 SYSTEM ERROR 404
            </DialogTitle>
            <DialogDescription className="text-foreground text-lg pt-4">
              "Still angry" button has crashed.
              <br />
              <span className="text-muted-foreground">Your anger was invalid. System recommends forgiveness. 🤗</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center pt-4">
            <ValentineButton
              variant="yes"
              size="default"
              onClick={() => {
                setShowBetrayalPopup(false);
                onYes();
              }}
            >
              🤗 Okay fine, I forgive you
            </ValentineButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuestionScreen;
