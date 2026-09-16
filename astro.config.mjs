import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://what-da-dev.ru',
  integrations: [sitemap({ filter: (page) => !page.includes('/admin-guide') })],
});
