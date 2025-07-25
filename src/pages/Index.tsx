import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import Carousel from '@/components/Carousel';
import AboutSection from '@/components/AboutSection';
import MusicPlayer from '@/components/MusicPlayer';
import ViewModeToggle from '@/components/ViewModeToggle';
import StoryViewer from '@/components/StoryViewer';
import OtherSitesSection from '@/components/OtherSitesSection';
import VideoPlayer from '@/components/VideoPlayer';
import LogoutButton from '@/components/LogoutButton';
import useImageMetadata from '@/hooks/useImageMetadata';

const Index = () => {
  const [viewMode, setViewMode] = useState<'carousel' | 'story'>('carousel');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const imagePaths = Array.from({ length: 83 }, (_, i) => `/images/hm${i + 1}.jpg`);

  const { images: storyImages, loading } = useImageMetadata(imagePaths);

  // if (loading) {
  //   return (
  //     <div className="min-h-screen gradient-soft flex items-center justify-center">
  //       <div className="text-center">
  //         <Heart className="h-12 w-12 text-romantic-pink mx-auto mb-4 heart-float" fill="currentColor" />
  //         <p className="text-lg text-muted-foreground">Chargement de nos souvenirs... 💕</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen gradient-soft">
      {/* Logout Button */}
      <LogoutButton />
      
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <Heart className="absolute top-20 left-10 h-4 w-4 text-romantic-pink/30 heart-float animate-fade-in" fill="currentColor" />
        <Sparkles className="absolute top-40 right-20 h-6 w-6 text-romantic-lavender/40 animate-fade-in" style={{ animationDelay: '0.5s' }} />
        <Heart className="absolute bottom-32 left-20 h-5 w-5 text-romantic-sage/30 heart-float animate-fade-in" fill="currentColor" style={{ animationDelay: '1s' }} />
        <Sparkles className="absolute bottom-20 right-10 h-4 w-4 text-romantic-pink/30 animate-fade-in" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <header className="text-center py-16 px-4 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Heart className="h-8 w-8 text-romantic-pink heart-float" fill="currentColor" />
              <h1 className="text-4xl md:text-6xl font-bold text-foreground" style={{ fontFamily: 'Playfair Display, serif' }}>
                Notre page du destin
              </h1>
              <Heart className="h-8 w-8 text-romantic-pink heart-float" fill="currentColor" />
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Bienvenue dans notre univers amoureux. Chaque image est un souvenir précieux, 
              chaque moment capturé raconte notre histoire unique et éternelle.
            </p>
            
            <div className="flex flex-col items-center gap-4 mt-6">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 text-romantic-lavender" />
                <span className="text-muted-foreground font-medium">Créé avec amour</span>
                <Sparkles className="h-5 w-5 text-romantic-lavender" />
              </div>

              {/* Video Player Button */}
              <VideoPlayer 
                images={storyImages} 
                onVideoStateChange={setIsVideoPlaying}
              />
            </div>
          </div>
        </header>

        {/* View Mode Toggle */}
        <div className="px-4 pb-8">
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />
          </div>
        </div>

        {/* Main Content Section */}
        <main className="px-4 pb-16">
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            {viewMode === 'carousel' ? (
              <Carousel images={storyImages} />
            ) : (
              <StoryViewer images={storyImages} />
            )}
          </div>
        </main>

        {/* About Section */}
        <section className="px-4 pb-16">
          <div className="animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <AboutSection />
          </div>
        </section>

        {/* Other Sites Section */}
        <section className="px-4 pb-16">
          <div className="animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <OtherSitesSection />
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 px-4">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Heart className="h-4 w-4 text-romantic-pink" fill="currentColor" />
            <span className="text-sm">Fait avec amour • 2025</span>
            <Heart className="h-4 w-4 text-romantic-pink" fill="currentColor" />
          </div>
        </footer>
      </div>

      {/* Music Player */}
      <MusicPlayer isVideoPlaying={isVideoPlaying} />
    </div>
  );
};

export default Index;
