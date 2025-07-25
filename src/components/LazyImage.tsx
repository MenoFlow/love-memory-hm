// components/LazyImage.tsx
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface LazyImageProps {
  src: string;
  alt?: string;
  className?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt = '', className = '' }) => {
  const [loaded, setLoaded] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-xl transition-all duration-300 ease-in-out ${className}`}
    >
      {inView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={`w-full h-auto transition-opacity duration-700 ease-in-out
            ${loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'}`}
        />
      )}
    </div>
  );
};

export default LazyImage;
