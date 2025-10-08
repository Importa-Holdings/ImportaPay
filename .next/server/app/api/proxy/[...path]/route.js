const CHUNK_PUBLIC_PATH = "server/app/api/proxy/[...path]/route.js";
const runtime = require("../../../../chunks/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/node_modules_next_3817310b._.js");
runtime.loadChunk("server/chunks/[root-of-the-server]__93c19b6d._.js");
runtime.getOrInstantiateRuntimeModule("[project]/.next-internal/server/app/api/proxy/[...path]/route/actions.js [app-rsc] (server actions loader, ecmascript)", CHUNK_PUBLIC_PATH);
runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/app-route.js { INNER_APP_ROUTE => \"[project]/app/api/proxy/[...path]/route.ts [app-route] (ecmascript)\" } [app-route] (ecmascript)", CHUNK_PUBLIC_PATH);
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/app-route.js { INNER_APP_ROUTE => \"[project]/app/api/proxy/[...path]/route.ts [app-route] (ecmascript)\" } [app-route] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
