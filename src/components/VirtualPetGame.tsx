import React, { useState, useEffect, useCallback } from 'react';
import { LeafSheep } from './LeafSheep';
import { PetStats } from './PetStats';
import { ActionButtons } from './ActionButtons';
import { OceanBackground } from './OceanBackground';
import { useToast } from '@/hooks/use-toast';

type SheepState = 'idle' | 'walking' | 'eating' | 'happy' | 'sleeping' | 'excited';

export const VirtualPetGame: React.FC = () => {
  const { toast } = useToast();
  const [sheepState, setSheepState] = useState<SheepState>('idle');
  const [hunger, setHunger] = useState(75);
  const [happiness, setHappiness] = useState(70);
  const [cleanliness, setCleanliness] = useState(80);
  const [actionCooldown, setActionCooldown] = useState(false);
  const [petName] = useState('Costasiella');

  // Automatic stat degradation
  useEffect(() => {
    const interval = setInterval(() => {
      setHunger(prev => Math.max(0, prev - 1));
      setHappiness(prev => Math.max(0, prev - 0.5));
      setCleanliness(prev => Math.max(0, prev - 0.3));
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Auto-behavior based on stats
  useEffect(() => {
    if (sheepState !== 'eating' && sheepState !== 'happy' && sheepState !== 'excited') {
      if (hunger < 30 || happiness < 30 || cleanliness < 30) {
        setSheepState('sleeping');
      } else if (Math.random() < 0.3) {
        setSheepState('walking');
        setTimeout(() => setSheepState('idle'), 3000);
      } else {
        setSheepState('idle');
      }
    }
  }, [hunger, happiness, cleanliness, sheepState]);

  const performAction = useCallback((action: () => void, duration: number = 2000) => {
    if (actionCooldown) return;
    
    setActionCooldown(true);
    action();
    
    setTimeout(() => {
      setSheepState('idle');
      setActionCooldown(false);
    }, duration);
  }, [actionCooldown]);

  const handleFeed = () => {
    performAction(() => {
      setSheepState('eating');
      setHunger(prev => Math.min(100, prev + 25));
      setHappiness(prev => Math.min(100, prev + 10));
      toast({
        title: `${petName} is enjoying the meal! 🌿`,
        description: "Hunger increased by 25 points!"
      });
    });
  };

  const handlePet = () => {
    performAction(() => {
      setSheepState('happy');
      setHappiness(prev => Math.min(100, prev + 20));
      toast({
        title: `${petName} loves the attention! 💚`,
        description: "Happiness increased by 20 points!"
      });
    });
  };

  const handleGroom = () => {
    performAction(() => {
      setSheepState('excited');
      setCleanliness(prev => Math.min(100, prev + 30));
      setHappiness(prev => Math.min(100, prev + 5));
      toast({
        title: `${petName} feels so fresh and clean! ✨`,
        description: "Cleanliness increased by 30 points!"
      });
    });
  };

  const handlePlay = () => {
    performAction(() => {
      setSheepState('excited');
      setHappiness(prev => Math.min(100, prev + 25));
      setHunger(prev => Math.max(0, prev - 5));
      toast({
        title: `${petName} had so much fun playing! 🎾`,
        description: "Happiness +25, but got a little hungry!"
      });
    }, 3000);
  };

  const handleSheepClick = () => {
    if (!actionCooldown) {
      setSheepState('happy');
      setHappiness(prev => Math.min(100, prev + 5));
      setTimeout(() => setSheepState('idle'), 1000);
    }
  };

  const handleSheepPet = () => {
    if (!actionCooldown) {
      handlePet();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <OceanBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="text-center py-6 px-4">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Virtual Leaf Sheep 🐑🌿
          </h1>
          <p className="text-muted-foreground">
            Take care of your adorable {petName}!
          </p>
        </div>

        {/* Game Area */}
        <div className="flex-1 flex flex-col lg:flex-row gap-6 px-4 pb-6">
          {/* Pet Environment */}
          <div className="flex-1 relative">
            <div className="bg-card/30 backdrop-blur-sm rounded-2xl border border-border shadow-xl min-h-[400px] relative overflow-hidden">
              {/* Instructions */}
              <div className="absolute top-4 left-4 right-4 z-10">
                <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3 text-center">
                  <p className="text-sm text-muted-foreground">
                    Click to interact • Double-click to pet • Watch {petName} explore!
                  </p>
                </div>
              </div>

              {/* Leaf Sheep */}
              <LeafSheep 
                state={sheepState}
                onClick={handleSheepClick}
                onPet={handleSheepPet}
              />
              
              {/* Action feedback */}
              {actionCooldown && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary/20 backdrop-blur-sm rounded-full px-4 py-2 text-primary-foreground text-sm font-medium">
                    {sheepState === 'eating' && '🌿 Munching...'}
                    {sheepState === 'happy' && '💚 So happy!'}
                    {sheepState === 'excited' && '✨ Feeling great!'}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Controls Panel */}
          <div className="w-full lg:w-80 space-y-6">
            <PetStats 
              hunger={hunger}
              happiness={happiness}
              cleanliness={cleanliness}
            />
            
            <div className="bg-card rounded-xl p-4 border border-border shadow-lg backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-card-foreground mb-4 text-center">
                Care Actions
              </h3>
              <ActionButtons
                onFeed={handleFeed}
                onPet={handlePet}
                onGroom={handleGroom}
                onPlay={handlePlay}
                disabled={actionCooldown}
              />
            </div>

            {/* Tips */}
            <div className="bg-muted/50 rounded-xl p-4 border border-border">
              <h4 className="font-semibold text-sm text-foreground mb-2">💡 Tips:</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Feed when hunger is low</li>
                <li>• Pet regularly for happiness</li>
                <li>• Groom to keep clean</li>
                <li>• Play to boost mood</li>
                <li>• Watch for auto-behaviors!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};