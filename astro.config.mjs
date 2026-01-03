// https://astro.build/config
// export default defineConfig({}); 

import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import markdoc from '@astrojs/markdoc';

import keystatic from '@keystatic/astro';

export default defineConfig({
  output: "static" | "server",
  prefetch: true,
  base: '/',
  trailingSlash: 'always',
  integrations: [mdx(), react(), markdoc(), keystatic()],

  vite: {
    plugins: [tailwindcss()]
  }
});