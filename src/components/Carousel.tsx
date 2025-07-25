// Carousel.tsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useEmblaCarousel from 'embla-carousel-react';
import LazyImage from './LazyImage'; // ⚠️ N'oublie pas d'importer

interface StoryImage {
  src: string;
  caption: string;
  date: string;
  location?: string;
  description: string;
}

interface CarouselProps {
  images: StoryImage[];
}

const Carousel = ({ images }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    dragFree: true,
    containScroll: 'trimSnaps'
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying || !emblaApi) return;
    
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const goToPrevious = () => emblaApi?.scrollPrev();
  const goToNext = () => emblaApi?.scrollNext();
  const togglePlayPause = () => setIsPlaying(!isPlaying);

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-visible p-8">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex">
            {images.map((image, index) => (
              <div key={index} className="embla__slide flex-[0_0_60%] min-w-0 pl-4">
                <div className={`relative aspect-[3/4] transform transition-all duration-500 ${
                  index === currentIndex 
                    ? 'scale-110 z-10' 
                    : Math.abs(index - currentIndex) === 1 
                      ? 'scale-95 opacity-80' 
                      : 'scale-90 opacity-60'
                }`}>
                  <LazyImage
                    src={image.src}
                    alt={image.caption}
                    className="w-full h-full object-cover rounded-lg shadow-xl"
                  />
  
                  {index === currentIndex && (
                    <div className="absolute inset-x-0 bottom-[4%] bg-gradient-to-t from-black/70 via-black/40 to-transparent px-4 py-3 rounded-lg">
                      <h3 className="text-white text-base font-semibold leading-snug" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {image.caption}
                      </h3>
                      <div className="flex items-center justify-between text-white/90 text-sm leading-none">
                        <p>📅 {image.date}</p>
                        <p>📍 {image.location}</p>
                      </div>
                    </div>

                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
  
        <Button variant="secondary" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 text-romantic-pink" onClick={goToPrevious}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
  
        <Button variant="secondary" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 text-romantic-pink" onClick={goToNext}>
          <ChevronRight className="h-6 w-6" />
        </Button>
  
        <Button variant="secondary" size="icon" className="absolute bottom-4 right-4 z-20 bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 text-romantic-pink" onClick={togglePlayPause}>
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>
  
        <Heart className="absolute top-8 right-8 h-8 w-8 text-romantic-pink heart-float z-20" fill="currentColor" />
      </div>
  
      <div className="flex justify-center space-x-2 p-6">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-romantic-pink scale-125' 
                : 'bg-muted hover:bg-muted-foreground/50'
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
  
};

export default Carousel;
