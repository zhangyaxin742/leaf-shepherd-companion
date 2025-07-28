import React from 'react';
import { Progress } from '@/components/ui/progress';

interface PetStatsProps {
  hunger: number;
  happiness: number;
  cleanliness: number;
}

export const PetStats: React.FC<PetStatsProps> = ({ hunger, happiness, cleanliness }) => {
  const getStatColor = (value: number) => {
    if (value >= 70) return 'text-green-600';
    if (value >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatEmoji = (stat: string, value: number) => {
    const emojis = {
      hunger: value >= 70 ? '🍽️' : value >= 40 ? '😋' : '😰',
      happiness: value >= 70 ? '😊' : value >= 40 ? '😐' : '😢',
      cleanliness: value >= 70 ? '✨' : value >= 40 ? '🫧' : '💧'
    };
    return emojis[stat as keyof typeof emojis];
  };

  return (
    <div className="bg-card rounded-xl p-4 border border-border shadow-lg backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-card-foreground mb-4 text-center">
        Leaf Sheep Status
      </h3>
      
      <div className="space-y-4">
        {/* Hunger */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-card-foreground flex items-center gap-2">
              {getStatEmoji('hunger', hunger)}
              Fullness
            </span>
            <span className={`text-sm font-bold ${getStatColor(hunger)}`}>
              {hunger}%
            </span>
          </div>
          <Progress 
            value={hunger} 
            className="h-2"
          />
        </div>

        {/* Happiness */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-card-foreground flex items-center gap-2">
              {getStatEmoji('happiness', happiness)}
              Happiness
            </span>
            <span className={`text-sm font-bold ${getStatColor(happiness)}`}>
              {happiness}%
            </span>
          </div>
          <Progress 
            value={happiness} 
            className="h-2"
          />
        </div>

        {/* Cleanliness */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-card-foreground flex items-center gap-2">
              {getStatEmoji('cleanliness', cleanliness)}
              Cleanliness
            </span>
            <span className={`text-sm font-bold ${getStatColor(cleanliness)}`}>
              {cleanliness}%
            </span>
          </div>
          <Progress 
            value={cleanliness} 
            className="h-2"
          />
        </div>
      </div>

      {/* Overall mood indicator */}
      <div className="mt-4 p-2 bg-muted rounded-lg text-center">
        <div className="text-sm text-muted-foreground">
          Mood: {
            (hunger + happiness + cleanliness) / 3 >= 70 ? 
              <span className="text-green-600 font-semibold">Thriving 🌟</span> :
            (hunger + happiness + cleanliness) / 3 >= 40 ?
              <span className="text-yellow-600 font-semibold">Content 😌</span> :
              <span className="text-red-600 font-semibold">Needs Care 🥺</span>
          }
        </div>
      </div>
    </div>
  );
};