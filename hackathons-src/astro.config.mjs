// @ts-check
import { defineConfig } from 'astro/config';

/**
 * Static build mounted inside the personal website at /samuel/hackathons/.
 * Output goes straight into the website repo's `samuel/hackathons/` folder,
 * which Cloudflare serves as plain static assets (no Worker involved).
 */
export default defineConfig({
  site: 'https://www.human-agent-interface.com',
  base: '/samuel/hackathons',
  outDir: '../samuel/hackathons',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  compressHTML: true,
  devToolbar: { enabled: false },
});
