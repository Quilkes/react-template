import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "clsx",
      "three",
      "@react-three/fiber",
      "@react-three/drei",
      "framer-motion",
      "gsap",
      "@gsap/react",
      // react-icons sub-paths must be listed explicitly — "react-icons" alone
      // does not pre-bundle the icon set sub-paths (fi, fa, md, etc.)
      // and an un-cached sub-path import causes a 504 that silently white-screens.
      "react-icons/fi",
      "react-icons/fa",
      "react-icons/fa6",
      "react-icons/md",
      "react-icons/io",
      "react-icons/io5",
      "react-icons/ai",
      "react-icons/bi",
      "react-icons/bs",
      "react-icons/ci",
      "react-icons/cg",
      "react-icons/di",
      "react-icons/gi",
      "react-icons/go",
      "react-icons/gr",
      "react-icons/hi",
      "react-icons/hi2",
      "react-icons/im",
      "react-icons/lu",
      "react-icons/pi",
      "react-icons/ri",
      "react-icons/rx",
      "react-icons/si",
      "react-icons/sl",
      "react-icons/tb",
      "react-icons/tfi",
      "react-icons/ti",
      "react-icons/vsc",
      "react-icons/wi",
      "tailwind-merge",
    ],
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    hmr: {
      overlay: false,
    },
    allowedHosts: [".modal.host", ".w.modal.host"],
  },
});
