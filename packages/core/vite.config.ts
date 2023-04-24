import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import path from "path"
import ViteCompression from "vite-plugin-compression"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), ViteCompression()],
  resolve: {
    alias: {
      "@": path.join(__dirname, "./src"),
      "@Com": path.join(__dirname, "./src/components"),
      "@assets": path.join(__dirname, "./src/assets"),
      "@data": path.join(__dirname, "./src/data"),
      "@stores": path.join(__dirname, "./src/stores"),
      "@utils": path.join(__dirname, "./src/utils"),
      "@view": path.join(__dirname, "./src/view"),
    },
    extensions: [".vue", ".js", ".jsx", ".ts", ".tsx"],
  },
})

function getPath(pathName = "") {
  return path.resolve(__dirname, pathName)
}
