interface ImageSize {
  width: number;
  height: number;
  quality?: number;
}

interface ImageLoaderOptions extends ImageSize {
  src: string;
  format?: 'webp' | 'jpeg' | 'png';
}

// Helper function to generate responsive image URLs
export function getResponsiveImageUrl({ src, width, height, quality = 75, format = 'webp' }: ImageLoaderOptions): string {
  // If using Unsplash, we can use their built-in image optimization
  if (src.includes('unsplash.com')) {
    const baseUrl = src.split('?')[0];
    return `${baseUrl}?w=${width}&q=${quality}&fm=${format}&fit=crop`;
  }
  
  // For other images, return original (implement your own image optimization here)
  return src;
}

// Common image sizes for responsive images
export const imageSizes = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 300, height: 200 },
  medium: { width: 600, height: 400 },
  large: { width: 900, height: 600 },
  hero: { width: 1920, height: 1080 },
} as const;

// Helper component props type
export interface ResponsiveImageProps {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
}
