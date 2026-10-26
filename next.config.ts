import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Added by create-next-app. It only works in `next dev`: it writes notes (see AGENTS.md) that help AI
    // coding tools report Next.js bugs. It has no effect on the site itself.
    agentFeedback: true,
  },
  // Next 16's caching model, added by create-next-app. This site has no `use cache` code, so the pages are
  // built once as plain static HTML, and /api/chat runs fresh on every request.
  cacheComponents: true,
  turbopack: {
    rules: {
      // Runs Tailwind CSS on every .css file (here: app/globals.css) inside the Turbopack bundler.
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
