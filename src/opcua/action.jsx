/**
 * Connect to OPC UA endpoint
 * @param {string} endpoint - OPC UA endpoint
 */
const connect = (endpoint) => ({
  type: 'CONNECT',
  endpoint,
});

/**
 * Disconnect from OPC UA endpoint
 * @param {string} endpoint - OPC UA endpoint
 */
const disconnect = (endpoint) => ({
  type: 'DISCONNECT',
  endpoint,
});

/**
 * Browse from OPC UA endpoint
 * @param {string} endpoint - OPC UA endpoint
 * @param {string} nodeId - Node to browse
 */
const browse = (endpoint, nodeId) => ({
  type: 'BROWSE',
  endpoint,
  nodeId,
});

/**
 * Monitor OPC UA node via subscription
 * @param {string} nodeId - Node to monitor
 */
const monitor = (endpoint, nodeId) => ({
  type: 'MONITOR',
  endpoint,
  nodeId,
});

/**
 * Unmonitor OPC UA node via subscription
 * @param {string} nodeId - Node to browse
 */
const unmonitor = (endpoint, nodeId) => ({
  type: 'UNMONITOR',
  endpoint,
  nodeId,
});

/**
 * Get active server from connected list
 */
const updateActive = (servers) => ({
  type: 'UPDATE_ACTIVE',
  servers,
});


export { connect, disconnect, browse, monitor, unmonitor, updateActive };
