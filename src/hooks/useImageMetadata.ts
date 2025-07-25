import { useState, useEffect, useCallback } from 'react';
import * as exifr from 'exifr';

interface ImageMetadata {
  caption: string;
  date: string;
  location?: string;
  description: string;
}

interface StoryImage {
  src: string;
  caption: string;
  date: string;
  location?: string;
  description: string;
}

interface CachedImageData {
  images: StoryImage[];
  timestamp: number;
}

const useImageMetadata = (imagePaths: string[]) => {
  const [images, setImages] = useState<StoryImage[]>([]);
  const [loading, setLoading] = useState(true);

  const CACHE_KEY = 'imageMetadataCache';
  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 heures
  const LOCATION_CACHE_KEY = 'locationCache';

  const getLocationFromCache = useCallback((lat: number, lon: number): string | null => {
    try {
      const cache = localStorage.getItem(LOCATION_CACHE_KEY);
      if (cache) {
        const locationCache = JSON.parse(cache);
        const key = `${lat.toFixed(4)},${lon.toFixed(4)}`;
        return locationCache[key] || null;
      }
    } catch (error) {
      console.error('Error reading location cache:', error);
    }
    return null;
  }, []);

  const saveLocationToCache = useCallback((lat: number, lon: number, location: string) => {
    try {
      const cache = localStorage.getItem(LOCATION_CACHE_KEY);
      const locationCache = cache ? JSON.parse(cache) : {};
      const key = `${lat.toFixed(4)},${lon.toFixed(4)}`;
      locationCache[key] = location;
      localStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify(locationCache));
    } catch (error) {
      console.error('Error saving location to cache:', error);
    }
  }, []);

  const reverseGeocode = useCallback(async (lat: number, lon: number): Promise<string> => {
    // Vérifier le cache d'abord
    const cachedLocation = getLocationFromCache(lat, lon);
    if (cachedLocation) {
      return cachedLocation;
    }

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`);
      const data = await response.json();
      
      let location: string;
      if (data && data.display_name) {
        const parts = data.display_name.split(',');
        if (parts.length >= 2) {
          location = `${parts[0].trim()}, ${parts[1].trim()}`;
        } else {
          location = parts[0].trim();
        }
      } else {
        location = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
      }

      // Sauvegarder dans le cache
      saveLocationToCache(lat, lon, location);
      return location;
    } catch (error) {
      console.error('Geocoding error:', error);
      const fallbackLocation = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
      saveLocationToCache(lat, lon, fallbackLocation);
      return fallbackLocation;
    }
  }, [getLocationFromCache, saveLocationToCache]);

  const getRandomDescription = (filename: string) => {
    const descriptions = [
      "Un moment magique capturé dans le temps, témoignage de notre amour grandissant.",
      "Ces instants précieux qui rendent notre histoire si spéciale et unique.",
      "Une photo qui raconte mille mots sur notre complicité et notre bonheur.",
      "Chaque regard, chaque sourire, chaque geste d'amour immortalisé pour l'éternité.",
      "Les souvenirs les plus doux de notre aventure amoureuse ensemble.",
      "Un cliché qui résume parfaitement la beauté de notre relation.",
      "Ces moments de bonheur pur que nous chérissons dans nos cœurs.",
      "L'amour en image, capturé dans toute sa splendeur et sa sincérité.",
      "Une fenêtre sur notre univers intime et nos instants de complicité.",
      "La poésie de notre amour traduite en une image pleine de tendresse.",
      "Un instant suspendu, figé dans l’éternité de nos émotions.",
      "Chaque image est une lettre de notre roman d’amour.",
      "Des souvenirs cousus main avec les fils d’or de nos sentiments.",
      "Ce cliché est un murmure de ton cœur au mien.",
      "Notre histoire, racontée à travers la lumière d’un regard.",
      "Ce moment figé est un serment silencieux d’éternité.",
      "Le bonheur a un visage, et il est dans cette photo.",
      "Un battement d’âme au creux de l’objectif.",
      "Quand l’amour devient lumière, il prend cette forme-là.",
      "Un souvenir comme une caresse que l’on garde au chaud.",
      "Le reflet exact de ce que je ressens pour toi.",
      "Une preuve en image de ce qu’on ne dit pas toujours avec des mots.",
      "Un éclat de bonheur volé au quotidien pour en faire de la magie.",
      "Une trace douce de ton rire dans ma mémoire.",
      "Le souffle d’un moment partagé rien qu’à deux.",
      "Chaque pixel respire notre lien inaltérable.",
      "Un écho silencieux de ton regard sur moi.",
      "Une parenthèse enchantée gravée dans le réel.",
      "Ce n’est pas juste une image, c’est un battement de cœur.",
      "Ton amour capturé dans un éclat de lumière éternelle."
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  };
  

  useEffect(() => {
    const loadCachedData = () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const cachedData: CachedImageData = JSON.parse(cached);
          const now = Date.now();
          
          // Vérifier si le cache est encore valide
          if (now - cachedData.timestamp < CACHE_DURATION && cachedData.images.length === imagePaths.length) {
            setImages(cachedData.images);
            setLoading(false);
            return true;
          }
        }
      } catch (error) {
        console.error('Error loading cached data:', error);
      }
      return false;
    };

    const extractMetadata = async () => {

      setLoading(true);
      
      // Vérifier le cache d'abord
      if (loadCachedData()) {
        return;
      }

      const extractedImages: StoryImage[] = [];

      for (let i = 0; i < imagePaths.length; i++) {
        const imagePath = imagePaths[i];
        try {
          // Extract filename from path
          const filename = imagePath.split('/').pop() || imagePath;
          const caption = filename.replace(/\.(jpg|jpeg|png|gif)$/i, '').replace(/[-_]/g, ' ');

          let exifData;
          try {
            // Créer une image pour charger le fichier
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            await new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
              img.src = imagePath;
            });

            // Essayer d'extraire les données EXIF
            exifData = await exifr.parse(img);
          } catch (error) {
            console.log(`No EXIF data found for ${filename}:`, error);
          }

          // Extract date
          let date = 'Date inconnue';
          if (exifData && exifData.DateTimeOriginal) {
            date = new Date(exifData.DateTimeOriginal).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            });
          } else if (exifData && exifData.DateTime) {
            date = new Date(exifData.DateTime).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            });
          } else {
            // Generate a random date between 2021 and 2024 for demo
            const randomTime = new Date(2021, 0, 1).getTime() + Math.random() * (new Date(2024, 11, 31).getTime() - new Date(2021, 0, 1).getTime());
            date = new Date(randomTime).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            });
          }

          // Extract location
          let location;
          if (exifData && exifData.latitude && exifData.longitude) {
            try {
              location = await reverseGeocode(exifData.latitude, exifData.longitude);
            } catch (error) {
              console.error('Error getting location:', error);
            }
          }

          extractedImages.push({
            src: imagePath,
            caption: caption.charAt(0).toUpperCase() + caption.slice(1),
            date,
            location,
            description: getRandomDescription(filename)
          });
        } catch (error) {
          console.error(`Error processing ${imagePath}:`, error);
          // Fallback for failed extractions
          const filename = imagePath.split('/').pop() || imagePath;
          const caption = filename.replace(/\.(jpg|jpeg|png|gif)$/i, '').replace(/[-_]/g, ' ');
          const randomTime = new Date(2021, 0, 1).getTime() + Math.random() * (new Date(2024, 11, 31).getTime() - new Date(2021, 0, 1).getTime());
          const date = new Date(randomTime).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });

          extractedImages.push({
            src: imagePath,
            caption: caption.charAt(0).toUpperCase() + caption.slice(1),
            date,
            description: getRandomDescription(filename)
          });
        }
      }

      // Sauvegarder dans le cache
      try {
        const cacheData: CachedImageData = {
          images: extractedImages,
          timestamp: Date.now()
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
      } catch (error) {
        console.error('Error saving cache:', error);
      }

      setImages(extractedImages);
      setLoading(false);
    };

    if (imagePaths.length > 0) {
      extractMetadata();
    } else {
      setLoading(false);
    }
  }, [ reverseGeocode]);

  return { images, loading };
};

export default useImageMetadata;