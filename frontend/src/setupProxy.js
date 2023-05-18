const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://web-apteka-backend.onrender.com:10000',
      changeOrigin: true,
    })
  );
};
