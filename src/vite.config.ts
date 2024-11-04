// import { defineConfig } from "vite"

// export default defineConfig({
//   server: {
//     proxy: {
//       "/api/menu": {
//         target: "https://cdn-dev.preoday.com",
//         changeOrigin: true,
//         secure: false,
//         ws: true,
//         timeout: 10000,
//         rewrite: path => path.replace(/^\/api\/menu/, "/challenge/menu"),
//         configure: (proxy, _options) => {
//           proxy.on("error", (err, _req, _res) => {
//             console.log("Proxy error:", err)
//           })
//           proxy.on("proxyReq", (proxyReq, req, _res) => {
//             console.log("Sending Request to the Target:", req.method, req.url)
//           })
//           proxy.on("proxyRes", (proxyRes, req, _res) => {
//             console.log(
//               "Received Response from the Target:",
//               proxyRes.statusCode,
//               req.url,
//             )
//           })
//           proxy.on("proxyRes", proxyRes => {
//             proxyRes.headers["Access-Control-Allow-Origin"] = "*"
//             proxyRes.headers["Access-Control-Allow-Methods"] =
//               "GET, POST, PUT, DELETE, OPTIONS"
//             proxyRes.headers["Access-Control-Allow-Headers"] =
//               "Content-Type, Authorization"
//           })
//         },
//       },
//     },
//   },
// })

// httpProxy
//   .createProxyServer({
//     target: {
//       protocol: "https:",
//       host: "my-domain-name",
//       port: 443,
//       pfx: fs.readFileSync("path/to/certificate.p12"),
//       passphrase: "password",
//     },
//     changeOrigin: true,
//   })
//   .listen(8000)

// proxy: {
//     "/challenge/menu": {
//       target: "https://cdn-dev.preoday.com",
//       changeOrigin: true,
//       rewrite: path => path.replace(/^\/challenge\/menu/, "/challenge/menu"),
//     },
//     "/challenge/venue/9": {
//       target: "https://cdn-dev.preoday.com",
//       changeOrigin: true,
//       rewrite: path =>
//         path.replace(/^\/challenge\/venue\/9/, "/challenge/venue/9"),
//     },
//   },
