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
      type: 'LOG_RES',
      status: json.status,
      msg: json.msg,
      data: json.data,
    });
  } else {
    yield put({
      type: 'LOG_RES',
      status: false,
    });
  }
}

export default function* base() {
  yield takeLatest('SERVER_LOG', serverLog);
}
