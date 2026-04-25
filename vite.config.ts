import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

/**
 * Injects the Adaptar runtime error bridge into every page before any module
 * loads. Uses Vite's transformIndexHtml hook — same mechanism Sentry and
 * Vite's own overlay use — so index.html stays clean and this is versioned
 * as real code rather than an HTML string.
 *
 * The bridge runs synchronously in <head> before any ES module is parsed,
 * which means it catches errors from module resolution failures, component
 * crashes, and unhandled rejections. It communicates back to the Adaptar
 * parent frame via window.parent.postMessage since the sandbox is cross-origin.
 */
function adaptarErrorBridge(): Plugin {
  const script = `
(function () {
  if (window.__ADAPTAR_ERROR_BRIDGE__) return;
  window.__ADAPTAR_ERROR_BRIDGE__ = true;

  function send(message, stack, filename, lineno, colno) {
    try {
      window.parent.postMessage(
        { type: 'error', error: { message: message || 'Unknown error', stack: stack || '', filename: filename, lineno: lineno, colno: colno } },
        '*'
      );
    } catch (_) {}
  }

  window.addEventListener('error', function (e) {
    send(e.message, e.error && e.error.stack, e.filename, e.lineno, e.colno);
  });

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

  // Blank-screen detector: reduced to 3s — if #root is still empty a module
  // silently failed. Report it and reload so Vite can recover.
  window.addEventListener('load', function () {
    setTimeout(function () {
      var root = document.getElementById('root');
      if (root && root.children.length === 0 && !(root.textContent || '').trim()) {
        send('Preview failed to render — a component or import failed to load silently. Check for undefined variables or missing exports.');
        window.location.reload();
      }
    }, 3000);
  });

  // Vite HMR build error channel — intercept WebSocket early (before Vite's
  // own HMR client loads) so we receive every vite:error message natively.
  // This catches syntax errors, bad imports, TS errors without any polling.
  try {
    var _OrigWS = window.WebSocket;
    function PatchedWS(url, protocols) {
      var ws = protocols ? new _OrigWS(url, protocols) : new _OrigWS(url);
      ws.addEventListener('message', function(ev) {
        try {
          var data = JSON.parse(ev.data);
          if (data && data.type === 'error' && data.err) {
            var err = data.err;
            send(
              err.message || 'Build error',
              err.stack,
              err.id || (err.loc && err.loc.file),
              err.loc && err.loc.line,
              err.loc && err.loc.column
            );
          }
        } catch(_) {}
      });
      return ws;
    }
    PatchedWS.prototype = _OrigWS.prototype;
    PatchedWS.CONNECTING = _OrigWS.CONNECTING;
    PatchedWS.OPEN = _OrigWS.OPEN;
    PatchedWS.CLOSING = _OrigWS.CLOSING;
    PatchedWS.CLOSED = _OrigWS.CLOSED;
    window.WebSocket = PatchedWS;
  } catch(_) {}
})();
`.trim();

  return {
    name: "adaptar-error-bridge",
    transformIndexHtml() {
      return [
        {
          tag: "script",
          attrs: {},
          children: script,
          injectTo: "head-prepend",
        },
      ];
    },
  };
}

export default defineConfig({
  plugins: [adaptarErrorBridge(), react()],
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
    allowedHosts: [".modal.host", ".w.modal.host"],
  },
});
