// markdoc.config.mjs
import { defineMarkdocConfig, nodes, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
  nodes: {
    image: {
      render: component('./src/components/aImage.astro'),
      attributes: {
        // ...nodes.image.attributes,
        src: { type: String, required: true },
        alt: { type: String },
        title: { type: String }, 
      },
    },
  },
  tags: {
    CustomImage: {
      render: component('./src/components/mdoc/customImage.astro'),
      attributes: {
        src: { type: String, required: true },
        alt: { type: String },
        caption: { type: String },
        width: { type: Number },
        ratio: { type: String },
        position: { type: String },
        edge: { type: String },
      },
    },
  },
});