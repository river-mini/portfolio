import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Externally hosted *images* currently render through a plain <img> (see
    // src/components/SmartImage.tsx). To route a CDN through next/image
    // optimisation instead, allow its host here, e.g.:
    //
    // remotePatterns: [{ protocol: "https", hostname: "cdn.example.com" }],
    //
    // Hover-preview and case-study *videos* are <video> elements and need no
    // configuration at all -- any public MP4/WebM URL works as-is.
    remotePatterns: [],
  },
};

export default nextConfig;
