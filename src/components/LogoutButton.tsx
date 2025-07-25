import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const LogoutButton = () => {
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    toast({
      title: "À bientôt mon Tchoupii 💕",
      description: "Tu me manques déjà...",
    });
    
    // Refresh page after a short delay
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      size="sm"
      className="fixed top-4 right-4 z-50 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-foreground border border-white/20"
    >
      <LogOut className="h-4 w-4 mr-2" />
      Se déconnecter
    </Button>
  );
};

export default LogoutButton;