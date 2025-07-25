import React from 'react';
import { ExternalLink, Book, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const OtherSitesSection = () => {
  const sites = [
    {
      title: "Notre Histoire - Le Roman",
      description: "Découvrez notre histoire d'amour racontée sous forme de roman interactif",
      url: "https://grenouillette.vercel.app/",
      icon: <Book className="h-6 w-6" />,
      category: "Roman"
    },
    {
      title: "Journal de nos Aventures",
      description: "Nos voyages et découvertes ensemble, jour après jour",
      url: "#",
      icon: <Heart className="h-6 w-6" />,
      category: "Blog"
    }
  ];

  return (
    <section className="w-full max-w-6xl mx-auto py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
          Nos Autres Univers
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explorez d'autres facettes de notre histoire à travers différents formats
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {sites.map((site, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-romantic-pink/20 hover:border-romantic-pink/40">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-full bg-romantic-pink/10 text-romantic-pink group-hover:bg-romantic-pink group-hover:text-white transition-colors">
                  {site.icon}
                </div>
                <span className="text-xs font-medium text-romantic-pink/70 bg-romantic-pink/10 px-2 py-1 rounded-full">
                  {site.category}
                </span>
              </div>
              <CardTitle className="text-xl group-hover:text-romantic-pink transition-colors">
                {site.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {site.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full group-hover:bg-romantic-pink group-hover:text-white group-hover:border-romantic-pink transition-colors"
                onClick={() => window.open(site.url, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Découvrir
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default OtherSitesSection;