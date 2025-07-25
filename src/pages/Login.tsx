import React, { useState, useEffect } from 'react';
import { Heart, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [password, setPassword] = useState('');
  const [showQuestion, setShowQuestion] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const correctPassword = "040125";

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setShowQuestion(true);
    } else {
      alert('Mot de passe incorrect 💔');
    }
  };

  const handleYes = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setShowEmojis(true);
    setTimeout(() => {
      // Add a smooth transition before going to main page
      document.body.style.transition = 'opacity 1s ease-in-out';
      document.body.style.opacity = '0';
      setTimeout(() => {
        document.body.style.opacity = '1';

        onLogin();
      }, 1000);
    }, 3000);
    // document.body.style.opacity = '1';

  };

  const handleNoAttempt = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  // Generate floating hearts
  const FloatingHearts = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <Heart
          key={i}
          className={`absolute h-6 w-6 text-romantic-pink/40 animate-[float_${3 + Math.random() * 4}s_ease-in-out_infinite] heart-float`}
          fill="currentColor"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );

  // Emoji rain
  const EmojiRain = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute text-4xl animate-[fall_3s_linear_infinite]"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        >
          {['💕', '💖', '💝', '💗', '🎉', '✨', '🌟', '💐'][Math.floor(Math.random() * 8)]}
        </div>
      ))}
    </div>
  );

  useEffect(() => {
    // Smooth entry animation
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 1s ease-in-out';
  }, []);

  return (
    <div className="min-h-screen gradient-soft flex items-center justify-center relative overflow-hidden animate-fade-in">
      <FloatingHearts />
      
      {showEmojis && <EmojiRain />}

      <div className="max-w-md w-full mx-4 p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-romantic-pink/20 animate-scale-in"
           style={{ animationDelay: '0.3s' }}>
        {!showQuestion ? (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Lock className="h-12 w-12 text-romantic-pink" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              Accès Privé
            </h1>
            <p className="text-muted-foreground mb-8">
              Entrez le mot de passe secret 💕
            </p>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <Input
                type="password"
                placeholder="Notre date spéciale..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-center text-lg"
              />
              <Button type="submit" className="w-full bg-romantic-pink hover:bg-romantic-pink/90">
                <Heart className="h-4 w-4 mr-2" fill="currentColor" />
                Accéder à notre univers
              </Button>
            </form>
          </div>
        ) : (
          <div className="text-center">
            <Heart className="h-16 w-16 text-romantic-pink mx-auto mb-6 heart-float" fill="currentColor" />
            <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Question Importante
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Est-ce que tu m'aimes ? 💕
            </p>
            
            <div className="space-y-4 relative">
              <Button
                onClick={handleYes}
                className="w-full bg-romantic-pink hover:bg-romantic-pink/90 text-lg py-3"
              >
                Oui, pour toujours ! 💖
              </Button>
              
              <Button
                onClick={handleNoAttempt}
                variant="outline"
                className="w-full"
              >
                Non
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Modal pour le bouton "Non" */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-md mx-auto bg-white/95 backdrop-blur-sm border border-romantic-pink/30">
          <div className="text-center p-6">
            <Heart className="h-12 w-12 text-romantic-pink mx-auto mb-4 heart-float" fill="currentColor" />
            <h3 className="text-xl font-semibold mb-4 text-foreground" style={{ fontFamily: 'Playfair Display, serif' }}>
              Tu es sûre ? 🥺
            </h3>
            <p className="text-muted-foreground mb-6">
              Réfléchis bien à ta réponse Tchoupilumie...
            </p>
            <Button
              onClick={handleModalClose}
              className="w-full bg-romantic-pink hover:bg-romantic-pink/90"
            >
              Je rigole, pas sûre du tout xD
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes fall {
          0% { transform: translateY(-100vh) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Login;