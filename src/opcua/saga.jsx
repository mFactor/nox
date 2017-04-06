import { takeLatest, eventChannel } from 'redux-saga';
import { put, call, take } from 'redux-saga/effects';
import Io from 'socket.io-client';
import { fetchAsync } from 'lib/libsaga.jsx';

function socketInit() {
  const io = new Io('/opcua');
  io.on('connect', (socket) => {
    socket.join('noxOut');
    return socket;
  });
}

function socketHandler(socket) {
  return eventChannel((emit) => {

    // Session service event bus
    socket.on('session', (payload) => {

    });

    // Subscription service event bus
    socket.on('subscription', (payload) => {

    });
  });
}

/**
 * Connect to OPC UA server
 */
function* connect(action) {
  const json = yield fetchAsync(`/opcua/api/connect`, action);
  if (json) {
    yield put({
      type: 'UPDATE_SESSION',
      endpoint: action.endpoint,
      active: true,
      status: json.status,
      msg: json.msg,
      addressSpace: json.data,
    });
  } else {
    yield put({
      type: 'STATUS',
      status: 'ERR',
    });
  }
}

/**
 * Log message on server
 */
function* disconnect(action) {
  const json = yield fetchAsync(`/opcua/api/disconnect`, action);
  if (json) {
    yield put({
      type: 'UPDATE_SESSION',
      endpoint: action.endpoint,
      active: false,
      status: json.status,
      msg: json.msg,
      addressSpace: json.data,
    });
  } else {
    yield put({
      type: 'STATUS',
      status: 'ERR',
    });
  }
}

/**
 * Browse server for node
 */
function* browse(action) {
  const json = yield fetchAsync(`/opcua/api/browse`, action);
  if (json) {
    yield put({
      type: 'UPDATE_BROWSE',
      endpoint: action.endpoint,
      status: json.status,
      browseResult: json.data,
    });
  } else {
    yield put({
      type: 'STATUS',
      status: 'ERR',
    });
  }
}

/**
 * Log message on server
 */
function* subscribe(action) {
  const json = yield fetchAsync(`/opcua/api/subscribe`, action);
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

function* listen() {
  const socket = yield call(socketInit);
  const channel = yield call(socketHandler, socket);
  for (;;) {
    const payload = take(channel);
    yield put({ test: payload });
  }
}

export default function* opcua() {
  yield takeLatest('CONNECT', connect);
  yield takeLatest('DISCONNECT', disconnect);
  yield takeLatest('BROWSE', browse);
  yield takeLatest('SUBSCRIBE', subscribe);
  yield takeLatest('LISTEN', listen);
}
