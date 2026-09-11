import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the project root explicitly: this folder sits inside a much larger
  // (and unrelated) Git repository rooted at the user's home directory, and
  // there's a stray package-lock.json further up the tree. Without this,
  // Next.js can get confused about which lockfile/workspace root to trust.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
