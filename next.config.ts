import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Optimized images rarely change; cache them for 31 days so reloads are served from cache.
    // Renaming a file (e.g. .png -> .webp) changes its URL and bypasses any stale entry.
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
