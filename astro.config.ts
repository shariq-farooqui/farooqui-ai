import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://farooqui.ai',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
