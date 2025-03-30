// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';

const netlifyConfiguration = {};

// https://astro.build/config
export default defineConfig({
  integrations: [react(), sitemap()],
  output: "server",
  adapter: netlify(netlifyConfiguration),

  vite: {
    plugins: [tailwindcss()]
  }
});