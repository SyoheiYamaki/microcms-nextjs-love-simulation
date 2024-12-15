import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.microcms-assets.io"
    ]
  },
  sassOptions: {
    prependData: `
      @use "@/app/styles/keyframes" as *;
      @use "@/app/styles/mediaqueries" as *;
    `,
  },
};

export default nextConfig;
