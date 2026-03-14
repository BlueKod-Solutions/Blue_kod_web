// src/app.js
const express        = require('express');
const cors           = require('cors');
const helmet         = require('helmet');
const morgan         = require('morgan');
const rateLimit      = require('express-rate-limit');

const contactRoutes  = require('./routes/contact.routes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();

// ── Trust proxy (needed when behind Nginx / load balancer) ──────
app.set('trust proxy', 1);

// ── Security headers ─────────────────────────────────────────────
app.use(helmet());

// ── CORS ─────────────────────────────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:4200')
  .split(',')
  .map(o => o.trim());

app.use(cors({
  origin(origin, callback) {
    // Allow requests with no origin (e.g. curl, Postman, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origin ${origin} is not allowed`));
  },
  methods:     ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ── Body parsing ──────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ── HTTP request logger ───────────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// ── Global rate limiter ───────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max:      parseInt(process.env.RATE_LIMIT_MAX, 10) || 100,
  standardHeaders: true,
  legacyHeaders:   false,
});
app.use('/api', globalLimiter);

// ── Health check ──────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.status(200).json({
    status:    'ok',
    service:   'bluekod-api',
    timestamp: new Date().toISOString(),
  });
});

// ── API routes ────────────────────────────────────────────────────
app.use('/api/contact', contactRoutes);

// ── 404 + error handlers ──────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
