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

/**
 * Toggle drawer
 */
const toggleDrawer = () => ({
  type: 'TOGGLE_DRAWER',
});

export { log, toggleDrawer };
