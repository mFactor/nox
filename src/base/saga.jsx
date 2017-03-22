import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { fetchAsync } from 'lib/libsaga.jsx';

/**
 * Log message on server
 */
function* serverLog(action) {
  const json = yield fetchAsync(`/base/api/log`, action);
  if (json && (action.level !== 'error')) {
    yield put({
      type: 'STATUS',
      status: 'OK',
    });
  } else {
    yield put({
      type: 'STATUS',
      status: 'ERR',
    });
  }
}

export default function* base() {
  yield takeLatest('SERVER_LOG', serverLog);
}
