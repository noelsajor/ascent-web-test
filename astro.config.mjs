import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ascentmgnt.com', // Replace with actual site URL
  integrations: [sitemap()],
  output: 'static',
});
