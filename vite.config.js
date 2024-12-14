import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";

export default defineConfig({
  plugins: [react(), commonjs()],
  build: {
    rollupOptions: {
      external: ["pdfjs-dist/build/pdf.worker.entry"], // Do not bundle the worker
    },
  },
  resolve: {
    alias: {
      // Resolve the worker file correctly
      "pdfjs-dist/build/pdf.worker.entry":
        "pdfjs-dist/build/pdf.worker.js",
    },
  },
});


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://apiuploadgodown.blob.core.windows.net', // Replace with your Azure Blob Storage URL
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//     },
//   },
// });
