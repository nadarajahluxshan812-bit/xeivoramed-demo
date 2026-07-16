import { copyFileSync, existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const distDir = resolve(root, "dist");

copyFileSync(resolve(root, "index.html"), resolve(distDir, "index.html"));

const staleHomePath = resolve(distDir, "home.html");
if (existsSync(staleHomePath)) {
  rmSync(staleHomePath);
}
