import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, MapPin, Heart, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';

interface StoryImage {
  src: string;
  caption: string;
  date: string;
  location?: string;
  description?: string;
}

interface StoryViewerProps {
  images: StoryImage[];
}

const StoryViewer = ({ images }: StoryViewerProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const openStory = (index: number) => {
    setSelectedImage(index);
    setProgress(0);
    setIsPaused(false);
  };

  const closeStory = () => {
    setSelectedImage(null);
    setShowDetails(false);
    setProgress(0);
    setIsPaused(false);
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
      setProgress(0);
    }
  };

  // Auto-progression avec timer de 3 secondes
  useEffect(() => {
    if (selectedImage !== null && !isPaused) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            goToNext();
            return 0;
          }
          return prev + (100 / 30); // 30 updates pour 3 secondes
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [selectedImage, isPaused]);

  const currentImage = selectedImage !== null ? images[selectedImage] : null;

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Story Scroll Horizontal */}
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex space-x-4 pb-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer group bg-card shadow-lg"
              onClick={() => openStory(index)}
            >
            <img
              src={image.src}
              alt={image.caption}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Story Ring */}
            <div className="absolute inset-0 rounded-xl border-2 border-romantic-pink/30 group-hover:border-romantic-pink transition-colors" />
            
            {/* Date Badge */}
            <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
              {image.date}
            </div>
            
            {/* Caption */}
            <div className="absolute bottom-2 left-2 right-2 text-white text-sm font-medium truncate">
              {image.caption}
            </div>
            
            {/* Play Indicator */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" fill="currentColor" />
              </div>
            </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Story Modal */}
      <Dialog open={selectedImage !== null} onOpenChange={closeStory}>
        <DialogContent className="max-w-4xl w-full h-[90vh] p-0 bg-black border-none">
          {currentImage && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Background Image */}
              <div className="aspect-[3/4] max-w-md mx-auto">
                <img
                  src={currentImage.src}
                  alt={currentImage.caption}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              
              {/* Progress Bars */}
              <div className="absolute top-4 left-4 right-4 flex gap-1">
                {images.map((_, index) => (
                  <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white transition-all duration-100"
                      style={{ 
                        width: index === selectedImage ? `${progress}%` : 
                               index < selectedImage ? '100%' : '0%'
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Pause/Play Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 left-1/2 -translate-x-1/2 text-white hover:bg-white/20"
                onClick={() => setIsPaused(!isPaused)}
              >
                {isPaused ? <Heart className="h-4 w-4" /> : <Heart className="h-4 w-4" fill="currentColor" />}
              </Button>

              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
                onClick={closeStory}
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Navigation */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                onClick={goToNext}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>

              {/* Info Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute bottom-20 right-4 text-white hover:bg-white/20"
                onClick={() => setShowDetails(!showDetails)}
              >
                <Info className="h-6 w-6" />
              </Button>

              {/* Details Panel */}
              {showDetails && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-xl p-6 text-white">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold">{currentImage.caption}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20 h-6 w-6"
                      onClick={() => setShowDetails(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-3 text-sm text-white/80">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {currentImage.date}
                    </div>
                    {currentImage.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {currentImage.location}
                      </div>
                    )}
                  </div>
                  
                  {currentImage.description && (
                    <p className="text-white/90 leading-relaxed">
                      {currentImage.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StoryViewer;