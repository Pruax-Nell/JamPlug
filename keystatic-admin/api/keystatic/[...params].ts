import { makeHandler } from '@keystatic/astro/api';
import config from '../../../keystatic.config';

export const all = makeHandler({ config });

export const prerender = false;

// Security: Ensure the API only exists in dev mode
export function getStaticPaths() {
  return [];
}