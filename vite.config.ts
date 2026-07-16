import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const demoRoutes = new Set(["/clinic", "/passport", "/sources", "/emergency", "/log", "/card"]);
const __dirname = dirname(fileURLToPath(import.meta.url));

function routeToDemoApp(url?: string) {
  if (!url) return url;
  const [pathname, search = ""] = url.split("?");
  if (!demoRoutes.has(pathname)) return url;
  return `/app.html${search ? `?${search}` : ""}`;
}

function demoRouteRewritePlugin() {
  return {
    name: "xeivoramed-demo-route-rewrite",
    configureServer(server: { middlewares: { use: (cb: (req: { url?: string }, res: unknown, next: () => void) => void) => void } }) {
      server.middlewares.use((req, _res, next) => {
        req.url = routeToDemoApp(req.url);
        next();
      });
    },
    configurePreviewServer(server: { middlewares: { use: (cb: (req: { url?: string }, res: unknown, next: () => void) => void) => void } }) {
      server.middlewares.use((req, _res, next) => {
        req.url = routeToDemoApp(req.url);
        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  appType: "mpa",
  plugins: [react(), demoRouteRewritePlugin()],
  build: {
    rollupOptions: {
      input: {
        app: resolve(__dirname, "app.html"),
      },
    },
  },
  // Allow serving the build through a public tunnel (e.g. *.trycloudflare.com).
  preview: { allowedHosts: true },
});
