// Sentry debe iniciarse antes de cargar express y el resto de la app.
// El DSN viene del entorno (SENTRY_DSN); si está vacío, Sentry queda apagado.
const Sentry = require('@sentry/node');

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV || 'production',
    sendDefaultPii: false,
  });
}

module.exports = Sentry;
