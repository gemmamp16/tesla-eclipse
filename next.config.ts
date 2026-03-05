import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // En local inyecta la fecha/hora de build como fallback de versión
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },
};

export default nextConfig;
