import React, { useState, useEffect } from "react";

interface FallbackImageProps {
  baseName: string; // e.g. "amanda", "marcus"
  fallbackUrl: string; // Unsplash fallback URL
  alt?: string;
  className?: string;
  [key: string]: any; // Allow pass-through of all other standard img props
}

export default function FallbackImage({ baseName, fallbackUrl, alt, ...props }: FallbackImageProps) {
  // Ordered list of candidate image sources to try in sequence
  const candidates = [
    `/assets/${baseName}.png`,
    `/assets/${baseName}.jpg`,
    `/assets/${baseName}.jpeg`,
    `/assets/${baseName}.webp`,
    fallbackUrl
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset index if baseName or fallbackUrl changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [baseName, fallbackUrl]);

  const handleError = () => {
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  return (
    <img
      src={candidates[currentIndex]}
      alt={alt}
      onError={handleError}
      referrerPolicy="no-referrer"
      {...props}
    />
  );
}
