import React, { useState, useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX, Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MusicPlayerProps {
  isVideoPlaying?: boolean;
  onMusicStateChange?: (isPlaying: boolean) => void;
}

// Liste des pistes audio
const playlist = [
  { title: "Cliché", src: "/audio/clicher.mp3" },
  { title: "Promesse", src: "/audio/promesse.mp3" },
  { title: "Ma grenouillette", src: "/audio/grenouillette.mp3" },
  { title: "Harleys in Hawai", src: "/audio/harleys_in_hawai.mp3" },
  { title: "That should be me", src: "/audio/that_should_be_me.mp3" },
];

const MusicPlayer = ({ isVideoPlaying, onMusicStateChange }: MusicPlayerProps = {}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayAnimation, setShowPlayAnimation] = useState(true);

  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);


  const currentTrack = playlist[currentTrackIndex];

  // Gérer le changement de piste
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load(); // Recharge le nouvel audio
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrackIndex]);

  
  // Gérer le mute
  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (audioRef.current) {
      audioRef.current.muted = newMuted;
    }
  };

  // Gérer play/pause
  const toggleMusic = () => {
    const newState = !isPlaying;
    setIsPlaying(newState);
    setShowPlayAnimation(false); // stop animation
    onMusicStateChange?.(newState);
  
    if (audioRef.current) {
      newState ? audioRef.current.play() : audioRef.current.pause();
    }
  };
  

  // Stopper la musique si une vidéo joue
  useEffect(() => {
    if (isVideoPlaying && isPlaying) {
      setIsPlaying(false);
      onMusicStateChange?.(false);
      audioRef.current?.pause();
    }
  }, [isVideoPlaying]);

  

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) =>
      prev === 0 ? playlist.length - 1 : prev - 1
    );

  };
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="bg-card/90 backdrop-blur-sm rounded-full p-4 shadow-2xl border border-romantic-pink/20">
        <div className="flex items-center gap-3">
          <Button onClick={prevTrack} size="icon" variant="ghost">
            <SkipBack className="text-romantic-pink" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMusic}
            className={`h-12 w-12 rounded-full bg-romantic-pink/10 hover:bg-romantic-pink/20 text-romantic-pink transition-all ${
              showPlayAnimation ? 'animate-heartbeat' : ''
            }`}
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>

          <Button onClick={nextTrack} size="icon" variant="ghost">
            <SkipForward className="text-romantic-pink" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="h-10 w-10 rounded-full hover:bg-romantic-pink/10 text-romantic-pink"
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>

          {isPlaying && (
            <div className="flex items-center gap-1">
              <Music className="h-4 w-4 text-romantic-pink animate-pulse" />
              <span className="text-sm text-romantic-pink">{currentTrack.title}</span>
            </div>
          )}
        </div>
      </div>


      <audio ref={audioRef} loop={false} preload="auto">
        <source src={currentTrack.src} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default MusicPlayer;
