import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // <-- 여기가 핵심
  },
});
