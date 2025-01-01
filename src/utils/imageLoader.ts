// Image loader utility for optimizing and managing image loading
import { ImageLoaderProps } from 'next/image'

export default function imageLoader({ src, width, quality = 75 }: ImageLoaderProps) {
  // Handle both external and local images
  if (src.startsWith('http')) {
    // For external images (like Unsplash), use their optimization API
    const url = new URL(src)
    return `${url.origin}${url.pathname}?w=${width}&q=${quality}&auto=format`
  }
  
  // For local images, use Supabase storage optimization
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/${src}?width=${width}&quality=${quality}`
}
