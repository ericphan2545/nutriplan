import { defineConfig } from "vite";
import { resolve } from "path";

// Base path for GitHub Pages project site
export default defineConfig({
  base: "/NutriPlan/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        "meal-planner": resolve(__dirname, "meal-planner.html"),
        favorites: resolve(__dirname, "favorites.html"),
      },
    },
    // Copy public assets to dist
    copyPublicDir: true,
  },
  publicDir: "public",
});

