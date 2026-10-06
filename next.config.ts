import type { NextConfig } from 'next';
import CONFIG from './gitprofile.config';

// '/'          -> site served from https://<user>.github.io/
// '/portfolio/' -> site served from https://<user>.github.io/portfolio/
const basePath = (CONFIG.base || '/').replace(/\/+$/, '');

const nextConfig: NextConfig = {
  // Static HTML export: GitHub Pages can only serve static files.
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
