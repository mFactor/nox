import React from 'react';
import { Route } from 'react-router';
import OpcUa from 'opcua/opcua.jsx';

/**
 * Module router
 */
const moduleRouter = (
  <Route path="/" component={OpcUa} />
);

export default moduleRouter;
