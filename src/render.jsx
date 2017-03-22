/**
 * Client-side entry point
 */
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import routes from './routes.jsx';
import rootReducer from './reducers.jsx';
import rootSaga from './sagas.jsx';
import IsoStyle from './base/components/iso_style.jsx';

/**
 * Load client modules, hyrdrate initial server store
 */
const moduleLoad = (routes) => {
  const rootState = window.__ROOT_STATE__;
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, rootState,
                            composeWithDevTools(applyMiddleware(sagaMiddleware)));
  sagaMiddleware.run(rootSaga);

  // Front-end routing
  render(
    <Provider store={store}>
      <IsoStyle onInsertCss={styles => styles._insertCss()}>
        <Router routes={routes} history={browserHistory} />
      </IsoStyle>
    </Provider>,
    document.getElementById('app-entry'),
  );
};

moduleLoad(routes);

/**
 * Hot module replacement
 *
 * May have to call moduleLoad when replacing react_hmr with
 * the new hot loader in the future
 */
if (module.hot) {
  module.hot.accept();
}
