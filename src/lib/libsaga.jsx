import 'whatwg-fetch';
import { call, put } from 'redux-saga/effects';

/**
 * Fetch primitive for use in sagas, only for internal API
 *
 * If body is supplied, request type becomes POST
 */
function* fetchAsync(url, body) {
  const opts = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  };
  if (body) {
    opts.method = 'POST';
    opts.body = JSON.stringify(body);
  }
  try {
    // call attaches promise, must yield to mimic 'then' for json promise
    const response = yield call(fetch, url, opts);
    const json = yield response.json();
    return json;
  } catch (err) {
    yield put({
      type: 'ERROR',
      message: err.message,
    });
    return null;
  }
}

export { fetchAsync };
