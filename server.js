/**
 * Entry point for Node.
 * TODO: Remove hard references in rootTemplate, prep for production
 */
import express from 'express';
import session from 'express-session';
import parser from 'body-parser';
import React from 'react';
import { join } from 'path';
import { renderToString } from 'react-dom/server';
import { RouterContext, match, createMemoryHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import SocketIO from 'socket.io';
import { sysLog } from './src/lib/log';
import routes from './src/routes.jsx';
import rootReducer from './src/reducers.jsx';
import IsoStyle from './src/base/components/iso_style.jsx';
import * as middleware from './src/middlewares';
import * as controller from './src/controllers';

const env = process.env;
const app = express();
app.use(session({
  secret: 'beastmode',
  resave: false,
  saveUninitialized: true,
}));
app.use(parser.json()).use(parser.urlencoded({ extended: false }));

const httpServer = app.listen(env.PORT, () => {
  sysLog.info(`Astral server listening on ${env.PORT}`);
});
const io = new SocketIO(httpServer);
app.use(express.static(join(__dirname, 'static')));

/**
 * Service initialization
 * Note: Use Promise Async/Await pattern to ensure all services
 *       are initialized before proceeding
 */

/**
 * Middleware registration
 */
middleware.base(app, env);
middleware.opcua(app, env);

/**
 * API routing
 */
controller.base(app, env, io);
controller.opcua(app, env, io);

/**
 * Isomorphic react routing
 */
app.use((req, res) => {
  const history = createMemoryHistory(req.path);
  const routerParams = {
    history,
    routes,
    location: req.url,
  };
  const css = [];
  const storeState = {};
  const store = createStore(rootReducer, storeState);

  // React route matching, server side rendering
  match(routerParams, (err, redirectLocation, renderProps) => {
    if (err) {
      const msg = 'Internal server error';
      if (env.NODE_ENV === 'development') {
        throw new Error(msg);
      }
      req[env.NAMESPACE].log.server(msg, 'error');
      return res.status(500).end('Internal server error');
    }
    if (!renderProps) return res.status(404).end('Not found');

    function renderView() {
      const rootView = React.createElement(RouterContext, renderProps, null);
      const rootStyle = React.createElement(IsoStyle, {
        onInsertCss: (styles) => { css.push(styles._getCss()); },
      }, rootView);
      const rootRedux = React.createElement(Provider, { store }, rootStyle);
      const rootComponent = renderToString(rootRedux);
      const rootState = JSON.stringify(store.getState());
      const template = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <title>Astral | Demo</title>
          <script>
            window.__ROOT_STATE__ = ${rootState};
          </script>
          <style>${css.join('')}</style>
        </head>
        <body>
          <div id="app-entry">${rootComponent}</div>
          <script src="http://localhost:3001/render.bundle.js"></script>
        </body>
      </html>
      `;
      return template;
    }
    req[env.NAMESPACE].log.server('Render success', 'info');
    res.send(renderView());
  });
  req[env.NAMESPACE].log.print();
});

export { httpServer };
