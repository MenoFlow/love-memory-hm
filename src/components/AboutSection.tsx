import React, { useState, useEffect } from 'react';
import { Heart, Star, Sparkles, Calendar } from 'lucide-react';

const AboutSection = () => {
  const [daysTogetherCount, setDaysTogetherCount] = useState(0);
  
  const relationshipStartDate = new Date('2025-01-04');
  
  useEffect(() => {
    const calculateDaysTogether = () => {
      const today = new Date();
      const timeDifference = today.getTime() - relationshipStartDate.getTime();
      const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
      setDaysTogetherCount(daysDifference);
    };
    
    calculateDaysTogether();
    // Mettre à jour chaque jour à minuit
    const interval = setInterval(calculateDaysTogether, 24 * 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto bg-card rounded-2xl p-8 md:p-12 shadow-xl gradient-romantic">
      <div className="text-center">
        {/* Decorative Header */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Sparkles className="h-6 w-6 text-romantic-lavender" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">À Propos de Nous</h2>
          <Sparkles className="h-6 w-6 text-romantic-lavender" />
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl md:text-3xl font-semibold text-primary">H</span>
            <Heart className="h-6 w-6 text-romantic-pink heart-float mx-4" fill="currentColor" />
            <span className="text-2xl md:text-3xl font-semibold text-primary">M</span>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Comment notre histoire a commencé? 
            Un regard croisé, un sourire partagé, un bisou volé xD. Et notre destin était scellé. 
            Depuis, chaque jour est une nouvelle page de notre destin.
          </p>

          {/* Compteur de jours ensemble */}
          <div className="bg-gradient-to-r from-romantic-pink/10 to-romantic-lavender/10 rounded-xl p-6 my-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Calendar className="h-6 w-6 text-romantic-pink" />
              <span className="text-xl font-semibold text-foreground">Notre Amour</span>
              <Calendar className="h-6 w-6 text-romantic-pink" />
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-romantic-pink mb-2 animate-pulse">
                <span className="inline-block animate-[bounce_2s_infinite] text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-romantic-pink to-romantic-lavender bg-clip-text text-transparent">
                  {daysTogetherCount.toLocaleString()}
                </span>
                <span className="ml-2">jours</span>
              </div>
              {/* <div className="text-lg text-muted-foreground">
                ensemble
              </div> */}
              <div className="text-sm text-muted-foreground mt-1">
                Depuis le 04 Janvier 2025
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mt-6">
            <Star className="h-5 w-5 text-romantic-lavender" fill="currentColor" />
            <span className="text-muted-foreground font-medium">Ensemble depuis Mai 2021</span>
            <Star className="h-5 w-5 text-romantic-lavender" fill="currentColor" />
          </div>

          <p className="text-base md:text-lg text-muted-foreground italic max-w-2xl mx-auto">
            "L'amour, ce n'est pas de se regarder l'un l'autre, 
            c'est de regarder ensemble dans la même direction."
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center space-x-8 mt-8">
          <div className="flex flex-col items-center">
            <Heart className="h-8 w-8 text-romantic-pink mb-2" fill="currentColor" />
            <span className="text-sm text-muted-foreground font-medium">Amour</span>
          </div>
          <div className="flex flex-col items-center">
            <Sparkles className="h-8 w-8 text-romantic-lavender mb-2" />
            <span className="text-sm text-muted-foreground font-medium">Magie</span>
          </div>
          <div className="flex flex-col items-center">
            <Star className="h-8 w-8 text-romantic-sage mb-2" fill="currentColor" />
            <span className="text-sm text-muted-foreground font-medium">Rêves</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;