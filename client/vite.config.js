import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "./index.html",
      },
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three")) return "three";
          if (id.includes("@react-three")) return "react-three";
          if (id.includes("node_modules/framer-motion")) return "motion";
        },
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8800",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
