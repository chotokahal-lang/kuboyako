import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

function localImageUploadPlugin() {
  return {
    name: "local-image-upload",
    configureServer(server: any) {
      server.middlewares.use("/api/upload-image", (req: any, res: any) => {
        if (req.method === "POST") {
          let body = "";
          req.on("data", (chunk: any) => { body += chunk.toString(); });
          req.on("end", () => {
            try {
              const { filename, base64 } = JSON.parse(body);
              const uploadsDir = path.resolve(__dirname, "public", "uploads");
              if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir, { recursive: true });
              }
              const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
              const safeFilename = Date.now() + "_" + filename.replace(/[^a-zA-Z0-9.\-_]/g, "_");
              const targetPath = path.resolve(uploadsDir, safeFilename);
              fs.writeFileSync(targetPath, base64Data, "base64");
              
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ url: `/uploads/${safeFilename}` }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: ["tuesday-mule-jeep.ngrok-free.dev"],
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger(), localImageUploadPlugin()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-ui': ['framer-motion', 'lucide-react', 'clsx', 'tailwind-merge'],
          'vendor-charts': ['recharts'],
          'vendor-core': ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}));
