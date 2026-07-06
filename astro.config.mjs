import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://whatdadev.ru',
  integrations: [sitemap({ filter: (page) => !page.includes('/admin-guide') })],
});
