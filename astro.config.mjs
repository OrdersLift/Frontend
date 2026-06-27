// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

// https://astro.build/config
// Pages stay statically pre-rendered (default). Only routes that opt in with
// `export const prerender = false` (the /api/chat endpoint) run as Netlify
// serverless functions — keeping the whole site on Netlify's free tier.
export default defineConfig({
  integrations: [react(), tailwind()],
  adapter: netlify(),
  site: 'https://orderslift.com',
  base: '/',
});
