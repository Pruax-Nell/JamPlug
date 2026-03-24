import type { ImageMetadata } from 'astro';
import type { KeystaticImage } from './types';

// as images are now flat, replace getImageSource with coverImage/eventPoster etc
export const getImageSource = (
  keystaticField: Partial<KeystaticImage> | null | undefined,
  placeholder: ImageMetadata
): ImageMetadata => {
  if (keystaticField?.src) {
    return keystaticField.src;
  }
  return placeholder;
}; 