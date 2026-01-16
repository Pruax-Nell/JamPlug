// https://astro.build/config
// export default defineConfig({}); 

import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import markdoc from '@astrojs/markdoc';

import keystatic from '@keystatic/astro';

import node from '@astrojs/node';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: "static",
  prefetch: true,
  site: 'https://yourjamplug.uk',
  trailingSlash: 'ignore',
  integrations: [mdx(), react(), markdoc(), keystatic(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['lodash/debounce', '@keystatic/core > lodash/debounce'],
    },
    ssr: {
      noExternal: ['@keystatic/core', 'lodash']
    }
  },

  adapter: node({
    mode: 'standalone'
  })
});