import React from 'react';
import { Route } from 'react-router';
import Base from './base/base.jsx';
import OpcUaRouter from './opcua/router.jsx';

/**
 * Global application routes, each module must be imported here to expose to
 * the URL namespace
 */
const routes = (
  <Route name="base" component={Base}>
    {OpcUaRouter}
  </Route>
);

export default routes;
