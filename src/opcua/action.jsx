/**
 * Connect to OPC UA endpoint
 */
const connect = (endpoint) => ({
  type: 'CONNECT',
  endpoint,
});

/**
 * Disconnect from OPC UA endpoint
 */
const disconnect = (endpoint) => ({
  type: 'DISCONNECT',
  endpoint,
});

/**
 * Browse from OPC UA endpoint
 */
const browse = (endpoint, nodeId) => ({
  type: 'BROWSE',
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


export { connect, disconnect, browse, updateActive };
