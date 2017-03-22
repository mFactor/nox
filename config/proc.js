/**
 * Application configuration, matches to NODE_ENV passed
 * through starting the application
 *
 * Each key becomes part of the env to be used throughout the application
 */
const config = {
  name: 'Astral Demo',
  namespace: '__ASTRAL__',
  development: {
    host: 'localhost',
    port: '3000',
    devPort: '3001',
  },
  staging: {
    host: 'localhost',
    port: '3002',
    devPort: null,
  },
  production: {
    host: 'localhost',
    port: '80',
    devPort: null,
  },
};

module.exports = config;
