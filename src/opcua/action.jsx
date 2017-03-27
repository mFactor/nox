/**
 * Log client-side event to server
 */
const connect = (endpoint) => {
  return {
    type: 'CONNECT',
    endpoint,
  };
};

/**
 * Log client-side event to server
 */
const disconnect = (endpoint) => {
  return {
    type: 'DISCONNECT',
    endpoint,
  };
};

export { connect, disconnect };
