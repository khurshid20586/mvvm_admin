const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/wa',
    createProxyMiddleware({
      target: 'http://51.20.6.238:8080',
      changeOrigin: true,
      secure: false,
      logLevel: 'warn',
    })
  );
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://13.60.241.43:8080',
      changeOrigin: true,
      secure: false,
      logLevel: 'warn',
    })
  );
};