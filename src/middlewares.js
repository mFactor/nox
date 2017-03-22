/**
 * Global middleware handler
 * Import/Export any new middleware here, to make available in server.js
 */
import base from './base/api/middleware';
import opcua from './opcua/api/middleware';

export { base, opcua };
