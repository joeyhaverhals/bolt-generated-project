import { getResponsiveImageUrl, imageSizes, ResponsiveImageProps } from '../utils/imageLoader'

export default function ResponsiveImage({
  src,
  alt,
  sizes = '100vw',
  className = '',
  priority = false,
}: ResponsiveImageProps) {
  const srcSet = Object.entries(imageSizes)
    .map(([_, size]) => {
      const url = getResponsiveImageUrl({ src, ...size });
      return `${url} ${size.width}w`;
    })
    .join(', ');

  return (
    <img
      src={getResponsiveImageUrl({ src, ...imageSizes.medium })}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
