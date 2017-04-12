/**
 * Validates config namespace property
 *
 * @Returns true if prop is valid, false otherwise
 */
const validateProp = (namespace, prop, value) => {
  const hasProp = Object.prototype.hasOwnProperty.call(namespace, prop);
  // Bad prop, return
  if (!hasProp) return false;

  // Check value, if available
  if (hasProp && (value || value === 0)) {
    if (namespace[prop] === value) return true;
    return false;
  }

  // Prop is valid, don't care about value
  return true;
};

/**
 * Checks connected server array, returns active server
 * @param {object} opcua - Redux state
 */
const isServerActive = (opcua) => {
  let endpoint = null;
  const servers = Object.keys(opcua);

  // If server is active, return endpoint
  servers.some((server) => {
    if (opcua[server].isActive) {
      endpoint = server;
      return true;
    }
    return false;
  });
  return endpoint;
};

/**
 * Checks connected server array, returns connected server
 * @param {object} opcua - Redux state
 */
const isServerConnected = (opcua) => {
  let endpoint = null;
  const servers = Object.keys(opcua);

  // If server is active and connected, return endpoint
  servers.some((server) => {
    if (opcua[server].isActive && opcua[server].isConnected) {
      endpoint = server;
      return true;
    }
    return false;
  });
  return endpoint;
};

export { validateProp, isServerActive, isServerConnected };
