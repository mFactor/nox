import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Home from 'app/views/home.jsx'

/**
 * Module router
 */
const moduleRouter = (
  <Route path='/' name='home' component={Home}>
  </Route>
);

export default moduleRouter;
