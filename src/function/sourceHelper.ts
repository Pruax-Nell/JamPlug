import type { ImageMetadata } from 'astro';
import type { KeystaticImage } from './types';


export const getImageSource = (
  keystaticField: Partial<KeystaticImage> | null | undefined,
  placeholder: ImageMetadata
): ImageMetadata => {
  if (keystaticField?.src) {
    return keystaticField.src;
  }
  return placeholder;
};