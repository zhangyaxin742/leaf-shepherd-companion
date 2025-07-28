import React, { useState, useEffect } from 'react';

type SheepState = 'idle' | 'walking' | 'eating' | 'happy' | 'sleeping' | 'excited';

interface LeafSheepProps {
  state: SheepState;
  onClick: () => void;
  onPet: () => void;
}

export const LeafSheep: React.FC<LeafSheepProps> = ({ state, onClick, onPet }) => {
  const [position, setPosition] = useState({ x: 50, y: 60 });
  const [facingRight, setFacingRight] = useState(true);

  useEffect(() => {
    if (state === 'walking') {
      const interval = setInterval(() => {
        setPosition(prev => {
          const newX = prev.x + (facingRight ? 2 : -2);
          
          // Bounce off walls
          if (newX >= 80) {
            setFacingRight(false);
            return { ...prev, x: 80 };
          } else if (newX <= 20) {
            setFacingRight(true);
            return { ...prev, x: 20 };
          }
          
          return { ...prev, x: newX };
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [state, facingRight]);

  const getAnimationClass = () => {
    switch (state) {
      case 'eating':
        return 'animate-eat';
      case 'happy':
      case 'excited':
        return 'animate-happy';
      case 'walking':
        return 'animate-bounce-gentle';
      case 'sleeping':
        return 'opacity-60';
      default:
        return 'animate-float';
    }
  };

  const getEyeState = () => {
    switch (state) {
      case 'happy':
      case 'excited':
        return '^_^';
      case 'eating':
        return '>.<';
      case 'sleeping':
        return '-_-';
      default:
        return '• •';
    }
  };

  return (
    <div
      className={`absolute transition-all duration-300 cursor-pointer select-none ${getAnimationClass()}`}
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
        transform: `translateX(-50%) translateY(-50%) ${!facingRight ? 'scaleX(-1)' : ''}`
      }}
      onClick={onClick}
      onDoubleClick={onPet}
    >
      {/* Leaf sheep body */}
      <div className="relative">
        {/* Main body */}
        <div className="w-16 h-12 bg-sheep-white rounded-full border-2 border-sheep-body relative">
          {/* Eyes */}
          <div className="absolute top-2 left-3 text-xs font-bold text-gray-700">
            {getEyeState()}
          </div>
          
          {/* Nose */}
          <div className="absolute top-4 left-6 w-1 h-1 bg-pink-400 rounded-full"></div>
          
          {/* Leaf structures on back */}
          <div className="absolute -top-2 left-2 w-3 h-6 bg-leaf-green rounded-full transform -rotate-12 border border-leaf-green-light"></div>
          <div className="absolute -top-3 left-4 w-4 h-7 bg-leaf-green rounded-full transform rotate-6 border border-leaf-green-light"></div>
          <div className="absolute -top-3 left-7 w-3 h-6 bg-leaf-green rounded-full transform rotate-20 border border-leaf-green-light"></div>
          <div className="absolute -top-2 left-10 w-3 h-5 bg-leaf-green rounded-full transform rotate-35 border border-leaf-green-light"></div>
          
          {/* Additional smaller leaves */}
          <div className="absolute -top-1 left-1 w-2 h-3 bg-leaf-green-light rounded-full transform -rotate-25"></div>
          <div className="absolute -top-1 left-11 w-2 h-3 bg-leaf-green-light rounded-full transform rotate-45"></div>
          
          {/* Rhinophores (horn-like structures) */}
          <div className="absolute -top-1 left-5 w-1 h-3 bg-accent rounded-full"></div>
          <div className="absolute -top-1 left-7 w-1 h-3 bg-accent rounded-full"></div>
        </div>
        
        {/* Foot/tail area */}
        <div className="absolute -bottom-1 left-3 w-10 h-3 bg-sheep-body rounded-full"></div>
        
        {/* Emotion indicators */}
        {state === 'happy' && (
          <div className="absolute -top-8 left-4 text-xl animate-bounce">💚</div>
        )}
        {state === 'eating' && (
          <div className="absolute -top-8 left-4 text-lg animate-pulse">🌿</div>
        )}
        {state === 'sleeping' && (
          <div className="absolute -top-8 left-6 text-sm animate-pulse opacity-70">💤</div>
        )}
      </div>
    </div>
  );
};