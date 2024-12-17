import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
const router = express.Router();

const microserviceProxy = createProxyMiddleware({
  target: 'http://localhost:3011/api/activities',
  changeOrigin: true
});

router.use('/activities', microserviceProxy);

export default router;