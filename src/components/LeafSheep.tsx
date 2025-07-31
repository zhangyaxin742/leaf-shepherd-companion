import React, { useState, useEffect, useRef } from 'react';

type SheepState = 'idle' | 'walking' | 'eating' | 'happy' | 'sleeping' | 'excited';

interface LeafSheepProps {
  state: SheepState;
  onClick: () => void;
  onPet: () => void;
}

export const LeafSheep: React.FC<LeafSheepProps> = ({ state, onClick, onPet }) => {
  const [position, setPosition] = useState({ x: 50, y: 60 });
  const [facingRight, setFacingRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const sheepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state === 'walking' && !isDragging) {
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
  }, [state, facingRight, isDragging]);

  // Mouse/touch event handlers for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sheepRef.current) return;
    
    setIsDragging(true);
    const rect = sheepRef.current.parentElement?.getBoundingClientRect();
    if (!rect) return;
    
    const offsetX = (e.clientX - rect.left) / rect.width * 100;
    const offsetY = (e.clientY - rect.top) / rect.height * 100;
    
    setDragStart({ x: offsetX, y: offsetY });
    setDragOffset({ x: offsetX - position.x, y: offsetY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sheepRef.current) return;
    
    const rect = sheepRef.current.parentElement?.getBoundingClientRect();
    if (!rect) return;
    
    const newX = (e.clientX - rect.left) / rect.width * 100 - dragOffset.x;
    const newY = (e.clientY - rect.top) / rect.height * 100 - dragOffset.y;
    
    // Keep sheep within bounds (with some padding)
    const boundedX = Math.max(10, Math.min(90, newX));
    const boundedY = Math.max(10, Math.min(90, newY));
    
    setPosition({ x: boundedX, y: boundedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Global mouse events for dragging
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging || !sheepRef.current) return;
      
      const rect = sheepRef.current.parentElement?.getBoundingClientRect();
      if (!rect) return;
      
      const newX = (e.clientX - rect.left) / rect.width * 100 - dragOffset.x;
      const newY = (e.clientY - rect.top) / rect.height * 100 - dragOffset.y;
      
      const boundedX = Math.max(10, Math.min(90, newX));
      const boundedY = Math.max(10, Math.min(90, newY));
      
      setPosition({ x: boundedX, y: boundedY });
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleClick = (e: React.MouseEvent) => {
    // Only trigger click if not dragging
    if (!isDragging && Math.abs(e.clientX - dragStart.x) < 5 && Math.abs(e.clientY - dragStart.y) < 5) {
      onClick();
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    // Only trigger double-click if not dragging
    if (!isDragging) {
      onPet();
    }
  };

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
      ref={sheepRef}
      className={`absolute ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} select-none ${!isDragging ? getAnimationClass() : ''} ${isDragging ? 'z-50' : ''}`}
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
        transform: `translateX(-50%) translateY(-50%) ${!facingRight ? 'scaleX(-1)' : ''}`,
        transition: isDragging ? 'none' : 'all 0.3s ease'
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
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