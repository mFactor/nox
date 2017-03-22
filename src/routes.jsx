import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Base from './base/views/base.jsx';
import AppRouter from './app/router.jsx';

/**
 * Global application routes, each module must be imported here to expose to
 * the URL namespace
 */
const routes = (
  <Route name='base' component={Base}>
    {AppRouter}
  </Route>
);

export default routes;
