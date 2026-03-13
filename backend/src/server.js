// src/server.js
require('dotenv').config();

const app       = require('./app');
const connectDB = require('./config/db');

const PORT = parseInt(process.env.PORT, 10) || 5000;

async function startServer() {
  // Connect to MongoDB first
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log('');
    console.log('╔══════════════════════════════════════════╗');
    console.log('║        BlueKod API Server Started        ║');
    console.log('╠══════════════════════════════════════════╣');
    console.log(`║  Port    : ${PORT.toString().padEnd(31)}║`);
    console.log(`║  Mode    : ${(process.env.NODE_ENV || 'development').padEnd(31)}║`);
    console.log(`║  Health  : http://localhost:${PORT}/health  ║`);
    console.log('╚══════════════════════════════════════════╝');
    console.log('');
  });

  // Graceful shutdown
  const shutdown = (signal) => {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    server.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT',  () => shutdown('SIGINT'));
}

startServer();
