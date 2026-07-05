import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    reporters: ["verbose"],
    outputFile: { json: "vitest-report/results.json" },
    passWithNoTests: true,
    exclude: ["tests/**", "node_modules/**", ".next/**", "dist/**", "build/**"],
  },
  resolve: {
    alias: { "@": resolve(__dirname, "./src") },
  },
});
