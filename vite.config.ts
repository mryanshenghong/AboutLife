import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import viteCompression from "vite-plugin-compression";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteCompression(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: "localhost",
    port: 8081,
    hmr: true,
  },
  css: {
    devSourcemap: true,
  },
  build: {
    sourcemap: 'hidden',
    commonjsOptions: {
      sourceMap: true,
    },
    // minify: true,
    rollupOptions: {
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        manualChunks: {
          "md-editor": ["md-editor-v3"],
          element: ["element-plus"],
        },
      },
    },
    reportCompressedSize: false
  },
});
