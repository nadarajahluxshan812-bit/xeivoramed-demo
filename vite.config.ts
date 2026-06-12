import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Allow serving the build through a public tunnel (e.g. *.trycloudflare.com).
  preview: { allowedHosts: true },
});
