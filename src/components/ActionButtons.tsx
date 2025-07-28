import React from 'react';
import { Button } from '@/components/ui/button';

interface ActionButtonsProps {
  onFeed: () => void;
  onPet: () => void;
  onGroom: () => void;
  onPlay: () => void;
  disabled: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onFeed,
  onPet,
  onGroom,
  onPlay,
  disabled
}) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        onClick={onFeed}
        disabled={disabled}
        variant="default"
        size="lg"
        className="h-16 flex flex-col gap-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all duration-200 hover:scale-105"
      >
        <div className="text-2xl">🌿</div>
        <div className="text-sm font-medium">Feed</div>
      </Button>

      <Button
        onClick={onPet}
        disabled={disabled}
        variant="secondary"
        size="lg"
        className="h-16 flex flex-col gap-1 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transition-all duration-200 hover:scale-105"
      >
        <div className="text-2xl">💚</div>
        <div className="text-sm font-medium">Pet</div>
      </Button>

      <Button
        onClick={onGroom}
        disabled={disabled}
        variant="secondary"
        size="lg"
        className="h-16 flex flex-col gap-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg transition-all duration-200 hover:scale-105"
      >
        <div className="text-2xl">🫧</div>
        <div className="text-sm font-medium">Groom</div>
      </Button>

      <Button
        onClick={onPlay}
        disabled={disabled}
        variant="outline"
        size="lg"
        className="h-16 flex flex-col gap-1 border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 shadow-lg transition-all duration-200 hover:scale-105"
      >
        <div className="text-2xl">🎾</div>
        <div className="text-sm font-medium">Play</div>
      </Button>
    </div>
  );
};