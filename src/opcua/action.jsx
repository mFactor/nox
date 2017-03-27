/**
 * Connect to OPC UA endpoint
 */
const connect = (endpoint) => {
  return {
    type: 'CONNECT',
    endpoint,
  };
};

/**
 * Disconnect from OPC UA endpoint
 */
const disconnect = (endpoint) => {
  return {
    type: 'DISCONNECT',
    endpoint,
  };
};

export { connect, disconnect };
