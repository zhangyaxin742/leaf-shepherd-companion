import React from 'react';

export const OceanBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Ocean gradient background */}
      <div 
        className="absolute inset-0"
        style={{ background: 'var(--ocean-gradient)' }}
      />
      
      {/* Animated bubbles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/20 animate-bubble"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${8 + Math.random() * 16}px`,
            height: `${8 + Math.random() * 16}px`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 4}s`
          }}
        />
      ))}
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
      
      {/* Bottom coral/seaweed decoration */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-accent/20 to-transparent">
        <div className="absolute bottom-0 left-10 w-2 h-24 bg-leaf-green rounded-t-full opacity-60 animate-wiggle" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-0 left-20 w-3 h-28 bg-leaf-green rounded-t-full opacity-50 animate-wiggle" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 right-16 w-2 h-20 bg-leaf-green-light rounded-t-full opacity-70 animate-wiggle" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 right-32 w-3 h-32 bg-leaf-green rounded-t-full opacity-40 animate-wiggle" style={{ animationDelay: '0.5s' }} />
      </div>
    </div>
  );
};