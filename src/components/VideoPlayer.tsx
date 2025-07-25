import React, { useState, useRef } from 'react';
import { Play, Pause, Download, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface VideoPlayerProps {
  images: Array<{
    src: string;
    caption: string;
    date: string;
  }>;
  onVideoStateChange?: (isPlaying: boolean) => void;
}

const VideoPlayer = ({ images, onVideoStateChange }: VideoPlayerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [videoAudioPlaying, setVideoAudioPlaying] = useState(false);

  const videoAudioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const stopPlayback = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (videoAudioRef.current) {
      videoAudioRef.current.pause();
      videoAudioRef.current.currentTime = 0;
    }

    setIsPlaying(false);
    setVideoAudioPlaying(false);
    setCurrentImageIndex(0);
    onVideoStateChange?.(false);
  };

  const handleOpenChange = (isOpen2: boolean) => {
    if (!isOpen2) {
      stopPlayback();
    }

    setIsOpen(isOpen2);
  };

  const playVideo = () => {
    if (isPlaying) {
      stopPlayback();
      return;
    }

    // Commencer la lecture
    if (videoAudioRef.current) {
      videoAudioRef.current.play();
    }

    setIsPlaying(true);
    setVideoAudioPlaying(true);
    onVideoStateChange?.(true);

    let index = 0;
    intervalRef.current = setInterval(() => {
      if (index < images.length - 1) {
        index++;
        setCurrentImageIndex(index);
      } else {
        stopPlayback();
      }
    }, 2500);
  };

  const downloadVideo = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;

    const link = document.createElement('a');
    link.download = 'notre-histoire-damour.mp4';
    link.href = '#'; // Remplacez par un vrai blob MP4 si besoin

    alert('Téléchargement de la mini-vidéo démarré ! 💕');
  };

  return (
    <>
      <Button
        variant="default"
        size="lg"
        onClick={() => setIsOpen(true)}
        className="bg-romantic-pink hover:bg-romantic-pink/90 text-white shadow-lg"
      >
        <Play className="h-5 w-5 mr-2" />
        Voir la Mini-Vidéo
      </Button>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
              Notre Histoire en Vidéo
            </DialogTitle>
          </DialogHeader>
          
          <div className="relative">
            <div className="relative aspect-[3/4] bg-black rounded-lg overflow-hidden">
              <audio ref={videoAudioRef} loop preload="auto">
                <source src="/audio/clicher.mp3" type="audio/mpeg" />
              </audio>

              <img
                src={images[currentImageIndex]?.src}
                alt={images[currentImageIndex]?.caption}
                className="w-full h-full object-cover transition-all duration-500"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white font-medium">{images[currentImageIndex]?.caption}</p>
                <p className="text-white/70 text-sm">{images[currentImageIndex]?.date}</p>
              </div>

              {isOpen && (
                <div className="absolute top-4 left-4 right-4">
                  <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-romantic-pink transition-all duration-100"
                      style={{ width: `${((currentImageIndex + 1) / images.length) * 100}%` }}
                    />
                  </div>
                  <p className="text-white text-sm mt-2">
                    {currentImageIndex + 1} / {images.length}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
              <Button
                variant="outline"
                size="lg"
                onClick={playVideo}
                className="flex items-center gap-2"
              >
                {isPlaying ? (
                  <>
                    <RotateCcw className="h-5 w-5" />
                    Repeter
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    Lire
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={downloadVideo}
                className="flex items-center gap-2"
                disabled={true}
              >
                <Download className="h-5 w-5" />
                Télécharger
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoPlayer;
