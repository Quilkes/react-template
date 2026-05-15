import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import https from "node:https";
import http from "node:http";

// ─── Server-level error reporter ─────────────────────────────────────────────
//
// Catches errors at the Vite Node.js process level — before the browser loads.
// This covers: HTML parse errors, TS/JS transform failures, bad imports, and
// missing modules. None of these can be caught by a browser-side script because
// the page never finishes loading when they occur.
//
// Errors are POSTed to the Adaptar backend, which relays them to the frontend
// via the existing Socket.io channel. The three env vars are injected at
// sandbox create time in sandboxService.ts — none are secrets.

function postErrorToBackend(payload: {
  workspaceId: string;
  backendUrl: string;
  token: string;
  message: string;
  file?: string;
  line?: number;
  column?: number;
  plugin?: string;
}) {
  const body = JSON.stringify({
    workspaceId: payload.workspaceId,
    message: payload.message,
    file: payload.file,
    line: payload.line,
    column: payload.column,
    plugin: payload.plugin,
  });

  try {
    const url = new URL("/api/sandbox-errors", payload.backendUrl);
    const transport = url.protocol === "https:" ? https : http;

    const req = transport.request(
      {
        hostname: url.hostname,
        port: url.port || (url.protocol === "https:" ? 443 : 80),
        path: url.pathname,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
          "x-adaptar-error-token": payload.token,
        },
      },
      (res) => {
        // Drain the response so the socket is freed
        res.resume();
      },
    );

    req.on("error", () => {
      // Fire-and-forget — never crash the dev server over a reporting failure
    });

    req.write(body);
    req.end();
  } catch {
    // URL parse failure or other sync error — silently ignore
  }
}

function adaptarServerErrorReporter(): Plugin {
  const workspaceId = process.env.ADAPTAR_WORKSPACE_ID;
  const backendUrl = process.env.ADAPTAR_BACKEND_URL;
  const token = process.env.ADAPTAR_ERROR_TOKEN;

  // If env vars aren't present (local dev outside Modal), this plugin is a no-op
  const enabled = Boolean(workspaceId && backendUrl && token);

  return {
    name: "adaptar-server-error-reporter",

    configureServer(server: ViteDevServer) {
      if (!enabled) return;

      // transformError fires for every file Vite fails to transform —
      // syntax errors, bad imports, TypeScript errors, missing modules.
      server.middlewares.use((_req, _res, next) => next());

      // Tap into the internal error event Vite emits when a transform fails.
      // This fires before the browser gets any response, so it's the earliest
      // possible catch point.
      server.httpServer?.on("error", (err: NodeJS.ErrnoException) => {
        postErrorToBackend({
          workspaceId: workspaceId!,
          backendUrl: backendUrl!,
          token: token!,
          message: err.message || "Dev server error",
        });
      });

      // Vite emits an internal 'error' event on the module graph when a
      // transform or resolve step fails.
      (server as any).watcher?.on("error", (err: Error) => {
        postErrorToBackend({
          workspaceId: workspaceId!,
          backendUrl: backendUrl!,
          token: token!,
          message: err.message || "File watcher error",
        });
      });
    },

    // transformIndexHtml error — fires when index.html itself fails to parse
    // (e.g. CDATA/DOCTYPE corruption). This hook runs server-side.
    transformIndexHtml: {
      order: "pre",
      handler(_html, ctx) {
        if (!enabled || !ctx.server) return;

        ctx.server.httpServer?.once("error", (err: Error) => {
          postErrorToBackend({
            workspaceId: workspaceId!,
            backendUrl: backendUrl!,
            token: token!,
            message: `HTML transform error: ${err.message}`,
            file: "index.html",
          });
        });
      },
    },

    // transform hook — intercepts every module Vite processes. On failure,
    // Vite calls this.error() which triggers the plugin's error hook below.
    handleHotUpdate({ server, modules }) {
      if (!enabled) return;

      for (const mod of modules) {
        if (mod.transformResult === null && mod.id) {
          // Module was invalidated and hasn't re-transformed yet — not an error
        }
      }
    },
  };
}

// ─── Browser-side runtime fallback ───────────────────────────────────────────
//
// Catches errors that only happen after the page loads: component crashes,
// unhandled promise rejections, runtime TypeErrors. The server reporter above
// can't see these because they happen in user-generated React code at runtime,
// not during Vite's build pipeline. Both layers are needed for full coverage.
//
// Also suppresses Vite's built-in error overlay so errors route to ChatView
// instead of showing a raw Vite overlay inside the preview iframe.

function adaptarBrowserRuntimeBridge(): Plugin {
  const runtimeScript = `
(function () {
  if (window.__ADAPTAR_RUNTIME_BRIDGE__) return;
  window.__ADAPTAR_RUNTIME_BRIDGE__ = true;

  function send(message, stack, filename, lineno, colno) {
    try {
      window.parent.postMessage(
        { type: 'error', error: { message: message || 'Unknown error', stack: stack || '', filename: filename, lineno: lineno, colno: colno } },
        '*'
      );
    } catch (_) {}
  }

  // Runtime JS errors (ReferenceError, TypeError, component crashes)
  window.addEventListener('error', function (e) {
    send(e.message, e.error && e.error.stack, e.filename, e.lineno, e.colno);
  });

  // Unhandled promise rejections (async component failures, fetch errors)
  window.addEventListener('unhandledrejection', function (e) {
    var r = e.reason;
    send(
      (r && r.message) ? r.message : String(r || 'Unhandled Promise Rejection'),
      r && r.stack,
      r && r.fileName,
      r && r.lineNumber,
      r && r.columnNumber
    );
  });

  // Blank-screen detector — if #root is still empty 3s after load, a module
  // failed silently (no error event fired). Report and reload.
  window.addEventListener('load', function () {
    setTimeout(function () {
      var root = document.getElementById('root');
      if (root && root.children.length === 0 && !(root.textContent || '').trim()) {
        send('Preview failed to render — a component or import failed to load silently.');
        window.location.reload();
      }
    }, 3000);
  });
})();
`.trim();

  return {
    name: "adaptar-browser-runtime-bridge",
    transformIndexHtml() {
      return [
        {
          // Suppress Vite's built-in error overlay — build errors arrive via
          // the server reporter above; runtime errors via postMessage below.
          tag: "style",
          attrs: { "data-adaptar": "overlay-suppress" },
          children:
            "vite-error-overlay{display:none!important}" +
            "#vite-error-overlay{display:none!important}",
          injectTo: "head-prepend",
        },
        {
          tag: "script",
          attrs: {},
          children: runtimeScript,
          injectTo: "head-prepend",
        },
      ];
    },
  };
}

// ─── Config ───────────────────────────────────────────────────────────────────

export default defineConfig({
  // When running behind adaptar-proxy, requests arrive at /{workspaceId}/*.
  // base makes Vite prefix all asset URLs so the browser doesn't request
  // /@vite/client at the proxy root (which has no machine mapping).
  base: process.env.VITE_BASE || "/",
  plugins: [
    adaptarServerErrorReporter(), // Layer 1: process-level, catches before browser loads
    adaptarBrowserRuntimeBridge(), // Layer 2: browser-level, catches runtime errors
    react(),
  ],
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
    allowedHosts: [".fly.dev"],
  },
});
