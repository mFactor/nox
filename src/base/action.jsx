/**
 * Log client-side event to server
 */
const log = (level, msg) => {
  return {
    type: 'SERVER_LOG',
    level,
    msg,
  };
};

export { log };
