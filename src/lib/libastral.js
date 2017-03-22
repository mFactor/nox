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

export { validateProp };
