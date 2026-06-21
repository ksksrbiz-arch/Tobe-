import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
      // Default ignores of eslint-config-next:
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      // Echoes of Choice subsite (separate Vite app, has its own lint config)
      "echoes/**",
      // Auto-generated, gitignored build artifact (see generate-blog-registry.mjs)
      "lib/blog.generated.ts",
    ]),
]);

export default eslintConfig;
