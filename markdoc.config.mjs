// markdoc.config.mjs
import { defineMarkdocConfig, nodes, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
  nodes: {
    // This tells Astro: "Whenever you see an image in a .mdoc file, 
    // don't use the standard <img> tag. Use my special Astro component instead."
    image: {
      render: component('./src/components/MarkdocImage.astro'),
      attributes: {
        ...nodes.image.attributes, // Keep the standard src and alt attributes
      },
    },
  },
});