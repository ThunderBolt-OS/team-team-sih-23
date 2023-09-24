import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const pwaImg = "./vite.png";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Civil App",
        short_name: "Civil App",
        description: "Users can track, pay, report for bus transports",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        icons: [
          {
            src: pwaImg,
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
