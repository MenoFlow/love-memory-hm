import React from 'react';
import { Layers, Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ViewModeToggleProps {
  viewMode: 'carousel' | 'story';
  onViewModeChange: (mode: 'carousel' | 'story') => void;
}

const ViewModeToggle = ({ viewMode, onViewModeChange }: ViewModeToggleProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      <Button
        variant={viewMode === 'carousel' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onViewModeChange('carousel')}
        className="flex items-center gap-2"
      >
        <Grid className="h-4 w-4" />
        Diaporama
      </Button>
      <Button
        variant={viewMode === 'story' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onViewModeChange('story')}
        className="flex items-center gap-2"
      >
        <Layers className="h-4 w-4" />
        Story
      </Button>
    </div>
  );
};

export default ViewModeToggle;